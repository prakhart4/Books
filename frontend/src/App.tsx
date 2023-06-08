import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { fakeAuthProvider } from "./auth";
import { useAuth } from "./provider/authProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import PublicPage, { Book } from "./pages/PublicPage";
// import PrivatePage from "./pages/PrivatePage";
import { Layout } from "./components/Layout";
import themeCreator from "./theme";
import BookPage from "./pages/BookPage";
import SignUp from "./pages/Signup";
import MyBooks from "./pages/MyBooks";
import Orders from "./pages/Orders";

const theme = themeCreator();

export default function App() {
  const [currentCategory, setCurrentCategory] = React.useState("All");
  const { api } = useAuth();
  const [books, setBooks] = React.useState<Book[]>([]);
  // const [search, setSearch] = React.useState<string>();
  const [prevCursor, setPrevCursor] = React.useState<number>();

  const handleSearch = (value: string) => {
    console.log(value);
    // setSearch(value);
    getBooks(value);
  };

  const getBooks = (value?: string, cursor?: number) => {
    console.log(cursor);

    if (cursor && cursor === prevCursor) return;

    api
      .get(value ? `/book/search` : "/book", {
        params: { query: value, cursor, category: currentCategory },
      })
      .then(
        (res) => {
          if (res.status !== 200) return;
          console.log(res);
          setPrevCursor(cursor);
          if (cursor) setBooks((prevBooks) => [...prevBooks, ...res.data]);
          else setBooks(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {/* <AuthProvider> */}
        <Routes>
          <Route
            element={
              <Layout
                setCurrentCategory={setCurrentCategory}
                handleSearch={handleSearch}
              />
            }
          >
            <Route
              path="/"
              element={
                <PublicPage
                  currentCategory={currentCategory}
                  books={books}
                  getBooks={getBooks}
                />
              }
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
        {/* </AuthProvider> */}
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
