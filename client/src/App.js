import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Edit from "./components/Edit";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
