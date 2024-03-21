import { useEffect, useState } from 'react';
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
import DetailsPage from './pages/DetailsPage';
import HistoryPage from './pages/HistoryPage';
import HistoryDetails from './pages/HistoryDetails';
import CategoryPage from './pages/CategoryPage';
import AdminRouter from './components/AdminRouter';
import CreateProduct from './pages/CreateProduct';
function App() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadProduct(page, category, order, search));
  }, [dispatch, page, order, search, category]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <HomePage
                setOrder={setOrder}
                setCategory={setCategory}
                setSearch={setSearch}
                setPage={setPage}
                page={page}
              />
            }
          />
          <Route path=":id" element={<DetailsPage />} />

          <Route element={<IsLoginRouter />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="history/:id" element={<HistoryDetails />} />
          </Route>
        </Route>

        <Route element={<AdminRouter />}>
          <Route path="create_product/" element={<CreateProduct />} />
          <Route path="edit_product/:id" element={<CreateProduct />} />

          <Route path="category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
