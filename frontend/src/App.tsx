import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReadingPage from "./pages/ReadingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reading/:date" element={<ReadingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
