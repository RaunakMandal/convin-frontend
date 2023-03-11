import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./components/Base/History/History";
import Landing from "./components/Main/Landing/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/history" element={<History />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
