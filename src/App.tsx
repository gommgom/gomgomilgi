import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Calendar from "./calendar";
import AddDiary from './AddDiary';

function App() {
  return (
      <>
          <body>
              <Routes>
                  <Route path="/" element={<Calendar />} />
                  <Route path="/addDiary" element={<AddDiary />} />
              </Routes>
          </body>

          <GlobalStyles/>
      </>
  );
}

export default App;
