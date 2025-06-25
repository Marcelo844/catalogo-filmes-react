import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/movie";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div>
            <Header /> {}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Movie />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
