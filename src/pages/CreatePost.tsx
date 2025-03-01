import React, { useState } from "react";
import axios from "axios";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      if (!token) {
        setError("You must be logged in to create a post.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created:", response.data);
      setTitle("");
      setContent("");
      setError("");
    } catch (error) {
      console.error("Error creating post", error);
      setError("Failed to create post. Please check your input.");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
