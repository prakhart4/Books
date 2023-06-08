import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Order, useAuth } from "../provider/authProvider";

type Props = any;

export default function Orders(props: Props) {
  const { currentUser, api } = useAuth();
  const [orders, setOrders] = useState<Order[]>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = (id: number) => {
    api.delete(`/user/cancel-order/${id}`).then(
      (res) => {
        alert("Order cancelled");
        handleClose();
      },
      (err) => {
        alert(err.response.data.message);
        handleClose();
      }
    );
  };

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
          <Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={new Date(order.createdOn).toDateString()}
                secondary={
                  <>
                    <Typography>{order?.book?.title ?? ""}</Typography>
                    <Typography color={"#B12704"}>
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
        ))}
      </List>
    </Container>
  );
}
