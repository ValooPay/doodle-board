import ReactDOM from "react-dom/client";
import App from "./App";
import AllUsersProvider from "./contexts/UsersContext";
import UserLoginProvider from "./contexts/UserLogInContext";
import AllPostsProvider from "./contexts/AllPostsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllUsersProvider>
        <UserLoginProvider>
            <AllPostsProvider>
                <App />
            </AllPostsProvider>
        </UserLoginProvider>
    </AllUsersProvider>
)