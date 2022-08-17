import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';

const Essentials = ['main_type','volc_name','glassy_type']

const DropDownForPie = (props) => {
	const [time,setTime] = useState(0);


	var data;
	var f;
	function handleChange(a){
	}

	try{
		
		handleChange = function(a){
			props.onPassPieChartVariable(a);
		}
		data = Essentials;
		f = 'volc_name'
	}
	catch(error){

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


export default DropDownForPie;