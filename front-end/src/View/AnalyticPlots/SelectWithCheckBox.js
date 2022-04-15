import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { useState } from "react";

const data = [
{value:'1', label:"blue_mean"},
{value:'2',label:"blue_mode"},
{value:'3',label:"blue_std"},
{value:'4',label:"circ_rect"},
{value:'5',label:"circularity"},
{value:'6',label:"comp_elon"},
{value:'7',label:"compactness"},
{value:'8',label:"contrast"},
{value:'9',label:"convexity"},
{value:'10',label:"correlation"},
{value:'11',label:"crystallinity"},
{value:'12',label:"dissimilarity"},
{value:'13',label:"eccentricity_ellipse"},
{value:'14',label:"eccentricity_moments"},
{value:'15',label:"elongation"},
{value:'16',label:"energy"},
{value:'17',label:"green_mean"},
{value:'18',label:"green_mode"},
{value:'19',label:"green_std"},
{value:'20',label:"homogeneity"},
{value:'21',label:"rect_comp"},
{value:'22',label:"rectangularity"},
{value:'23',label:"red_mean"},
{value:'24',label:"red_mode"},
{value:'25',label:"red_std"},
{value:'26',label:"roundness"},
]

const d =[
  {value:'1',label:'lithics'},
  {value:'2',label:'juvenile'},
  {value:'3',label:'free crystal'},
  {value:'4',label:'undefied'}
]



const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class Selection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
 }


  handleChange = (selected) => {
    this.state.optionSelected = selected;
    this.props.onPassTernaryVariable(this.state.optionSelected)

  };



  render() {
    return (
      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={data}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}