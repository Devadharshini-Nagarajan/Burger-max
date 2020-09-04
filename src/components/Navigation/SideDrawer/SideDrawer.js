import React from 'react'
import Navigationitems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

function SideDrawer(props) {
    return (
        <div className={classes.SideDrawer}>
            <div>Logo</div>
            <nav><Navigationitems /></nav>
        </div>
    )
}

export default SideDrawer
