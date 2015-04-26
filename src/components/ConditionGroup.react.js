var React = require('react');

var Condition = require('./Condition.react');


var operators = [
    { value: 'AND', display: 'AND', className: 'and' },
    { value: 'OR',  display: 'OR',  className: 'or' }
];

var operatorOptions = operators.map(function(operator, index) {
    var classString = 'operator ' + operator.className;
    return (<option className={classString} value={operator.value} key={index}>{operator.display}</option>);
});


/**
 *  ConditionGroup react component
 */
var ConditionGroup = React.createClass({
	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		console.log('ConditionGroup componentDidMount');
	},

    onOperatorChange: function(e) {
        console.log('onOperatorChange');
        this.props.query.operator = e.target.value;
    },

    addCondition: function(e) {
        console.log('addCondition');
        this.props.query.children.push({
            type: 'Condition',
            operator: '=',
            leftOperand: 'color',
            rightOperand: 'blue'
        });
    },

    addGroup: function(e) {
        console.log('addGroup');
        this.props.query.children.push({
            type: 'ConditionGroup',
            operator: 'AND',
            children: []
        });
    },

    removeSelf: function(e) {
        console.log('removeSelf');
    },

	render: function() {
        console.log(this.props);
        var childrenViews = this.props.query.children.map(function(childQuery, index) {
            if (child.type === 'ConditionGroup') {
                return <ConditionGroup query={childQuery} parent={this} index={index} key={index} />;
            }
            else if (child.type === 'Condition') {
                return <Condition query={childQuery} parent={this} index={index} key={index} />;
            }
            else {
                console.error('invalid type: type must be ConditionGroup or Condition');
                return null;
            }
        }.bind(this));

		return (
			<div className="conditionGroup">
                <select className="operators" onChange={this.onOperatorChange}>
                    {operatorOptions}
                </select>
                <button className="conditionGroupButton addCondition" onClick={this.addCondition}>+ Add Condition</button>
                <button className="conditionGroupButton addGroup" onClick={this.addGroup}>+ Add Group</button>
                <button className="conditionGroupButton removeGroup" onClick={this.removeSelf}>-</button>
                <div className="childrenConditions">
                    {childrenViews}
                </div>
			</div>
		);
	},

	componentWillUnmount: function() {
		console.log('ConditionGroup componentWillUnmount');
	}
});

module.exports = ConditionGroup;
