
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const [userResponse, postResponse] = await Promise.all([
        axios.get(`${API}/users`),
        axios.get(`${API}/posts`)
      ]);

      setUsers(userResponse.data.users || userResponse.data);
      setPosts(postResponse.data.posts || postResponse.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
         "Failed to load data. Please check the backend connection."
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API}/users`, {
        name,
        email
      });

      const newUser = response.data.user;
      setUsers((previous) => [...previous, newUser]);
      setUserId(newUser._id);
      setName("");
      setEmail("");
      setMessage("User successfully created!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${API}/posts`, {
        title,
        content,
        userId
      });

      setTitle("");
      setContent("");
      setMessage("Post successfully published!");
      await loadData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||  "Failed to create post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand">PostSpace</div>
        <p>Simple Post Management</p>
      </header>

      <main className="container">
        <section className="welcome">
          <h1>Manage Your Posts</h1>
          <p>Create users, publish posts and view their authors.</p>
        </section>

        {message && (
          <div className="message" role="status">
            {message}
          </div>
        )}

        <div className="forms">
          <section className="card">
            <h2>Create User</h2>
            <form onSubmit={addUser}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />

              <button disabled={loading} type="submit">
                {loading ? "Please wait..." : "Create User"}
              </button>
            </form>
          </section>

          <section className="card">
            <h2>Create Post</h2>
            <form onSubmit={addPost}>
              <label htmlFor="title">Post Title</label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />

              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
                rows="4"
                required
              />

              <label htmlFor="author">Select Author</label>
              <select
                id="author"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value="">Choose a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>

              <button disabled={loading || users.length === 0} type="submit">
                {loading ? "Please wait..." : "Publish Post"}
              </button>

              {users.length === 0 && (
                <p className="hint">Create a user before publishing a post.</p>
              )}
            </form>
          </section>
        </div>

        <section className="posts-section">
          <div className="section-heading">
            <h2>All Posts</h2>
            <button className="refresh" onClick={loadData} type="button">
              Refresh
            </button>
          </div>

          {posts.length === 0 ? (
            <p className="empty">No posts yet. Create your first post!</p>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <article className="post-card" key={post._id}>
                  <h3>{post.title}</h3>
                  <p className="post-content">{post.content}</p>
                  <div className="author">
                    <div className="avatar">
                      {post.user?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <strong>{post.user?.name || "Unknown user"}</strong>
                      <p>{post.user?.email || "No email available"}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>PostSpace · Built with React, Express and MongoDB</footer>
    </div>
  );
}

export default App;
