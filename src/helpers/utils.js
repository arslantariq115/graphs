import _ from 'lodash';
import riskData from '../assets/risk_data.json';

function findClosest(num, arr) {
	let curr = arr[0];
	let diff = Math.abs(num - curr.risk);
	for (let val = 0; val < arr.length; val++) {
		let newDiff = Math.abs(num - arr[val].risk);
		if (newDiff < diff) {
			diff = newDiff;
			curr = arr[val];
		}
	}
	return curr;
}

function getRiskProjectionId(riskValue) {
	let riskTolerances = riskData.risk_tolerances;
	let matchingTolerance = findClosest(riskValue, riskTolerances);

	return matchingTolerance.id;
}

function getProjectionArrays(riskValue) {
	let projections = riskData.projections_by_tolerance;
	let id = getRiskProjectionId(riskValue);
	let projectionObj = _.filter(projections, (value) => {
		if(value.tolerance_id === id) {
			return value;
		}
	})[0].projections;

	return projectionObj;
}

function getValue(accountBalance, bound, prevBound, contribution) {
	let value = accountBalance * (bound / prevBound) + contribution;
	return value;
}

export function getGraphPlotData(riskValue, valueType) {
	let projections = getProjectionArrays(riskValue);
	let j = 0;
	let plotValues = [];
	// account balance is 1,000,000 and monthly contribution is 1000
	let accountBalance = 1000000;
	let contribution = 1000;

	if(valueType === 'lowerBound') {
		j = 1;
	}
	else if(valueType === 'expectedValue') {
		j = 2
	}
	else if(valueType === 'upperBound') {
		j = 3;
	}

	plotValues.push(getValue(accountBalance, projections[0][j], projections[0][j], contribution));

	for(let i = 1; i < projections.length; i++) {
		plotValues.push(getValue(accountBalance, projections[i][j], projections[i - 1][j], contribution));
		accountBalance = plotValues[i];
	}
	return plotValues;
}
