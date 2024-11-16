import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/SignUpPage";
import LoginPage from "./Components/LoginPage";
import ProfilePage from "./Components/ProfilePage";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/signup/" element={<SignUpPage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/profile/" element={<ProfilePage />} />
        </Routes>
    </BrowserRouter>
)

export default App;
