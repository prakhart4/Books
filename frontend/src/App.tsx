import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { fakeAuthProvider } from "./auth";
import { AuthProvider, useAuth } from "./provider/authProvider";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import PublicPage from "./pages/PublicPage";
import PrivatePage from "./pages/PrivatePage";
import { Layout } from "./components/Layout";
import themeCreator from "./theme";

const theme = themeCreator();

export default function App() {
  const [currentCategory, setCurrentCategory] = React.useState("All");
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route element={<Layout setCurrentCategory={setCurrentCategory} />}>
              <Route
                path="/"
                element={<PublicPage currentCategory={currentCategory} />}
              />
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
      </ThemeProvider>
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
