import React from "react";
import { useAuth } from "../provider/authProvider";
import { Box, Typography } from "@mui/material";

type Props = any; //{}

export default function SignUp(props: Props) {
  const auth = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  return (
    <div>
      <Box>
        <Typography variant="h6" gutterBottom>
          hi from SignUp page
        </Typography>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          auth
            .signUpEmailPassword(email, password, name)
            .finally(() => console.log("done"));
        }}
      >
        <label>
          name:{" "}
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>{" "}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
