import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logo.png"

export default function Login() {
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const [mode, setMode] = useState("login")
  const [role, setRole] = useState("cliente")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)

      if (mode === "login") {
        await login(email, password)
      } else {
        await register(email, password)
      }

      if (role === "admin") navigate("/planos")
      if (role === "cliente") navigate("/cliente/demo")
      if (role === "entregador") navigate("/entregador")

    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md backdrop-blur-xl
        bg-white/5 border border-white/10
        rounded-3xl p-8 shadow-2xl shadow-black/40"
      >

        {/* LOGO + TÍTULO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-3xl bg-black/40
                          flex items-center justify-center
                          shadow-inner mb-4">
            <img src={logo} className="w-24 h-24 object-contain" />
          </div>

          <h1 className="text-4xl font-black text-center
            bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-400
            bg-clip-text text-transparent">
            Flow UX
          </h1>

          <p className="text-sm uppercase tracking-widest opacity-60">
            Distribuição
          </p>
        </div>

        {/* PERFIS */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            ["cliente","Cliente"],
            ["admin","Admin"],
            ["entregador","Entregador"]
          ].map(([id,label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setRole(id)}
              className={`py-2 rounded-xl font-bold text-sm transition
              ${role===id
                ? "bg-white text-black shadow-lg"
                : "bg-white/10 hover:bg-white/20"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* INPUTS */}
        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-xl
          bg-black/50 border border-white/10
          focus:border-orange-500 outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="w-full mb-5 px-4 py-3 rounded-xl
          bg-black/50 border border-white/10
          focus:border-pink-500 outline-none"
        />

        {/* BOTÃO */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-extrabold
          bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500
          text-black hover:brightness-110 transition"
        >
          {loading ? "Entrando..." :
            mode==="login" ? "Entrar" : "Criar conta"}
        </button>

        {/* TROCAR MODO */}
        <button
          type="button"
          onClick={()=>setMode(mode==="login"?"register":"login")}
          className="mt-4 w-full text-sm opacity-60 hover:opacity-100"
        >
          {mode==="login"
            ? "Criar conta"
            : "Já tenho conta"}
        </button>

      </form>
    </div>
  )
}
