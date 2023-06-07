import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useCallback, useRef } from "react";

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

const Books = [
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "XXXXXXXXXXXXXXXXXXX",
    category: "fiction",
    rating: 4,
    description:
      "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald. It is the fourth in a row of seven novels by the same author.",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
  },
];

const BookCard = ({ book }: { book: (typeof Books)[0] }) => {
  return (
    <Card
      sx={{
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
          <Typography variant="body2">12,343</Typography>
        </Box>
        <Typography variant="body2" color="#B12704">
          $12.99
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function PublicPage({ currentCategory }: Props) {
  const observer = useRef<any>();

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
