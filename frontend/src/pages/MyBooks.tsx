// import React from "react";
import { useAuth } from "../provider/authProvider";
import {
  Avatar,
  // Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  // Menu,
  // MenuItem,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

// type Props = any;

export default function MyBooks() {
  const { currentUser } = useAuth();
  return (
    <Container>
      <h1>My Books</h1>
      <List>
        {currentUser?.ownedBooks?.map((book, index) => (
          <Fragment key={index}>
            <ListItem component={Link} to={`/book/${book.id}`}>
              <ListItemAvatar>
                <Avatar
                  imgProps={{ style: { objectFit: "contain" } }}
                  variant="square"
                  src={book.coverImage}
                />
              </ListItemAvatar>
              <ListItemText
                color="primary"
                primary={book.title}
                secondary={
                  <Typography>
                    by <b>{book.writer}</b>
                  </Typography>
                }
              />
              {/* <Button variant="outlined" component={Link} to={`/order/${book.id}`}>
                Order
              </Button> */}
            </ListItem>
            {currentUser?.ownedBooks?.length - 1 !== index && <Divider />}
          </Fragment>
        ))}
      </List>
    </Container>
  );
}
