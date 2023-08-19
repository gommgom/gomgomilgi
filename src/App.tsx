import { Route, Routes } from "react-router-dom";
import './App.css';
import AddDiary from './addDiary';
import Calendar from "./calendar";

function App() {
  return (
      <Routes>
        <Route path="/" element={<AddDiary />} />
          <Route path="/calendar" element={<Calendar />} />
      </Routes>
  );
}

export default App;
