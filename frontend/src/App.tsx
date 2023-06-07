import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { fakeAuthProvider } from "./auth";
import { AuthProvider, useAuth } from "./provider/authProvider";
import { Box, Typography } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import PublicPage from "./pages/PublicPage";
import PrivatePage from "./pages/PrivatePage";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <PrivatePage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
