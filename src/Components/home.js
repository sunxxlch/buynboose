import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faSignInAlt, faInfoCircle, faUserAlt, faGlassCheers, faDatabase, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';


function DesktopView() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const boxRef = useRef(null);
    const username = useSelector((state) => state.auth.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(isAuthenticated);
        console.log(username);
    }, [username, isAuthenticated]);

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

    const redirectProducts = (type) => {
        navigate(`/Products/${type}`);
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
                        <a style={{fontSize:"20px", fontWeight:"bold", marginRight:"10px", marginTop:"0px"}}>Track</a>
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
                <div className='container'>
                    <div className='beer-container'>
                        <div className='beer-left'>
                            <img src='Glass.png' alt='glass' className='glass-logo'></img>
                            <img src='beerRoller.png' alt='beer-roller' className='beer-logo'></img>
                        </div>
                        <div className='beer-right'>
                            <button className='buy-beer' onClick={() => redirectProducts("Beer")}> Beer Menu !</button>
                            <p>Beer is one of the oldest and most widely enjoyed alcoholic beverages in the world,
                                with a rich history dating back thousands of years. Brewed from a blend of water,
                                malted barley, hops, and yeast, it has evolved into a diverse range of styles,
                                from light and refreshing lagers to bold stouts and hop-forward IPAs.
                                Across cultures and continents, beer has played an important role in social gatherings,
                                culinary traditions, and even religious ceremonies. In recent decades,
                                the rise of craft brewing has transformed beer into a canvas for creativity and innovation,
                                with small breweries experimenting with unique ingredients and brewing techniques. </p>
                            <p>Today, beer is not just a drink — it's a global symbol of tradition, community, and craftsmanship.</p>
                        </div>
                    </div>
                </div>
                <div className='whiskey-container'>
                    <div className='whiskey-right'>
                        <button className='buy-whiskey' onClick={() => redirectProducts("Whiskey")}>Whiskey Menu!</button>
                        <p>
                            Whiskey is a distilled alcoholic beverage made from fermented grain mash and aged in wooden casks.
                            Known for its rich flavor and deep aroma, whiskey is often enjoyed straight, on the rocks,
                            or in classic cocktails. It carries cultural heritage from Scotland, Ireland, and the U.S.,
                            each offering their own unique styles. The aging process imparts complex flavors and character,
                            making each bottle a story in itself.
                        </p>
                    </div>
                    <div className='whiskey-left'>
                        <img src='whiskey.png' alt='whiskey-bottle' className='whiskey-logo' />
                    </div>
                </div>
                <div className='wine-container'>
                    <div ref={boxRef} className='wine-left' >
                        <img src='wine.png' alt='wine-logo' className='wine-logo' />
                    </div>
                    <div className='wine-right'>
                        <button className='buy-wine' onClick={() => redirectProducts("Wine")}> Wine Menu ! </button>
                        <p>
                            Wine has been cherished for centuries as a symbol of sophistication, culture, and celebration.
                            Made from fermented grapes or other fruits, it ranges in style from bold reds to crisp whites and sparkling varieties.
                            Regions across the globe boast unique wine-making traditions, offering flavors shaped by local climates and soil.
                            Wine plays a significant role in many cuisines, elevating meals and enhancing social gatherings.
                            Whether enjoyed casually or savored during fine dining, wine reflects both tradition and personal taste.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesktopView;