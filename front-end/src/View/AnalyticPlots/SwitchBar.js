import React from 'react'
import {useState,useEffect} from 'react'
import './NewDashBoardStyling.css'
const SwitchBar = (props) => {
	const [mode,setMode] = useState('Overview')
	const switchOverview = () =>{
		if(mode !== 'Overview'){
			props.onPassMode('Overview')
			setMode('Overview')
		}
	}

	const switchDetail = () =>{
		if(mode !== 'Plots'){
			props.onPassMode('Plots')
			setMode('Plots')
		}
	}

	const highlight = () =>{

	}

	return(
		<div>
			<div className = 'switchBar'>
			<h3 className = 'OverviewPlotOption' onClick = {switchOverview}  >Overview</h3>
			<h3 className = 'DetailPlotsOption' onClick = {switchDetail} >Plots</h3>
			</div>
		</div>
	);
}

export default SwitchBar