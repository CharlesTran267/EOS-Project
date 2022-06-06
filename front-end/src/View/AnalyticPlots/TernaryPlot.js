import React from 'react';
import Plot from 'react-plotly.js';
import Selection from './SelectWithCheckBox';
import Button from './SubmitButton'
import {useState} from 'react'

let volcColor = {
	'Pinatubo':'red',
	'Taal':'yellow',
	'Kelut':'blue',
	'Toba': 'orange',
	'Alid': 'green'

}

let rawData = [
	{journalist:11,developer:25,designer:0,label:'point 1'},
	{journalist:70,developer:10,designer:20,label:'point 2'},
	{journalist:75,developer:20,designer:5,label:'point 3'},
	{journalist:5,developer:60,designer:35,label:'point 4'},
	{journalist:10,developer:80,designer:10,label:'point 5'},
	{journalist:10,developer:90,designer:0,label:'point 6'},
	{journalist:20,developer:70,designer:10,label:'point 7'},
	{journalist:10,developer:20,designer:70,label:'point 8'},
	{journalist:15,developer:5,designer:80,label:'point 9'},
	{journalist:10,developer:10,designer:80,label:'point 10'},
	{journalist:20,developer:10,designer:70,label:'point 11'},
    ];
    

const TernaryPlot = (props) =>{
	const [TernaryVariable,setTernaryVariable] = useState()
	const [TernaryFinalVariable,setTernaryFinalVariable] = useState([{value:1, label:"red_std"},{value:2,label:"blue_std"},{value:3,label:"green_std"}])

	let side = props.onGetSide()
	let Data = props.onGetData()
	let variable = TernaryFinalVariable;

	const PassTernaryVariable = (a) => {
		console.log(a)
	
		setTernaryVariable(a);
	}

	const submitVariable = () =>
{
	setTernaryFinalVariable(TernaryVariable)
}

	let d= []
	let e = []
	for(let i=0;i<Data.length;i++){
		if(Data[i]['volc_name'] === 'Kelut')
			d.push({a:Data[i][variable[0].label], b: Data[i][variable[1].label],c:Data[i][variable[2].label],color:volcColor[Data[i]['volc_name']],name:'Kelut'})
		if(Data[i]['volc_name'] === 'Toba')
			e.push({a:Data[i][variable[0].label], b: Data[i][variable[1].label],c:Data[i][variable[2].label],color:volcColor[Data[i]['volc_name']],name:'Toba'})
	}

	const doubleClick = () =>{
		
		props.onPassZoomMode(TernaryFinalVariable,"ternaryPlot");
	}

	return(

	<div>
				<div>
					<Selection onPassTernaryVariable = {PassTernaryVariable}/>
				</div>
				<div>
					<Button onSubmitVariable = {submitVariable}/>
				</div>

		<div onDoubleClick ={doubleClick}>
		<Plot 
			data = {
			
			[
				{
					type: 'scatterternary',
					mode: 'markers',
					a: d.map(function(d) { return d.a; }),
					b: d.map(function(d) { return d.b; }),
					c: d.map(function(d) { return d.c; }),
					name:'Kelut',
					showlegend:true,
					marker: {
					    
					    color: d.map(function(d){return d.color}),
					    line: { width: 2 }
					}
				},{
					type: 'scatterternary',
					mode: 'markers',
					a: e.map(function(e) { return e.a; }),
					b: e.map(function(e) { return e.b; }),
					c: e.map(function(e) { return e.c; }),
					name:'Toba',
					showlegend:true,
					marker: {
					    
					    color: e.map(function(d){return e.color}),
					    line: { width: 2 }
					}	
				}
			]
		}


			layout={ {width: side[0], height: side[1], title: 'Ternary',autosize:true,uirevision:'true',ternary:
			{
			sum:1,
			aaxis:{title: variable[0].label, min: 0,
					ticklen: 3, autorange:true,
					    linewidth:2, tick0:0.2,dtick:0.2,ntick:3,
					    tickmode:'auto',tickvals:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
					},
					    
			baxis:{title: variable[1].label, min: 0, autorange:true,
				ticklen:3, tick0:0.2,dtick:0.2,ntick:3,
				 linewidth:2,
				 tickmode:'auto',tickvals:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
				},
				
			caxis:{title: variable[2].label, min: 0, 
				ticklen:3,tick0:0.2,dtick:0.2,ntick:3,
				 linewidth:2, ticks:'outside',
				tickmode:'auto',tickvals:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
				 autorange:true,
				}}
						    
				    }
				 }
			
		/>
	</div>
	</div>
	);
}

export default TernaryPlot;