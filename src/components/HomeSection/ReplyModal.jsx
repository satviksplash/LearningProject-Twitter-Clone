import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0,
  outline: "none",
  borderRadius: 4,
};

const ReplyModal = ({ open, handleClose }) => {
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Hardcoded user data - replace with actual auth user data
  const currentUser = {
    avatar: "https://res.cloudinary.com/demo/image/upload/kitten.jpg",
  };

  const handleReplyChange = (e) => {
    const text = e.target.value;
    if (text.length <= 250) {
      setReplyText(text);
      setIsTyping(text.length > 0);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReplyImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitReply = () => {
    if (replyText.trim() || replyImage) {
      const newReply = {
        content: replyText,
        image: replyImage,
        timestamp: Date.now(),
      };
      console.log("New Reply:", newReply);
      // Add API call here to post reply
      handleClose();
      setReplyText("");
      setReplyImage(null);
      setIsTyping(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <CloseIcon
            className="cursor-pointer text-gray-600"
            onClick={handleClose}
          />
        </div>

        {/* Original Tweet Info */}
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-start space-x-3">
            <Avatar
              src="https://res.cloudinary.com/demo/image/upload/kitten.jpg"
              alt="Original Tweet Author"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold">John Doe</span>
                <span className="text-gray-500">@johndoe</span>
              </div>
              <p className="text-gray-600 mt-1">
                This is the original tweet content...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Replying to <span className="text-blue-500">@johndoe</span>
              </p>
            </div>
          </div>
        </div>

        {/* Reply Input Section */}
        <div className="p-4">
          <div className="flex space-x-3">
            <Avatar src={currentUser.avatar} alt="Current User" />
            <div className="flex-1">
              <textarea
                className="w-full p-2 border-none focus:outline-none focus:ring-0 resize-none"
                rows="4"
                placeholder="Tweet your reply"
                value={replyText}
                onChange={handleReplyChange}
              />
              {replyImage && (
                <div className="mt-2 relative">
                  <img
                    src={replyImage}
                    alt="Reply"
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    onClick={() => setReplyImage(null)}
                    className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <ImageIcon className="text-blue-500 hover:text-blue-600" />
          </label>

          <div className="flex items-center space-x-4">
            {isTyping && (
              <span className="text-sm text-gray-500">
                {replyText.length}/250
              </span>
            )}
            <button
              onClick={handleSubmitReply}
              disabled={!replyText.trim() && !replyImage}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reply
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ReplyModal;