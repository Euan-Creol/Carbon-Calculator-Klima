import React, { Component } from 'react'
import PropTypes                from 'prop-types'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Grid } from '@material-ui/core'
import { styles }  from './styles.scss'

/*
The email signup component allowing users to receive detailed results feedback
 */
class EmailSignup extends Component {
  constructor() {
    super()
    this.state = {
      email: 'info@creol.io',
      sending: false,
      sent: false
    }
  }
  handleChange = (event) => {
    /*
   @notice Event to update the state when the email input field is changed
    */
    const email = event.target.value
    this.setState({ email })
  }
  handleSubmit(TotalFootprint,
    CarFootprint,
    MotorcycleFootprint,
    BusFootprint,
    TrainFootprint,
    FlightFootprint,
    HomeFootprint,
    HomeImprovements,
    FoodFootprint,
    RestaurantFootprint,
    HotelFootprint,
    FashionFootprint,
    AccessoryFootprint,
    Region,
    RegionFootprint,
    props) {
    /*
   @notice A function to send out an automated email on the submission of the email address
   @param TotalFootprint: the calculated footprint for the entire questionnaire
   @param _Footprint: the calculated footprint for each question
   @param Region: A number corresponding to the region of the user
   @param RegionFootprint: the average footprint for that region
    */
    this.setState({
      sending: true
    }, () => {
      const { email } = this.state
      fetch('https://hooks.zapier.com/hooks/catch/5882203/oipqzfw/', {
        method: 'POST',
        body: JSON.stringify({
          Email: email,
          'Total Footprint': TotalFootprint,
          'Car Footprint': CarFootprint,
          'Motorcycle Footprint': MotorcycleFootprint,
          'Bus Footprint': BusFootprint,
          'Train Footprint': TrainFootprint,
          'Flight Footprint': FlightFootprint,
          'Home Improvements': HomeImprovements,
          'Home Footprint': HomeFootprint,
          'Food Footprint': FoodFootprint,
          'Restaurant Footprint': RestaurantFootprint,
          'Hotel Footprint': HotelFootprint,
          'Fashion Footprint': FashionFootprint,
          'Accessory Footprint': AccessoryFootprint,
          Region,
          'Region Footprint': RegionFootprint
        })
      }).then(() => {
        this.setState({
          sent: true,
          sending: false }, () => {this.handleButtonPress(props)})
      })
    })
  }

  handleButtonPress(props) {
    props.onChange()
  }

  GetAverageFootprint(RegionID) {
    /*
   @notice A function to return the average footprint of a given region
   @param RegionID: A number corresponding to the region of the user
   @return The average footprint for that region
    */
    let AverageFootprint = 6.5
    switch (RegionID) {
    case 0:
      AverageFootprint = 6.5
      // Change Image
      break
    case 1:
      AverageFootprint = 7.0
      break
    case 2:
      AverageFootprint = 16.5
      break
    case 3:
      AverageFootprint = 4.5
      break
    default:
      AverageFootprint = 6.5
    }
    return AverageFootprint
  }

  GetRegionName(RegionID) {
    /*
   @notice A function to return the name of a given region
   @param RegionID: A number corresponding to the region of the user
   @return The name for that region
    */
    let name = 'United Kingdom'
    switch (RegionID) {
    case 0:
      name = 'United Kingdom'
      // Change Image
      break
    case 1:
      name = 'Europe'
      break
    case 2:
      name = 'United States'
      break
    case 3:
      name = 'World'
      break
    default:
      name = 'United Kingdom'
    }
    return name
  }
  render() {
    const {
      TotalFootprint,
      CarFootprint,
      MotorcycleFootprint,
      BusFootprint,
      TrainFootprint,
      FlightFootprint,
      HomeFootprint,
      HomeImprovements,
      FoodFootprint,
      RestaurantFootprint,
      HotelFootprint,
      FashionFootprint,
      AccessoryFootprint,
      RegionID
    } = this.props
    const RegionFootprint = this.GetAverageFootprint(RegionID)
    const Region = this.GetRegionName(RegionID)

    const { email, sent, sending } = this.state
    return (
      <div className={styles}>
        { sending ? (
          <div className="sending-text">Sending...</div>
        ) : (<div>
          { sent ? (
            <div className="sent-text">Email Confirmed!</div>
          ) : (
            <ValidatorForm
              ref="form"
              onSubmit={() => this.handleSubmit(TotalFootprint,
                CarFootprint,
                MotorcycleFootprint,
                BusFootprint,
                TrainFootprint,
                FlightFootprint,
                HomeFootprint,
                HomeImprovements,
                FoodFootprint,
                RestaurantFootprint,
                HotelFootprint,
                FashionFootprint,
                AccessoryFootprint,
                Region,
                RegionFootprint,
                this.props)}
              onError={errors => console.log(errors)}
            >
              <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                <Grid item xs>
                  <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                    className="email-validator"
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    className="email-button"
                    variant="contained"
                    type="submit"
                  >Sign up to receive detailed results!
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          )}
             </div>
        )}

      </div>
    )
  }
}
EmailSignup.propTypes = {
  /** The user's total footprint from the calculator */
  TotalFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Car question*/
  CarFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Motorcycle question*/
  MotorcycleFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Bus question*/
  BusFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Train question*/
  TrainFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Flight question*/
  FlightFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Home question*/
  HomeFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Home Improvements question*/
  HomeImprovements: PropTypes.number.isRequired,
  /** The user's footprint from the Food question*/
  FoodFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Restaurant question*/
  RestaurantFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Hotel question*/
  HotelFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Fashion question*/
  FashionFootprint: PropTypes.number.isRequired,
  /** The user's footprint from the Accessory question*/
  AccessoryFootprint: PropTypes.number.isRequired
}

export default EmailSignup
