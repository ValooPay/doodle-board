import ReactDOM from "react-dom/client";
import App from "./App";
import AllUsersProvider from "./contexts/UsersContext";
import UserLoginProvider from "./contexts/UserLogInContext";
import AllPostsProvider from "./contexts/AllPostsContext";
import UserSpecificPostsProvider from "./contexts/UserSpecificPostsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllUsersProvider>
        <AllPostsProvider>
            <UserLoginProvider>
                <UserSpecificPostsProvider>
                    <App />
                </UserSpecificPostsProvider>
            </UserLoginProvider>
        </AllPostsProvider>
    </AllUsersProvider>
)