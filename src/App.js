import Dashboard from "./components/Dashboard"
import './App.css';
import { Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
import Reports from "./components/Reports";
import AddUsers from "./components/AddUsers"

export const config = {
  endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem`,
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route path="/AddUsers" element={<AddUsers/>} />
        <Route path="/Analytics" element={<Analytics/>} />
        <Route path="/Reports" element={<Reports/>} />
      </Routes>
    </div>
  );
}

export default App;