import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";

import Menu from "./components/Menu";
//import Provider from "react-redux";
import { Provider } from 'react-redux';
import store from './store';

import { Switch,Route } from 'react-router-dom';
import AdminScreen from './components/AdminScreen';
import HomeScreen from './components/Screens/HomeScreen';

class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <Menu></Menu>
          <Header></Header>
          <main>
            <Switch>
              <Route exact path="/admin"><AdminScreen /></Route>
              <Route><HomeScreen /></Route>
            </Switch>
          </main>
          <Footer></Footer>
        </div>
      </Provider>
    );  
  }
}
export default App;
