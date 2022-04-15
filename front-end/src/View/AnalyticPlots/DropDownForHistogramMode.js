import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';

const Essentials = ['Overview','Compare']

const DropDownForHistogramMode = (props) => {
	const [time,setTime] = useState(0);


	var data;
	var f;
	function handleChange(a){
	}

	try{
		
		handleChange = function(a){
			props.onPassHistogramMode(a);
		}
		data = Essentials;
		f = 'Overview'
	}
	catch(error){
	
		data =['Pinatubo', 'Taal', 'Alid', 'Toba', 'Kelut']

		try{
			props.onPassVolcToCompare1('Pinatubo');
			f = 'Pinatubo';
		      }      
		catch(error){
			props.onPassVolcToCompare2('Taal');
			f = 'Taal';
		}

		handleChange = function (a){
			try{
				props.onPassVolcToComapre1(a);
				f = a;
			      }      
			catch(error){
				props.onPassVolcToCompare2(a);
				f = a;
			}
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


export default DropDownForHistogramMode;