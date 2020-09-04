import React from 'react'
import classes from './Backdrop.css'

function Backdrop(props) {
    return (
        <div>
            { props.show ? <div className={classes.Backdrop}></div> : null }
        </div>
    )
}

export default Backdrop
