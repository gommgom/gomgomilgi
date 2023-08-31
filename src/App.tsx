import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Calendar from "./calendar";
import AddDiary from './AddDiary';

function App() {
  return (
      <>
          <body>
              <Routes>
                  <Route path="/" element={<AddDiary />} />
                  <Route path="/calendar" element={<Calendar />} />
              </Routes>
          </body>

          <GlobalStyles/>
      </>
  );
}

export default App;
