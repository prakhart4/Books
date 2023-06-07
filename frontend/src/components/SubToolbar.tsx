import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  setCurrentCategory: (category: string) => void;
}

export default function SubToolbar({ setCurrentCategory }: Props) {
  // const navigate = useNavigate();

  return (
    <Box display={"flex"} padding={1}>
      <Button onClick={() => setCurrentCategory("all")}>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          All
        </Typography>
      </Button>
      <Button onClick={() => setCurrentCategory("fiction")}>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Fiction
        </Typography>
      </Button>
      <Button onClick={() => setCurrentCategory("nonFiction")}>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Non-Fiction
        </Typography>
      </Button>
      <Button onClick={() => setCurrentCategory("science")}>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Science
        </Typography>
      </Button>
      <Button onClick={() => setCurrentCategory("essay")}>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Essay
        </Typography>
      </Button>
    </Box>
  );
}
