import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BunchOfClouds from "../components/BunchOfClouds"

const NewAccount = () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loginEmail, setLoginEmail ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ fetchingStatus, setFetchingStatus ] = useState("idle")
    const navigate = useNavigate()

    ///// Handle submit for signing up
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setFetchingStatus("signing up...")
        const body = JSON.stringify({username, password, email: loginEmail})
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch("/signup", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status !== 200){
                setFetchingStatus("idle")
                throw new Error(data.message)
            }
            else{
                setErrorMessage(null)
                setFetchingStatus("idle")
                navigate("/")
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }



    return <div className="pages">
        <StyledSignupForm>
            <h1>Sign up!</h1>
            <form onSubmit={handleSubmit} >
                <label className="signUpLabelsSpacing" htmlFor="usernameSignUpInput">Username: 
                    <input id="usernameSignUpInput" type="text" onChange={(ev) => {setUsername(ev.target.value)}}></input>
                </label>
                <label className="signUpLabelsSpacing" htmlFor="passwordSignUpInput">Password: 
                    <input id="passwordSignUpInput" type="password" onChange={(ev) => {setPassword(ev.target.value)}}></input>
                </label>
                <label className="signUpLabelsSpacing" htmlFor="emailSignUpInput">Email: 
                    <input id="emailSignUpInput" type="email" onChange={(ev) => {setLoginEmail(ev.target.value)}}></input>
                </label>
                <button disabled={fetchingStatus !== "idle"}>Sign up</button>
            </form>
            {errorMessage === null ? <></> : <>
                <div className="errorMessageLogin messageMove">{errorMessage}</div>
            </>}
            <h2>& have fun! <span>&#x2600;</span></h2>
        </StyledSignupForm>
        <BunchOfClouds />
    </div>
}

export default NewAccount

const StyledSignupForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    h1{
        z-index: 1;
        margin-bottom: 3rem;
    }
    h2{
        margin: 3rem 0;
    }
    form{
        margin: 0 auto;
        background-color: var(--color-honeydew);
        border: solid 2px var(--color-orange2);
        border-radius: 30px;
        padding: 1rem 1rem 2rem;
        z-index: 1;
    }
    input{
        margin: 0.5rem;
    }
    span{
        color: gold;
    }
    .messageMove{
        position: static;
        right: auto;
        margin: auto;
        border-radius: 20px;
        padding: 1.5rem;
    }
`