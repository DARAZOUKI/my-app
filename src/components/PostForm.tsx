import { useState } from "react";

interface PostFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
  buttonText: string;
}

const PostForm: React.FC<PostFormProps> = ({ initialTitle = "", initialContent = "", onSubmit, buttonText }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default PostForm;
