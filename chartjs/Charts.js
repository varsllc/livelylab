import React, { Component } from 'react';
import Chart from 'chart.js';

class Charts extends Component {

	// Set up chart ref for rendering 
	constructor(props){
		super(props);
		this.chartRef = React.createRef();
	}

	// Create chart object upon component mount
	componentDidMount(){
		const ctx = this.chartRef.current.getContext("2d");

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [{
					label: 'Months',
					data: [12, 19, 3, 5, 2, 3, 46, 29, 38, 76, 43, 89],
					backgroundColor: '#34cceb',
					borderColor: 'white',
					borderWidth: 1
				}]
			},
			options: {
				title: {
					display: true,
					text: 'A Sample Chart',
					fontColor: 'white',
					fontSize: 20
				},
				legend: {
					labels: {
						fontColor: 'white'
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: 'white'
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: 'white'
						}
					}]
				}
			}
		});
	}

	render(){
		return(
			<div>
				<canvas 
					ref={this.chartRef}
					width="1000"
					height="500"
				>
				</canvas>
			</div>
		)
	}
}

export default Charts;