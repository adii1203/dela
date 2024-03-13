import { Routes, Route } from "react-router-dom";
import Today from "./pages/dashboard/today";
import Upcoming from "./pages/dashboard/upcoming";
import Calendar from "./pages/dashboard/calendar";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./pages/Landingpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
