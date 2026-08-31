"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function AdminBlog() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "Kalappura Houseboats",
    category: "travel",
    tags: "",
    published: false,
  });

  const fetchPosts = async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog", { headers: { "x-admin-password": pwd } });
      const json = await res.json();
      if (json.success) {
        setPosts(json.posts);
        setIsAuthenticated(true);
        setStoredPassword(pwd);
      } else {
        setError(json.error || "Unauthorized");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(password);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title),
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "Kalappura Houseboats",
      category: "travel",
      tags: "",
      published: false,
    });
    setEditingPost(null);
    setShowEditor(false);
  };

  const editPost = async (post: BlogPost) => {
    // Fetch full content
    const res = await fetch(`/api/blog/${post.id}`, { headers: { "x-admin-password": storedPassword } });
    const json = await res.json();
    if (json.success) {
      const p = json.post;
      setForm({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.coverImage,
        author: p.author,
        category: p.category,
        tags: p.tags,
        published: p.published,
      });
      setEditingPost(p);
      setShowEditor(true);
    }
  };

  const savePost = async () => {
    setLoading(true);
    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = editingPost ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-password": storedPassword },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.success) {
        resetForm();
        fetchPosts(storedPassword);
      } else {
        alert("Error: " + json.error);
      }
    } catch {
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": storedPassword },
      });
      const json = await res.json();
      if (json.success) fetchPosts(storedPassword);
    } catch {
      alert("Failed to delete post");
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-password": storedPassword },
        body: JSON.stringify({ published: !post.published }),
      });
      const json = await res.json();
      if (json.success) fetchPosts(storedPassword);
    } catch {
      alert("Failed to update");
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-3xl">📝</span>
            <h1 className="font-display text-2xl font-bold text-gray-900 mt-2">Blog Manager</h1>
            <p className="text-sm text-gray-500 mt-1">Kalappura Houseboats</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
            <button type="submit" disabled={loading}
              className="w-full mt-4 py-3 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors disabled:opacity-50">
              {loading ? "Loading..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </form>
        </motion.div>
      </div>
    );
  }

  // Editor view
  if (showEditor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="font-display text-lg font-bold text-gray-900">
              {editingPost ? "Edit Post" : "New Post"}
            </h1>
            <div className="flex items-center gap-3">
              <button onClick={resetForm} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={savePost} disabled={loading}
                className="px-5 py-2 bg-gold-500 text-white text-sm font-medium rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50">
                {loading ? "Saving..." : (editingPost ? "Update" : "Create")}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Main content */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Title</label>
                <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Blog post title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Slug (URL)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">/blog/</span>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Excerpt (SEO description)</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="A brief 1-2 sentence summary for search results..."
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Content (supports HTML)</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your blog post content here. HTML tags supported for formatting..."
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50">
                      <option value="travel">Travel Guide</option>
                      <option value="tips">Tips & Advice</option>
                      <option value="experience">Experience</option>
                      <option value="food">Food & Cuisine</option>
                      <option value="culture">Culture & Heritage</option>
                      <option value="seasonal">Seasonal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Tags (comma separated)</label>
                    <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="alleppey, houseboat, backwaters"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Author</label>
                    <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Cover Image URL</label>
                    <input type="text" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      placeholder="/images/gallery/drone-1.jpg"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="published" checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="w-4 h-4 text-gold-500 rounded" />
                    <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish immediately</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Posts list view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-xs text-gray-500">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              ← Dashboard
            </Link>
            <button onClick={() => { resetForm(); setShowEditor(true); }}
              className="px-5 py-2 bg-gold-500 text-white text-sm font-semibold rounded-lg hover:bg-gold-600 transition-colors">
              + New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No blog posts yet</p>
            <p className="text-gray-400 text-sm">Click &quot;+ New Post&quot; to create your first article.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-sm transition-shadow">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-gray-400">{post.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                  <p className="text-sm text-gray-500 truncate">/blog/{post.slug}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => togglePublish(post)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${post.published ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`}>
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => editPost(post)}
                    className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => deletePost(post.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
