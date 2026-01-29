import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext"
import { DistributorProvider } from "./context/DistributorContext"
import { OrdersProvider } from "./context/OrdersContext"

import Login from "./pages/Login"
import Plans from "./pages/Plans"
import AdminDashboard from "./pages/AdminDashboard"
import ClientDashboard from "./pages/ClientDashboard"
import EntregadorDashboard from "./pages/EntregadorDashboard"

export default function App() {
  return (
    <AuthProvider>
      <DistributorProvider>
        <OrdersProvider>
          <BrowserRouter>
            <Routes>

              {/* LOGIN */}
              <Route path="/" element={<Login />} />

              {/* PLANOS */}
              <Route path="/planos" element={<Plans />} />

              {/* DASHBOARDS */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* cliente por link público */}
              <Route path="/cliente/:distributorId" element={<ClientDashboard />} />

              {/* entregador */}
              <Route path="/entregador" element={<EntregadorDashboard />} />

            </Routes>
          </BrowserRouter>
        </OrdersProvider>
      </DistributorProvider>
    </AuthProvider>
  )
}
