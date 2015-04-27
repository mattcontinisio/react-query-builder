var React = require('react');

var QueryBuilder = require('../../components/QueryBuilder.react');

var query1 = null;
var query1String;

var onQuery1Update = function(queryBuilder) {
    query1 = queryBuilder.getQuery();
    query1String = queryBuilder.getQueryString();
    //console.log(query1);
    //console.log(query1String);
};

var query2 = {
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
    render: function() {
        var query1String = QueryBuilder.queryToString(query1);
        console.log(query1String);

        return (
            <div className="queryBuilderApp">
                <h2 id="default">default</h2>
                <QueryBuilder onQueryUpdate={onQuery1Update}/>
                <pre>{query1String}</pre>
                <h2 id="with-initial-query">with initial query</h2>
                <QueryBuilder initialQuery={query2} />
            </div>
        );
    }
});

React.render(<QueryBuilderApp />, document.getElementById('react-app'));
