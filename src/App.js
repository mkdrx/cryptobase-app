import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./routes/Home";
import Account from "./routes/Account";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import CoinPage from "./routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=true";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
    });
  }, [url]);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home coins={coins} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/coin/:coinId" element={<CoinPage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
