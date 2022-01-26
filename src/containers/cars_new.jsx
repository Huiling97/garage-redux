import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { createCar } from '../actions'

import SideBar from '../components/side_bar';

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, (car) => {
      this.props.history.push('/');
      return car;
    })
  }

  render() {
    return [
       <SideBar key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </SideBar>,
      <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/form.jpg')"}}>
        <div className="overlay"></div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className='form-group'>
            <label htmlFor="brand">Brand</label>
            <Field
              label="Brand"
              name="brand"
              type="text"
              component="input"
            />
          </div>
          <div className='form-group'>
            <label htmlFor='model'>Model</label>
            <Field
              label="Model"
              name="model"
              type="text"
              component="input"
            />
          </div>
          <div className='form-group'>
            <label htmlFor='owner'>Owner</label>
            <Field
              label="Owner"
              name="owner"
              type="text"
              component="input"
            />
          </div>
          <div className='form-group'>
            <label htmlFor='plate'>Plate</label>
            <Field
              label="Plate"
              name="plate"
              type="text"
              component="input"
            />
          </div>
          <button type="submit">Add Car</button>
        </form>
      </div>
    ]
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  }
}

export default reduxForm({form: "newCarForm"}) (
  connect(mapStateToProps, {createCar}) (CarsNew)
);
