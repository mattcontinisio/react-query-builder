var React = require('react');

var QueryBuilder = require('../../components/QueryBuilder.react');

var query = {
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
};

var QueryBuilderApp = React.createClass({
    componentDidMount: function() {
		console.log('QueryBuilderApp componentDidMount');
	},

	render: function() {
		return (
			<div className="queryBuilderApp">
                <h2 id="default">default</h2>
                <QueryBuilder />
                <h2 id="with-initial-query">with initial query</h2>
                <QueryBuilder initialQuery={query} />
			</div>
		);
	},

	componentWillUnmount: function() {
		console.log('QueryBuilderApp componentWillUnmount');
	}
});

React.render(<QueryBuilderApp />, document.getElementById('react-app'));
