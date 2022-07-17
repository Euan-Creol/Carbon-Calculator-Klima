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
      email: '',
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
      EmployeeFootprint,
      EnergyFootprint,
      RecyclingPercentage,
      GreenSupplierReduction,
      LightingType,
      OfficeImprovements,
      TechPurchases,
      DeviceReplacementRate,
      FleetVehicleFootprint,
      MeatFreeDays,
      LocallySourced,
      FoodWasted,
      Region,
      RegionFootprint) {
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
        fetch('https://hooks.zapier.com/hooks/catch/5882203/o82srek/', {
          method: 'POST',
          body: JSON.stringify({
            Email: email,
            'Total Footprint': TotalFootprint,
            'Employee Footprint': EmployeeFootprint,
            'Energy Footprint': EnergyFootprint,
            'Recycling Percentage': RecyclingPercentage,
            'Green Supplier Reduction': GreenSupplierReduction,
            'Lighting Type': LightingType,
            'Office Improvements': OfficeImprovements,
            'Tech Purchases': TechPurchases,
            'Device Replacement Rate': DeviceReplacementRate,
            'Fleet Vehicle Footprint': FleetVehicleFootprint,
            'Meat Free Days': MeatFreeDays,
            'Locally Sourced': LocallySourced,
            'Food Wasted': FoodWasted,
            Region,
            'Region Footprint': RegionFootprint
          })
        }).then(() => {
          this.setState({ sent: true, sending: false })
        })
      })
    }

    GetAverageFootprint = (RegionID) => {
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

    GetRegionName = (RegionID) => {
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
        EmployeeFootprint,
        EnergyFootprint,
        RecyclingPercentage,
        GreenSupplierReduction,
        LightingType,
        OfficeImprovements,
        TechPurchases,
        DeviceReplacementRate,
        FleetVehicleFootprint,
        MeatFreeDays,
        LocallySourced,
        FoodWasted,
        RegionID
      } = this.props
      const RegionFootprint = this.GetAverageFootprint(RegionID)
      const Region = this.GetRegionName(RegionID)

      const { email, sent, sending } = this.state
      return (
        <div className={styles}>
          { sending ? (
            <div className="sending-text">Sending...</div>
          ) : (
            <div>
              { sent ? (
                <div className="sent-text">Email Confirmed!</div>
              ) : (
                <ValidatorForm
                  onSubmit={() => this.handleSubmit(TotalFootprint,
                    EmployeeFootprint,
                    EnergyFootprint,
                    RecyclingPercentage,
                    GreenSupplierReduction,
                    LightingType,
                    OfficeImprovements,
                    TechPurchases,
                    DeviceReplacementRate,
                    FleetVehicleFootprint,
                    MeatFreeDays,
                    LocallySourced,
                    FoodWasted,
                    Region,
                    RegionFootprint)}
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
  /** The footprint per employee */
  EmployeeFootprint: PropTypes.number.isRequired,
  /** The user's energy footprint */
  EnergyFootprint: PropTypes.number.isRequired,
  /** The user's waste recycling percentage */
  RecyclingPercentage: PropTypes.number.isRequired,
  /** The user's footprint reduction factor from using a green supplier */
  GreenSupplierReduction: PropTypes.number.isRequired,
  /** Footprint determined by type of lighting used */
  LightingType: PropTypes.number.isRequired,
  /** The footprint reduction due to office improvements */
  OfficeImprovements: PropTypes.number.isRequired,
  /** The footprint from the purchase of new equipment */
  TechPurchases: PropTypes.number.isRequired,
  /** Footprint scale factor based on how frequently devices are replaced */
  DeviceReplacementRate: PropTypes.number.isRequired,
  /** Footprint for the entirety of a business' fleet vehicles */
  FleetVehicleFootprint: PropTypes.number.isRequired,
  /** Reduction factor if the business has meat-free days */
  MeatFreeDays: PropTypes.number.isRequired,
  /** Reduction factor for locally sourcing food */
  LocallySourced: PropTypes.number.isRequired,
  /** Increase factor for wasting food */
  FoodWasted: PropTypes.number.isRequired,
  /** Numerical representation of user's geographic location */
  RegionID: PropTypes.number.isRequired
}

export default EmailSignup
