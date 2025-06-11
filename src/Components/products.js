import React, { useState, useEffect, useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faSignInAlt, faInfoCircle, faHome, faShoppingCart, faDatabase, faUserAlt, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { productsData } from './productData';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

function ProductPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const username = useSelector((state) => state.auth.username);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { category } = useParams();
    const [filteredData, setFilteredData] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [isPending, startTransition] = useTransition();



    useEffect(() => {
        const result = productsData.filter(item => item.category.toLowerCase() === category.toLowerCase());
        setFilteredData(result);
        setData(result);
    }, [category]);

    useEffect(() => {
        let filtered = data;

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(item => selectedBrands.includes(item.brand));
        }

        if (selectedTypes.length > 0) {
            filtered = filtered.filter(item => selectedTypes.includes(item.type));
        }

        if (selectedPrices.length > 0) {
            filtered = filtered.filter(item => {
                const price = parseInt(item.price);

                return selectedPrices.some(range => {
                    if (range === '0<500Rs') return price < 500;
                    if (range === '500Rs-1000Rs') return price >= 500 && price <= 1000;
                    if (range === '1000Rs<') return price > 1000;
                    return false;
                });
            });
        }

        setFilteredData(filtered);
    }, [selectedBrands, selectedTypes, selectedPrices, data]);


    const toggleSelection = (item, selectedList, setSelectedList) => {
        if (selectedList.includes(item)) {
            setSelectedList(selectedList.filter(i => i !== item));
        } else {
            setSelectedList([...selectedList, item]);
        }
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

    const handleSearch = (e) => {
        let filtered = data;
        startTransition(() => {
            filtered = filtered.filter((item) => item.brand.toLowerCase().includes(e.toLowerCase()))
            setFilteredData(filtered);
        });
    }

    const handleProductNavigation = (id) => {
        navigate(`/products/${category}/${id}`);
    }

    return (
        <div className='products'>
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
                <div className='products-container'>
                    <div className='products-list'>
                        {isPending && <p style={{ color: 'gray' }}>Updating list...</p>}
                        {filteredData.map((item, index) => (
                            <div key={index} className='product-card' onClick={() => handleProductNavigation(item.id)}>
                                <h2 style={{ color: 'brown' }}>{item.brand}</h2>
                                <p>Type: {item.type}</p>
                                <p>Price: {item.price}</p>
                                <p>Category: {item.category}</p>
                            </div>
                        ))}
                    </div>
                    <div className='filters-list'>
                        <div className='search'>
                            <input
                                className='searchBar'
                                placeholder='Search Brands Here'
                                onChange={e => handleSearch(e.target.value)}
                            />
                        </div>
                        <div className='filters'>
                            <ul className='brand-filter' style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <h3>Brands</h3>
                                {[...new Set(data.map(item => item.brand))].map((brand, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                                            />
                                            {brand}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <ul className='type-filter' style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <h3>Types</h3>
                                {[...new Set(data.map(item => item.type))].map((type, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                                            />
                                            {type}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <ul className='price-filter' style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <h3>Price</h3>
                                {['0<500Rs', '500Rs-1000Rs', '1000Rs<'].map((priceRange, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedPrices.includes(priceRange)}
                                                onChange={() => toggleSelection(priceRange, selectedPrices, setSelectedPrices)}
                                            />
                                            {priceRange}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="clear-filters"
                                onClick={() => {
                                    setSelectedBrands([]);
                                    setSelectedTypes([]);
                                    setSelectedPrices([]);
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;