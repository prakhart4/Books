import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
  ListItem,
  // ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Order, useAuth } from "../provider/authProvider";

// type Props = any;

function OrderRow({
  index,
  order,
  arr,
}: {
  index: number;
  order: Order;
  arr: Order[];
}) {
  const [open, setOpen] = useState(false);
  const { api } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = (id: number) => {
    api.delete(`/user/cancel-order/${id}`).then(
      () => {
        alert("Order cancelled");
        handleClose();
      },
      (err) => {
        alert(err.response.data.message);
        handleClose();
      }
    );
  };

  return (
    <Fragment>
      <ListItem>
        <ListItemText
          primary={new Date(order.createdOn).toDateString()}
          secondary={
            <>
              <Typography component={"span"}>
                {order?.book?.title ?? ""}
              </Typography>
              <br />
              <Typography component={"span"} color={"#B12704"}>
                {order?.point} points
              </Typography>
            </>
          }
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Cancel
        </Button>
      </ListItem>
      {arr?.length - 1 !== index && <Divider />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="body1">
            {`Cancel order of ${order?.book?.title} for ${order?.point} points`}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCancel(order.id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default function Orders() {
  const { currentUser, api } = useAuth();
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    //Fetch orders
    api.get("/user/orders").then(
      (res) => {
        console.log(res.data);
        setOrders(res.data);
      },
      (err) => {
        console.error(err.response.data.message);
      }
    );
  }, [currentUser]);

  return (
    <Container>
      <h1>Orders</h1>
      <List>
        {(orders ? orders : currentUser?.Order)?.map((order, index, arr) => (
          <OrderRow key={index} index={index} order={order} arr={arr} />
        ))}
      </List>
    </Container>
  );
}
