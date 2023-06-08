import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Menu,
  Rating,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

type Props = {
  currentCategory: string;
}; //{}

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

export type Book = {
  id: number;
  title: string;
  writer: string;
  coverImage: string;
  point: number;
  tag: "fiction" | "nonFiction" | "science" | "essay";
  rating: number;
  User?: any;
  userId?: string | null;
};

export default function PublicPage({ currentCategory }: Props) {
  const observer = useRef<any>();
  const auth = useAuth();
  const [Books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const BookCard = ({ book }: { book: Book }) => {
    return (
      <Card
        onClick={() => navigate(`/book/${book.id}`)}
        sx={{
          height: "100%",
          bgcolor: "inherit",
          paddingY: { xs: 1, sm: 4, md: 6 },
          paddingX: 2,
        }}
        variant="outlined"
      >
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          alt={book.title}
          height="140"
          image={book.coverImage}
        />
        <CardContent
          sx={{
            textAlign: "center",
            padding: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Typography gutterBottom variant="body1" component="h2">
            {book.title}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Rating name="read-only" value={book.rating} readOnly />
          </Box>
          <Typography variant="body2" color="#B12704">
            {book.point} points
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const lastBookElementRef: (instance: HTMLDivElement | null) => void =
    useCallback((node) => {
      // if (loading) return
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Load more");
          // setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, []);

  useEffect(() => {
    auth.api.get("/book").then(
      (res) => {
        console.log(res);
        setBooks(res.data);
      },
      (error) => {
        console.log(error);
      }
    );

    // return () => {
    //   second
    // }
  }, [auth.currentUser]);

  return (
    <Container>
      <Typography variant="h4">
        {getCategoryText(currentCategory) ?? "All"}
      </Typography>
      <Grid padding={2} container>
        {Books.map((book, index) => (
          <Grid
            key={book.title + index}
            ref={Books.length - 4 === index ? lastBookElementRef : undefined}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
