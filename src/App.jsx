import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Sale from "./pages/Sale.jsx";
import Cart from "./pages/user/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Contacto from "./pages/Contacto.jsx";
import Terminos from "./pages/Terminos.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Search from "./pages/Search.jsx";
import Perfil from "./pages/user/Perfil.jsx";
import PerfilEdit from "./pages/user/PerfilEditView.jsx";
import NewPassword from "./pages/user/NewPassword.jsx";
import Orders from "./pages/user/Orders.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import SellerHome from "./pages/seller/SellerHome.jsx";
import SellerStock from "./pages/seller/SellerStock.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import Users from "./pages/admin/Users.jsx";
import ProductsSeller from "./pages/seller/ProductsSeller.jsx";
import NewProduct from "./pages/seller/NewProduct.jsx";
import EditProduct from "./pages/seller/EditProduct.jsx";

import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute, SellerRoute, AuthenticatedRoute, GuestRoute } from "./components/routing";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./store/userSlice";
import { loadCartFromServer, syncGuestCartToServer, setCartItems } from "./store/cartSlice";

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            if (user.rol === 'SELLER' || user.rol === 'ADMIN') {
                dispatch(setCartItems([]));
                return;
            }

            if (cartItems.length > 0) {
                 dispatch(syncGuestCartToServer(cartItems));
            } else {
                dispatch(loadCartFromServer());
            }
        } else {
             dispatch(setCartItems([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
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
            </main>
            <Footer />
        </div>
    );
}

export default App;