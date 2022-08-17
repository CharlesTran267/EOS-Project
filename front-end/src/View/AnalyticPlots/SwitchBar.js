import React from 'react'
import {useState,useEffect} from 'react'
import './NewDashBoardStyling.css'
import {Button} from '@material-ui/core'
const SwitchBar = (props) => {
	const [mode,setMode] = useState('Overview')
	const [overviewVariant, setOverViewVariant] = useState("contained")
	const switchOverview = () =>{
		if(mode !== 'Overview'){
			props.onPassMode('Overview')
			setMode('Overview')
			setOverViewVariant("contained")
		}
	}

	const switchDetail = () =>{
		if(mode !== 'Plots'){
			props.onPassMode('Plots')
			setMode('Plots')
			setOverViewVariant("outlined")
		}
	}

	const highlight = () =>{

	}

	return(
		<div>
			<div className = 'switchBar' style={{marginTop:"20px",marginBottom:"30px"}}>
				<Button className = 'OverviewPlotOption' variant={overviewVariant} color="primary" style={{marginRight:"100px"}} onClick = {switchOverview}  >Overview</Button>
				<Button className = 'DetailPlotsOption' variant={overviewVariant=='contained'?"outlined":"contained"} color="primary" onClick = {switchDetail} >Plots</Button>
			</div>
		</div>
	);
}

export default SwitchBar