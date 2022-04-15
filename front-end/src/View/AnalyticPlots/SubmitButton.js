import React from "react";
import {useState} from 'react'
const Button = (props) =>{

	
    function h(){
	    try{
	    	props.onSubmitVariable()
	    }
	    catch(error){
		props.onSubmitSunBurstVariable()
	    }
    }
	return (
	<div>
	<button onClick = {h} >Submit</button>
	</div>
	);
    }

    export default Button;