import React, { useState } from "react";
import CoverImage from "../assets/coverImage.png"; // Default cover image
import ProfilePhoto from "../assets/Menu.png"; // Default profile image
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";
import CreatePostPage from "./createPost"; // Updated import
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const EditPage = () => {
  const [isEdit, setIsEdit] = useState(false); // Toggle edit mode
  const [isAddPost, setIsAddPost] = useState(false); // Toggle create post view
  const [newProfilePhoto, setNewProfilePhoto] = useState(ProfilePhoto); // Updated profile photo
  const [newCoverPhoto, setNewCoverPhoto] = useState(CoverImage); // Updated cover photo
  const [newName, setNewName] = useState(""); // Updated name
  const [newBio, setNewBio] = useState(""); // Updated bio
  const { currentUser } = useAppContext(); // Get current user context
  const navigate = useNavigate();

  // Toggle edit mode
  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  // Save profile changes (placeholder logic)
  const handleSave = () => {
    alert("Profile saved!");
    setIsEdit(false);
  };

  // Navigate to home page
  const handleBack = () => {
    navigate("/home");
  };

  // Handle profile photo change
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle cover photo change
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewCoverPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle name input change
  const handleNameChange = (e) => setNewName(e.target.value);

  // Handle bio input change
  const handleBioChange = (e) => setNewBio(e.target.value);

  // Switch to Create Post Page
  const handleAddPost = () => setIsAddPost(true);

  if (isAddPost) {
    return (
      <CreatePostPage
        onClose={() => setIsAddPost(false)}
        onNext={(image) => {
          alert(`Image selected: ${image}`);
          setIsAddPost(false);
        }}
      />
    );
  }

  // Data to pass to child components
  const propData = {
    name: newName || currentUser?.displayName || "User Name",
    bio: newBio || currentUser?.bio || "User Bio",
    profilePhoto: newProfilePhoto,
    coverPhoto: newCoverPhoto,
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Cover Section */}
      <section className="relative">
        <img
          src={newCoverPhoto}
          alt="Cover"
          className="w-full h-50 object-cover"
        />

        {isEdit && (
          <label
            htmlFor="cover-photo-input"
            className="absolute top-4 right-4 flex items-center text-white cursor-pointer"
          >
            <MdEdit size={24} />
          </label>
        )}

        <input
          id="cover-photo-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverPhotoChange}
        />

        <div className="absolute top-4 left-4 flex items-center text-white">
          <IoMdArrowRoundBack size={30} onClick={handleBack} />
          <p className="ml-2 text-xl font-bold">Edit Profile</p>
        </div>

        <div className="absolute left-4 bottom-1/7 transform -translate-y-1/2">
          <img
            src={newProfilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />

          {isEdit && (
            <label
              htmlFor="profile-photo-input"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
            >
              <MdEdit size={24} className="text-black" />
            </label>
          )}

          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePhotoChange}
          />
        </div>

        <button
          className="absolute px-4 py-2 mt-3 right-8 border-solid border-2 border-gray-400 text-black font-semibold rounded-full focus:outline-none w-1/2"
          onClick={handleClickEdit}
        >
          Edit Profile
        </button>
      </section>

      {/* Profile Edit/View Section */}
      <div className="mt-20 p-4">
        {isEdit ? (
          <ProfileEdit
            data={propData}
            onNameChange={handleNameChange}
            onBioChange={handleBioChange}
            name={newName}
            bio={newBio}
          />
        ) : (
          <ProfileView data={propData} />
        )}
      </div>

      {/* Save Button */}
      {isEdit && (
        <div className="p-2 mb-2">
          <button
            onClick={handleSave}
            className="flex justify-center rounded-full bg-black text-white w-full px-4 py-2 mb-8 mt-auto text-center font-medium text-xl"
          >
            Save
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        className="fixed bottom-4 right-4 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-black focus:outline-none"
        onClick={handleAddPost}
      >
        <span className="text-3xl font-semibold">+</span>
      </button>
    </div>
  );
};

export default EditPage;