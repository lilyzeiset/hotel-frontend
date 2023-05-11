import { CssBaseline, Box, Toolbar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TitleBar from "./components/TitleBar";
import Sidebar from "./components/Sidebar";

import Home from "./components/Home";
import Search from "./components/Search";
// import SearchResults from "./components/SearchResults";
// import MakeReservation from "./components/MakeReservation";
import MyReservations from "./components/MyReservations";


function App() {
  
  /**
   * Theme object used by Material UI
   */
  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#9bbb2b'
      }
    }
  });

  /**
   * Width of the sidebar in pixels
   */
  const drawerWidth = 240;

  return (
    // <Provider store={store}>
    <ThemeProvider theme={mdTheme}>
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TitleBar drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar /> {/* preserves space taken up by titlebar */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            {/* <Route path='/searchResults' element={<SearchResults />} /> */}
            {/* <Route path='/makeReservation' element={<MakeReservation />} /> */}
            <Route path='/myReservations' element={<MyReservations />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
