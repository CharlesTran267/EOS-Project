import React from 'react'
import {useState,useEffect} from 'react'
import NestedPieChart from './NestedPieChart'
import OverviewPieChart from './OverviewPieChart'
import { AiOutlinePlus,AiOutlineInfo } from 'react-icons/all';
import './NewDashBoardStyling.css';

const axios = require('axios')



const OverviewPlot = () =>{
	const [t,setT] = useState(1)
	const [parArray,setParArray] = useState([])
	const [volTable,setVolTable] = useState({})
	const [histogramVariable,setHistogramVariable] = useState("red_std")
	const [ParAttributeList,setParAttributeList] = useState([])
	const [TernaryVariable,setTernaryVariable] = useState()
	const [TernaryFinalVariable,setTernaryFinalVariable] = useState([{value:1, label:"red_std"},{value:2,label:"blue_std"},{value:3,label:"green_std"}])
	const [xAxis,setXAxis] = useState("red_std");
  	const [yAxis,setYAxis] = useState("blue_std");
  	const [choice,setChoice] = useState(0);
	const [essentialVariable,setEssentialVariable] = useState('volc_name')
	const [pieChartVariable,setPieChartVariable] = useState('volc_name')
	const [histogramMode,setHistogramMode] = useState('Overview')
	const [volcToCompare1,setVolcToCompare1] = useState('Pinatubo')
	const [volToComapre2,setVolcToCompare2] = useState('Taal')
	const [SunBurstVariable,setSunBurstVariable] = useState()
	const [SunBurstFinalVariable,setSunBurstFinalVariable] = useState([{value:1,label:"juvenile"},{value:2,label:"lithic"},{value:3,label:"free crystal"}])
	const [side,setSide] = useState([600,500])

	useEffect(() =>{
		axios.get('/volcanoes/getParticles')
		.then(data =>{
			setParArray(data.data['particles']) 
			console.log(data.data['particles'])
		})
		axios.get('/volcanoes/getVolcanoes')
		.then(data =>{
			let vols = data.data['volcanoes']
			let volT = {}
			// console.log(data.data['volcanoes'])
			for(let i=0;i < vols.length;i++){
				volT[vols[i]['vd_num']] = vols[i]['vd_name']
			}
			console.log(volT)
			setVolTable(volT)
		})

	},[])

	const getData = () =>{
		return parArray;
	}

	const getPieChartVariable = () =>{
		return 'volc_name'
	}

	const getSide = () => {
		return side
	}

	

	const addPlot = () =>{
		// if(content.length===0){
		// 	content.pop();
		// 	content.push(<div><OverviewPieChart onGetSide = {() => {return [300,500]}} onGetData={getData} onGetPieChartVariable={getPieChartVariable} /></div>)
		// }
		// setD(1)
		setSide([300,500])
		setContent([...content,<div><OverviewPieChart onGetSide={() => {return [300,500]}} onGetData = {getData} onGetPieChartVariable = {getPieChartVariable} /></div>])
		

	}

	const getSunBurstVariable = () =>{
		return [{value:1,label:"juvenile"},{value:2,label:"lithic"},{value:3,label:"free crystal"}]
	}

	


	const [content,setContent] = useState([])
	const [d,setD] = useState(0)



	

	const getSunBurstDataVariable = () => {
		return 'overview'
	}

	
	return(
		<div className = 'overviewPlot' >
			<div> 
				<div className ='overview'>
				
	<OverviewPieChart onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={getPieChartVariable} />
				
				{content}
				</div>
				<div>
					<AiOutlinePlus onClick ={addPlot}/>
					<AiOutlineInfo/>
				</div>
			</div>
			{/* <div>
				<NestedPieChart onGetSide = {() =>{return [300,500]}} onGetSunBurstVariable = {getSunBurstVariable}  onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData} />	
			</div> */}
		</div>
	);
}

export default OverviewPlot