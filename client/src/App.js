import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Auth from "./Components/Auth/Auth";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import Movies from "./Components/Movies/Movies";

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />
      {/* HomePage */}
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
