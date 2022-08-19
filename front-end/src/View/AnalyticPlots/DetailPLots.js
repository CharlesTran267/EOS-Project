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
import { AiOutlinePlus,AiOutlineInfo,MdArrowBack } from 'react-icons/all';
import BoxPlot from './BoxPlot'
import BarChart from './BarChart' 
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
	const [initialBinaryXAxis,setInitialBinaryXAxis] = useState('red_std')
	const [initialBinaryYAxis,setInitialBinaryYAxis] = useState('blue_std')
	const [initialBinaryEssentialVariable,setInitialBinaryEssentialVariable] = useState()
	const [zoomMode,setZoomMode] = useState(0)
	const [binaryPlotZoomIn,setBinaryPlotZoomIn]  = useState(<div></div>);
	const [zoomInPlot,setZoomInPlot] = useState(<div></div>)
	const [zoomInHistogramPlot,setZoomInHistogramPlot] = useState(<div></div>)
	const [zoomInTernaryPlot,setZoomInTernaryPlot] = useState(<div></div>) 
	const [zoomInSunBurstPlot,setZoomInSunBurstPlot] = useState(<div></div>)
	const [histogramSide,setHistogramSide] = useState([600,500])
	const [histogram,setHistogramPlot] = useState([])
	const [boxPlot,setBoxPlot] = useState([])
	const [boxPlotSide,setBoxPlotSide] = useState([600,500])
	const [legendSize_Binary,setLegendSize_Binary] = useState(12)
	const [legendSize_Ternary,setLegendSize_Ternary] = useState(12)
	const [AFEs,setAFEs] = useState([])
	const [barChart,setBarChart] = useState([])
	const [barChartSide,setBarChartSide] = useState([600,500])

	useEffect(() =>{
		axios.get('/volcanoes/getAFE')
		.then(data =>{
			setAFEs(data.data.afes);

		})

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

const getAFE = () =>{
	return AFEs;
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

const PassZoomInBinaryPlot = (a) =>{
        console.log(a)
	setBinaryPlotZoomIn(<BinaryPlot onGetLegendSize = {() => {return 6} } onPassZoomMode={PassZoomMode} onPassZoomInBinaryPlot ={PassZoomInBinaryPlot} onGetEssentialVariable = {()=>{return a[2] }} onGetInitialYAxis = {() =>{ return a[1] }} onGetInitialXAxis = {() =>{return a[0] }}  onGetSide={() =>{return side }} onGetData = {getData} />)
	setInitialBinaryXAxis(a[0]);
	setInitialBinaryYAxis(a[1]);
	setInitialBinaryEssentialVariable(a[2]);
	
}

const PassZoomInSunBurstPlot = (a) =>{
	setZoomInSunBurstPlot(<NestedPieChart onPassZoomInSunBurstPlot = {PassZoomInSunBurstPlot} onGetSide = {() =>{return sunBurstSide}} onGetSunBurstVariable = {getSunBurstVariable} onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData} />);
}

const PassZoomInTernaryPlot = () =>{
	setZoomInTernaryPlot(<TernaryPlot onGetLegendSize = {() =>{return 6 }} onPassZoomMode = {PassZoomMode} onPassZoomInTernaryPlot= {PassZoomInTernaryPlot} onGetSide = {() => {return ternarySide} } onGetData = {getData} onGetTernaryVariable = {getTernaryVariable}/>)
}

const PassZoomMode = (b,a) =>{

	if(a==='binaryPlot'){
		setZoomInPlot(<BinaryPlot onGetLegendSize ={() => {return 6}} onPassZoomMode={PassZoomMode} onPassZoomInBinaryPlot ={PassZoomInBinaryPlot} onGetEssentialVariable = {()=>{return b[2] }} onGetInitialYAxis = {() =>{ return b[1] }} onGetInitialXAxis = {() =>{return b[0] }}  onGetSide={() =>{return [600,800] }} onGetData = {getData} onGetEssentialVariable = {getEssentialVariable}/>);
		setZoomMode(1)
	}
	else if(a==='sunburstPlot'){
		setZoomInPlot(<NestedPieChart onPassZoomInSunBurstPlot = {PassZoomInSunBurstPlot} onGetSide = {() =>{return [600,800]}} onGetSunBurstVariable = {() =>{return b} } onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData} />);
		setZoomMode(1);}
	else if(a==='ternaryPlot'){
		setZoomInPlot(<div className = 'zoomIn'><TernaryPlot onGetLegendSize_Ternary= {() => {return 6 }} onPassZoomMode = {PassZoomMode} onPassZoomInTernaryPlot= {PassZoomInTernaryPlot} onGetSide = {() => {return [600,800]} } onGetData = {getData} onGetTernaryVariable = {getTernaryVariable}/></div>);
		setZoomMode(1);}
	else if(a==='histogramPlot'){
	 	setZoomInPlot(<Histogram onPassZoomMode = {PassZoomMode} onGetAFE = {getAFE} onGetSide = {() =>{return histogramSide }} onGetData = {getData} onGetHistogramMode = {() =>{return b[0] }} onGetVolcToCompare = {getVolcToCompare} onGetHistogramVariable = {() =>{return b[1]}}/>);

		 setZoomMode(1);}
	else if(a === 'boxPlot'){
		setZoomInPlot(<BoxPlot onPassZoomMode = {PassZoomMode} onGetSide = {()=>{return([600,800])}} onGetData= {getData} /> )
		setZoomMode(1);
	}
	else if(a=== 'barChart'){
		setZoomInPlot(<BarChart onPassZoomMode ={PassZoomMode} onGetSide = {() =>{return ([600,800]) }} />) 
		setZoomMode(1);
	}
}

const addHistogramPlot = () => {
	setHistogramSide([300,500])
	setHistogramPlot([...histogram,<Histogram onPassZoomMode = {PassZoomMode} onGetAFE = {getAFE} onGetData = {getData} onGetHistogramMode = {getHistogramMode} onGetSide={()=>{return [300,500]}} onGetVolcToCompare = {getVolcToCompare} onGetHistogramVariable = {GetHistogramVariable} />])
}

const addBinaryPlot = () =>{
	setBinarySide([300,500])
	setLegendSize_Binary(6)
	setBinary([...binary,<div><BinaryPlot onGetLegendSize={() =>{return 6}} onGetSide ={()=>{return [300,500]}}   onGetData = {getData} onGetEssentialVariable = {()=>{return initialBinaryEssentialVariable }} onGetInitialYAxis ={()=>{ return initialBinaryYAxis }} onGetInitialXAxis = {() => {return initialBinaryXAxis} } onGetEssentialVariable = {getEssentialVariable} /></div>])
}

const addTernaryPlot = () =>{
	// if(ternary.length===0){
	// 	ternary.pop();
	// 	ternary.push(<div><TernaryPlot onGetSide = {() => {return [300,500]}} onGetData={getData} onGetTernaryVariable={getTernaryVariable} /></div>)
	// }
	// setT(1)
	setTernarySide([300,500])
	setLegendSize_Ternary(6)
	setTernary([...ternary,<div><TernaryPlot onGetLegendSize ={() =>{return 6} } onGetSide = {() => {return[300,500]}} onGetData={getData} onGetTernaryVariable={getTernaryVariable} /></div>])
	
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

const addBoxPlot = () =>{
	setBoxPlotSide([300,500])
	setBoxPlot([...boxPlot,<BoxPlot onPassZoomMode = {PassZoomMode} onGetSide = {() =>{return [300,500] }} onGetData ={getData} />])
}

const addBarChartPlot = () =>{
	setBarChartSide([300,500])
	setBarChart([...barChart,<BarChart onPassZoomMode = {PassZoomMode} onGetSide= {() => {return [300,500]} } /> ])
}

const back = () =>{
	setZoomMode(0);
}

	const [binary,setBinary] = useState([])
	const [ternary,setTernary] = useState([])
	const [sunBurst,setSunBurst] = useState([])
	


	return (
		
		<div className='DetailPlots'>
			{(zoomMode ===0)?(
		<div>
			<div className='detailPlot1'>
			<div>

			<div className='detailPlot1' >
			<div  style={{border:"solid", borderColor:"#29b6f6",marginRight:"-35px"}}>

			<div className ='histogramPlot' style={{margin:"20px"}}>
				<Histogram onPassZoomMode = {PassZoomMode} onGetSide = {() =>{return histogramSide }} onGetAFE = {getAFE} onGetData = {getData} onGetHistogramMode = {getHistogramMode} onGetVolcToCompare = {getVolcToCompare} onGetHistogramVariable = {GetHistogramVariable} />
				{histogram}
				</div>
				<AiOutlinePlus onClick ={addHistogramPlot} size='25px' />
				<AiOutlineInfo size='25px' />
				
			</div>
			</div>
			</div>
			
			
			<div>
			<div style={{border:"solid", borderColor:"#29b6f6"}}>
				<div className = 'binaryPlots' style={{margin:"20px"}}>
			<BinaryPlot onGetLegendSize={() =>{return legendSize_Binary}} onPassZoomMode={PassZoomMode} onPassZoomInBinaryPlot ={PassZoomInBinaryPlot} onGetEssentialVariable = {()=>{return initialBinaryEssentialVariable }} onGetInitialYAxis = {() =>{ return initialBinaryYAxis }} onGetInitialXAxis = {() =>{return initialBinaryXAxis }}  onGetSide={() =>{return binarySide }} onGetData = {getData} onGetEssentialVariable = {getEssentialVariable}/>
			{binary}
			</div>
			<AiOutlinePlus onClick={addBinaryPlot} size ='25px' />
			<AiOutlineInfo size='25px'/>
			</div>
			</div>

			</div>
			<div className='detailPlot2' >
				<div style={{border:"solid", borderColor:"#29b6f6",marginTop:"30px",marginLeft:"35px"}}>
					<div className = 'ternaryPlots' style={{margin:"20px"}}>
			<TernaryPlot onGetLegendSize={() =>{return legendSize_Ternary }} onPassZoomMode = {PassZoomMode} onPassZoomInTernaryPlot= {PassZoomInTernaryPlot} onGetSide = {() => {return ternarySide} } onGetData = {getData} onGetTernaryVariable = {getTernaryVariable}/>
			{ternary}
			</div>
			<AiOutlinePlus onClick = {addTernaryPlot} size = '25px' />
			<AiOutlineInfo size = '25px'/>
			<div>
					
				</div>
			</div>
			<div style={{border:"solid", borderColor:"#29b6f6", mariginBottom:"20px",paddingLeft:"45px",marginTop:"30px",marginRight:"30px"}}>
				{/* <div>
					<DropDownForSunBurst  onPassSunBurstDataVariable= {PassSunBurstDataVariable} />
					
				</div> */}
				<div className = 'sunBurstPlots'>
				
				<NestedPieChart onPassZoomMode ={PassZoomMode} onPassZoomInSunBurstPlot = {PassZoomInSunBurstPlot} onGetSide = {() =>{return sunBurstSide}} onGetSunBurstVariable = {getSunBurstVariable} onGetSunBurstDataVariable = {getSunBurstDataVariable} onGetData={getData} />
				{sunBurst}
				</div>
				<div className = 'a'>
			<AiOutlinePlus onClick = {addSunBurstPlot} size='25px'/>
			<AiOutlineInfo size='25px'/>	
		</div>
			</div>

			</div>
		<div className = 'detailPlot3'>
		
		<div style={{ marginTop:"20px"}}>
				<div style={{border:"solid", borderColor:"#29b6f6",marginLeft:"0px",marginTop:"15px",padding:"20px"}}>
					<div  className = 'sunBurstPlots' >
				<BoxPlot onPassZoomMode={PassZoomMode} onGetSide = {() => {return boxPlotSide}} onGetData = {getData} />
				{boxPlot}
			</div>
				<div className = 'a'>
			<AiOutlinePlus onClick = {addBoxPlot} size='25px'/>
			<AiOutlineInfo size='25px'/>	
		</div>
			</div>	
		</div>
			
		
				<div className = 'barChart' >
				<div >
				<div style={{border:"solid", borderColor:"#29b6f6",marginTop:"-20px",marginLeft:"-25px",paddingRight:"10px"}}>
					<div  className = 'sunBurstPlots' style={{margin:"20px"}}>
			<BarChart onPassZoomMode = {PassZoomMode} onGetSide =  { () => {return barChartSide} }  />
			{barChart}
		</div>
			<div className = 'a'>
			<AiOutlinePlus onClick = {addBarChartPlot} size='25px'/>
			<AiOutlineInfo size='25px'/>	
		</div>
				</div>
				</div>
				</div>
				
				
		</div>

		
		

		</div>
			):(<div> 
				<div>
				{zoomInPlot}
				</div>
				<div>
					<MdArrowBack onClick={back} size='25px'/>
				</div>
			 </div>)}
		</div>

	);
}

export default DetailPlots