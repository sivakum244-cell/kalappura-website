"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface AnalyticsData {
  overview: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    completedBookings: number;
    cancellationRate: number;
    avgGroupSize: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  occupancy: {
    rate: number;
    next30Days: { date: string; booked: number; blocked: number; available: number }[];
  };
  roomPopularity: { roomType: string; name: string; count: number; percentage: number }[];
  monthlyTrends: { month: string; bookings: number; confirmed: number; revenue: number }[];
  topCountries: { country: string; count: number }[];
  bookingSources: { source: string; count: number }[];
  recentBookings: { bookingId: string; guestName: string; roomType: string; checkIn: string; status: string; createdAt: string }[];
  thisMonth: { bookings: number; confirmed: number };
}

export default function AnalyticsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analytics", {
        headers: { "x-admin-password": pwd },
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setIsAuthenticated(true);
        setStoredPassword(pwd);
      } else {
        setError(json.error || "Failed to load analytics");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnalytics(password);
  };

  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const getRoomName = (type: string) =>
    type === "standard-cabin" ? "3 Bedroom" :
    type === "double-twin-room" ? "2 Bedroom" :
    type === "suite-river-view" ? "1 Bedroom" : type;

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Kalappura Houseboats & Tours</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50" />
            <button type="submit" disabled={loading}
              className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? "Loading..." : "View Analytics"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </form>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-xs text-gray-500">Kalappura Houseboats & Tours</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
              ← Bookings
            </Link>
            <button onClick={() => fetchAnalytics(storedPassword)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors" title="Refresh">
              🔄
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Bookings", value: data.overview.totalBookings, color: "bg-blue-50 text-blue-700", icon: "📋" },
            { label: "Confirmed", value: data.overview.confirmedBookings, color: "bg-emerald-50 text-emerald-700", icon: "✅" },
            { label: "Pending", value: data.overview.pendingBookings, color: "bg-yellow-50 text-yellow-700", icon: "⏳" },
            { label: "Cancelled", value: data.overview.cancelledBookings, color: "bg-red-50 text-red-700", icon: "❌" },
            { label: "Cancel Rate", value: `${data.overview.cancellationRate}%`, color: "bg-orange-50 text-orange-700", icon: "📉" },
            { label: "Avg Group", value: `${data.overview.avgGroupSize} pax`, color: "bg-purple-50 text-purple-700", icon: "👥" },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 ${stat.color}`}>
              <p className="text-xs opacity-70 mb-1">{stat.icon} {stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Revenue (estimated)</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(data.revenue.total)}</p>
            <p className="text-xs text-gray-400 mt-1">Based on confirmed/completed bookings</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">This Month</p>
            <p className="text-3xl font-bold text-emerald-700">{formatCurrency(data.revenue.thisMonth)}</p>
            <p className="text-xs text-gray-400 mt-1">
              {data.thisMonth.bookings} bookings • {data.thisMonth.confirmed} confirmed
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Month-over-Month</p>
            <p className={`text-3xl font-bold ${data.revenue.growth >= 0 ? "text-emerald-700" : "text-red-600"}`}>
              {data.revenue.growth >= 0 ? "+" : ""}{data.revenue.growth}%
            </p>
            <p className="text-xs text-gray-400 mt-1">vs last month ({formatCurrency(data.revenue.lastMonth)})</p>
          </div>
        </div>

        {/* Occupancy + Room Popularity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Occupancy */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-gray-900">Occupancy (Next 30 Days)</h2>
              <span className={`text-2xl font-bold ${data.occupancy.rate > 50 ? "text-emerald-600" : "text-amber-600"}`}>
                {data.occupancy.rate}%
              </span>
            </div>
            {/* Mini calendar grid */}
            <div className="grid grid-cols-10 gap-1">
              {data.occupancy.next30Days.map((day) => {
                const status = day.available === 0 ? "full" : day.booked > 0 || day.blocked > 0 ? "partial" : "free";
                return (
                  <div
                    key={day.date}
                    className={`w-full aspect-square rounded-sm flex items-center justify-center text-[9px] font-medium ${
                      status === "full" ? "bg-red-200 text-red-800" :
                      status === "partial" ? "bg-amber-100 text-amber-800" :
                      "bg-emerald-50 text-emerald-700"
                    }`}
                    title={`${day.date}: ${day.booked} booked, ${day.blocked} blocked, ${day.available} available`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-50 border border-emerald-200" /> Available</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-200" /> Partial</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-200 border border-red-300" /> Full</span>
            </div>
          </div>

          {/* Room Popularity */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Room Popularity</h2>
            {data.roomPopularity.length === 0 ? (
              <p className="text-gray-400 text-sm">No data yet</p>
            ) : (
              <div className="space-y-4">
                {data.roomPopularity.map((room) => (
                  <div key={room.roomType}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{room.name}</span>
                      <span className="text-sm text-gray-500">{room.count} bookings ({room.percentage}%)</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${room.percentage}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Monthly Trends (Last 6 Months)</h2>
          {data.monthlyTrends.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Month</th>
                    <th className="text-center py-2 px-3 font-medium text-gray-600">Total Bookings</th>
                    <th className="text-center py-2 px-3 font-medium text-gray-600">Confirmed</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-600">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.monthlyTrends.map((trend) => (
                    <tr key={trend.month} className="border-b border-gray-50">
                      <td className="py-3 px-3 font-medium text-gray-900">{trend.month}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          {trend.bookings}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {trend.confirmed}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-gray-900">
                        {formatCurrency(trend.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Simple bar visualization */}
          <div className="flex items-end gap-2 mt-6 h-24">
            {data.monthlyTrends.map((trend) => {
              const maxBookings = Math.max(...data.monthlyTrends.map((t) => t.bookings), 1);
              const height = (trend.bookings / maxBookings) * 100;
              return (
                <div key={trend.month} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md min-h-[4px]"
                  />
                  <span className="text-[10px] text-gray-400">{trend.month.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Sources — marketing attribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-1">Booking Sources</h2>
          <p className="text-xs text-gray-400 mb-4">Which marketing channel drove each booking (from UTM tracking)</p>
          {!data.bookingSources || data.bookingSources.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {data.bookingSources.map((src) => {
                const total = data.bookingSources.reduce((s, x) => s + x.count, 0);
                const pct = total > 0 ? Math.round((src.count / total) * 100) : 0;
                return (
                  <div key={src.source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{src.source}</span>
                      <span className="text-sm text-gray-500">{src.count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Countries + Recent Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Countries */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Top Guest Countries</h2>
            {data.topCountries.length === 0 ? (
              <p className="text-gray-400 text-sm">No data yet</p>
            ) : (
              <div className="space-y-3">
                {data.topCountries.map((country, i) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{country.country}</span>
                    </div>
                    <span className="text-sm text-gray-500">{country.count} bookings</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
            {data.recentBookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {data.recentBookings.map((b) => (
                  <div key={b.bookingId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{b.guestName}</p>
                      <p className="text-xs text-gray-500">{getRoomName(b.roomType)} • {b.checkIn}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      b.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" :
                      b.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
