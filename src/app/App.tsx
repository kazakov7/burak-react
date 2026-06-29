import { Route, Switch, useLocation } from "react-router-dom";
import UserPage from "./screens/usersPage";
import HomePage from "./screens/homePage";
import ProductPage from "./screens/productsPage";
import OrderPage from "./screens/orderPage";
import HomeNavbar from "./components/headers/HomeNavber";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/app.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/products">
          <ProductPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
