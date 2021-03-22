import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class LineChart extends Component {
	render(){
		return (
			<Plot 
				data={[
					{
						x: ['11/07/2020','11/25/2020','12/01/2020'],
						y: [200, 140, 312],
						type: 'scatter'
					}
				]}
				layout={ { width: 1000, height: 500, title: 'a simple line chart'}}
			/>
		)
	}

}

export default LineChart;