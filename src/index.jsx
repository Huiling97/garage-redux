import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

import '../assets/stylesheets/application.scss';

import carsReducer from './reducers/cars_reducer';
import { reducer as formReducer } from 'redux-form';

import carsIndex from './containers/cars_index';
import carsNew from './containers/cars_new';
import carShow from './containers/car_show';

const initialState = {
  garage: "my-awesome-garage", //prompt('Please key in your garage name') ||
  cars: []
}

const reducers = combineReducers({
  cars: carsReducer,
  form: formReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);
const store = createStore(reducers, initialState, middlewares)

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="view-container">
        <Switch>
          <Route path="/" exact component={carsIndex}/>
          <Route path="/car/new" exact component={carsNew} />
          <Route path="/car/:id" component={carShow} />
          <Route path="/car/:id/delete"/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
