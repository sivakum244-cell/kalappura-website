"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRoomName, formatBookingDate, formatDateTime, STATUS_COLORS, type BookingStatus } from "@/lib/booking-utils";

interface Booking {
  id: string;
  bookingId: string;
  guestName: string;
  mobile: string;
  email: string;
  country: string;
  checkIn: string;
  checkOut: string;
  eta: string;
  adults: number;
  children: number;
  infants: number;
  roomType: string;
  numberOfRooms: number;
  foodRequirements: string;
  specialRequests: string;
  additionalNotes: string;
  paymentPreference: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0 });
  const [loginError, setLoginError] = useState("");
  const [blockedDatesList, setBlockedDatesList] = useState<{id: string; date: string; roomType: string; reason: string}[]>([]);

  async function loadBookings(pwd: string, filter?: string, searchTerm?: string) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const f = filter ?? statusFilter;
      const s = searchTerm ?? "";
      if (f !== "all") params.set("status", f);
      if (s) params.set("search", s);
      params.set("limit", "100");

      const res = await fetch(`/api/bookings?${params}`, {
        headers: { "x-admin-password": pwd },
      });
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
        const all = data.bookings;
        setStats({
          total: all.length,
          pending: all.filter((b: Booking) => b.status === "Pending").length,
          confirmed: all.filter((b: Booking) => b.status === "Confirmed").length,
          cancelled: all.filter((b: Booking) => b.status === "Cancelled").length,
        });
        return true;
      } else {
        if (data.error === "Unauthorized") {
          setLoginError("Wrong password. Please try again.");
          setIsAuthenticated(false);
        }
        return false;
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = await loadBookings(password);
    if (success) {
      setStoredPassword(password);
      setIsAuthenticated(true);
      loadBlockedDates(password);
    }
  };

  async function loadBlockedDates(pwd?: string) {
    try {
      const res = await fetch("/api/blocked-dates", {
        headers: { "x-admin-password": pwd || storedPassword },
      });
      const data = await res.json();
      if (data.success && data.raw) {
        setBlockedDatesList(data.raw);
      }
    } catch (err) {
      console.error("Failed to load blocked dates:", err);
    }
  }

  const handleSearch = () => {
    loadBookings(storedPassword, statusFilter, search);
  };

  const handleFilterChange = (newFilter: string) => {
    setStatusFilter(newFilter);
    loadBookings(storedPassword, newFilter, search);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-password": storedPassword },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        loadBookings(storedPassword);
        if (selectedBooking?.id === id) setSelectedBooking({ ...selectedBooking, status });
      }
    } catch (err) { console.error("Failed to update:", err); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": storedPassword },
      });
      const data = await res.json();
      if (data.success) {
        loadBookings(storedPassword);
        if (selectedBooking?.id === id) setSelectedBooking(null);
      }
    } catch (err) { console.error("Failed to delete:", err); }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-sm text-gray-500 mt-1">Kalappura Houseboats & Tours</p>
          </div>
          <form onSubmit={handleLogin}>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              placeholder="Enter admin password" />
            <button type="submit" className="w-full mt-4 py-3 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors">
              {loading ? "Checking..." : "Login"}
            </button>
            {loginError && <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>}
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">Booking Dashboard</h1>
            <p className="text-xs text-gray-500">Kalappura Houseboats & Tours</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin/calendar" className="px-3 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors">
              📅 Calendar
            </a>
            <button onClick={() => loadBookings(storedPassword)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors" title="Refresh">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
            </button>
            <a href="/" className="text-sm text-gray-500 hover:text-gold-600 transition-colors">← Site</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Bookings", value: stats.total, color: "bg-blue-50 text-blue-700" },
            { label: "Pending", value: stats.pending, color: "bg-yellow-50 text-yellow-700" },
            { label: "Confirmed", value: stats.confirmed, color: "bg-emerald-50 text-emerald-700" },
            { label: "Cancelled", value: stats.cancelled, color: "bg-red-50 text-red-700" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input type="text" placeholder="Search by name, booking ID, phone..." value={search}
            onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
          <select value={statusFilter} onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleSearch} className="px-5 py-2.5 bg-gold-500 text-white rounded-xl text-sm font-medium hover:bg-gold-600 transition-colors">
            Search
          </button>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="animate-spin w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No bookings found</p>
            <p className="text-sm mt-1">Bookings will appear here when guests submit the form.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Booking ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Guest</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Room</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Check-in</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedBooking(booking)} className="text-gold-600 font-mono text-xs font-semibold hover:underline">
                          {booking.bookingId}
                        </button>
                        <p className="text-[10px] text-gray-400 mt-0.5">{formatDateTime(booking.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{booking.guestName}</p>
                        <p className="text-xs text-gray-500">{booking.mobile}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-gray-700">{getRoomName(booking.roomType)}</p>
                        <p className="text-xs text-gray-400">{booking.numberOfRooms} room(s) • {booking.adults + booking.children} guests</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-700">
                        {formatBookingDate(booking.checkIn)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[booking.status as BookingStatus] || "bg-gray-100 text-gray-600"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setSelectedBooking(booking)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600" title="View">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          {booking.status === "Pending" && (
                            <button onClick={() => updateStatus(booking.id, "Confirmed")} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600" title="Confirm">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                            </button>
                          )}
                          <button onClick={() => deleteBooking(booking.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" title="Delete">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Block Dates Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-gray-200">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📅 Block / Unblock Dates
            <span className="text-xs font-normal text-gray-500">(Block dates when booked on Booking.com)</span>
          </h2>

          {/* Add Block Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">From Date</label>
              <input type="date" id="blockFromDate"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">To Date</label>
              <input type="date" id="blockToDate"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Houseboat</label>
              <select id="blockRoomType"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                <option value="all">All Boats</option>
                <option value="standard-cabin">3 Bedroom Houseboat</option>
                <option value="double-twin-room">2 Bedroom Houseboat</option>
                <option value="suite-river-view">Single Bedroom Houseboat</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={async () => {
                  const fromEl = document.getElementById("blockFromDate") as HTMLInputElement;
                  const toEl = document.getElementById("blockToDate") as HTMLInputElement;
                  const roomEl = document.getElementById("blockRoomType") as HTMLSelectElement;
                  if (!fromEl.value || !toEl.value) { alert("Select both dates"); return; }
                  
                  // Generate date range
                  const dates: string[] = [];
                  const start = new Date(fromEl.value);
                  const end = new Date(toEl.value);
                  const current = new Date(start);
                  while (current <= end) {
                    dates.push(current.toISOString().split("T")[0]);
                    current.setDate(current.getDate() + 1);
                  }

                  const res = await fetch("/api/blocked-dates", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "x-admin-password": storedPassword },
                    body: JSON.stringify({ dates, roomType: roomEl.value, reason: "Booked on Booking.com" }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert(`✅ ${data.message}`);
                    loadBlockedDates();
                  } else {
                    alert("Failed: " + data.error);
                  }
                }}
                className="w-full px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Block Dates
              </button>
            </div>
          </div>

          {/* Blocked Dates List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Currently Blocked Dates</h3>
              <button onClick={loadBlockedDates} className="text-xs text-gold-600 hover:text-gold-700">Refresh</button>
            </div>
            {blockedDatesList.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No dates blocked. All dates are available for booking.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-1.5">
                {blockedDatesList.map((bd) => (
                  <div key={bd.id} className="flex items-center justify-between p-2.5 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-gray-800">{bd.date}</span>
                      <span className="text-xs text-gray-500">
                        {bd.roomType === "all" ? "All Boats" : bd.roomType === "standard-cabin" ? "3BR" : bd.roomType === "double-twin-room" ? "2BR" : "1BR"}
                      </span>
                      <span className="text-xs text-gray-400">— {bd.reason}</span>
                    </div>
                    <button
                      onClick={async () => {
                        const res = await fetch("/api/blocked-dates", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json", "x-admin-password": storedPassword },
                          body: JSON.stringify({ id: bd.id }),
                        });
                        const data = await res.json();
                        if (data.success) loadBlockedDates();
                      }}
                      className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 hover:bg-red-100 rounded"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 pt-20 overflow-y-auto"
            onClick={() => setSelectedBooking(null)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold text-gray-900">{selectedBooking.bookingId}</h2>
                  <p className="text-xs text-gray-500">Created: {formatDateTime(selectedBooking.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[selectedBooking.status as BookingStatus] || "bg-gray-100"}`}>
                    {selectedBooking.status}
                  </span>
                  <button onClick={() => setSelectedBooking(null)} className="p-1 rounded-lg hover:bg-gray-200 text-gray-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Guest Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">👤 Guest Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Name:</span> <span className="font-medium">{selectedBooking.guestName}</span></div>
                    <div><span className="text-gray-500">Phone:</span> <a href={`tel:${selectedBooking.mobile}`} className="font-medium text-gold-600">{selectedBooking.mobile}</a></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedBooking.email || "—"}</span></div>
                    <div><span className="text-gray-500">Country:</span> <span className="font-medium">{selectedBooking.country}</span></div>
                  </div>
                </div>

                {/* Stay */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">📅 Stay Details</h3>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div><span className="text-gray-500">Check-in:</span><br/><span className="font-medium">{formatBookingDate(selectedBooking.checkIn)}</span></div>
                    <div><span className="text-gray-500">Check-out:</span><br/><span className="font-medium">{formatBookingDate(selectedBooking.checkOut)}</span></div>
                    <div><span className="text-gray-500">ETA:</span><br/><span className="font-medium">{selectedBooking.eta}</span></div>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">👥 Guests</h3>
                  <p className="text-sm">{selectedBooking.adults} Adults, {selectedBooking.children} Children, {selectedBooking.infants} Infants</p>
                </div>

                {/* Room */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">🏠 Accommodation</h3>
                  <p className="text-sm"><span className="font-medium">{getRoomName(selectedBooking.roomType)}</span> × {selectedBooking.numberOfRooms} room(s)</p>
                  <p className="text-sm text-gray-500">Payment: {selectedBooking.paymentPreference}</p>
                </div>

                {/* Food */}
                {selectedBooking.foodRequirements && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">🍽️ Food Requirements</h3>
                    <p className="text-sm">{selectedBooking.foodRequirements}</p>
                  </div>
                )}

                {/* Requests */}
                {selectedBooking.specialRequests && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">✨ Special Requests</h3>
                    <p className="text-sm">{selectedBooking.specialRequests}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedBooking.additionalNotes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">📝 Additional Notes</h3>
                    <p className="text-sm text-gray-700">{selectedBooking.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer - Actions */}
              <div className="border-t bg-gray-50 px-6 py-4 flex flex-wrap gap-2">
                {selectedBooking.status !== "Confirmed" && (
                  <button onClick={() => updateStatus(selectedBooking.id, "Confirmed")}
                    className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                    ✓ Confirm
                  </button>
                )}
                {selectedBooking.status !== "Cancelled" && (
                  <button onClick={() => updateStatus(selectedBooking.id, "Cancelled")}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                    ✗ Cancel
                  </button>
                )}
                {selectedBooking.status !== "Completed" && (
                  <button onClick={() => updateStatus(selectedBooking.id, "Completed")}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                    ✓ Complete
                  </button>
                )}
                {selectedBooking.status !== "Pending" && (
                  <button onClick={() => updateStatus(selectedBooking.id, "Pending")}
                    className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition-colors">
                    ↺ Pending
                  </button>
                )}
                <a href={`https://wa.me/${selectedBooking.mobile.replace(/[^0-9]/g, "")}?text=Hi ${selectedBooking.guestName}, regarding your booking ${selectedBooking.bookingId}...`}
                  target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#20BA5A] transition-colors">
                  WhatsApp
                </a>
                <button onClick={() => deleteBooking(selectedBooking.id)}
                  className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors ml-auto">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
