const API_URL = "http://localhost:5000/api";

export const getPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
};

export const getPost = async (id: string | undefined) => {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
};
export const createPost = async (title: string, content: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
};

export const registerUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
};

export const loginUser = async (email: any, password: any) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data.token;
};

export const deletePost = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
};

