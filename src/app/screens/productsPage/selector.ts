import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productPage;

export const retrieverestaurant = createSelector(
  selectProductsPage,
  (productPage) => productPage.restaurant,
);
export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (productPage) => productPage.chosenProduct,
);
export const retrieveProducts = createSelector(
  selectProductsPage,
  (productPage) => productPage.products,
);
