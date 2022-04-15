import React from 'react'
import {useState,useEffect} from 'react'
import BinaryPlot from './BinaryPlot'
import Histogram from './Histogram'
import NestedPieChart from './NestedPieChart'
import TernaryPlot from './TernaryPlot'
import './NewDashBoardStyling.css'
import DropDownForSunBurst from './DropDownForSunBurst'
import DropDownForHistogramMode from './DropDownForHistogramMode';
import DropDownForHistogramCompare from './DropDownForHistogramCompare';
import DropDownBar from './DropDownForBinaryGraph';
import { AiOutlinePlus,AiOutlineInfo } from 'react-icons/all';
const axios = require('axios')


var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];
const DetailPlots = () =>{
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
	const [sunBurstDataVariable,setSunBurstDataVariable] = useState('overview')
	const [side,setSide] = useState([600,500])
	const [binarySide,setBinarySide] = useState([600,500])
	const [ternarySide,setTernarySide] = useState([600,500])
	const [sunBurstSide,setSunBurstSide] = useState([600,500])
	

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
	const GetVariable = () => {
		let d = [];
		d.push(xAxis);
		d.push(yAxis);
		setChoice(0);
		return d;
	      }

	
	
const PassSunBurstDataVariable = (a) =>{
	setSunBurstDataVariable(a);
}

const PassHistogramMode = (a) => {
	setHistogramMode(a)
}

const PassHistogramVariable =(a) =>{
	setHistogramVariable(a)
}

const PassVolcToCompare1 = (a) =>{
	setVolcToCompare1(a)
}

const PassVolcToCompare2 = (a) =>{
	setVolcToCompare2(a)
}


const GetHistogramVariable = ()=>{
	return histogramVariable;
}

const getData = () =>{
	return parArray;
}

const getTernaryVariable = () =>{
	return TernaryFinalVariable
}

const getSunBurstVariable = () =>{
	return SunBurstFinalVariable
}
const getEssentialVariable = () =>{
	return essentialVariable;
}
const getHistogramMode = () => {
	return histogramMode
}
const getVolcToCompare = () => {
	return [volcToCompare1,volToComapre2]
}

function GetVariableData(){
	return variableData
}

const getSunBurstDataVariable = () =>{
	return sunBurstDataVariable;
}

const addBinaryPlot = () =>{
	setBinarySide([300,500])
	setBinary([...binary,<div><BinaryPlot onGetSide ={()=>{return [300,500]}}  onGetData = {getData} onGetEssentialVariable = {getEssentialVariable} /></div>])
}

const addTernaryPlot = () =>{
	// if(ternary.length===0){
	// 	ternary.pop();
	// 	ternary.push(<div><TernaryPlot onGetSide = {() => {return [300,500]}} onGetData={getData} onGetTernaryVariable={getTernaryVariable} /></div>)
	// }
	// setT(1)
	setTernarySide([300,500])
	setTernary([...ternary,<div><TernaryPlot onGetSide = {() => {return[300,500]}} onGetData={getData} onGetTernaryVariable={getTernaryVariable} /></div>])
	
}

const addSunBurstPlot = () =>{
	// if(sunBurst.length===0){
	// 	sunBurst.pop();
	// 	sunBurst.push(<div><NestedPieChart onGetSide = {() => {return [300,500]}} onGetSunBurstVariable = {getSunBurstVariable} onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData} /></div>)
	// }
	setSunBurstSide([300,500])
	// setS(1)
	setSunBurst([...sunBurst,<div><NestedPieChart onGetSide = {() => {return [300,500]}}  onGetSunBurstVariable = {getSunBurstVariable} onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData}/></div>])
	
}

	const [binary,setBinary] = useState([])
	const [ternary,setTernary] = useState([])
	const [sunBurst,setSunBurst] = useState([])
	


	return (
		<div className='DetailPlots'>
			<div className='detailPlot1'>
			<div>
			<div className = 'DropDownHistogram'>
					<DropDownForHistogramMode onPassHistogramMode = {PassHistogramMode} />
				

					{(histogramMode === 'Compare')?(
						<div className= 'volcToCompare'>  
							<DropDownForHistogramCompare onPassVolcToCompare1 = {PassVolcToCompare1} />
							<DropDownForHistogramCompare onPassVolcToCompare2 = {PassVolcToCompare2} />
						</div>
					):(
						<div> </div>
					)
					}

			</div>
				<Histogram onGetData = {getData} onGetHistogramMode = {getHistogramMode} onGetVolcToCompare = {getVolcToCompare} onGetHistogramVariable = {GetHistogramVariable} />
				<AiOutlinePlus />
				<AiOutlineInfo />
			</div>
			
			<div>
			<div className = 'binaryPlots' >
			<BinaryPlot onGetSide={() =>{return binarySide }} onGetData = {getData} onGetEssentialVariable = {getEssentialVariable}/>
			{binary}
			</div>
			<AiOutlinePlus onClick={addBinaryPlot} />
			<AiOutlineInfo/>
			</div>
			
			</div>
			<div className='detailPlot2'>
			<div>
			<div className = 'ternaryPlots'>
			<TernaryPlot onGetSide = {() => {return ternarySide} } onGetData = {getData} onGetTernaryVariable = {getTernaryVariable}/>
			{ternary}
			</div>
			<AiOutlinePlus onClick = {addTernaryPlot} />
			<AiOutlineInfo/>
			<div>
					
				</div>
			</div>
			<div>
				{/* <div>
					<DropDownForSunBurst  onPassSunBurstDataVariable= {PassSunBurstDataVariable} />
					
				</div> */}
				<div className = 'sunBurstPlots'>
				
				<NestedPieChart onGetSide = {() =>{return sunBurstSide}} onGetSunBurstVariable = {getSunBurstVariable} onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData} />
				{sunBurst}
				</div>
				<AiOutlinePlus onClick = {addSunBurstPlot}/>
				<AiOutlineInfo/>
			</div>
			</div>
		</div>

	);
}

export default DetailPlots