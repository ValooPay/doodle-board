import React from "react"
import CreateNewDrawing from "../pages/CreateNewDrawing"

const Menu = ({setLineColor, setLineWidth, setLineOpacity}) => {
    return (
        <div className="menu">
            <label>Brush color</label>
            <input type="color" onChange={(ev) => {setLineColor(ev.target.value)}} />
            <label>Brush Width</label>
            <input type="range" min="3" max="20" onChange={(ev) => {setLineWidth(ev.target.value)}} />
            <label>Brush Opacity</label>
            <input type="range" min="1" max="100" onChange={(ev) => {setLineOpacity(ev.target.value / 100)}} />
        </div>
    )
}

export default Menu