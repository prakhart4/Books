import { Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../provider/authProvider";
import { useLocation, useNavigate } from "react-router-dom";

type Props = any; //{}

export const SignIn = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const auth = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div>
      <Box>
        <Typography variant="h6" gutterBottom>
          hi from login page
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
        <label>
          email:{" "}
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <label>
          pass:{" "}
          <input
            name="email"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
