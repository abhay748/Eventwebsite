import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useStore";
import { authAPI } from "../services/api";
import {
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
  Shield,
  Sparkles,
  Loader2,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  // Password strength indicator (Updated colors for Dark Mode)
  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6)
      return { strength: 1, text: "Weak", color: "bg-red-500 text-red-400" };
    if (password.length < 10)
      return {
        strength: 2,
        text: "Fair",
        color: "bg-yellow-500 text-yellow-400",
      };
    if (
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        strength: 3,
        text: "Strong",
        color: "bg-emerald-500 text-emerald-400",
      };
    }
    return {
      strength: 2,
      text: "Good",
      color: "bg-blue-500 text-blue-400",
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      const { user, token } = response.data.data;
      setAuth(user, token);
      navigate(user.role === "admin" ? "/admin/dashboard" : "/events");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 font-sans relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Dark Mode Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[420px] my-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 group cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              EventEase
            </span>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create Account
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            Join the community and start exploring events.
          </p>
        </div>

        {/* Dark Glass Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 shadow-2xl shadow-black/50 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-start animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-11 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 px-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
                      Strength
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold ${
                        passwordStrength.color.split(" ")[1]
                      }`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        passwordStrength.color.split(" ")[0]
                      }`}
                      style={{
                        width: `${(passwordStrength.strength / 3) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full pl-10 pr-11 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-1 px-1 flex items-center space-x-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-emerald-500 font-medium">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Role Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">
                Account Type
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="block w-full pl-10 pr-10 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="user" className="bg-zinc-900">
                    User - Book events
                  </option>
                  <option value="admin" className="bg-zinc-900">
                    Admin - Manage platform
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center py-3 px-4 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <UserPlus className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-xs px-8">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
