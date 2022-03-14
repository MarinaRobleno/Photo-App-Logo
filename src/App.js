import "./styles/App.scss";
import React from "react";
import Button from "@mui/material/Button";
import { MyPhotos } from "./components/MyPhotos.jsx";
import { Search } from "./components/Search.jsx";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FaCameraRetro } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { IconContext } from "react-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#ffffff",
        contrastText: "#fff",
      },
      myBlue: {
        main: "#685cf4",
        contrastText: "#fff",
      },
      buttonBlue: {
        main: "#ffffff",
        contrast: "#685cf4",
      },
    },
  });
  let location = useLocation();
  let path = location.pathname;
  return (
    <>
      <ThemeProvider theme={theme}>
        <header>
          <div className="header">
            <IconContext.Provider value={{ className: "camera-icon" }}>
              <FaCameraRetro fontSize="large" />
            </IconContext.Provider>
            <h3 className="app-title">PHOTO APP LOGO</h3>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <Grid item xs="auto">
                  <Link to="/search" style={{ textDecoration: "none" }}>
                    <Button
                      className="search-button"
                      variant="contained"
                      color={path == "/search" ? "buttonBlue" : "myBlue"}
                      size="large"
                      style={{ fontWeight: "bold", margin: 10 }}
                    >
                      SEARCH
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs="auto">
                  <Link to="/my-photos" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color={path == "/my-photos" ? "buttonBlue" : "myBlue"}
                      size="large"
                      style={{ fontWeight: "bold", margin: 10 }}
                    >
                      My Photos
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </div>
        </header>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/my-photos" element={<MyPhotos />} />
        </Routes>
        <footer style={{ position: "absolute", bottom: "10px", right: "10px" }}>
          <Button
            variant="contained"
            color="buttonBlue"
            size="large"
            href="https://github.com/MarinaRobleno"
            target="_blank"
            blank
            sx={{
              fontWeight: "bold",
              padding: 0,
              borderRadius: "50%",
              height: "60px",
              width: "40px",
            }}
          >
            <AiFillGithub
              style={{
                fontSize: "50px",
                color: "#685cf4",
                margin: "0 auto",
              }}
            />
          </Button>
        </footer>{" "}
      </ThemeProvider>
    </>
  );
}

export default App;
