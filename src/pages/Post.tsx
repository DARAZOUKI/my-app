import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/api";
interface Post {
    title: string;
    content: string;
  }
const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    getPost(id).then(setPost);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
