var React = require('react');

var QueryBuilder = require('../src/components/QueryBuilder.react');


var QueryBuilderDemoApp = React.createClass({
    getInitialState: function() {
        return {
            query1: null,
            query2: {
                type: 'ConditionGroup',
                operator: 'AND',
                children: [
                    {
                        type: 'Condition',
                        operator: '=',
                        leftOperand: 'color',
                        rightOperand: 'blue'
                    }
                ]
            }
        };
    },

    onQuery1Update: function(queryBuilder) {
        this.setState({
            query1: queryBuilder.getQuery()
        });
    },

    onQuery2Update: function(queryBuilder) {
        this.setState({
            query2: queryBuilder.getQuery()
        });
    },

    render: function() {
        var query1String = QueryBuilder.queryToString(this.state.query1);
        var query2String = QueryBuilder.queryToString(this.state.query2);

        return (
            <div className="queryBuilderDemoApp">
                <h2 id="default">default</h2>
                <QueryBuilder onQueryUpdate={this.onQuery1Update}/>
                <pre>{query1String}</pre>
                <h2 id="with-initial-query">with initial query</h2>
                <QueryBuilder initialQuery={this.state.query2} onQueryUpdate={this.onQuery2Update} />
                <pre>{query2String}</pre>
            </div>
        );
    }
});

React.render(<QueryBuilderDemoApp />, document.getElementById('react-app'));
