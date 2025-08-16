import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MoviePage from "./pages/MoviePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
