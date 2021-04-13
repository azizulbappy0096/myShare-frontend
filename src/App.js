import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Download from "./components/Download/Download";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="app">
      <section className="app__header">
        <img src="/image/logo.png" />
      </section>
      <Router>
        <Switch>
          <Route path="/file/download/:uuid">
            <Download />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
