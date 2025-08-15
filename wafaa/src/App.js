import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import About from "./components/About";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          {/* Page d'accueil : Hero + Liste */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MovieList />
                
              </>
            }
          />
          <Route path="/about" element={<About />} />

          {/* Page de détails : juste les détails */}
          <Route path="/movie/:title" element={<MovieDetails />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
