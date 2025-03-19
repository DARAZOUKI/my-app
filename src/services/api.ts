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
  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (title.length < 5) {
    throw new Error("Title must be at least 5 characters long");
  }

  if (content.length < 10) {
    throw new Error("Content must be at least 10 characters long");
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

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
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};



export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email format");
  }

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);

  return data.token;
};

export const updatePost = async (id: string, title: string, content: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
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