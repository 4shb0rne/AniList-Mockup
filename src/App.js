import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <div className="container">
            <Link to="/" className="navbar-brand">
              AniList
            </Link>
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle text-muted"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Menu
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/" className="dropdown-item">
                  Home
                </Link>
                <Link to="/search" className="dropdown-item">
                  Search
                </Link>
                <Link to="/favorite" className="dropdown-item">
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/detail/:id" element={<DetailPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/favorite" element={<FavoritePage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
