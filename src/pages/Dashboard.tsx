import { useState, useEffect, useContext } from "react";
import * as api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "./Dashboard.css";

interface Post {
  _id: string;
  title: string;
  content: string;
}

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext); // Get authentication context

  // 🔹 Redirect to home if not logged in
  useEffect(() => {
    if (!auth?.token) {
      navigate("/");
    }
  }, [auth?.token, navigate]); // Runs when token changes

  useEffect(() => {
    api.getPosts() 
      .then((response) => setPosts(response))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  

  const handleCreatePost = async () => {
    try {
      const newPost = await api.createPost(title, content); // Call createPost
      setPosts([...posts, newPost]); // Add new post to state
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  const handleDeletePost = async (id: string) => {
    try {
      await api.deletePost(id); 
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleCreatePost}>Create Post</button>

      <h2>Your Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
