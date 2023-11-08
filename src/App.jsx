import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import MainLayout from './components/MainLayout'
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Enquiries from './pages/Enquiries';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ProductList from './pages/ProductList'
import CategoryList from './pages/CategoryList'
import BrandList from './pages/BrandList'
import ColorList from './pages/ColorList';
import AddBlogs from './pages/AddBlogs';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
import ViewEnq from './pages/ViewEnq';
import ViewOrderProduct from './pages/ViewOrderProduct';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/admin" element={<MainLayout/>}>
          <Route index element={<DashBoard/>}/>
          <Route path="blog-list" element={<BlogList/>}/>
          <Route path="coupon-list" element={<CouponList/>}/>
          <Route path="blog" element={<AddBlogs/>}/>
          <Route path="blog/:id" element={<AddBlogs/>}/>
          <Route path="coupon" element={<AddCoupon/>}/>
          <Route path="coupon/:id" element={<AddCoupon/>}/>
          <Route path="blog-category" element={<AddBlogCat/>}/>
          <Route path="blog-category/:id" element={<AddBlogCat/>}/>
          <Route path="blog-category-list" element={<BlogCatList/>}/>
          <Route path="enquiries" element={<Enquiries/>}/>
          <Route path="enquiry/:id" element={<ViewEnq/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="view-orders/:id" element={<ViewOrderProduct/>}/>
          <Route path="color" element={<AddColor/>}/>
          <Route path="color/:id" element={<AddColor/>}/>
          <Route path="customers" element={<Customers/>}/>
          <Route path="product-list" element={<ProductList/>}/>
          <Route path="product" element={<AddProduct/>}/>
          <Route path="product/:id" element={<AddProduct/>}/>
          <Route path="category-list" element={<CategoryList/>}/>
          <Route path="category" element={<AddCat/>}/>
          <Route path="category/:id" element={<AddCat/>}/>
          <Route path="brand-list" element={<BrandList/>}/>
          <Route path="brand" element={<AddBrand/>}/>
          <Route path="brand/:id" element={<AddBrand/>}/>
          <Route path="color-list" element={<ColorList/>}/>

        </Route>
          <Route path="/" element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
