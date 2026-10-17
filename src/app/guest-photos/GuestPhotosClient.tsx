"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GuestPhoto {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
  createdAt: string;
}

export default function GuestPhotosClient() {
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GuestPhoto | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/guest-photos");
      const json = await res.json();
      if (json.success) setPhotos(json.photos);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("guestName", name.trim());
      formData.append("caption", caption.trim());

      const res = await fetch("/api/guest-photos", { method: "POST", body: formData });
      const json = await res.json();

      if (json.success) {
        setSuccess(true);
        setName("");
        setCaption("");
        setFile(null);
        setPreview("");
        setTimeout(() => { setSuccess(false); setShowUpload(false); }, 3000);
      } else {
        alert(json.error || "Upload failed");
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Share CTA button (rendered under the server H1/intro) */}
      <div className="text-center">
        <button
          onClick={() => setShowUpload(true)}
          className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
        >
          📷 Share Your Photos
        </button>
      </div>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => !uploading && setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg aria-hidden="true" focusable="false" className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900">Thank you!</h3>
                  <p className="text-gray-500 text-sm mt-2">Your photo has been submitted for review. It will appear in the gallery once approved.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Share Your Photo</h2>
                  <p className="text-sm text-gray-500 mb-5">Upload a photo from your houseboat experience. It will be reviewed before publishing.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Your Name *</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder="e.g. Sarah & James"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Caption (optional)</label>
                      <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}
                        placeholder="e.g. Sunset from the deck"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Photo * (JPG, PNG, WebP — max 10MB)</label>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={handleFileChange}
                        required
                        className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100" />
                    </div>

                    {preview && (
                      <div className="relative h-40 rounded-xl overflow-hidden">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setShowUpload(false)} disabled={uploading}
                      className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
                      Cancel
                    </button>
                    <button type="submit" disabled={uploading || !file || !name.trim()}
                      className="flex-1 py-2.5 bg-amber-600 text-white font-semibold rounded-xl text-sm hover:bg-amber-700 transition-colors disabled:opacity-50">
                      {uploading ? "Uploading..." : "Submit Photo"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No guest photos yet</p>
            <p className="text-gray-400 text-sm mb-6">Be the first to share your houseboat experience!</p>
            <button onClick={() => setShowUpload(true)}
              className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
              📷 Upload a Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img src={photo.imageUrl} alt={photo.caption || `Photo by ${photo.guestName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{photo.guestName}</p>
                  {photo.caption && <p className="text-white/70 text-xs">{photo.caption}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto.imageUrl} alt={selectedPhoto.caption || `Photo by ${selectedPhoto.guestName}`}
                className="w-full h-full object-contain rounded-xl" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white font-medium">{selectedPhoto.guestName}</p>
                {selectedPhoto.caption && <p className="text-white/70 text-sm">{selectedPhoto.caption}</p>}
              </div>
              <button onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30">
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="bg-sand-50 py-12 px-4 text-center">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Stayed with us?</h2>
        <p className="text-gray-600 text-sm mb-4">Share your photos and help other travellers see the real experience.</p>
        <button onClick={() => setShowUpload(true)}
          className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm">
          📷 Share Your Photos
        </button>
      </section>
    </>
  );
}
