import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import MapPage from "@pages/Map";
import Header from "@components/Header";
import Menu from "@components/Menu";
import MountainsPage from "@pages/Mountains";
import StatisticsPage from "@pages/Statistics";
import ActivitiesPage from "@pages/Activities";

function App() {
    return (
        <Router>
            <div className="flex flex-col h-[100dvh]">
                <Header />
                <div className="flex flex-1 overflow-y-auto">

                        <Routes>
                            <Route path="/" element={<MapPage />} />
                            <Route path="/activitats" element={<ActivitiesPage />} />
                            <Route path="/cims" element={<MountainsPage />} />
                            <Route path="/dades" element={<StatisticsPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                </div>
                <Menu />
            </div>
        </Router>
    );
}

export default App;
