import React from "react"
import styled from "styled-components";
import { FaPaintBrush } from "react-icons/fa";
import { BsFillEraserFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity, setToDraw, setToErase, brushStatus, eraserStatus, clearCanvas }) => {

    return (
        <div className="menu">
            <label>Color
                <input className="colorInput" type="color" onChange={(ev) => {setLineColor(ev.target.value)}} />
            </label>
            <label>Brush Width
                <input type="range" min="1" max="50" onChange={(ev) => {setLineWidth(ev.target.value)}} />
            </label>
            <label>Brush Opacity
                <input type="range" min="1" max="100" onChange={(ev) => {setLineOpacity(ev.target.value / 100)}} />
            </label>
            <div style={{display: "flex"}}>
                <label> Brush
                    <button className="menuButtons" onClick={setToDraw} disabled={brushStatus}><FaPaintBrush /> </button>
                </label>
                <label>Eraser
                    <button className="menuButtons" onClick={setToErase} disabled={eraserStatus}><BsFillEraserFill /> </button>
                </label>
                <label>Clear canvas
                    <button onClick={clearCanvas}><FaTrashAlt /></button>
                </label>
            </div>
        </div>
    )
}

export default Menu

const StyledTools = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 50%;
`

// vertical slider style={{appearance: "slider-vertical"}}