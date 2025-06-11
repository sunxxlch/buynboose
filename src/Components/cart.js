import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faSignInAlt, faInfoCircle, faHome, faShoppingCart, faDatabase, faUserAlt ,faShippingFast} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/authSlice';


function CartView() {
    const [menuOpen, setMenuOpen] = useState(false);
    const username = useSelector((state) => state.auth.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState("NA");
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        let products = [{ id: 13, brand: 'McDowell’s No.1', type: 'Platinum', price: '800Rs', category: 'Whiskey', quantity: '3' },
        { id: 21, brand: 'Sula', type: 'Red Zinfandel', price: '1200Rs', category: 'Wine', quantity: '2' }];

        if (localStorage.getItem("cartItems")) {
            console.log("added cart");
            products = JSON.parse(localStorage.getItem("cartItems")) || [];
        }
        setCartItems(products);
    }, []);

    const increment = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && Number(item.quantity) < 10
                    ? { ...item, quantity: Number(item.quantity) + 1 }
                    : item
            )
        );
    };

    const decrement = (id) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) => {
                    if (item.id === id) {
                        if (item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            return remove(id);
                        }
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const remove = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            const quantity = Number(item.quantity);
            const price = Number(item.price.replace(/Rs/i, '').trim());
            return acc + quantity * price;
        }, 0);

        const charges = price < 2000 ? price / 10 : 0;

        const amount = discount === "NA" ? total + charges : total + charges - discount;

        setPrice(total);
        setDeliveryCharges(charges);
        setTotalPrice(amount);
    }, [cartItems])

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
        <div className='product-view'>
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
            </div>
            <div className="cart-container" style={{ paddingTop: '80px' }}>
                <div className="cart-container-left">
                    <ul>
                        {cartItems.map((item, index) => (
                            <div key={index}>
                                <div className="cartview">
                                    <div className="cart-img">
                                        <img src="/whiskey.png" alt="cart-item" />
                                    </div>
                                    <div className="cart-content">
                                        <p>{item.brand}</p>
                                        <p>{item.price}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <h3 onClick={() => decrement(item.id)} style={{ cursor: 'pointer' }}>-</h3>
                                        <h3 >{item.quantity}</h3>
                                        <h3 onClick={() => increment(item.id)} style={{ cursor: 'pointer' }}>+</h3>
                                    </div>
                                    <button className="remove" style={{ cursor: 'pointer' }} onClick={() => remove(item.id)} >Remove</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="cart-container-right">
                    <h2>Subtotal</h2>
                    <h3>Price : {price} INR</h3>
                    <h3>Delivery charges : {deliveryCharges > 0 ? deliveryCharges : "NA"} </h3>
                    <h3>Discount : {discount} </h3>
                    <h3>Total Price : {totalPrice} </h3>
                    <button className="checkout">Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CartView;