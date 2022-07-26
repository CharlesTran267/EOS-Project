import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';


const DropDownBar = (props) => {
	const [time,setTime] = useState(0);


	var data;
	var f;
	function handleChange(a){
	}


	
	try{
	data = props.onGetVariableData();
	if(time === 0){
		try{
			props.onPassVariableForX('red_std');
			f = props.onGetInitialData()[0];
		      }      
		catch(error){
			props.onPassVariableForY('blue_std');
			f = props.onGetInitialData()[1];
		}
		setTime(1);
	}
	else{
		handleChange = function (a){
			try{
				props.onPassVariableForX(a);
			      }      
			catch(error){
				props.onPassVariableForY(a);
			}
		}
	 }
	}
	catch(error){
		f = 'red_std';
		handleChange = function(a){
			props.onPassHistogramVariable(a)
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


export default DropDownBar;