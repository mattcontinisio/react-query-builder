var React = require('react');
var Freezer = require('freezer-js');

var ConditionGroup = require('./ConditionGroup.react');
var Condition = require('./Condition.react');


// Helper function for converting query to a string
var queryToString = function queryToString(query) {
    if (!query) {
        return '';
    }

    var i, length;
    var result;

    if (query.type === 'ConditionGroup') {
        result = '(';

        for (i = 0, length = query.children.length; i < length; ++i) {
            result += queryToString(query.children[i]);

            if (i + 1 < length) {
                result += ' ' + query.operator + ' ';
            }
        }

        result += ')';
    }
    else if (query.type === 'Condition') {
        result = query.leftOperand + ' ' + query.operator + ' ' + query.rightOperand;
    }
    else {
        console.error('invalid type: type must be ConditionGroup or Condition');
        return '';
    }

    return result;
};


/**
 * QueryBuilder react component
 */
var QueryBuilder = React.createClass({
    statics: {
        queryToString: queryToString
    },

    propTypes: {
        initialQuery: React.PropTypes.object,
        onQueryUpdate: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            initialQuery: {
                type: 'ConditionGroup',
                operator: 'AND',
                children: []
            },
            onQueryUpdate: function(queryBuilder) {}
        };
    },

    getInitialState: function() {
        var queryFreezerStore = new Freezer(this.props.initialQuery);
        var query = queryFreezerStore.get();

        return {
            queryFreezerStore: queryFreezerStore,
            query: query
        };
    },

    componentDidMount: function() {
        // Update state every time query changes
        var queryListener = this.state.query.getListener();
        queryListener.on('update', function(updated) {
            this.setState({
                query: updated
            });

            this.props.onQueryUpdate(this);
        }.bind(this));
    },

    getQuery: function() {
        return this.state.query;
    },

    getQueryString: function() {
        return queryToString(this.state.query);
    },

    render: function() {
        console.log('QueryBuilder render');
        var childView = null;
        if (this.state.query.type === 'ConditionGroup') {
            childView = <ConditionGroup query={this.state.query} parent={null} index={0} />;
        }
        else if (this.state.query.type === 'Condition') {
            childView = <Condition query={this.state.query} parent={null} index={0} />;
        }
        else {
            console.error('invalid type: type must be ConditionGroup or Condition');
            return null;
        }

        return (
            <div className="queryBuilder">
                {childView}
            </div>
        );
    }
});

module.exports = QueryBuilder;
