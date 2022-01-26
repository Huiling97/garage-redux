import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCars } from '../actions';

import SideBar from '../components/side_bar';

class CarsIndex extends Component {
  componentWillMount() {
    this.props.fetchCars(this.props.garage);
  }

  renderCar() {
    return this.props.cars.map((car) => {
      return (
        <Link to={`/car/${car.id}`} key={car.id} className="car-smallad">
          <img className="car-logo" src="assets/images/logo_square.jpg" />
          <div className="car-details">
            <span>{car.brand} - {car.model}</span>
            <span>Owner:</span> {car.owner}
          </div>
        </Link>
      )
    })
  }

  render() {
    if (!this.props.cars) {
      return [
        <SideBar garage={this.props.garage}>
          <Link to='/car/new'>Add a new car</Link>
        </SideBar>,
        <div className="no-car" key="nocar">No car yet</div>
      ]
    }

    return [
      <SideBar>
        <Link to='/car/new'>Add a new car</Link>
      </SideBar>,
      <div className="list-container">
        {this.renderCar()}
      </div>
    ]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {fetchCars: fetchCars},
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    cars: state.cars
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CarsIndex)
