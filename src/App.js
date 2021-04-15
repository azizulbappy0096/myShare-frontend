
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Download from "./components/Download/Download";
import Home from "./components/Home/Home";


function App() {
  return (
    <div className="app">
      <section className="app__header">
        <a href="/">
        <img src="/image/logo.png" draggable="false" />
        </a>
      </section>
      <Router>
        <Switch>
          <Route path="/file/:uuid">
            <Download />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
