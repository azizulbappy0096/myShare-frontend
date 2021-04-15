
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Download from "./components/Download/Download";
import Home from "./components/Home/Home";


function App() {
  return (
    <Router>
    <div className="app">
      <section className="app__header">
        <a href="/">
        <img src="/image/logo.png" draggable="false" />
        </a>
      </section>
      
        <Switch>
          <Route path="/file/:uuid">
            <Download />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      
    </div>
    </Router>
  );
}

export default App;
