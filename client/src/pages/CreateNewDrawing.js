import { useEffect, useRef, useState, useContext} from "react"
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu"
import { UserLoginContext } from "../contexts/UserLogInContext";
import { AllPostsContext } from "../contexts/AllPostsContext";

const CreateNewDrawing = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    const [postingStatus, setPostingStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState(null);
    const [brushStatus, setBrushStatus] = useState(true);
    const [eraserStatus, setEraserStatus] = useState(false);
    const { userLogin } = useContext(UserLoginContext);
    const { setRefetch } = useContext(AllPostsContext);
    const navigate = useNavigate();


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);
    
    ///// Function when mouse is held down and person is drawing
    const startDrawing = (ev) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            ev.nativeEvent.offsetX,
            ev.nativeEvent.offsetY
        )
        setIsDrawing(true);
    }

    ///// Function when not drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    ///// Function when moving mouse
    const draw = (ev) => {
        if(!isDrawing) {
            return;
        }
        ctxRef.current.lineTo(
            ev.nativeEvent.offsetX,
            ev.nativeEvent.offsetY
        );
        ctxRef.current.stroke();
    }


    // BUTTONS
    ///// Button function for saving drawing (in the app) & pushing to the backend
    const finishDrawing = (ev) => {
        ev.preventDefault()
        const canvas = canvasRef.current;
        const img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
        const body = JSON.stringify({user_id: userLogin._id, username: userLogin.username, img})
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch("/newPost", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status !== 200 || userLogin === null){
                setPostingStatus("idle")
                throw new Error(data.message)
            }
            else{
                setErrorMessage(null)
                setPostingStatus("idle")
                setRefetch((fetch) => fetch + 1)
                navigate(`/managedoodles/${userLogin._id}`)
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    ///// Button to switch to drawing/brush
    const setToDraw = () => {
        ctxRef.current.globalCompositeOperation = "source-over";
        setBrushStatus(true)
        setEraserStatus(false)
    }

    ///// Button to switch to erasing
    const setToErase = () => {
        ctxRef.current.globalCompositeOperation = "destination-out";
        setEraserStatus(true)
        setBrushStatus(false)
    }

    ///// Button to clear the entire canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return (
        <div className="pages" style={{margin: "0 auto"}}>
            <div className="drawingApp">
                <Menu 
                setLineColor={setLineColor} 
                setLineWidth={setLineWidth} 
                setLineOpacity={setLineOpacity} 
                setToDraw={setToDraw} 
                setToErase={setToErase} 
                brushStatus={brushStatus}
                eraserStatus={eraserStatus}
                clearCanvas={clearCanvas}
                />
                <div className="draw-area">
                    <canvas onPointerDown={startDrawing} onPointerUp={endDrawing} onPointerMove={draw} ref={canvasRef} width={`1280px`} height={`720px`} />
                </div>
                <button onClick={finishDrawing} disabled={postingStatus !== "idle"} style={{width: "fit-content", margin: "1rem auto 0"}}>Finish drawing</button>
                {errorMessage === null ? <></> : <p>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default CreateNewDrawing