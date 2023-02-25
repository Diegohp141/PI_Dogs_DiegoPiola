import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/home/Home.jsx";
import DogCreation from "./components/dogCreation/DogCreation.jsx";
import DogDetail from "./components/dogDetail/DogDetail.jsx";

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
