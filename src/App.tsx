import { CssBaseline, Box, Toolbar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./utils/reduxstore";

import TitleBar from "./components/TitleBar";
import Sidebar from "./components/Sidebar";

import Home from "./components/Home";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import MakeReservation from "./components/MakeReservation";
import MyReservations from "./components/MyReservations";

import i18n from "./utils/i18n";
import { I18nextProvider } from "react-i18next";


function App() {
  
  /**
   * Theme object used by Material UI
   */
  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#873783'
      }
    }
  });

  /**
   * Width of the sidebar in pixels
   */
  const drawerWidth = 240;

  return (
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={mdTheme}>
    <I18nextProvider i18n={i18n}>
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
            <Route path='/searchResults' element={<SearchResults />} />
            <Route path='/makeReservation' element={<MakeReservation />} />
            <Route path='/myReservations' element={<MyReservations />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
    </I18nextProvider>
    </ThemeProvider>
    </LocalizationProvider>
    </Provider>
  )
}

export default App
