import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  setCurrentCategory: (category: string) => void;
}

export default function SubToolbar({ setCurrentCategory }: Props) {
  // const navigate = useNavigate();

  return (
    <Box display={"flex"} padding={1} flexWrap={"wrap"}>
      <Button
        onClick={() => setCurrentCategory("all")}
        sx={{ mx: 1 }}
        component={Link}
        to="/"
      >
        <Typography variant="body1">All</Typography>
      </Button>
      <Button
        sx={{ mx: 1 }}
        onClick={() => setCurrentCategory("fiction")}
        component={Link}
        to="/"
      >
        <Typography variant="body1">Fiction</Typography>
      </Button>
      <Button
        sx={{ mx: 1 }}
        onClick={() => setCurrentCategory("nonFiction")}
        component={Link}
        to="/"
      >
        <Typography variant="body1">Non-Fiction</Typography>
      </Button>
      <Button
        sx={{ mx: 1 }}
        onClick={() => setCurrentCategory("science")}
        component={Link}
        to="/"
      >
        <Typography variant="body1">Science</Typography>
      </Button>
      <Button
        sx={{ mx: 1 }}
        onClick={() => setCurrentCategory("essay")}
        component={Link}
        to="/"
      >
        <Typography variant="body1">Essay</Typography>
      </Button>
    </Box>
  );
}
