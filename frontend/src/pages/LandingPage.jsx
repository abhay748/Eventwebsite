import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  MapPin,
  Ticket,
  TrendingUp,
  Clock,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* HERO SECTION (Kept same as previous) */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50rem] h-[50rem] bg-indigo-100/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40rem] h-[40rem] bg-rose-100/50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-12 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full transition-transform hover:scale-105 cursor-default">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Live the moment
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                Find your next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600">
                  unforgettable
                </span>{" "}
                memory.
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                From sold-out concerts to exclusive tech workshops. EventEase is
                the easiest way to discover, book, and manage your social
                calendar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all bg-indigo-600 rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 transition-all bg-white border-2 border-slate-200 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none"
                >
                  Create Account
                </Link>
              </div>
              <div className="pt-6 flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                          alt="user"
                        />
                      </div>
                    ))}
                  </div>
                  <span>10k+ Users</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-slate-800">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl shadow-indigo-500/10 max-w-md mx-auto">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden text-white shadow-lg">
                    <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                          Music
                        </span>
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          Neon Nights Festival
                        </h3>
                        <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Downtown Arena, NY
                        </p>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Aug 24, 8:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>2 Seats left</span>
                        </div>
                      </div>
                      <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
                        <div>
                          <span className="text-xs text-slate-400 block">
                            Total Price
                          </span>
                          <span className="text-xl font-bold">$120.00</span>
                        </div>
                        <button className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        Status
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        Confirmed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW FEATURES SECTION LAYOUT (Bento Grid) */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Seamless Experience
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage events
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FEATURE 1: Large Main Card (Spans 2 Columns) */}
            <div className="lg:col-span-2 bg-indigo-600 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-xl shadow-indigo-200 group hover:-translate-y-1 transition-transform duration-300">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-8">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Ticket className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Instant One-Click Booking
                  </h3>
                  <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
                    Secure your spot in seconds. Our streamlined checkout flow
                    eliminates the hassle, so you never miss a sold-out event
                    again.
                  </p>
                </div>

                {/* Visual Element for Card 1 */}
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full max-w-sm self-start sm:self-end transform translate-y-4 sm:translate-y-0 sm:translate-x-4 group-hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Booking Confirmed
                      </div>
                      <div className="text-indigo-200 text-xs">
                        Sent to your email
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Stacked Smaller Cards */}
            <div className="space-y-8">
              {/* FEATURE 2 */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 h-[calc(50%-1rem)]">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Trending Events
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Real-time popularity tracking to show you what's hot in your
                  city right now.
                </p>
              </div>

              {/* FEATURE 3 */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 h-[calc(50%-1rem)]">
                <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Smart Scheduling
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Automatically sync confirmed bookings to your Google or Apple
                  calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION (Kept same) */}
      <div className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Join the fastest growing event community.
                </h2>
                <p className="text-indigo-100 text-lg mb-8 max-w-md">
                  Don't just watch from the sidelines. Create an account today
                  and start filling your calendar with memories.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/register"
                    className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/events"
                    className="bg-indigo-700 text-white border border-indigo-500 px-8 py-3 rounded-xl font-bold hover:bg-indigo-800 transition-colors"
                  >
                    Browse Events
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-indigo-200 text-sm">
                    Events Hosted Weekly
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 translate-y-4">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-indigo-200 text-sm">
                    Customer Satisfaction
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-indigo-200 text-sm">
                    Support Available
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 translate-y-4">
                  <div className="text-4xl font-bold mb-2">0%</div>
                  <div className="text-indigo-200 text-sm">Booking Fees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
