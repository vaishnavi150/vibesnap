import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import OnBoarding from "./page/onboarding";
import Profile from "./page/editPage";
import CreatePostPage from "./page/createPost";
import { AppProvider } from "./context/ContextApi";  // Import the context provider

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <div className="w-full sm:w-[360px] min-h-screen md:w-[375px] lg:w-[386px] bg-white rounded-lg shadow-lg">
            <Routes>
              <Route path="/" element={<OnBoarding />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createPost" element={<CreatePostPage />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
