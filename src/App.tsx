import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Home from "@pages/Home";
import Header from "@components/Header";
import Footer from "@components/Footer";

function App() {
    return (

        <Router>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
