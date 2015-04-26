var React = require('react');

var Query = require('../../components/Query.react');
var ConditionGroup = require('../../components/ConditionGroup.react');

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

React.render(<Query query={query} />, document.getElementById('react-app'));
