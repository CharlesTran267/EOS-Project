import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';

const Essentials = ['Overview','Compare']

const DropDownForHistogramCompare = (props) => {
	const [time,setTime] = useState(0);


	var data;
	var f;
	function handleChange(a){
	}


	
		data =['Pinatubo', 'Taal', 'Alid', 'Toba', 'Kelut','Soufrière Guadeloupe']
	
		try{
			props.onPassVolcToCompare1('Toba');
			f = 'Toba';
		      }      
		catch(error){
			props.onPassVolcToCompare2('Soufrière Guadeloupe');
			f = 'Soufrière Guadeloupe';
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


export default DropDownForHistogramCompare;