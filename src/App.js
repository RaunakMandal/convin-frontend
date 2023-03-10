import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Main/Landing/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
