import { useState, useEffect } from "react";
import { eventsAPI, adminAPI } from "../services/api";
import { formatDate, formatDateInput, getStatusColor } from "../utils/helpers";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  X,
  Calendar,
  MapPin,
  IndianRupee,
  Clock,
  Image as ImageIcon,
  Tag,
  Search,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAttendees, setShowAttendees] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Tech",
    locationType: "Online",
    address: "",
    city: "",
    country: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    capacity: "",
    price: 0,
    imageUrl: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, event = null) => {
    setModalMode(mode);
    if (mode === "edit" && event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        locationType: event.location.type,
        address: event.location.address || "",
        city: event.location.city || "",
        country: event.location.country || "",
        startDate: formatDateInput(event.date),
        startTime: event.time,
        endDate: event.endDate ? formatDateInput(event.endDate) : "",
        endTime: event.endTime || "",
        capacity: event.capacity,
        price: event.price,
        imageUrl: event.imageUrl || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Tech",
        locationType: "Online",
        address: "",
        city: "",
        country: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        capacity: "",
        price: 0,
        imageUrl: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: {
        type: formData.locationType,
        address: formData.address,
        city: formData.city,
        country: formData.country,
      },
      date: formData.startDate,
      time: formData.startTime,
      endDate: formData.endDate || undefined,
      endTime: formData.endTime || undefined,
      capacity: parseInt(formData.capacity),
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl || "https://via.placeholder.com/400x300",
    };

    try {
      if (modalMode === "create") {
        await adminAPI.createEvent(eventData);
      } else {
        await adminAPI.updateEvent(selectedEvent._id, eventData);
      }
      setShowModal(false);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await adminAPI.deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete event");
    }
  };

  const viewAttendees = async (eventId) => {
    try {
      const response = await adminAPI.getAttendees(eventId);
      setAttendees(response.data);
      setShowAttendees(true);
    } catch (error) {
      alert("Failed to fetch attendees", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-slate-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Event Management</h1>
          <button
            onClick={() => handleOpenModal("create")}
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event List */}
        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              No events yet
            </h3>
            <p className="text-slate-500 mt-1 mb-6">
              Get started by creating your first event.
            </p>
            <button
              onClick={() => handleOpenModal("create")}
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              Create Event
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Sales</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className="group hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <img
                            src={
                              event.imageUrl ||
                              "https://via.placeholder.com/100"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location.city || "Online"}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 font-medium">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {event.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          event.status === "Upcoming"
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : event.status === "Ongoing"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{
                              width: `${
                                (event.bookedSeats / event.capacity) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">
                          {event.bookedSeats}/{event.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => viewAttendees(event._id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="View Attendees"
                        >
                          <Users className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal("edit", event)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- CREATE / EDIT MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900">
                  {modalMode === "create" ? "Create New Event" : "Edit Event"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <form
                  id="eventForm"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. Summer Tech Conference"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="What is this event about?"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        {[
                          "Music",
                          "Tech",
                          "Business",
                          "Sports",
                          "Arts",
                          "Food",
                          "Other",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Location Type
                      </label>
                      <select
                        value={formData.locationType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            locationType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="Online">Online</option>
                        <option value="In-Person">In-Person</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional Location Fields */}
                  {formData.locationType === "In-Person" && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase">
                        Venue Details
                      </h4>
                      <div>
                        <input
                          type="text"
                          placeholder="Address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Scheduling */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Capacity & Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Capacity
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="eventForm"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  {modalMode === "create" ? "Create Event" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- ATTENDEES MODAL --- */}
        {showAttendees && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowAttendees(false)}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Event Attendees
                  </h2>
                  <p className="text-sm text-slate-500">
                    {attendees.event?.title}
                  </p>
                </div>
                <button
                  onClick={() => setShowAttendees(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {attendees.data && attendees.data.length === 0 ? (
                  <div className="text-center py-20">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">
                      No attendees found for this event.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Email</th>
                        <th className="px-6 py-3 font-medium">Booking ID</th>
                        <th className="px-6 py-3 font-medium">Seats</th>
                        <th className="px-6 py-3 font-medium text-right">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {attendees.data?.map((att) => (
                        <tr
                          key={att.bookingId}
                          className="hover:bg-slate-50/50"
                        >
                          <td className="px-6 py-4 font-medium text-slate-900">
                            {att.userName}
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">
                            {att.userEmail}
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm font-mono">
                            {att.bookingId}
                          </td>
                          <td className="px-6 py-4 text-slate-900 text-sm">
                            {att.seats}
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-emerald-600">
                            {att.totalAmount === 0
                              ? "Free"
                              : `₹${att.totalAmount}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
