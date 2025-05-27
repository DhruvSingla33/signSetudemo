import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Sign from "./components/Sign";
import Update from "./components/Update1";
import Update1 from "./components/Update1";
function App() {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/sign/:id" element={<Sign />} />
          <Route path="/update/:id" element={<Update1/>} />

        </Routes>
   
      </Router>
   </>
  );
}

export default App;
