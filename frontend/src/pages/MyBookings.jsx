import { useState, useEffect } from "react";
import { bookingsAPI } from "../services/api";
import { formatDate, getStatusColor } from "../utils/helpers";
import {
  Calendar as CalendarIcon,
  MapPin,
  Ticket,
  X,
  CheckCircle,
  List,
  LayoutGrid,
  Clock,
} from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getMyBookings();
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await bookingsAPI.cancel(bookingId);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Tickets</h1>
            <p className="text-slate-500 mt-2">
              Manage your upcoming events and view past bookings.
            </p>
          </div>

          {/* View Toggle */}
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "list"
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "calendar"
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Calendar
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No bookings yet
            </h3>
            <p className="text-slate-500 mb-8">
              You haven't booked any events. Explore what's happening near you!
            </p>
            <a
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Explore Events
            </a>
          </div>
        ) : viewMode === "list" ? (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
              >
                {/* Left Status Strip */}
                <div
                  className={`w-full md:w-3 ${
                    booking.status === "confirmed"
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  }`}
                ></div>

                <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          booking.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        ID:{" "}
                        <span className="font-mono">{booking.bookingId}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {booking.event?.title || "Unknown Event"}
                    </h3>

                    <div className="space-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-indigo-500" />
                        {booking.event
                          ? formatDate(booking.event.date)
                          : "N/A"}{" "}
                        • {booking.event?.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        {booking.event?.location.city || "Online"}
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details (Right Side) */}
                  <div className="flex flex-row md:flex-col justify-between items-end md:w-48 md:border-l border-slate-100 md:pl-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Total Paid
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {booking.totalAmount === 0
                          ? "Free"
                          : `₹${booking.totalAmount}`}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {booking.seats}{" "}
                        {booking.seats === 1 ? "Ticket" : "Tickets"}
                      </p>
                    </div>

                    {booking.status === "confirmed" &&
                      booking.event?.status === "Upcoming" && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="mt-4 md:mt-0 text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          {cancellingId === booking._id ? (
                            "Processing..."
                          ) : (
                            <>
                              Cancel Booking <X className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-600" />
              Booking Calendar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.map((booking, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-2 text-center min-w-[3.5rem]">
                      <div className="text-xs text-slate-400 uppercase font-bold">
                        {new Date(booking.event?.date).toLocaleString(
                          "default",
                          { month: "short" }
                        )}
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {new Date(booking.event?.date).getDate()}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
                        {booking.event?.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" /> {booking.event?.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
