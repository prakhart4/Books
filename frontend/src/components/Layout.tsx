import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";
import { AppBar, Button, Toolbar } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../provider/authProvider";
import { BookSharp } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

export function Layout() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          auth.logOut(() => navigate("/"));
        }}
      >
        Sign Out
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box
        // textAlign={"center"}
        marginX={2}
        // display={{ xs: "none", md: "block" }}
      >
        <Typography variant="subtitle2" pb={0}>
          Hello,{" "}
          {auth.currentUser
            ? auth.currentUser.name ?? auth.currentUser.email
            : "Guest"}
        </Typography>
      </Box>

      {auth.currentUser ? (
        <MenuItem sx={{ TextAlign: "center" }}>
          <IconButton>
            <BookSharp />
          </IconButton>
          <Typography variant="body1">My Books</Typography>
        </MenuItem>
      ) : (
        <MenuItem sx={{ TextAlign: "center" }} component={Link} to={"/login"}>
          <Typography variant="body1">Login</Typography>
        </MenuItem>
      )}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Typography variant="body1">Cart</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="body1">Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Books
          </Typography>
          <Search sx={{ flexGrow: 1, display: "flex", mr: { md: 8 } }}>
            <StyledInputBase
              fullWidth
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton sx={{ marginX: 1 }}>
              <SearchIcon />
            </IconButton>
          </Search>
          <Box
            textAlign={"center"}
            marginX={2}
            display={{ xs: "none", md: "block" }}
          >
            <Typography variant="subtitle2" pb={0}>
              Hello,{" "}
              {auth.currentUser
                ? auth.currentUser.name ?? auth.currentUser.email
                : "Guest"}
            </Typography>
            {auth.currentUser ? (
              // My Books
              <Button sx={{ paddingY: 0 }} color="inherit">
                <Typography variant="body1">My Books</Typography>
              </Button>
            ) : (
              //Login Button
              <Button
                sx={{ paddingY: 0 }}
                color="inherit"
                component={Link}
                to={"/login"}
              >
                <Typography variant="body1">Login</Typography>
              </Button>
            )}
          </Box>
          {/* Cart */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
