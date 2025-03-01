import { useEffect, useState } from "react";
import * as api  from "../services/api";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the styles

interface Post {
  _id: string;
  title: string;
  content: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.getPosts()
      .then((response) => setPosts(response))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="container">
      <h1>All Blog Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 120)}...</p>
            <Link className="read-more" to={`/posts/${post._id}`}>
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
