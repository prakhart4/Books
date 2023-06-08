import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "./PublicPage";
import { useAuth } from "../provider/authProvider";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  // Modal,
  Rating,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
// import zIndex from "@mui/material/styles/zIndex";

// type Props = any;

const getCategoryText = (currentCategory: string | undefined) => {
  if (!currentCategory) return undefined;
  switch (currentCategory) {
    case "all":
      return "All";
    case "fiction":
      return "Fiction";
    case "nonFiction":
      return "Non-fiction";
    case "science":
      return "Science";
    case "essay":
      return "Essay";
    default:
      return "All";
  }
};

export default function BookPage() {
  const { id } = useParams();
  const { api } = useAuth();
  const [book, setBook] = React.useState<Book>();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBuy = () => {
    api
      .post("/book/buy", {
        bookId: id,
      })
      .then(
        (res) => {
          if (res.status === 200) {
            handleClose();
            alert("Buy successfully");
            navigate(-1);
          }
        },
        (err: any) => {
          alert(`Buy failed ${err.response.data.message ?? ""}`);
          handleClose();
        }
      );
  };

  useEffect(() => {
    api.get(`/book/${id}`).then((res) => setBook(res.data));
  }, [id]);

  return (
    <>
      <IconButton sx={{ mx: 2 }} onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={4}
        //   justifyContent={"center"}
        padding={4}
      >
        <Box height={"50vh"}>
          <Avatar
            imgProps={{ style: { objectFit: "contain" } }}
            sx={{ height: "100%", width: "100%" }}
            variant="square"
            src={book?.coverImage}
          />
        </Box>
        <Box
          margin={4}
          maxWidth={"50vw"}
          display={"flex"}
          flexDirection={"column"}
          flexGrow={1}
        >
          <Typography variant="h5">{book?.title}</Typography>
          <Typography variant="caption">
            {getCategoryText(book?.tag)}
          </Typography>
          <Typography variant="body1">
            by <b>{book?.writer}</b>
          </Typography>
          <Rating value={book?.rating ?? 0} readOnly />
          <Typography variant="body1" color={"#B12704"}>
            {book?.point} points
          </Typography>
          <Box flexGrow={1} />
          <Button
            sx={{ my: 2, mx: 1 }}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleOpen}
          >
            Buy Now
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="body1">
              {`Buy ${book?.title} for ${book?.point} points`}
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleBuy} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
