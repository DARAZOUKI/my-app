import { useState } from "react";
import * as api from "../services/api";

interface Post {
  _id: string;
  title: string;
  content: string;
}

interface Props {
  post: Post;
  onDelete: (id: string) => void;
  onUpdate: (updatedPost: Post) => void;
}

function PostItem({ post, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

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

  const handleUpdate = async () => {
    if (!validateInputs()) return;

    try {
      const updatedPost = await api.updatePost(post._id, title, content);
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deletePost(post._id);
      onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post-item">
      {isEditing ? (
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {titleError && <p className="error">{titleError}</p>}
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          {contentError && <p className="error">{contentError}</p>}
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostItem;
