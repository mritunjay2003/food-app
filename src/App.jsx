
import { Route, Router, Routes } from 'react-router-dom';
import Banner from './component/Banner'
import FoodCards from './component/FoodCards'
import Navbar from './component/Navbar'
import LoginForm from './component/LoginForm';
import SignUpForm from './component/SignUpForm';
import Dashboard from './admin/Dashboard';
import ProductForm from './admin/ProductForm'
import CategoryForm from './admin/CategoryForm';
import Home from './component/Home';
import Cart from './component/CartItem';
import CheckoutPage from './component/CheckoutPage';
import Captcha from './component/Captcha';





function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/products' element={<ProductForm />} />
        <Route path='/category' element={<CategoryForm />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/captcha' element={<Captcha />} />


      </Routes>

    </>
  )
}

export default App
