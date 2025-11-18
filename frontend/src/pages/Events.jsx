import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eventsAPI } from "../services/api";
import { formatDate, formatTime } from "../utils/helpers";
import {
  Calendar,
  MapPin,
  Users,
  Filter,
  X,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  // Categories and Statuses
  const categories = [
    "Music",
    "Tech",
    "Business",
    "Sports",
    "Arts",
    "Food",
    "Other",
  ];
  const statuses = ["Upcoming", "Ongoing", "Completed"];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (filterParams = {}) => {
    setLoading(true);
    try {
      const response = await eventsAPI.getAll(filterParams);
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    fetchEvents(cleanFilters);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      location: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    fetchEvents();
  };

  // Helper for Status Badge Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Ongoing":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse";
      case "Completed":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
                  Discover
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore Events
              </h1>
              <p className="mt-2 text-lg text-slate-600 max-w-2xl">
                Find your next experience. From tech conferences to music
                festivals.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-100 p-2 flex flex-col md:flex-row gap-2">
            {/* Fake Search Input (Visual Only for now) */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder-slate-400"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                showFilters
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="mt-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { label: "Category", key: "category", options: categories },
                  {
                    label: "Location",
                    key: "location",
                    options: ["Online", "In-Person"],
                  },
                  { label: "Status", key: "status", options: statuses },
                ].map((filter) => (
                  <div key={filter.key}>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {filter.label}
                    </label>
                    <select
                      value={filters[filter.key]}
                      onChange={(e) =>
                        handleFilterChange(filter.key, e.target.value)
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="">Any</option>
                      {filter.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* Date Inputs */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange("startDate", e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange("endDate", e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Events Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          // Skeleton Loader
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl h-[400px] animate-pulse border border-slate-200"
              >
                <div className="h-48 bg-slate-200 rounded-t-3xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="pt-8 flex justify-between">
                    <div className="h-10 w-24 bg-slate-200 rounded-xl"></div>
                    <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No events found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or check back later for new events.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 text-indigo-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          // Event Cards
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={
                      event.imageUrl ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    } // Fallback image
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-900 border border-white/20 shadow-sm">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${getStatusStyle(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold shadow-lg flex items-center">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1.5 text-indigo-500" />
                        {event.location.type === "Online"
                          ? "Online Event"
                          : event.location.city || "TBA"}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-slate-100 my-2"></div>

                  <div className="mt-auto pt-2 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
                          {formatTime(event.time)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-slate-600">
                        <Users className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{event.availableSeats} seats left</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${
                              100 -
                              (event.availableSeats / event.capacity) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <span className="flex items-center justify-center w-full py-3 rounded-xl bg-slate-50 text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
