import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Login() {
  const navigate = useNavigate()

  const [role, setRole] = useState("cliente")
  const [mode, setMode] = useState("login")
  const [theme, setTheme] = useState("dark")

  const isDark = theme === "dark"

  function entrar(e) {
    e.preventDefault()

    if (role === "cliente") navigate("/cliente/demo")
    if (role === "admin") navigate("/planos")
    if (role === "entregador") navigate("/entregador")
  }

  return (
    <div className={`
      min-h-screen w-full
      flex items-center justify-center
      px-4 py-8
      relative overflow-hidden
      ${isDark ? "bg-black text-white" : "bg-slate-100 text-slate-900"}
    `}>

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />

      {/* CARD */}
      <form
        onSubmit={entrar}
        className={`
          relative w-full max-w-md
          rounded-3xl p-7 sm:p-9
          backdrop-blur-2xl
          border shadow-2xl
          transition-all duration-500
          animate-[fadeIn_.6s_ease-out]
          ${isDark
            ? "bg-white/5 border-white/10"
            : "bg-white border-slate-200"}
        `}
      >

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold opacity-60">
            FlowUx Distribuição
          </span>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* LOGO COM GLOW */}
        <div className="flex justify-center mb-8">
          <div className="
            relative w-44 h-44 sm:w-52 sm:h-52 rounded-[32px]
            flex items-center justify-center
            bg-black/40
          ">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 blur-xl opacity-40 animate-pulse" />
            <img
              src={logo}
              alt="FlowUx"
              className="relative w-60 h-60 object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* TITULO */}
        <h1 className="text-center font-black mb-1 leading-none">
          <span className="text-4xl sm:text-5xl bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Flow
          </span>{" "}
          <span className="text-4xl sm:text-5xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Ux
          </span>
        </h1>

        <p className="text-center text-xs tracking-[0.35em] opacity-60 mb-6">
          DISTRIBUIÇÃO
        </p>

        {/* PERFIS */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { id: "cliente", label: "Cliente" },
            { id: "admin", label: "Admin" },
            { id: "entregador", label: "Entrega" },
          ].map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`
                py-2 rounded-xl text-sm font-bold transition-all
                active:scale-95
                ${
                  role === r.id
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/10 hover:bg-white/20"
                }
              `}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* EMAIL */}
        <input
          placeholder="Email"
          className={`
            w-full mb-3 px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-pink-500/50 outline-none
            transition
            ${isDark
              ? "bg-black/50 border-white/10 placeholder-white/40"
              : "bg-white border-slate-300"}
          `}
        />

        {/* SENHA */}
        <input
          type="password"
          placeholder="Senha"
          className={`
            w-full mb-5 px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-blue-500/50 outline-none
            transition
            ${isDark
              ? "bg-black/50 border-white/10 placeholder-white/40"
              : "bg-white border-slate-300"}
          `}
        />

        {/* BOTÃO */}
        <button
          className="
            w-full py-3 rounded-xl font-extrabold text-black
            bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500
            hover:brightness-110
            active:scale-95
            transition-all
            shadow-xl
          "
        >
          {mode === "login" ? "Entrar" : "Criar conta"}
        </button>

        {/* TOGGLE LOGIN/REGISTER */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
            className="text-sm opacity-60 hover:opacity-100 transition"
          >
            {mode === "login"
              ? "Criar conta"
              : "Já tenho conta"}
          </button>
        </div>

      </form>

      {/* ANIMATION STYLE */}
      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
