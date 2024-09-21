import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./applicant/Home"
import Myprofile from "./applicant/Myprofile";
import CompaniesApplied from "./applicant/CompaniesApplied";

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Myprofile/>} />
        <Route path="/applied" element={<CompaniesApplied/>} />

        
      </Routes>
    </Router>
  );
};

export default App;
