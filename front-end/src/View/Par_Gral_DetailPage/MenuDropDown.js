import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';
import './DisplayPage.css'

	

const MenuDropDown = (props) => {

	const [choice,setChoice] = useState(0);
	const [title,setTitle] = useState("General");

	const ChooseGral = () => {
		setChoice(0);	
		setTitle("General");
		props.onChange('gral');
	}

	const ChoosePar = () => {
		setChoice(1);
		setTitle("Particle");
		props.onChange('par');
		
	}


	const menu = (
		<Menu >
		  <Menu.Item>
		    <a target="_blank" onClick = {ChoosePar} >
		      Particle
		    </a>
		  </Menu.Item>
		  <Menu.Item>
		    <a target="_blank" onClick = {ChooseGral} >
		      General
		    </a>
		  </Menu.Item>
		  
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



export default MenuDropDown;