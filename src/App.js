import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/home';
import Products from './Components/products';
import ProductViewPage from './Components/productView';
import Account from './Components/account';
import Orders from './Components/order';
import Cart from './Components/cart';
import About from './Components/about';
import Login from './Components/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' Component={Home}></Route>
        <Route path = '/Products/:category' Component={Products}></Route>
        <Route path = '/Products/:category/:id' Component={ProductViewPage}></Route>
        <Route path = '/Account' Component={Account}></Route>
        <Route path = '/Orders' Component={Orders}></Route>
        <Route path = '/Cart' Component={Cart}></Route>
        <Route path = '/About' Component={About}></Route>
        <Route path = '/Login' Component={Login}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
