import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { TicketPage } from "./pages/TicketsPage";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route 
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/tickets" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;