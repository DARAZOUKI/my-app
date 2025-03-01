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
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
const [editTitle, setEditTitle] = useState("");
const [editContent, setEditContent] = useState("");


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
  const startEditing = (post: Post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };
  

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
  const handleUpdatePost = async () => {
    if (!editingPostId) return;
  
    try {
      const updatedPost = await api.updatePost(editingPostId, editTitle, editContent);
      setPosts(posts.map((post) => (post._id === editingPostId ? updatedPost : post)));
      setEditingPostId(null);
      setEditTitle("");
      setEditContent("");
    } catch (error) {
      console.error("Error updating post:", error);
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
    {editingPostId === post._id ? (
      <div>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        <button onClick={handleUpdatePost}>Save</button>
        <button onClick={() => setEditingPostId(null)}>Cancel</button>
      </div>
    ) : (
      <div>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}...</p>
        <button onClick={() => startEditing(post)}>Edit</button>
        <button onClick={() => handleDeletePost(post._id)}>Delete</button>
      </div>
    )}
  </div>
))}

    </div>
  );
}

export default Dashboard;
