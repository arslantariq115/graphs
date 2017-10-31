import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import moment from 'moment';
import progress from '../assets/progress-plan.json';

class ProgressChart extends React.Component {
	constructor() {
		super();

		this.state = {
			graphType: 'area'
		};

		this.changeGraphType = this.changeGraphType.bind(this);
	}

	getProgressData() {
		let ts = '';
		let progressData = [];
		for(let i = 0; i < progress.progress_data.length; i++) {
			ts = moment(progress.progress_data[i].date, "YYYY-MM-DD").valueOf();
			progressData.push([ts, progress.progress_data[i].account_balance]);
		}

		return progressData;
	}

	changeGraphType() {
		if(this.state.graphType === 'area') {
			this.setState({ graphType: 'areaspline' })
		}
		else {
			this.setState({ graphType: 'area' })
		}
	}

	render() {
		let config = {
			chart: {
				animation: {
					duration: 1000
				}
			},
			rangeSelector: {
				buttons: [{
					type: 'month',
					count: 1,
					text: '1m'
				}, {
					type: 'month',
					count: 3,
					text: '3m'
				}, {
					type: 'month',
					count: 6,
					text: '6m'
				}, {
					type: 'year',
					count: 1,
					text: '1y',
				}, {
					type: 'all',
					text: 'All'
				}],
				selected: 1,
				inputEnabled: false,
			},
			title: {
				text: 'Progress Chart'
			},
			series: [{
				name: 'Account Balance',
				data: this.getProgressData(),
				type: this.state.graphType,
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, ReactHighstock.Highcharts.getOptions().colors[0]],
						[1, ReactHighstock.Highcharts.Color(ReactHighstock.Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				threshold: Math.min(...this.getProgressData()),
				tooltip: {
					valueDecimals: 2
				}
			}],
			yAxis: { gridLineWidth: 0 },
			xAxis: { gridLineWidth: 2 },
		};

		return(
			<div>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					<button
						onClick={this.changeGraphType}
						style={
							{
								height: 30,
								width: 200,
								backgroundColor: '#4286f4',
								color: '#ffffff',
								borderRadius: 10,
								border: 'none'
							}
						}
					>
						Change Graph Type
					</button>
				</div>
				<ReactHighstock config={config}/>
			</div>
		)
	}
}

export default ProgressChart;
