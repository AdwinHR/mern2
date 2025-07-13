import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Portfolio from "./pages/Portfolio"
import Admin from "./pages/Admin"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
