import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { reduce } from 'async';
import Plot from 'react-plotly.js';
import { useState } from 'react';
import DropDownForPie from './DropDownForPieChart';



const OverviewPieChart = (props) =>{
	
	const [check,setCheck] = useState(0);
	const [PieChartVariable,setPieChartVariable] = useState('volc_name')
	
	Chart.register(...registerables);
	let arr = []
	arr = props.onGetData();
	let variable = PieChartVariable;
	let dict = {}
	let total = 0;
	let side = props.onGetSide();
	let legendSize = props.onGetLegendSize();

	const PassPieChartVariable = (a) => {
		setPieChartVariable(a)
	}

	for(let i =0;i<arr.length;i++){
		dict[arr[i][variable]] =0;
		total +=1;	
	}

	for(let i =0;i<arr.length;i++){
		dict[arr[i][variable]] +=1;
	}

	let v = []
	let lable = []

	for(const[key,value] of Object.entries(dict) ){
		v.push(value);
		lable.push(key);
	}

	// console.log(lable)
	// console.log(v)
	
	return(
	<div>
		<div>
			<DropDownForPie onPassPieChartVariable = {PassPieChartVariable} />
		</div>

	<div>

	<Plot
        data={
		[
		{
		labels:lable,
		values : v,
		type: 'pie',
	},
		
		]
	}
        layout={ {width: side[0], height: side[1], title: 'Overview',legend:{
		font:{
			size: legendSize
		}
	}} }
      	/>
		</div>
	</div>
		
	);
}

export default OverviewPieChart;