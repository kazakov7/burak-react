import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobal";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/orde.enum";
import OrderService from "../../services/Order.service";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const procedOrdersRetriewer = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders }),
);
interface PausedOrdersPage {
  setValue: (input: string) => void;
}
export default function ProcessOrders(props: PausedOrdersPage) {
  const { setValue } = props;
  const { processOrders } = useSelector(procedOrdersRetriewer);
  const { authMember, setOrderBuilder } = useGlobals();

  // HANDLERS
  const finishedOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirm = window.confirm("Have you received your order?");
      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders.map((order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order.orderItems?.map((item: OrderItem) => {
                  const product: Product = order?.productData?.filter(
                    (ele) => item.productId === ele._id,
                  )[0]!;
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img src={imagePath} className={"order-dish-img"} />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img src={"/icons/close.svg"} />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          {" "}
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className={"data-compl"}>
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  variant="contained"
                  className={"verify-button"}
                  value={order._id}
                  onClick={finishedOrderHandler}
                >
                  Verify to Fulfil
                </Button>
              </Box>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
