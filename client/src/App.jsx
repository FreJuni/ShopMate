import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserHome from './user/Home/UserHome';
import AdminHome from './admin/Home/AdminHome';
import AdminLayout from './admin/layout/AdminLayout';
import Category from './admin/Category/Category';
import AddCategory from './admin/Category/AddCategory';
import ProductDetails from './admin/Product/ProductDetails';
import AddItem from './admin/Product/AddItem';
import PaymentMethod from './admin/PaymentMed/PaymentMethod';
import SaleInformation from './admin/SaleInfo/SaleInformation';
import Order from './admin/Order/Order';
import UserList from './admin/UserList/UserList';
import ChangePassword from './admin/Password/ChangePassword';
import Report from './admin/Report/Report';
import Edit from './admin/Category/Edit';
import EditPayment from './admin/PaymentMed/EditPayment';
import ProductInfo from './admin/Product/ProductInfo';
import EditProduct from './admin/Product/EditProduct';
import AdminList from './admin/UserList/AdminList';
import Profile from './admin/Profile/Profile';
import AddNewAdmin from './admin/AddAdmin/AddNewAdmin';
import UserLayout from './user/Layout/UserLayout';
import { useEffect, useState } from 'react';
import Shop from './user/Shop/Shop';
import ProductDetail from './user/Details/ProductDetail';
import Swal from 'sweetalert2';
import { getAllFavorite, getCart, getOrder } from './apicalls/user/user';
import Favorite from './user/Favorite/Favorite';
import { useSelector } from 'react-redux';
import Cart from './user/Cart/Cart';
import ConfirmPayment from './user/Cart/ConfirmPayment';
import UserOrder from './user/Order/UserOrder';
import OrdersDetails from './admin/Order/OrdersDetails';
import AuthProvider from './Provider/AuthProvider';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UserProvider from './Provider/UserProvider';
import AdminProvider from './Provider/AdminProvider';
import UserProfile from './user/Profile/UserProfile';
import UserChangePasswordChangePage from './user/Password/UserChangePasswordChangePage';
import About from './user/About/About';
import Contact from './user/Contact/Contact';

function App() {
  const [nav, setNav] = useState(0);
  const [fav, setFav] = useState('');
  const [car, setCar] = useState('');
  const [ord, setOrd] = useState('');
  const [order, setOrder] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const user = useSelector((state) => state.reducer.userInfo.user);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [Loading, setLoaDing] = useState(false);


  useEffect(() => {

    const hover = localStorage.getItem("nav");

    if (hover != null) {
      setNav(Number(hover));
    }

  }, [nav]);

  const errorAlert = (response) => {
    Swal.fire({
      title: 'Error!',
      text: response.message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  const getFav = async () => {
    setLoaDing(true);
    try {
      const response = await getAllFavorite(user.userId);

      if (!response.success) {
        throw new Error(response.message);
      }

      setFavorite(response.favoriteDoc);
      setLoaDing(false);
    } catch (error) {
      // errorAlert(error);
    }
  }


  const Carts = async () => {
    setLoading(true);
    try {
      const response = await getCart(user.userId);

      if (!response.success) {
        throw new Error(response.message);
      }

      setCart(response.cartDoc);

      setLoading(false);
    } catch (error) {
      // errorAlert(error);
    }
  }

  const Orders = async () => {
    setLoad(true);
    try {
      const response = await getOrder(user.userId);

      if (!response.success) {
        throw new Error(response.message);
      }

      setOrder(response.orderDoc);

      setLoad(false);
    } catch (error) {
      // errorAlert(error);
    }
  }

  useEffect(() => {
    Orders();
  }, [ord]);


  useEffect(() => {
    getFav();
  }, [fav]);

  useEffect(() => {
    Carts();
  }, [car]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/user',
      element: <UserLayout cart={cart} order={order} favorite={favorite} nav={nav} setNav={setNav} />,
      children: [
        {
          path: '/user/home',
          element: <AuthProvider>
            <UserProvider>
              <UserHome setNav={setNav} setCar={setCar} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/about',
          element: <AuthProvider>
            <UserProvider>
              <About setNav={setNav} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/shop',
          element: <AuthProvider>
            <UserProvider>
              <Shop setCar={setCar} setFav={setFav} setNav={setNav} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/contact',
          element: <AuthProvider>
            <UserProvider>
              <Contact />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/product/detail/:id',
          element: <AuthProvider>
            <UserProvider>
              <ProductDetail setCar={setCar} setFav={setFav} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/favorite',
          element: <AuthProvider>
            <UserProvider>
              <Favorite Loading={Loading} setCar={setCar} favorite={favorite} setFav={setFav} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/cart',
          element: <AuthProvider>
            <UserProvider>
              <Cart loading={loading} setCar={setCar} cart={cart} setCart={setCart} Carts={Carts} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/confirm/payment',
          element: <AuthProvider>
            <UserProvider>
              <ConfirmPayment setOrd={setOrd} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/order',
          element: <AuthProvider>
            <UserProvider>
              <UserOrder load={load} order={order} />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/profile',
          element: <AuthProvider>
            <UserProvider>
              <UserProfile />
            </UserProvider>
          </AuthProvider>
        },
        {
          path: '/user/change/password/page',
          element: <AuthProvider>
            <UserProvider>
              <UserChangePasswordChangePage />
            </UserProvider>
          </AuthProvider>
        }
      ],
    },
    {
      path: '/auth/login',
      element: <Login />
    },
    {
      path: '/auth/register',
      element: <Register />
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AuthProvider>
            <AdminProvider>
              <AdminHome />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/category",
          element: <AuthProvider>
            <AdminProvider>
              <Category />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/add/category",
          element: <AuthProvider>
            <AdminProvider>
              <AddCategory />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/product/detail",
          element: <AuthProvider>
            <AdminProvider>
              <ProductDetails />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/add/product",
          element: <AuthProvider>
            <AdminProvider>
              <AddItem />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/payment",
          element: <AuthProvider>
            <AdminProvider>
              <PaymentMethod />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/sale/info",
          element: <AuthProvider>
            <AdminProvider>
              <SaleInformation />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/order",
          element: <AuthProvider>
            <AdminProvider>
              <Order />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/admin/list",
          element: <AuthProvider>
            <AdminProvider>
              <AdminList />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/user/list",
          element: <AuthProvider>
            <AdminProvider>
              <UserList />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/change/password",
          element: <AuthProvider>
            <AdminProvider>
              <ChangePassword />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/report",
          element: <AuthProvider>
            <AdminProvider>
              <Report />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/edit/category/:id",
          element: <AuthProvider>
            <AdminProvider>
              <Edit />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/edit/payment/:id",
          element: <AuthProvider>
            <AdminProvider>
              <EditPayment />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/product/info/:id",
          element: <AuthProvider>
            <AdminProvider>
              <ProductInfo />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/profile",
          element: <AuthProvider>
            <AdminProvider>
              <Profile />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/add/new/admin",
          element: <AuthProvider>
            <AdminProvider>
              <AddNewAdmin />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/edit/product/:id",
          element: <AuthProvider>
            <AdminProvider>
              <EditProduct />
            </AdminProvider>
          </AuthProvider>
        },
        {
          path: "/admin/order/details/:id",
          element: <AuthProvider>
            <AdminProvider>
              <OrdersDetails />
            </AdminProvider>
          </AuthProvider>
        },
      ]
    },

  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
