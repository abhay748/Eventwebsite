import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useStore";
import {
  Calendar,
  LogOut,
  LayoutDashboard,
  User,
  Menu,
  X,
  Sparkles,
  Ticket,
  Settings,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              EventEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/events"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/events")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Browse Events
            </Link>

            {isAuthenticated ? (
              <div className="relative ml-4" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 pl-4 border-l border-slate-200 focus:outline-none group"
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-500 uppercase">
                      {user?.role}
                    </p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white group-hover:ring-indigo-100 transition-all">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-50 lg:hidden">
                      <p className="text-sm font-semibold text-slate-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {user?.role === "admin" ? (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/events"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Manage Events
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/my-bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        My Tickets
                      </Link>
                    )}

                    <div className="h-px bg-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-200">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-indigo-600 font-medium text-sm px-3 py-2 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-indigo-200 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              to="/events"
              onClick={closeMobileMenu}
              className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Browse Events
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-100 my-2 pt-2">
                  <div className="flex items-center px-3 py-3 space-x-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {user?.role === "admin" ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                      </div>
                    </Link>
                    <Link
                      to="/admin/events"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <Settings className="w-5 h-5 mr-3" />
                        Manage Events
                      </div>
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/my-bookings"
                    onClick={closeMobileMenu}
                    className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Ticket className="w-5 h-5 mr-3" />
                      My Tickets
                    </div>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="pt-4 pb-2 space-y-3 border-t border-slate-100 mt-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center px-4 py-3 rounded-xl text-slate-700 font-bold bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block w-full text-center px-4 py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
