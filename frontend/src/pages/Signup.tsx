import React from "react";
import { useAuth } from "../provider/authProvider";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = any; //{}

export default function SignUp(props: Props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <Container>
      <Box>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          auth
            .signUpEmailPassword(email, password, name)
            .then(() => navigate(from, { replace: true }));
        }}
      >
        <TextField
          sx={{ mt: 4 }}
          label="Name"
          variant="outlined"
          type="text"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
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
          Sign Up
        </Button>
      </form>
      <Button
        sx={{ mt: 2 }}
        component={Link}
        to={"/login"}
        fullWidth
        variant="contained"
        type="submit"
      >
        Login
      </Button>
    </Container>
  );
}
