import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./views/Home.jsx";
import Category from "./views/Category.jsx";
import Sale from "./views/Sale.jsx";
import Cart from "./views/user/Cart.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import Contacto from "./views/Contacto.jsx";
import Terminos from "./views/Terminos.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Search from "./views/Search.jsx";
import Perfil from "./views/user/Perfil.jsx";
import PerfilEdit from "./views/user/PerfilEditView.jsx";
import NewPassword from "./views/user/NewPassword.jsx";
import Orders from "./views/user/Orders.jsx";
import Checkout from "./views/user/Checkout.jsx";
import SellerHome from "./views/seller/SellerHome.jsx";
import SellerStock from "./views/seller/SellerStock.jsx";
import AdminHome from "./views/admin/AdminHome.jsx";
import Users from "./views/admin/Users.jsx";
import ProductsSeller from "./views/seller/ProductsSeller.jsx";
import NewProduct from "./views/seller/NewProduct.jsx";
import EditProduct from "./views/seller/EditProduct.jsx";

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
                 // If we have items and just logged in (or user changed), try to sync
                 // But be careful not to sync already synced items unnecessarily if this logic runs on every render.
                 // The original Context logic was:
                 /*
                  setCartItems(prevItems => {
                    if (prevItems.length > 0) {
                         syncGuestCartToServer(prevItems);
                    } else {
                         loadCartFromServer();
                    }
                     return prevItems;
                  });
                 */
                 // In Redux, we need to decide.
                 // If we just loaded the user, and we have items in "guest" cart (which is now in Redux store), sync them.
                 // We can check if we need to sync.

                 // However, calling syncGuestCartToServer triggers API calls.
                 // We should probably rely on a flag or just do it once when user becomes available.

                 // For now, mirroring the Context logic:
                 dispatch(syncGuestCartToServer(cartItems));
            } else {
                dispatch(loadCartFromServer());
            }
        } else {
             // User logged out or not present
             // In context: setCartItems([])
             // But if we want to keep guest cart persistence across refreshes we might want to keep it?
             // Context implementation:
             /*
                } else {
                    setCartItems([]);
                }
             */
             // So it clears cart on logout.
             dispatch(setCartItems([]));
        }
    }, [user, dispatch]); // Removed cartItems from dependency to avoid loop if sync updates cartItems

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