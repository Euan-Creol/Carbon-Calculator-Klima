import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core'

class CarbonDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      ProgressOn,
      TotalFootprint,
      QuestionCategory,
      TransportNo,
      EnergyNo,
      FoodNo,
      ExtrasNo
    } = this.props
    return (
      <div className={`progress-icon${ProgressOn}`}>
        <h3>YOUR</h3><h3>CARBON</h3><h3>TOTAL</h3>
        <div className="circular-progress-background">
          <CircularProgress
            style={{
              color: 'lightGrey'
            }}
            variant="determinate"
            size={120}
            thickness={6}
            value={100}
          />
        </div>
        <div className="circular-progress-transport">
          <CircularProgress
            style={{
              color: '#33972d',
              opacity: 1
            }}
            variant="determinate"
            size={120}
            thickness={6}
            value={(TransportNo / 18) * 100}
          />
        </div>
        <div className="circular-progress-energy">
          <CircularProgress
            style={{
              color: '#33972d',
              opacity: 0.7
            }}
            variant="determinate"
            size={120}
            thickness={6}
            value={(EnergyNo / 18) * 100}
          />
        </div>
        <div className="circular-progress-food">
          <CircularProgress
            style={{
              color: '#33972d',
              opacity: 0.4
            }}
            variant="determinate"
            size={120}
            thickness={6}
            value={(FoodNo / 18) * 100}
          />
        </div>
        <div className="circular-progress-extras">
          <CircularProgress
            style={{
              color: '#33972d',
              opacity: 0.1
            }}
            variant="determinate"
            size={120}
            thickness={6}
            value={(ExtrasNo / 18) * 100}
          />
        </div>
        <div className="footprint-display">
          <h2 className="footprint-text"> {TotalFootprint.toFixed(1)} </h2>
          <h4 style={{ marginTop: 0 }}> t CO2 e </h4>
        </div>
        <div className="category-display">
          <h2 className="category-text"> {QuestionCategory} </h2>
        </div>
      </div>
    )
  }
}

CarbonDisplay.propTypes = {
  ProgressOn: PropTypes.bool.isRequired,
  TotalFootprint: PropTypes.number.isRequired,
  QuestionCategory: PropTypes.string.isRequired,
  TransportNo: PropTypes.number.isRequired,
  EnergyNo: PropTypes.number.isRequired,
  FoodNo: PropTypes.number.isRequired,
  ExtrasNo: PropTypes.number.isRequired
}

export default CarbonDisplay
