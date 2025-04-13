import ReactDOM from "react-dom/client";
import App from "./App";
import AllUsersProvider from "./contexts/UsersContext";
import UserLoginProvider from "./contexts/UserLogInContext";
import AllPostsProvider from "./contexts/AllPostsContext";
import UserSpecificPostsProvider from "./contexts/UserSpecificPosts";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllUsersProvider>
        <UserLoginProvider>
            <AllPostsProvider>
                <UserSpecificPostsProvider>
                    <App />
                </UserSpecificPostsProvider>
            </AllPostsProvider>
        </UserLoginProvider>
    </AllUsersProvider>
)