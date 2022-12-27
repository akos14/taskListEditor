import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../../state/authSlice";
import logo from "../../assets/logo.png";
import { dropWipTaskList, selectWipTaskList } from "../../state/taskListSlice";

export const Layout = () => {
  const user = useSelector(selectLoggedInUser);
  const wipTaskList = useSelector(selectWipTaskList);
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "gray" }}>
          <Toolbar>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: "none",
                  color: "white",
                  padding: "20px",
                  "&:hover": { background: "dimgray" },
                }}
              >
                <img src={logo} alt="logo" style={{ width: 16 }}></img>
                FeladatOK
              </Typography>
            </Link>
            <Link
              to="/taskbank"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textDecoration: "none",
                  color: "white",
                  padding: "20px",
                  "&:hover": { background: "dimgray" },
                }}
              >
                Feladatbank
              </Typography>
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      padding: "20px",
                      "&:hover": { background: "dimgray" },
                    }}
                  >
                    Bejelentkezés
                  </Typography>
                </Link>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      padding: "20px",
                      "&:hover": { background: "dimgray" },
                    }}
                  >
                    Regisztráció
                  </Typography>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to="/tasklists"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      padding: "20px",
                      "&:hover": { background: "dimgray" },
                    }}
                  >
                    Feladatsoraim
                  </Typography>
                </Link>
                {wipTaskList ? (
                  <Link
                    to="/wiptasklist"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        padding: "20px",
                        "&:hover": { background: "dimgray" },
                      }}
                    >
                      Szerkesztett feladatsor
                    </Typography>
                  </Link>
                ) : (
                  ""
                )}
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      padding: "20px",
                      "&:hover": { background: "dimgray" },
                    }}
                  >
                    Profil
                  </Typography>
                </Link>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    dispatch(logout());
                    dispatch(dropWipTaskList());
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      padding: "20px",
                      "&:hover": { background: "dimgray" },
                    }}
                  >
                    Kijelentkezés
                  </Typography>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};
