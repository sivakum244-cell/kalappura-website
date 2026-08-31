"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GuestPhoto {
  id: string;
  guestName: string;
  bookingId: string;
  caption: string;
  imageUrl: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export default function AdminPhotos() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const fetchPhotos = async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/guest-photos", { headers: { "x-admin-password": pwd } });
      const json = await res.json();
      if (json.success) {
        setPhotos(json.photos);
        setIsAuthenticated(true);
        setStoredPassword(pwd);
      } else {
        setError("Unauthorized");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPhotos(password);
  };

  const updatePhoto = async (id: string, data: { approved?: boolean; featured?: boolean }) => {
    try {
      const res = await fetch(`/api/guest-photos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-password": storedPassword },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) fetchPhotos(storedPassword);
    } catch { alert("Failed to update"); }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    try {
      const res = await fetch(`/api/guest-photos/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": storedPassword },
      });
      const json = await res.json();
      if (json.success) fetchPhotos(storedPassword);
    } catch { alert("Failed to delete"); }
  };

  const filteredPhotos = photos.filter((p) => {
    if (filter === "pending") return !p.approved;
    if (filter === "approved") return p.approved;
    return true;
  });

  const pendingCount = photos.filter((p) => !p.approved).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-3xl">📷</span>
            <h1 className="font-display text-2xl font-bold text-gray-900 mt-2">Guest Photos</h1>
            <p className="text-sm text-gray-500">Review & approve submissions</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="Admin password"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">Guest Photo Management</h1>
            <p className="text-xs text-gray-500">{photos.length} total • {pendingCount} pending approval</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">← Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-gold-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {f === "all" ? "All" : f === "pending" ? `Pending (${pendingCount})` : "Approved"}
            </button>
          ))}
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No photos {filter !== "all" ? `(${filter})` : ""}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="relative h-40">
                  <img src={photo.imageUrl} alt={photo.caption || photo.guestName} className="w-full h-full object-cover" />
                  {!photo.approved && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  )}
                  {photo.featured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-gold-100 text-gold-800 text-xs font-medium rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-medium text-gray-900 text-sm">{photo.guestName}</p>
                  {photo.caption && <p className="text-xs text-gray-500 truncate">{photo.caption}</p>}
                  <p className="text-xs text-gray-400 mt-1">{new Date(photo.createdAt).toLocaleDateString()}</p>

                  <div className="flex gap-1.5 mt-3">
                    {!photo.approved ? (
                      <button onClick={() => updatePhoto(photo.id, { approved: true })}
                        className="flex-1 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-200">
                        ✓ Approve
                      </button>
                    ) : (
                      <button onClick={() => updatePhoto(photo.id, { approved: false })}
                        className="flex-1 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-lg hover:bg-yellow-200">
                        Hide
                      </button>
                    )}
                    <button onClick={() => updatePhoto(photo.id, { featured: !photo.featured })}
                      className="py-1.5 px-2 bg-gold-50 text-gold-700 text-xs font-medium rounded-lg hover:bg-gold-100">
                      ⭐
                    </button>
                    <button onClick={() => deletePhoto(photo.id)}
                      className="py-1.5 px-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100">
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
