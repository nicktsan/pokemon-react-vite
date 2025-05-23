// import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

function LoginButton() {
    const auth = useAuth();
    const handleLogin = () => {
        console.log("Login button clicked");
        auth.loginAction({
            username: "username_string",
            password: "password_string"
        });
        return;
    };

    if (auth?.accessToken) {
        return (
            <div className="container">
                <div>
                    <h1>Welcome! {auth.accessToken}</h1>
                    <button onClick={() => auth.logOut()} className="btn-submit">
                        logout
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginButton;