import styled from "styled-components"
import BunchOfClouds from "../components/BunchOfClouds"

const Homepage = () => {

    return <div className="pages" style={{overflowX: "hidden"}}>
        <h2>Welcome to the</h2>
        <h1>Doodle Board</h1>
        <StyledHomepageRules>
            <h2>Make sure you read these simple rules before making an account!</h2>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-break: keep-all;
    width: 100%;
    max-width: 75dvw;
    margin: 2rem auto;
    padding: 2rem;
    text-align: center;
`