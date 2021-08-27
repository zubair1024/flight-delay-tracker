import React, { useEffect } from 'react';

import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AboutPage from './components/about/AboutPage';
import FlightDelayPage from './components/flight-delay/FlightDelayPage';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import store from './store';
import setHeaders from './utils/setHeaders';

setHeaders();

const App = () => {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <div className="bg-purple-900">
            <Navbar />
            <Alert />
            <section className="min-h-full text-white">
              <Switch>
                <Route exact path="/" component={FlightDelayPage} />
                <Route exact path="/about" component={AboutPage} />
              </Switch>
            </section>
          </div>
        </>
      </Router>
    </Provider>
  );
};

export default App;
