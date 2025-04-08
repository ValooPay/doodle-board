import styled from "styled-components"
import BunchOfClouds from "../components/BunchOfClouds"

const Homepage = () => {

    return <div className="pages" style={{display: "flex", justifyContent: "center", overflowX: "hidden"}}>
        <h2>Welcome to the</h2>
        <h1>Doodle Board</h1>
        <StyledHomepageRules>
            <h2 style={{maxWidth: "50vw"}}>Make sure you read these simple rules before making an account!</h2>
            <ul className="homepageRules">
                <li>Be respectful to one another.</li>
                <li>Keep things pretty SFW!</li>
                <li>Let your creativity flow and have fun!</li>
            </ul>
        </StyledHomepageRules>
        <BunchOfClouds />
    </div>
}

export default Homepage

const StyledHomepageRules = styled.div`
    width: 100%;
    max-width: 100dvw;
    margin: 2rem auto;
    padding: 2rem;
    h3{
        font-size: 2rem;
        font-weight: bold;
    }
`