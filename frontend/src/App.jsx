import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AnalyticsTab from './features/dashboard/components/AnalyticsTab';
import CreateProductForm from './features/dashboard/components/CreateProductForm';
import ProductList from './features/dashboard/components/ProductList';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Home from './pages/Home';
import Login from './pages/Login';
import PurchaseCancel from './pages/PurchaseCancel';
import PurchaseSuccess from './pages/PurchaseSuccess';
import SignUp from './pages/SignUp';
import AppLayout from './ui/AppLayout';
import ProtectRoute from './ui/ProtectRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      stateTime: 0,
      retry: 1,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='category/:category' element={<Category />} />
            <Route element={<ProtectRoute />}>
              <Route path='cart' element={<Cart />} />
              <Route path='/purchase-success' element={<PurchaseSuccess />} />
              <Route path='/purchase-cancel' element={<PurchaseCancel />} />
              <Route path='dashboard' element={<Admin />}>
                <Route
                  index
                  element={<Navigate replace to='create-product' />}
                />
                <Route path='create-product' element={<CreateProductForm />} />
                <Route path='products' element={<ProductList />} />
                <Route path='analytics' element={<AnalyticsTab />} />
              </Route>
            </Route>

            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-center'
        gutter={8}
        toastOptions={{
          className:
            'max-w-md px-4 py-3 bg-yellow-50 text-yellow-900 text-center',
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
