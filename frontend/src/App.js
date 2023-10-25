import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index.js";
import Add from "./components/Add.js";
import Edit from "./components/Edit.js";
import View from "./components/View.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/add" Component={Add} />
        <Route path="/product/:id" Component={View}/>
        <Route path="/edit/:id" Component={Edit}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
