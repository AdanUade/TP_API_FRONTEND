import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { ProtectedRoute, AdminRoute, SellerRoute, AuthenticatedRoute, GuestRoute } from "./components/routing";
import { refreshUser } from "./store/userSlice";
import CartSynchronizer from "./components/common/CartSynchronizer";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const Sale = lazy(() => import("./pages/Sale.jsx"));
const Cart = lazy(() => import("./pages/user/Cart.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));
const Terminos = lazy(() => import("./pages/Terminos.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Perfil = lazy(() => import("./pages/user/Perfil.jsx"));
const PerfilEdit = lazy(() => import("./pages/user/PerfilEditView.jsx"));
const NewPassword = lazy(() => import("./pages/user/NewPassword.jsx"));
const Orders = lazy(() => import("./pages/user/Orders.jsx"));
const Checkout = lazy(() => import("./pages/user/Checkout.jsx"));
const SellerHome = lazy(() => import("./pages/seller/SellerHome.jsx"));
const SellerStock = lazy(() => import("./pages/seller/SellerStock.jsx"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome.jsx"));
const Users = lazy(() => import("./pages/admin/Users.jsx"));
const ProductsSeller = lazy(() => import("./pages/seller/ProductsSeller.jsx"));
const NewProduct = lazy(() => import("./pages/seller/NewProduct.jsx"));
const EditProduct = lazy(() => import("./pages/seller/EditProduct.jsx"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />
            <CartSynchronizer />
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <Suspense fallback={<div className="flex justify-center py-10"><LoadingSpinner /></div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    <Route path="/category/:category" element={<Category />} />
                    <Route path="/sale" element={<Sale />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/contactos" element={<Contacto />} />
                    <Route path="/terminos" element={<Terminos />} />
                    <Route path="/search" element={<Search />} />

                    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                    <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

                    <Route 
                        path="/cart" 
                        element={
                            <ProtectedRoute 
                                requireAuth={false}
                                deniedRoles={['SELLER', 'ADMIN']}
                                redirectTo="/"
                            >
                                <Cart />
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="/perfil" 
                        element={
                            <AuthenticatedRoute>
                                <Perfil />
                            </AuthenticatedRoute>
                        } 
                    />
                    <Route 
                        path="/perfil/edit" 
                        element={
                            <AuthenticatedRoute>
                                <PerfilEdit />
                            </AuthenticatedRoute>
                        } 
                    />
                    <Route 
                        path="/perfil/change-password" 
                        element={
                            <AuthenticatedRoute>
                                <NewPassword />
                            </AuthenticatedRoute>
                        } 
                    />
                    <Route 
                        path="/perfil/orders" 
                        element={
                            <ProtectedRoute allowedRoles={['USER']}>
                                <Orders />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/checkout" 
                        element={
                            <AuthenticatedRoute>
                                <Checkout />
                            </AuthenticatedRoute>
                        } 
                    />

                    <Route 
                        path="/seller" 
                        element={
                            <SellerRoute>
                                <SellerHome />
                            </SellerRoute>
                        } 
                    />
                    <Route 
                        path="/seller/products/new" 
                        element={
                            <SellerRoute>
                                <NewProduct />
                            </SellerRoute>
                        } 
                    />

                    <Route 
                        path="/seller/products" 
                        element={<ProductsSeller />}
                    />
                    <Route 
                        path="/seller/products/edit/:productId" 
                        element={<EditProduct />}
                    />
                    <Route 
                        path="/seller/stock" 
                        element={
                            <SellerRoute>
                                <SellerStock />
                            </SellerRoute>
                        } 
                    />

                    <Route 
                        path="/admin" 
                        element={
                            <AdminRoute>
                                <AdminHome />
                            </AdminRoute>
                        } 
                    />
                    <Route 
                        path="/admin/users" 
                        element={
                            <AdminRoute>
                                <Users />
                            </AdminRoute>
                        } 
                    />
                    <Route 
                        path="/admin/products" 
                        element={
                            <AdminRoute>
                                <ProductsSeller />
                            </AdminRoute>
                        } 
                    />

                    

                    <Route 
                        path="*" 
                        element={
                            <div>
                                <h2 className="text-2xl font-bold mb-4">404 - Página no encontrada</h2>
                                <p>Lo sentimos, la página que buscas no existe.</p>
                            </div>
                        } 
                    />
                </Routes>
            </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default App;