import { useState, useEffect } from "react";
import { adminAPI } from "../services/api";
import { formatDate } from "../utils/helpers";
import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  DollarSign,
  Activity,
  Search,
  Filter,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setStats(response.data.data.stats);
      setRecentBookings(response.data.data.recentBookings);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-slate-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-96 bg-slate-200 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Events",
      value: stats?.totalEvents || 0,
      icon: <Calendar className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
      trend: "+12% from last month",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      color: "bg-emerald-500",
      trend: "+5% from last month",
    },
    {
      title: "Upcoming",
      value: stats?.upcomingEvents || 0,
      icon: <Clock className="w-6 h-6 text-white" />,
      color: "bg-violet-500",
      trend: "8 events this week",
    },
    {
      title: "Ongoing",
      value: stats?.ongoingEvents || 0,
      icon: <Activity className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
      trend: "Active right now",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm w-48"
              />
            </div>
            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
              AD
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, here's what's happening with your events today.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-1">
                    {card.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl shadow-sm ${card.color}`}>
                  {card.icon}
                </div>
              </div>
              <div className="flex items-center text-xs text-slate-400 font-medium">
                <TrendingUp className="w-3 h-3 mr-1 text-emerald-500" />
                <span className="text-emerald-600 mr-1">Trending</span>
                {card.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table (Spans 2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">
                Recent Bookings
              </h2>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Booking ID</th>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Event</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        No recent bookings found.
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {booking.bookingId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold mr-3">
                              {booking.user?.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">
                                {booking.user?.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {booking.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 font-medium max-w-[150px] truncate">
                            {booking.event?.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-900">
                            {booking.totalAmount === 0
                              ? "Free"
                              : `₹${booking.totalAmount.toLocaleString()}`}
                          </div>
                          <div className="text-xs text-slate-400">
                            {booking.seats} seat(s)
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-slate-500">
                          {formatDate(booking.bookingDate)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel: Quick Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Platform Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-slate-700">
                      System Operational
                    </span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-slate-700">
                      Database Connected
                    </span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-indigo-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <h3 className="font-bold text-lg mb-2 relative z-10">
                Quick Action
              </h3>
              <p className="text-indigo-200 text-sm mb-4 relative z-10">
                Need to schedule a new event?
              </p>
              <button className="w-full py-2.5 bg-white text-indigo-900 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors relative z-10">
                Create New Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
