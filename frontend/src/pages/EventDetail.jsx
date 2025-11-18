/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsAPI, bookingsAPI } from "../services/api";
import { useAuthStore } from "../store/useStore";
import { formatDate, formatTime } from "../utils/helpers";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Ticket,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Share2,
  Heart,
  Shield,
} from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState(1);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getById(id);
      setEvent(response.data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setError("");
    setSuccess("");
    setBooking(true);

    try {
      const response = await bookingsAPI.create({
        eventId: event._id,
        seats: parseInt(seats),
      });
      setSuccess(
        `Booking successful! Ticket ID: ${response.data.data.bookingId}`
      );
      fetchEvent();
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-indigo-50 p-4 rounded-full inline-flex mb-4">
            <AlertTriangle className="w-12 h-12 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Event not found
          </h2>
          <p className="text-slate-500 mb-6">
            The event you are looking for might have been removed or is
            unavailable.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = event.price * seats;
  const canBook = event.status === "Upcoming" && event.availableSeats > 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* Hero Header with Blurred Background */}
      <div className="relative bg-slate-900 h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            }
            alt={event.title}
            className="w-full h-full object-cover opacity-40 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-16">
          {/* Nav */}
          <button
            onClick={() => navigate("/events")}
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors w-fit"
          >
            <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Events</span>
          </button>

          {/* Title & Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full backdrop-blur-md border text-xs font-bold uppercase tracking-wider ${
                  event.status === "Upcoming"
                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                    : "bg-slate-500/20 border-slate-500/30 text-slate-300"
                }`}
              >
                {event.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                {event.location.type === "Online"
                  ? "Online Event"
                  : event.location.city}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                About this event
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Schedule & Location Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Event Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Date/Time */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50">
                  <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Date & Time
                    </p>
                    <p className="font-semibold text-slate-900">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {formatTime(event.time)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50">
                  <div className="bg-rose-100 p-3 rounded-xl text-rose-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="font-semibold text-slate-900">
                      {event.location.type === "Online"
                        ? "Online Link"
                        : event.location.address}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {event.location.type === "Online"
                        ? "Access via email"
                        : event.location.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800 font-medium">
                  {event.availableSeats} spots remaining out of {event.capacity}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 p-6 sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Ticket Price
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </span>
                    {event.price > 0 && (
                      <span className="text-slate-400 text-sm">/person</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl mb-4 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl mb-4 text-sm flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {success}
                </div>
              )}

              {canBook ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Select Seats{" "}
                      <span className="text-slate-400 font-normal">
                        (Max 2)
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSeats(1)}
                        className={`py-3 rounded-xl border font-semibold transition-all ${
                          seats === 1
                            ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200"
                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                        }`}
                      >
                        1 Seat
                      </button>
                      <button
                        onClick={() => setSeats(2)}
                        disabled={event.availableSeats < 2}
                        className={`py-3 rounded-xl border font-semibold transition-all ${
                          seats === 2
                            ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200"
                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                        } ${
                          event.availableSeats < 2
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        2 Seats
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-slate-600 text-sm">
                      <span>Subtotal</span>
                      <span>₹{event.price * seats}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-sm">
                      <span>Service Fee</span>
                      <span>₹0</span>
                    </div>
                    <div className="h-px bg-slate-100"></div>
                    <div className="flex justify-between font-bold text-slate-900 text-lg">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={booking}
                    className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    {booking ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Booking</span>
                        <Ticket className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {!isAuthenticated && (
                    <p className="text-xs text-slate-400 text-center mt-4">
                      Sign in required to proceed
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                  <Ticket className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="font-bold text-slate-900">
                    {event.status === "Completed" ? "Event Ended" : "Sold Out"}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Tickets are no longer available.
                  </p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Shield className="w-3 h-3" />
                Secure payment powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
