import React from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighcharts';
import { getGraphPlotData } from "../helpers/utils";
import RangeSlider from './common/RangeSlider';

class ContributionRiskGraph extends React.PureComponent {
	constructor() {
		super();

		this.state = {
			riskValue: 8.161736
		};

		this.handleChange = this.handleChange.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.riskValue !== nextState.riskValue) {
			return false;
		}
	}

	handleChange(value) {
		this.setState({
			riskValue: value
		});

		let riskValue = this.state.riskValue / 100;
		let chart = this.crg.getChart();
		chart.series[0].setData(getGraphPlotData(riskValue, 'lowerBound'), true);
		chart.series[1].setData(getGraphPlotData(riskValue, 'expectedValue'), true);
		chart.series[2].setData(getGraphPlotData(riskValue, 'upperBound'), true);
	}

	render() {
		const riskValue = this.state.riskValue / 100;
		let LBData = getGraphPlotData(riskValue, 'lowerBound');
		let EVData = getGraphPlotData(riskValue, 'expectedValue');
		let UBData = getGraphPlotData(riskValue, 'upperBound');

		const config = {
			chart: {
				animation: {
					duration: 800
				},
			},
			title: {
				text: 'Contribution Risk Graph'
			},
			series: [
				{
					name: 'Lower Bound',
					data: LBData,
					type: 'spline',
					tooltip: {
						valueDecimals: 2
					}
				},
				{
					name: 'Expected Value',
					data: EVData,
					type: 'spline',
					tooltip: {
						valueDecimals: 2
					}
				},
				{
					name: 'Upper Bound',
					data: UBData,
					type: 'spline',
					tooltip: {
						valueDecimals: 2
					}
				}
			],
			yAxis: {
				gridLineWidth: 0,
				opposite: true
			},
			xAxis: {
				gridLineWidth: 1,
				crosshair: true,
				labels: {
					formatter: function() {
						if (this.value <= 1) {
							return this.value + ' month';
						}
						return this.value + ' months';
					}
				}
			}
		};

		return(
			<div>
				<ReactHighcharts config={config} ref={a => this.crg = a} />
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
					<RangeSlider
						label="Risk Value"
						defaultValue={8}
						min={1}
						max={62}
						handleChange={this.handleChange}
					/>
				</div>
			</div>
		)
	}
}

export default ContributionRiskGraph;
