import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';

const Essentials = ['Overview','Compare']

const DropDownForHistogramCompareEruptive = (props) => {
	const [time,setTime] = useState(0);
	const [time1,setTime1] = useState(0);

	var data;
	var f;
	function handleChange(a){
	}

	
		
		data =["Lava fountaining", "Plinian","Phreatic", "Subplinian", "Dome explosion"]
	if(time1 ===0 )	{
		try{
			props.onPassVolcToCompare1('Lava fountaining');
			f = 'Lava fountaining';
		      }      
		catch(error){
			props.onPassVolcToCompare2('Plinian');
			f = 'Plinian';
		}

		setTime1(1)
		
	}


		handleChange = function (a){
			try{
				props.onPassVolcToCompare1(a);
				f = a;
			      }      
			catch(error){
				props.onPassVolcToCompare2(a);
				f = a;
			}
		}
		
	
	
	const [title,setTitle] = useState(f);

	function ChooseVariable (x) {
		setTitle(x);
	}

	

	function mapping(x){



		return (<Menu.Item >
			<a target="_blank" onClick = {() => {ChooseVariable(x)
				handleChange(x);
			}} >
		  		{x}
			</a>
	      		</Menu.Item> );
	}


	const menu = (
		<Menu >	
		  {data.map(x => mapping(x))}
		</Menu>
	      );


	return(
	<div class = 'dropdown'>
		<Dropdown  overlay={menu} placement="bottomCenter" arrow>
      		<Button >{title}</Button>
    		</Dropdown>
	</div>
	);
	
}


export default DropDownForHistogramCompareEruptive;