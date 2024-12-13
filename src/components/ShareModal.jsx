import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaReddit,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaFacebookMessenger, // Import Messenger icon
} from "react-icons/fa";

const ShareModal = ({ closeModal }) => {
  const shareContent = "Check out this amazing post!"; // Share message or content to be posted
  const pageLink = "https://yourpage.link"; // Replace this with the actual page link

  // Function to open social media share links
  const handleShare = (platform) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}&url=${encodeURIComponent(pageLink)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageLink)}`;
        break;
      case "reddit":
        url = `https://www.reddit.com/submit?url=${encodeURIComponent(pageLink)}&title=${encodeURIComponent(shareContent)}`;
        break;
      case "discord":
        url = `https://discordapp.com/channels/@me?content=${encodeURIComponent(shareContent)}%20${encodeURIComponent(pageLink)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareContent)}%20${encodeURIComponent(pageLink)}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(pageLink)}&text=${encodeURIComponent(shareContent)}`;
        break;
      case "instagram":
        alert("Instagram sharing is not supported directly. Please use the Instagram app.");
        return;
      case "messenger":
        url = `https://m.me/?text=${encodeURIComponent(shareContent)}%20${encodeURIComponent(pageLink)}`;
        break;
      default:
        break;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-lg font-bold"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Share Post</h2>

        {/* Social media buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <FaTwitter
              size={38}
              className="text-blue-500 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("twitter")}
            />
            <span className="text-sm mt-1">Twitter</span>
          </div>
          <div className="flex flex-col items-center">
            <FaFacebook
              size={38}
              className="text-blue-600 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("facebook")}
            />
            <span className="text-sm mt-1">Facebook</span>
          </div>
          <div className="flex flex-col items-center">
            <FaReddit
              size={38}
              className="text-orange-600 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("reddit")}
            />
            <span className="text-sm mt-1">Reddit</span>
          </div>
          <div className="flex flex-col items-center">
            <FaDiscord
              size={38}
              className="text-indigo-500 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("discord")}
            />
            <span className="text-sm mt-1">Discord</span>
          </div>
        </div>

        {/* More social media buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <FaWhatsapp
              size={38}
              className="text-green-500 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("whatsapp")}
            />
            <span className="text-sm mt-1">WhatsApp</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTelegram
              size={38}
              className="text-blue-500 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("telegram")}
            />
            <span className="text-sm mt-1">Telegram</span>
          </div>
          <div className="flex flex-col items-center">
            <FaInstagram
              size={38}
              className="text-pink-600 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("instagram")}
            />
            <span className="text-sm mt-1">Instagram</span>
          </div>
          {/* Messenger Icon */}
          <div className="flex flex-col items-center">
            <FaFacebookMessenger
              size={38}
              className="text-blue-600 text-2xl rounded-full p-2 bg-gray-200"
              onClick={() => handleShare("messenger")}
            />
            <span className="text-sm mt-1">Messenger</span>
          </div>
        </div>

        {/* Page Link Section */}
        <div className="mt-4 p-2 border-t">
          <p className="text-lg font-semibold">Page Link</p>
          <input
            type="text"
            value={pageLink}
            readOnly
            className="w-full mt-2 p-2 bg-gray-100 rounded-md text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
