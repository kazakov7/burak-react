import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

//REACT APP STATE
export interface AppRootState {
  homePage: HomePageState;
  productPage: ProductPageState;
  ordersPage: OrdersPageState;
}

//HOME PAGE
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  activeUsers: Member[];
}
export interface ProductPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
