var React = require('react');


var operators = [
    { value: '=',	display: '=',	className:'equal' },
    { value: '!=',	display: '!=',  className:'notEqual' },
    { value: '<',	display: '<',	className:'lessThan' },
    { value: '<=',	display: '<=',	className:'lessThanOrEqual' },
    { value: '>',	display: '>',	className:'greaterThan' },
    { value: '>=',	display: '>=',	className:'greaterThanOrEqual' }
];

var operatorOptions = operators.map(function(operator, index) {
    var classString = 'operator ' + operator.className;
    return (<option className={classString} value={operator.value} key={index}>{operator.display}</option>);
});


/**
 *  Condition react component
 */
var Condition = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        console.log('Condition componentDidMount');
    },

    onOperatorChange: function(e) {
        console.log('onOperatorChange');
        this.props.query.operator = e.target.value;
    },

    onLeftOperandChange: function(e) {
        console.log('onLeftOperandChange');
        this.props.query.leftOperand = e.target.value;
    },

    onRightOperandChange: function(e) {
        console.log('onRightOperandChange');
        this.props.query.rightOperand = e.target.value;
    },

    removeSelf: function(e) {
        console.log('removeSelf');
    },

    render: function() {
        return (
            <div className="condition">
                <input type="text" className="operand leftOperand" onChange={this.onLeftOperandChange} />
                <select className="operators" onChange={this.onOperatorChange}>
                    {operatorOptions}
                </select>
                <input type="text" className="operand rightOperand" onChange={this.onRightOperandChange}/>
                <button className="conditionButton removeCondition" onClick={this.removeSelf}>-</button>
            </div>
        );
    },

    componentWillUnmount: function() {
        console.log('Condition componentWillUnmount');
    }
});

module.exports = Condition;
