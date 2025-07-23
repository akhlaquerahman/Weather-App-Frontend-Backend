// client/src/App.jsx
import React from "react";
import Weather from "./MyComponents/Weather.jsx";         // ✅ Correct path
import "./MyComponents/Weather.css";                 // ✅ Also correct path

const App = () => {
  return <Weather />;
};

export default App;
