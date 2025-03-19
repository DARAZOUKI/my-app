import { useState, useEffect, useContext } from "react";
import * as api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostItem from "../components/PostItem";


interface Post {
  _id: string;
  title: string;
  content: string;
}

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.token) {
      navigate("/");
    }
  }, [auth?.token, navigate]);

  useEffect(() => {
    api.getPosts()
      .then((response) => setPosts(response))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const validateInputs = () => {
    let isValid = true;

    if (!title) {
      setTitleError("Title is required.");
      isValid = false;
    } else if (title.length < 5) {
      setTitleError("Title must be at least 5 characters long.");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (!content) {
      setContentError("Content is required.");
      isValid = false;
    } else if (content.length < 10) {
      setContentError("Content must be at least 10 characters long.");
      isValid = false;
    } else {
      setContentError(null);
    }

    return isValid;
  };

  const handleCreatePost = async () => {
    if (!validateInputs()) return; // Stop if validation fails

    try {
      const newPost = await api.createPost(title, content);
      setPosts([...posts, newPost]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)));
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p className="error">{titleError}</p>}
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {contentError && <p className="error">{contentError}</p>}
      </div>
      <button onClick={handleCreatePost}>Create Post</button>

      <h2>Your Posts</h2>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onDelete={handleDeletePost} onUpdate={handleUpdatePost} />
      ))}
    </div>
  );
}

export default Dashboard;
