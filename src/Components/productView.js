import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faSignInAlt, faInfoCircle, faHome, faShoppingCart, faDatabase, faUserAlt, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/authSlice';

function ProductViewPage() {
    const { category, id } = useParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const username = useSelector((state) => state.auth.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        let productViewData = { id: 19, brand: 'Black Dog', type: 'Triple Gold Reserve', price: '1500Rs', category: 'Whiskey', image: '' };
        setProductData(productViewData);
    }, []);

    const increment = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    }

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    const addToBag = () => {
        let storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

        const productIndex = storedCart.findIndex(item => item.id === productData.id);

        if (productIndex >= 0) {
            storedCart[productIndex].quantity = (storedCart[productIndex].quantity || 1) + (quantity || 1);
        } else {
            storedCart.push({ ...productData, quantity: quantity || 1 });
        }
        setCartItems(storedCart);
        localStorage.setItem("cartItems", JSON.stringify(storedCart));
        navigate("/Cart");
    };

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
            <div className="product-container">
                <div className="product-container-left">
                    <img src='/whiskey.png' alt='image-bottle' className='product-container-img' />
                </div>
                <div className="product-container-right">
                    <h2 style={{ color: 'brown' }}>{productData.brand}</h2>
                    <h3 >Price: {productData.price}</h3>
                    <p>Type: {productData.type}</p>
                    <p>Category: {productData.category}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3 onClick={decrement} style={{ cursor: 'pointer' }}>-</h3>
                        <h3 >{quantity}</h3>
                        <h3 onClick={increment} style={{ cursor: 'pointer' }}>+</h3>
                    </div>
                    <button className="add-to-bag" style={{ cursor: 'pointer' }} onClick={() => addToBag()}>Add to Bag</button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewPage;