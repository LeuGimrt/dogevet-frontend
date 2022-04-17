import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./components/Router/Routes";
import AuthProvider from "./context/AuthContext";
import theme from "./styles/theme";

import "./App.css";

const App = () => {
  return (
    <AppState>
      <Navbar />
      <div id='content'>
        <Routes />
      </div>
      <Footer />
      <Toaster position='bottom-center' />
    </AppState>
  );
};

const AppState = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default App;
