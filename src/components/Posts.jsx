import React, { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { useAppContext } from "../context/ContextApi"; // Import context
import ShareModal from "./ShareModal"; // Import ShareModal component
import moment from "moment"; // Import moment for time formatting

const defaultProfilePhoto = "https://res.cloudinary.com/dysb09xvj/image/upload/v1733923570/Menu_hdsqbm.png"; // Set your default profile photo path here

const Posts = () => {
  const { posts } = useAppContext(); // Get posts from context
  const [likedPostIds, setLikedPostIds] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleHeartClick = (postId) => {
    setLikedPostIds((prevLikedIds) => {
      const newLikedIds = new Set(prevLikedIds);
      if (newLikedIds.has(postId)) {
        newLikedIds.delete(postId);
      } else {
        newLikedIds.add(postId);
      }
      return newLikedIds;
    });
  };

  const openModal = () => {
    setIsModalOpen(true); // Set modal state to true to open it
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
            {/* Header with profile and name */}
            <div className="flex gap-2 p-4">
              <img
                src={post.profilePhoto || defaultProfilePhoto} // Use default image if profilePhoto is missing
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-base font-bold text-gray-700">
                  {post.displayName}{" "}
                  <span className="text-sm text-gray-400">
                    {post.likedBy && post.likedBy.length > 0
                      ? post.likedBy.join(", ") // Join names of users who liked the post
                      : "Vaishnavi sunkara"} {/* Show names of users who liked */}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  {moment(post.timestamp).fromNow()} {/* Display relative time */}
                </p>
              </div>
            </div>

            {/* Post text */}
            <p className="mx-2 p-2">{post.text}</p>

            {/* Media content (images, video, camera image) */}
            {post.images && post.images.length > 0 && (
              <div className="p-2">
                <img
                  src={URL.createObjectURL(post.images[0])}
                  alt="Post"
                  className="max-w-full rounded-md"
                />
              </div>
            )}

            {post.video && (
              <div className="p-2">
                <video
                  controls
                  className="max-w-full rounded-md"
                  src={URL.createObjectURL(post.video)}
                />
              </div>
            )}

            {post.cameraImage && (
              <div className="p-2">
                <img
                  src={post.cameraImage}
                  alt="Captured"
                  className="max-w-full rounded-md"
                />
              </div>
            )}

            {/* Like and share buttons */}
            <div className="flex justify-between items-center p-2">
              <span className="flex items-center space-x-1">
                <button
                  onClick={() => handleHeartClick(post.id)}
                  className={`text-lg ${likedPostIds.has(post.id) ? "text-red-500" : "text-gray-500"}`}
                >
                  <IoMdHeart />
                </button>
                <span className="text-red-600 text-sm">{post.likedBy && post.likedBy.length}</span>
              </span>
              <button
                onClick={openModal} // Open modal when the button is clicked
                className="flex items-center space-x-1 px-5 py-2 bg-gray-200 text-black font-bold rounded-md hover:bg-blue-600 hover:text-white transition-all duration-100 rounded-3xl"
              >
                <FaLocationArrow />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts yet...</p>
      )}

      {/* Render the ShareModal if the modal is open */}
      {isModalOpen && <ShareModal closeModal={closeModal} />}
    </div>
  );
};

export default Posts;
