import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Calendar from "./calendar";
import AddDiary from './AddDiary';

function App() {
  return (
      <>
          <Routes>
              <Route path="/" element={<AddDiary />} />
              <Route path="/calendar" element={<Calendar />} />
          </Routes>
          <GlobalStyles/>

      </>
  );
}

export default App;
