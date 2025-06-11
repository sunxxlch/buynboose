import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";


function LoginTo() {
    const dispatch = useDispatch();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const fakeResponse = {
            isAuthenticated: true,
            username: username,
            role: 'admin',
            accessToken: '12345abcde',
        };
        console.log("Logging in with:", fakeResponse);
        dispatch(login(fakeResponse));
        localStorage.setItem('auth', JSON.stringify(fakeResponse));
        navigate("/");
    }

    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)}>
                <input
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="username"
                    className="username"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="password"
                />
                <button className="submit" id="submit">SignIn</button>
            </form>
        </div>
    )
}

export default LoginTo;