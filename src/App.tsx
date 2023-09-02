import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Calendar from "./calendar";
import AddDiary from './AddDiary';
import Diary from './Diary';

function App() {
  return (
      <>
          <body>
              <Routes>
                  <Route path="/" element={<Calendar />} />
                  <Route path="/addDiary" element={<AddDiary />} />
                  <Route path="/diary" element={<Diary />} />
              </Routes>
          </body>

          <GlobalStyles/>
      </>
  );
}

export default App;
