import React from 'react';
import propTypes from 'prop-types';
import ReactSimpleRange from 'react-simple-range';

class RangeSlider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.defaultValue
		};

		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange(e) {
		this.props.handleChange(e.value);
		this.setState({
			value: e.value
		});
	}

	render() {
		return(
			<div>
				<div style={{ width: 500 }}>
					<h3 style={{ textAlign: 'center' }}>{this.props.label}</h3>
					<p style={{ textAlign: 'center' }}>{this.state.value}</p>
					<ReactSimpleRange
						value={this.state.value}
						min={this.props.min}
						max={this.props.max}
						onChange={this.handleOnChange}
						label
					/>
				</div>
			</div>
		);
	}
}

RangeSlider.propTypes = {
	defaultValue: propTypes.number,
	label: propTypes.string,
	min: propTypes.number,
	max: propTypes.number,
	handleChange: propTypes.func
};

export default RangeSlider;
