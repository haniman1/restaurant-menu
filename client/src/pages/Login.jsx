import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiShield } from "react-icons/fi";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard", { replace: true });

      window.location.reload();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.1),transparent_32%)]" />

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <main className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/10 shadow-lg shadow-black/25">
              <FiShield className="text-3xl text-yellow-400" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
              Secure Admin Portal
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Restaurant Admin
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Welcome back. Sign in to manage menu items, categories, and
              availability.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-slate-800 bg-slate-900/85 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">Admin Login</p>
                <p className="text-xs text-slate-400">
                  Protected dashboard access
                </p>
              </div>

              <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                Secure
              </span>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </span>

                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                    placeholder="admin@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </span>

                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </label>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? undefined : { y: -2 }}
                whileTap={loading ? undefined : { scale: 0.98 }}
                className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-500 px-5 py-3.5 font-bold text-black shadow-lg shadow-yellow-950/20 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                )}
                {loading ? "Logging in..." : "Login to Dashboard"}
              </motion.button>
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <p className="text-center text-xs leading-5 text-slate-400">
                Access is restricted to authorized restaurant administrators.
              </p>
            </div>
          </form>
        </motion.section>
      </main>
    </div>
  );
}

export default Login;
