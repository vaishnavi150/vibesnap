import React from "react";
import ProfilePhoto from "../assets/Menu.png";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  // Navigate to the profile page
  const handleProfile = () => {
    navigate("/profile");
  };

  // Navigate to the create post page
  const handleCreatePost = () => {
    navigate("/createPost");
  };

  // Handle file upload (placeholder function)
  const handleFileUpload = (event) => {
    const files = event.target.files;
    console.log("Files uploaded: ", files);
    // Add your file upload logic here (e.g., upload files to a server)
  };

  return (
    <div className="home-container bg-gray-100 min-h-screen">
      {/* Profile Section */}
      <div
        className="flex gap-2 p-4 items-center cursor-pointer hover:bg-gray-200 rounded-lg transition duration-200"
        onClick={handleProfile}
      >
        <img
          src={ProfilePhoto}
          alt="Profile Icon"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-xs text-gray-500">Welcome back,</p>
          <p className="text-lg font-semibold text-gray-700">
            {currentUser?.displayName || "Guest"}
          </p>
        </div>
      </div>

      {/* Feeds Section */}
      <p className="text-3xl px-4 py-6 font-bold text-gray-800">Feeds</p>
      <div className="rounded-3xl mx-3 flex flex-col gap-4">
        <Posts />
      </div>

      {/* Floating Button for Creating Post */}
      <div
        className="floating-button w-14 h-14 fixed bottom-6 right-6 bg-black text-white text-3xl rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition duration-300"
        onClick={handleCreatePost}
      >
        +
      </div>

      {/* Hidden File Input for Upload */}
      <input
        type="file"
        id="upload"
        className="hidden"
        onChange={handleFileUpload}
      />
      

    </div>
  );
};

export default Home;
