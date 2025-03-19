import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../services/api";

interface Post {
  _id: string;
  title: string;
  content: string;
}

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    api.getPost(id) 
      .then((response) => setPost(response)) // No "data" key
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);
  

  if (!post) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;