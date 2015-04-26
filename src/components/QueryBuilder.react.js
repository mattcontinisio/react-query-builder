var React = require('react');
var Freezer = require('freezer-js');

var ConditionGroup = require('./ConditionGroup.react');
var Condition = require('./Condition.react');


/**
 *	QueryBuilder react component
 */
var QueryBuilder = React.createClass({
    propTypes: {
        initialQuery: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            initialQuery: {
                type: 'ConditionGroup',
                operator: 'AND',
                children: []
            }
        };
    },

	getInitialState: function() {
        var queryFreezerStore = new Freezer(this.props.initialQuery);
		return {
            queryFreezerStore: queryFreezerStore,
            queryStore: queryFreezerStore.get()
        };
	},

    componentDidMount: function() {
		console.log('QueryBuilder componentDidMount');

        // Update state every time query changes
		var queryStoreListener = this.state.queryStore.getListener();
        queryStoreListener.on('update', function(updated) {
      		console.log('queryStore update');
			console.log(updated);
			this.setState({
                queryStore: updated
            });
		}.bind(this));
	},

	render: function() {
        var childView = null;
        if (this.props.query.type === 'ConditionGroup') {
            childView = <ConditionGroup query={this.state.queryStore} parent={null} index={0} />;
        }
        else if (this.props.query.type === 'Condition') {
            childView = <Condition query={this.state.queryStore} parent={null} index={0} />;
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
	},

	componentWillUnmount: function() {
		console.log('QueryBuilder componentWillUnmount');
	}
});

module.exports = QueryBuilder;
