import React from "react";
import {BrowserRouter as Router,
        Routes,
        Route
        } from "react-router-dom";

import Home from "./pages/Home/Home";
import Entry from "./pages/Entry/Entry";
import Result from "./pages/Result/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/result" element={<Result />}/>
        <Route path="/entry" element={<Entry />}/>
      </Routes>
    </Router>
  );
}

export default App;
