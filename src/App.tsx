import { Route, Routes } from "react-router-dom";
import './App.css';
import Calendar from "./calendar";
import AddDiary from './AddDiary';

function App() {
  return (
      <Routes>
        <Route path="/" element={<AddDiary />} />
          <Route path="/calendar" element={<Calendar />} />
      </Routes>
  );
}

export default App;
