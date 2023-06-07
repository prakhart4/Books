import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.currentUser) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.currentUser?.name ?? auth.currentUser?.email}!{" "}
      <button
        onClick={() => {
          auth.logOut(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}
