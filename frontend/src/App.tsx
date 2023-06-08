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
import BookPage from "./pages/BookPage";
import SignUp from "./pages/Signup";
import MyBooks from "./pages/MyBooks";
import Orders from "./pages/Orders";

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
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route
                path="/myBooks"
                element={
                  <RequireAuth>
                    <MyBooks />
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
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (!currentUser && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
