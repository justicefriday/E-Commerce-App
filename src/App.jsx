import { Route,createRoutesFromElements,createBrowserRouter,RouterProvider,} from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage'
import ProductsPage from './Pages/ProductsPage';
import ProductDetailsPage from './Pages/ProductdetailsPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={ <HomePage/>} />
         <Route path='/buy' element={ <ProductsPage/>} /> 
         <Route path='/products/:id' element={ <ProductDetailsPage/>} /> 
        <Route path='/cart' element={<CartPage />} /> 
        <Route path='/checkout' element={ <CheckoutPage/>} />
       
      </Route>
    )
  ) 
   return (
      <RouterProvider router={router} />
  );
};

export default App;
