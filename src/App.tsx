import { Route, Routes } from "react-router-dom";
import './App.css';
import AddDiary from './AddDiary';

function App() {
  return (
      <Routes>
        <Route path="/" element={<AddDiary />} />
      </Routes>
  );
}

export default App;
