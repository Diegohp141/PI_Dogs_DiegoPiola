import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DogCreation from "./components/DogCreation";
import DogDetail from "./components/DogDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/dog" component={DogCreation}></Route>
        <Route exact path="/dog/:id" component={DogDetail}></Route>
      </Switch>
    </div>
  );
}

export default App;
