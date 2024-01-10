import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details/Details";
import Test from "./pages/Test/Test";
import Results from "./pages/Results/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Details />} />
        <Route path="/test" element={<Test />} />
        <Route path="/results" element={<Results />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
