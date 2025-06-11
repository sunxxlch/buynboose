import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/authSlice';

function AccountView() {
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated || username === null) {
            navigate("/login");
        }
    }, [isAuthenticated, username, navigate]);

    const handleSignout = () => {
        dispatch(logout());
        localStorage.removeItem("auth");
        window.location.reload();
    }

    return (
        <div>
            <p>Account: {username}</p>
        </div>
    );
}

export default AccountView;
