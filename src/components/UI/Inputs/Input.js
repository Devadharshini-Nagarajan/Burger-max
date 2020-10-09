import React from 'react'
import classes from './Input.css'

function Input(props) {
    let inputElement=null
    const inputClass = [];
    if(props.invalid) {
        inputClass.push(classes.Invalid)
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input {...props.elementConfig} className={inputClass.join(' ')} onChange={props.changed} value={props.value} />
            break;
        case('textarea'):
            inputElement = <textarea {...props.elementConfig} className={inputClass.join(' ')} onChange={props.changed} value={props.value} />
            break;
        case('select'):
            inputElement = <select className={inputClass.join(' ')} onChange={props.changed} value={props.value} >
                {props.elementConfig.options.map(el => (
                <option value={el.vale} key={el.value}>{el.display}</option>))}</select>
            break;
        default:
            inputElement = <input {...props.elementConfig} className={inputClass.join(' ')} onChange={props.changed} value={props.value} />
    }
    return (
        <div style={{marginBottom: "10px",
        }}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
