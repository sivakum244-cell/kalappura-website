"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface GuestPhoto {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
}

export default function GuestPhotosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch("/api/guest-photos")
      .then((r) => r.json())
      .then((json) => { if (json.success) setPhotos(json.photos.slice(0, 8)); })
      .catch(() => {});
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
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
        setName(""); setCaption(""); setFile(null); setPreview("");
        setTimeout(() => { setSuccess(false); setShowUpload(false); }, 3000);
      } else { alert(json.error || "Upload failed"); }
    } catch { alert("Upload failed"); }
    finally { setUploading(false); }
  };

  return (
    <section className="section-padding bg-sand-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
            Guest Memories
          </span>
          <h2 className="section-title">Photos from Our Guests</h2>
          <p className="section-subtitle mx-auto">
            Real moments captured during houseboat stays on the Kerala backwaters.
          </p>
        </motion.div>

        {/* Photo Grid (show up to 8) */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img src={photo.imageUrl} alt={photo.caption || `Photo by ${photo.guestName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium truncate">{photo.guestName}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors text-sm flex items-center gap-2"
          >
            📷 Share Your Photos
          </button>
          {photos.length > 0 && (
            <Link href="/guest-photos"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gold-400 transition-colors text-sm">
              View All Guest Photos
            </Link>
          )}
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
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
                  <p className="text-gray-500 text-sm mt-2">Your photo will appear after approval.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Share Your Photo</h2>
                  <p className="text-sm text-gray-500 mb-5">Upload a photo from your houseboat experience.</p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="gp-name" className="text-xs font-medium text-gray-600 block mb-1">Your Name *</label>
                      <input id="gp-name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder="e.g. Sarah & James"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                    </div>
                    <div>
                      <label htmlFor="gp-caption" className="text-xs font-medium text-gray-600 block mb-1">Caption (optional)</label>
                      <input id="gp-caption" name="caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)}
                        placeholder="e.g. Sunset from the deck"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                    </div>
                    <div>
                      <label htmlFor="gp-photo" className="text-xs font-medium text-gray-600 block mb-1">Photo * (max 10MB)</label>
                      <input id="gp-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={handleFileChange} required
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
                      className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 disabled:opacity-50">
                      Cancel
                    </button>
                    <button type="submit" disabled={uploading || !file || !name.trim()}
                      className="flex-1 py-2.5 bg-amber-600 text-white font-semibold rounded-xl text-sm hover:bg-amber-700 disabled:opacity-50">
                      {uploading ? "Uploading..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
