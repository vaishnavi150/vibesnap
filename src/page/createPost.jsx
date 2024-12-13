import React, { useState, useRef } from "react";
import { useAppContext } from "../context/ContextApi";

const CreatePostPage = () => {
  const { addPost } = useAppContext();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera access failed. Please try again.");
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");
    setCameraImage(imageUrl);
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleCreatePost = () => {
    const newPost = {
      text,
      images,
      video,
      cameraImage,
      timestamp: new Date().toISOString(),
    };

    addPost(newPost);
    setText("");
    setImages([]);
    setVideo(null);
    setCameraImage(null);
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full sm:w-[360px] min-h-screen md:w-[375px] lg:w-[386px] bg-white rounded-lg shadow-lg p-4">
        <header className="flex items-center justify-between pb-2 border-b border-gray-300">
          <button onClick={() => window.history.back()}>&larr; Back</button>
          <h2 className="text-lg font-semibold">New Post</h2>
        </header>

        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mt-4 border rounded-lg p-2 resize-none h-24"
        ></textarea>

        {/* Media Uploads */}
        <div className="mt-4">
          <h3 className="font-semibold">Add Media</h3>
          
          {/* Photos Section */}
          <label className="block mt-2 cursor-pointer">
            <span className="text-green-500">📷 Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          
          {/* Video Section */}
          <label className="block mt-2 cursor-pointer">
            <span className="text-blue-500">🎥 Video</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </label>
          
          {/* Camera Section */}
          <div className="mt-4">
            <button
              onClick={startCamera}
              className="bg-green-500 text-white w-full py-2 rounded-lg"
            >
              Access Camera
            </button>
            {cameraStream && (
              <div className="mt-4">
                <video ref={videoRef} width="100%" height="auto" />
                <canvas ref={canvasRef} width="0" height="0" style={{ display: "none" }} />
                <button
                  onClick={captureImage}
                  className="bg-blue-500 text-white w-full py-2 rounded-lg mt-2"
                >
                  Capture Image
                </button>
              </div>
            )}
            {cameraImage && (
              <div className="mt-4">
                <h4 className="font-semibold">Captured Image</h4>
                <img src={cameraImage} alt="Captured" className="w-full h-auto rounded-md" />
              </div>
            )}
          </div>
        </div>

        {/* Create Post Button */}
        <div className="mt-4">
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white w-full py-2 rounded-lg"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
