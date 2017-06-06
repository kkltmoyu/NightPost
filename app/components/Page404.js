import React, { Component } from "react"
import { render } from 'react-dom'

export default class Page404 extends Component {
    render() {
        return ( 
            <div className = "page404" style = {{ "textAlign": "center", "marginTop": "150px", "color": "#108ee9" }} >
                <div style = {{ "fontSize": "80px" }}> 
                    404 无法找到该页面
                </div>
            </div>
        )
    }
}
