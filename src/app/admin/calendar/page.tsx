"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlockedDate {
  id: string;
  date: string;
  roomType: string;
  reason: string;
}

interface Booking {
  id: string;
  bookingId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: string;
}

const BOATS = [
  { id: "standard-cabin", name: "3 Bedroom", color: "bg-blue-500", lightColor: "bg-blue-100 text-blue-800" },
  { id: "double-twin-room", name: "2 Bedroom", color: "bg-emerald-500", lightColor: "bg-emerald-100 text-emerald-800" },
  { id: "suite-river-view", name: "1 Bedroom", color: "bg-purple-500", lightColor: "bg-purple-100 text-purple-800" },
];

export default function CalendarPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPwd, setStoredPwd] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedBoat, setSelectedBoat] = useState("all");
  const [blockReason, setBlockReason] = useState("Booked on Booking.com");
  const [loading, setLoading] = useState(false);

  // Auto-login from localStorage if already authenticated on /admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adminPwd");
      if (saved) {
        setStoredPwd(saved);
        setIsAuth(true);
        loadData(saved);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStoredPwd(password);
    setIsAuth(true);
    loadData(password);
    if (typeof window !== "undefined") localStorage.setItem("adminPwd", password);
  };

  async function loadData(pwd?: string) {
    const p = pwd || storedPwd;
    setLoading(true);
    try {
      // Load blocked dates
      const bdRes = await fetch("/api/blocked-dates");
      const bdData = await bdRes.json();
      if (bdData.success) setBlockedDates(bdData.raw || []);

      // Load bookings
      const bRes = await fetch("/api/bookings?limit=100", {
        headers: { "x-admin-password": p },
      });
      const bData = await bRes.json();
      if (bData.success) setBookings(bData.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function blockDate(date: string, roomType: string) {
    await fetch("/api/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": storedPwd },
      body: JSON.stringify({ dates: [date], roomType, reason: blockReason }),
    });
    loadData();
  }

  async function unblockDate(id: string) {
    await fetch("/api/blocked-dates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": storedPwd },
      body: JSON.stringify({ id }),
    });
    loadData();
  }

  // Calendar helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const monthName = currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  function getDateStr(day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function isBlocked(date: string, roomType: string): BlockedDate | undefined {
    return blockedDates.find(
      (bd) => bd.date === date && (bd.roomType === roomType || bd.roomType === "all")
    );
  }

  function getBookingsForDate(date: string): Booking[] {
    return bookings.filter((b) => {
      return b.checkIn <= date && b.checkOut > date && b.status !== "Cancelled";
    });
  }

  function getDayStatus(day: number, roomType: string) {
    const date = getDateStr(day);
    const blocked = isBlocked(date, roomType);
    const dayBookings = getBookingsForDate(date).filter(
      (b) => b.roomType === roomType
    );
    
    if (blocked) return "blocked";
    if (dayBookings.length > 0) return "booked";
    return "available";
  }

  // Login screen
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold text-gray-900">Calendar Manager</h1>
            <p className="text-sm text-gray-500 mt-1">Kalappura Houseboats</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              placeholder="Admin password" />
            <button type="submit" className="w-full mt-4 py-3 bg-gold-500 text-white font-semibold rounded-xl hover:bg-gold-600 transition-colors">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">📅 Calendar & Availability</h1>
            <p className="text-xs text-gray-500">Manage pricing, bookings & blocked dates</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => loadData()} className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              🔄 Refresh
            </button>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gold-600">← Bookings</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium">
            ← Previous
          </button>
          <h2 className="font-display text-2xl font-bold text-gray-900">{monthName}</h2>
          <button onClick={nextMonth} className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium">
            Next →
          </button>
        </div>

        {/* Boat Filter */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setSelectedBoat("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedBoat === "all" ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
            All Boats
          </button>
          {BOATS.map((boat) => (
            <button key={boat.id} onClick={() => setSelectedBoat(boat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedBoat === boat.id ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
              {boat.name}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 p-3 bg-white rounded-xl border border-gray-100">
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Available</span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-300" /> Booked (Your Site)</span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-red-100 border border-red-300" /> Blocked</span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-300" /> Past</span>
        </div>

        {/* Calendar Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading calendar...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-2 text-center text-xs font-semibold text-gray-600">{d}</div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfWeek }, (_, i) => (
                <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-gray-100 bg-gray-50/50" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = getDateStr(day);
                const today = new Date().toISOString().split("T")[0];
                const isPast = dateStr < today;
                const isToday = dateStr === today;
                const isSelected = selectedDate === dateStr;
                const dayOfWeek = new Date(dateStr).getDay();
                const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

                // Get status for filtered boats
                const boatsToShow = selectedBoat === "all" ? BOATS : BOATS.filter(b => b.id === selectedBoat);

                return (
                  <div
                    key={day}
                    onClick={() => !isPast && setSelectedDate(isSelected ? null : dateStr)}
                    className={`min-h-[100px] border-b border-r border-gray-100 p-1.5 cursor-pointer transition-all hover:bg-blue-50/50 ${
                      isPast ? "bg-gray-50 opacity-50" : ""
                    } ${isSelected ? "ring-2 ring-blue-500 ring-inset bg-blue-50" : ""} ${
                      isWeekend && !isPast ? "bg-orange-50/30" : ""
                    }`}
                  >
                    <div className={`text-xs font-semibold mb-1 ${isToday ? "text-blue-600" : isWeekend ? "text-orange-600" : "text-gray-700"}`}>
                      {day}
                      {isToday && <span className="ml-1 text-[10px] text-blue-500">Today</span>}
                    </div>

                    {/* Boat status indicators */}
                    <div className="space-y-0.5">
                      {boatsToShow.map((boat) => {
                        const status = getDayStatus(day, boat.id);
                        const dayBookings = getBookingsForDate(dateStr).filter(b => b.roomType === boat.id);
                        
                        return (
                          <div key={boat.id} className={`text-[9px] px-1 py-0.5 rounded flex items-center justify-between ${
                            status === "blocked" ? "bg-red-100 text-red-700" :
                            status === "booked" ? "bg-blue-100 text-blue-700" :
                            "bg-emerald-50 text-emerald-700"
                          }`}>
                            <span className="truncate">{selectedBoat === "all" ? boat.name.split(" ")[0] : boat.name}</span>
                            <span className="font-medium">
                              {status === "blocked" ? "✗" : status === "booked" ? `${dayBookings.length}B` : "✓"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Date Panel */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </h3>
                <p className="text-xs text-gray-500">Manage availability for this date</p>
              </div>
              <button onClick={() => setSelectedDate(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="p-6">
              {/* Status for each boat */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {BOATS.map((boat) => {
                  const totalRooms = boat.id === "standard-cabin" ? 3 : boat.id === "double-twin-room" ? 2 : 1;
                  const blocked = isBlocked(selectedDate, boat.id);
                  const dayBookings = getBookingsForDate(selectedDate).filter(b => b.roomType === boat.id);
                  
                  // Count blocked rooms for this boat on this date
                  const blockedRooms = blockedDates.filter(
                    bd => bd.date === selectedDate && (bd.roomType === boat.id || bd.roomType === "all" || bd.roomType === `${boat.id}-room`)
                  );
                  const roomBlockedCount = blockedRooms.filter(bd => bd.roomType.includes("-room")).length;
                  const isFullyBlocked = blocked || roomBlockedCount >= totalRooms;
                  const availableRooms = totalRooms - roomBlockedCount - dayBookings.length;
                  
                  const status = isFullyBlocked ? "blocked" : dayBookings.length > 0 || roomBlockedCount > 0 ? "partial" : "available";

                  return (
                    <div key={boat.id} className={`p-4 rounded-xl border-2 ${
                      status === "blocked" ? "border-red-200 bg-red-50" :
                      status === "partial" ? "border-yellow-200 bg-yellow-50" :
                      "border-emerald-200 bg-emerald-50"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-gray-900">{boat.name}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          status === "blocked" ? "bg-red-200 text-red-800" :
                          status === "partial" ? "bg-yellow-200 text-yellow-800" :
                          "bg-emerald-200 text-emerald-800"
                        }`}>
                          {status === "blocked" ? "Fully Blocked" : status === "partial" ? `${availableRooms}/${totalRooms} Available` : `${totalRooms}/${totalRooms} Available`}
                        </span>
                      </div>

                      {/* Room-level status */}
                      <div className="space-y-1.5 mb-3">
                        {Array.from({ length: totalRooms }, (_, ri) => {
                          const roomNum = ri + 1;
                          const roomBlockId = `${boat.id}-room`;
                          const roomBlocked = blockedDates.find(
                            bd => bd.date === selectedDate && bd.roomType === roomBlockId && bd.reason.includes(`Room ${roomNum}`)
                          );
                          const roomBooked = dayBookings.length > ri;

                          return (
                            <div key={ri} className={`flex items-center justify-between px-2 py-1 rounded text-xs ${
                              roomBlocked ? "bg-red-100 text-red-700" :
                              roomBooked ? "bg-blue-100 text-blue-700" :
                              blocked ? "bg-red-100 text-red-700" :
                              "bg-emerald-50 text-emerald-700"
                            }`}>
                              <span>Room {roomNum}</span>
                              <span className="font-medium">
                                {roomBlocked ? "Blocked" : roomBooked ? "Booked" : blocked ? "Blocked" : "Available"}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bookings for this boat */}
                      {dayBookings.map((b) => (
                        <p key={b.id} className="text-xs text-blue-700 mb-1">
                          📋 {b.guestName} ({b.bookingId})
                        </p>
                      ))}

                      {/* Block individual rooms */}
                      {!blocked && (
                        <div className="mt-2 space-y-1">
                          {Array.from({ length: totalRooms }, (_, ri) => {
                            const roomNum = ri + 1;
                            const roomBlockId = `${boat.id}-room`;
                            const roomBlocked = blockedDates.find(
                              bd => bd.date === selectedDate && bd.roomType === roomBlockId && bd.reason.includes(`Room ${roomNum}`)
                            );

                            return (
                              <div key={ri} className="flex items-center gap-1">
                                {roomBlocked ? (
                                  <button onClick={() => unblockDate(roomBlocked.id)}
                                    className="flex-1 py-1 bg-white border border-red-200 text-red-600 text-[10px] font-medium rounded hover:bg-red-50 transition-colors">
                                    Unblock Room {roomNum}
                                  </button>
                                ) : (
                                  <button
                                    className="flex-1 py-1 bg-orange-500 text-white text-[10px] font-medium rounded hover:bg-orange-600 transition-colors"
                                    onClick={() => {
                                      fetch("/api/blocked-dates", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json", "x-admin-password": storedPwd },
                                        body: JSON.stringify({ dates: [selectedDate], roomType: `${boat.id}-room`, reason: `Room ${roomNum} - ${blockReason}` }),
                                      }).then(() => loadData());
                                    }}>
                                    Block Room {roomNum}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <button onClick={() => blockDate(selectedDate, boat.id)}
                            className="w-full py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors mt-2">
                            Block Entire Boat
                          </button>
                        </div>
                      )}

                      {/* Unblock full boat */}
                      {blocked && (
                        <button onClick={() => unblockDate(blocked.id)}
                          className="mt-2 w-full py-1.5 bg-white border border-red-200 text-red-600 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors">
                          Unblock Entire Boat
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Block All Boats */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="text" value={blockReason} onChange={(e) => setBlockReason(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                  placeholder="Reason (e.g. Booked on Booking.com)" />
                <button onClick={() => blockDate(selectedDate, "all")}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap">
                  Block All Boats
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-2xl font-bold text-emerald-600">{daysInMonth - blockedDates.filter(bd => bd.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length}</p>
            <p className="text-xs text-gray-500">Available Days</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-2xl font-bold text-red-600">{blockedDates.filter(bd => bd.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length}</p>
            <p className="text-xs text-gray-500">Blocked Days</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-2xl font-bold text-blue-600">{bookings.filter(b => b.checkIn.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`) && b.status !== "Cancelled").length}</p>
            <p className="text-xs text-gray-500">Bookings This Month</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-2xl font-bold text-gray-900">{daysInMonth}</p>
            <p className="text-xs text-gray-500">Total Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
