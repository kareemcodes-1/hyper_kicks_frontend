import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from "react-router";
import Register from './auth/Register.tsx';
import Login from './auth/Login.tsx';
import ProductPage from './products/product/[id]/page.tsx';
import CollectionPage from './collections/collection/id/page.tsx';
import ToasterProvider from './provider/ToasterProvider.tsx';
import ProfilePage from './profile/page.tsx';
import SearchPage from './search/product/SearchPage.tsx';
import OrdersPage from './orders/page.tsx';
import SuccessPage from './checkout/success/page.tsx';
import CancelPage from './checkout/cancel/page.tsx';
import Wishlists from './wishlists/page.tsx';
import ProtectRouteProvider from './provider/ProtectRouteProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
            <ToasterProvider />

            <BrowserRouter>
               <Routes>
                  <Route
                    path="/profile"
                    element={
                     <ProtectRouteProvider>
                       <ProfilePage />
                     </ProtectRouteProvider>
                       }
                  ></Route>
                   <Route path='/' element={<App />}></Route>
                   <Route path='/register' element={<Register />}></Route>
                   <Route path='/login' element={<Login />}></Route>
                   <Route path='/collections/collection/:id' element={<CollectionPage />}></Route>
                   <Route path='/products/product/:id' element={<ProductPage />}></Route>
                   <Route path='/wishlists' element={<Wishlists />}></Route>
                   <Route path='/orders' element={<ProtectRouteProvider><OrdersPage /></ProtectRouteProvider>}></Route>
                   <Route path='/search/product' element={<SearchPage />}></Route>
                   <Route path='/checkout/success' element={<ProtectRouteProvider><SuccessPage /></ProtectRouteProvider>}></Route>
                   <Route path='/checkout/cancel' element={<ProtectRouteProvider><CancelPage /></ProtectRouteProvider>}></Route>
               </Routes>
           </BrowserRouter>
  </StrictMode>,
)
