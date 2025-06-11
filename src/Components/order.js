import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faSignInAlt, faInfoCircle, faUserAlt, faGlassCheers, faDatabase, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { ordersData } from './productData';

function OrderHistory() {
    const [menuOpen, setMenuOpen] = useState(false);
    const username = useSelector((state) => state.auth.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderedData, setOrderedData] = useState([]);
    const suggestedData = ["black dog", "Kingfisger", "Sula", "dewars", "Blenders Pride"];

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        const result = ordersData.sort((i) => i.orderId).reverse();
        setOrderedData(result);
    }, [orderedData, isAuthenticated])

    const handleAccount = () => {
        navigate("/Account");
    }

    const handleOrders = () => {
        navigate("/Orders");
    }

    const handleHome = () => {
        navigate("/");
    }

    const handleCart = () => {
        navigate("/Cart");
    }

    const handleAbout = () => {
        navigate("/About");
    }

    const handleSignIn = () => {
        navigate("/Login");
    }

    const handleSignout = () => {
        dispatch(logout());
        localStorage.removeItem("auth");
        window.location.reload();
    }

    return (
        <div className='home'>
            <div className='header'>
                <button className='menu-btn' onClick={() => setMenuOpen(!menuOpen)}><FontAwesomeIcon icon={faGlassCheers} />
                    {isAuthenticated && (
                        <a style={{ fontSize: '20px', paddingLeft: '10px' }}>{username.toUpperCase()}</a>
                    )}
                </button>
                <p className='header-logo' >Buy'n Boose</p>
                {isAuthenticated && (
                    <button className='shipping-icon'>
                        <FontAwesomeIcon icon={faShippingFast} />
                        <a style={{ fontSize: "20px", fontWeight: "bold", marginRight: "10px", marginTop: "0px" }}>Track</a>
                    </button>
                )}
            </div>
            <div className={`main-content ${menuOpen ? 'shifted' : ''}`}>
                <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        {isAuthenticated ?
                            (
                                <>
                                    <li onClick={handleAccount}><FontAwesomeIcon icon={faUserAlt} /> Account</li>
                                    <li onClick={handleOrders}><FontAwesomeIcon icon={faDatabase} /> Orders</li>
                                </>)
                            :
                            ''
                        }
                        <li onClick={handleHome}><FontAwesomeIcon icon={faHome} /> Home</li>
                        <li onClick={handleCart}><FontAwesomeIcon icon={faShoppingCart} /> Cart</li>
                        <li onClick={handleAbout}><FontAwesomeIcon icon={faInfoCircle} /> About</li>
                        {isAuthenticated ?
                            <li onClick={handleSignout}><FontAwesomeIcon icon={faSignInAlt} /> Sign Out</li>
                            :
                            <li onClick={handleSignIn}><FontAwesomeIcon icon={faSignInAlt} /> Sign In</li>
                        }
                    </ul>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className={`Orders ${menuOpen ? 'shifted' : ''}`}>
                        {ordersData.map((item, index) => (
                            <div key={index} className="order-card">
                                <div className="order-left">
                                    <div className="order-top-row">
                                        <p style={{ fontWeight: "bold" }}>Order ID: {item.orderId}</p>
                                        <p style={{ fontWeight: "bold" }}>Status: <a style={{ color: item.status === 'Delivered' ? "green" : "red" }}>{item.status}</a></p>
                                    </div>
                                    <div className="order-info">
                                        <span>Address: {item.address}</span>
                                        <span style={{ marginLeft: '55px' }}>Products: {item.products.length}</span>
                                    </div>
                                    <div className="order-bottom-row">
                                        <p>Price: {item.subtotal.price}</p>
                                        <p>Payment: {item.paymentType}</p>
                                    </div>
                                </div>

                                <div className="order-right">
                                    <img src="whiskey.png" alt="Order" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='suggestions'>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <a>Fast Selling</a>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {suggestedData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OrderHistory;