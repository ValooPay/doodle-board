import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./Header"
import Homepage from "./pages/Homepage"
import NewAccount from "./pages/NewAccount"
import Posts from "./pages/Posts"
import CreateNewDrawing from "./pages/CreateNewDrawing"
import ManageDoodles from "./pages/ManageDoodles"
import ManageSingleDoodle from "./pages/ManageSingleDoodle"
import GlobalStyles from "./components/GlobalStyles"
import SinglePost from "./pages/SinglePost"

const App = () => {
    return (
    <Router>
        <GlobalStyles />
        <Header />
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/newAccount" element={<NewAccount />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:_id" element={<SinglePost />} />
            <Route path="/createdrawing/:_id" element={<CreateNewDrawing />} />
            <Route path="/managedoodles/:user_id" element={<ManageDoodles />} />
            <Route path="/managedoodles/:user_id/:_id" element={<ManageSingleDoodle />} />
        </Routes>
    </Router>
    )
}

export default App