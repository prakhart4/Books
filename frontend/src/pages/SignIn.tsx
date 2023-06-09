import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../provider/authProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

// type Props = any; //{}

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const auth = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Container>
      <Box>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          auth
            .signInEmailPassword(email, password)
            .then(() => navigate(from, { replace: true }));
        }}
      >
        <TextField
          sx={{ mt: 4 }}
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ mt: 4 }}
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ mt: 4 }}
          color="secondary"
          fullWidth
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
      <Button
        sx={{ mt: 2 }}
        component={Link}
        to={"/signUp"}
        fullWidth
        variant="contained"
        type="submit"
      >
        Sign up
      </Button>
    </Container>
  );
};
