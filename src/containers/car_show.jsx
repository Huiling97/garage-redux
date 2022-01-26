import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCar, deleteCar } from '../actions';

import SideBar from '../components/side_bar';

class CarShow extends Component {
  componentWillMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleClick = (id, e) => {
    e.preventDefault();
    this.props.deleteCar(id, car => {
      this.props.history.push('/');
      // return car;
    })
  }

  render() {
    if (!this.props.car) {
      return (
        <SideBar garage={this.props.garage} key="aside">
          <Link to="/">Back to list</Link>
        </SideBar>
      );
    }

    return [
        <SideBar garage={this.props.garage} key="aside">
          <Link to="/">Back to list</Link>
        </SideBar>,
        <div className="car-container" key="car">
          <div className="car-card">
            <img className="car-picture" src="/assets/images/logo_square.jpg" />
            <div className="car-details">
            <p>{this.props.car.brand} - {this.props.car.model}</p>
            <ul>
              <li><strong>Owner: </strong>{this.props.car.owner}</li>
            </ul>
            <span className="plate">{this.props.car.plate}</span>
            <button className="delete" onClick={(e) => this.handleClick(this.props.car.id, e)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
                Delete
            </button>
          </div>
        </div>
      </div>
    ]
  }
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10);
  const car = state.cars.find(car => car.id === id);
  return { car };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {fetchCar: fetchCar, deleteCar: deleteCar},
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps) (CarShow);
