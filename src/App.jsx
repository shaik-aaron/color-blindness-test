import { BrowserRouter, Routes, Route } from "react-router-dom"
import Details from "./pages/Details/Details"
import Test from "./pages/Test/Test"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Details />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
