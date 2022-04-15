import React from 'react';
import { useState, useEffect } from 'react';
import Histogram from './Histogram';
import BinaryPlot from './BinaryPlot';
import TernaryPlot from './TernaryPlot';
import Selection from './SelectWithCheckBox'
import DropDownBar from './DropDownForBinaryGraph';
import NestedPieChart from './NestedPieChart';
import DropDownForEssential from './DropDownForEssentialVariable';
import OverviewPieChart from './OverviewPieChart';
import DropDownForPie from './DropDownForPieChart'
import DropDownForHistogramMode from './DropDownForHistogramMode';
import DropDownForHistogramCompare from './DropDownForHistogramCompare';
import Button from './SubmitButton';
import SelectForSunBurst from './SelectWithCheckForSunBurst';
import SwitchBar from './SwitchBar';
import OverviewPlot from './OverviewPlot';
import DetailPlots from './DetailPLots';
import './NewDashBoardStyling.css'

const NewDashBoard = () =>{
	const[mode,setMode] = useState('Overview')

const PassMode = (a) =>{
	setMode(a)
}
	return(
		<div>
				<div>
					<SwitchBar onPassMode = {PassMode}/>
				
				</div>
			<div>
				<div>
					{mode === 'Overview' ? <OverviewPlot/> : <DetailPlots/>}
				</div>
				
			</div>
		</div>
	);
}

export default NewDashBoard