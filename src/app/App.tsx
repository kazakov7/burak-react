import React from "react";
import "../css/app.css";

import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { RippleBadge } from "./material/MaterialTheme/styled";
import { Link, Route, Switch } from "react-router-dom";
import { AboutPage } from "./screens/aboutPage";
import { UserPage } from "./screens/usersPage";
import { HomePage } from "./screens/homePage";
import { ProductPage } from "./screens/productsPage";
import { OrderPage } from "./screens/orderPage";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/member-page">Users page</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/users">
          <UserPage />
        </Route>
        <Route path="/products">
          <ProductPage />
        </Route>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
