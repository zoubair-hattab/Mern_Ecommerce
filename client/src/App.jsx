import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/userAction';
import IsLoginRouter from './components/IsLoginRouter';
import Header from './components/Header';
import { loadProduct } from './redux/actions/productAction';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import PrivateRouter from './components/PrivateRouter';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadProduct());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route element={<IsLoginRouter />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
