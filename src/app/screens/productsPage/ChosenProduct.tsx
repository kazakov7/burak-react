import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom"; // @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieverestaurant } from "./selector";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const restaurantRetriewer = createSelector(
  retrieverestaurant,
  (restaurant) => ({
    restaurant,
  }),
);
const cosenProductRetriewer = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  }),
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());

  const { chosenProduct } = useSelector(cosenProductRetriewer);
  const { restaurant } = useSelector(restaurantRetriewer);
  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => {
        console.log(err);
      });

    const member = new MemberService();
    member
      .getrestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>
              {chosenProduct.productDesc
                ? chosenProduct.productDesc
                : "no description"}
            </p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>{chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button variant="contained">Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
