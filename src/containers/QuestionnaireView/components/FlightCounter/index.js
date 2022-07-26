import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Card } from '@material-ui/core'

import styles from './styles.scss'
import QuestionData from '../../../../data/QuestionnaireData/QuestionnaireData'
import CreolLogo from '../../../../assets/images/Creol.png'


/*
The component that populates flights question with the relevant components and options
 */
class FlightCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CurrentQuestionValue: 0,
      DomesticFlights: 0,
      EuropeFlights: 0,
      AsiaFlights: 0,
      NAFlights: 0,
      SAFlights: 0,
      AfricaFlights: 0
    }
  }


  // eslint-disable-next-line class-methods-use-this
  getFlightFootprintValue(OptionName, FlightFootprints) {
    /*
    @notice A function get the associated value for a given flight
    @param props: required for passing the state up
     */
    let i
    for (i = 0; i < FlightFootprints.length; i += 1) {
      if (OptionName === FlightFootprints[i][0]) {
        return FlightFootprints[i][1]
      }
    }
    return 0
  }


  // eslint-disable-next-line class-methods-use-this
  formatFlightFootprints(QuestionJSON, QuestionNumber, RegionID) {
    /*
    @notice A function to return the appropriate options based on the region
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @param RegionID: a number corresponding to the user's region
    @return An array of arrays containing the question options
     */
    let RegionOption = null
    switch (RegionID) {
    case 0:
      RegionOption = QuestionJSON.Questions[QuestionNumber].UKOption
      break
    case 1:
      RegionOption = QuestionJSON.Questions[QuestionNumber].EUOption
      break
    case 2:
      RegionOption = QuestionJSON.Questions[QuestionNumber].USOption
      break
    case 3:
      RegionOption = QuestionJSON.Questions[QuestionNumber].WorldOption
      break
    default:
      RegionOption = QuestionJSON.Questions[QuestionNumber].UKOption
      break
    }
    return RegionOption
  }

  // eslint-disable-next-line class-methods-use-this
  formatQuestionTitle(QuestionJSON, QuestionNumber) {
    /*
    @notice A function to parse the question from the JSON file for a given question
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @return A string of the question
     */
    return (QuestionJSON.Questions[QuestionNumber].Question)
  }

  updateFlights(OptionName, value, currentQuestionState, QuestionNumber, RegionID, props) {
    /*
    @notice A function to update the footprint state of the total and the corresponding option
    @param OptionName: string of the selected options name
    @param value: associated footprint value fo that option
    @param currentQuestionState: The quantity of flights displayed by the counter
    @param QuestionNumber: the current question number
    @param RegionID: a number corresponding to the user's region
    @param props: required for updating the total question state
     */
    if (currentQuestionState !== 0 || value > 0) {
      switch (OptionName) {
      case 'Domestic':
        this.setState({
          DomesticFlights: this.state.DomesticFlights + value
        }, () => {
          this.updateFootprintTotal(OptionName, value, QuestionData,
            QuestionNumber, RegionID, props)
        })
        break
      case 'Europe':
        this.setState({
          EuropeFlights: this.state.EuropeFlights + value
        }, () => {
          this.updateFootprintTotal(OptionName, value, QuestionData,
            QuestionNumber, RegionID, props)
        })
        break
      case 'Asia':
        this.setState({
          AsiaFlights: this.state.AsiaFlights + value
        }, () => {
          this.updateFootprintTotal(OptionName, value, QuestionData,
            QuestionNumber, RegionID, props)
        })
        break
      case 'North America':
        this.setState({
          NAFlights: this.state.NAFlights + value
        }, () => {
          this.updateFootprintTotal(OptionName, value, QuestionData,
            QuestionNumber, RegionID, props)
        })
        break
      case 'South America':
        this.setState({
          SAFlights: this.state.SAFlights + value
        }, () => {
          this.updateFootprintTotal(OptionName, value, QuestionData,
            QuestionNumber, RegionID, props)
        })
        break
      case 'Africa':
        this.setState({
          AfricaFlights: this.state.AfricaFlights + value
        }, () => {
          this.updateFootprintTotal(OptionName, value, QuestionData,
            QuestionNumber, RegionID, props)
        })
        break
      default:
        break
      }
    }
  }

  handleFlightFootprint(props) {
    /*
    @notice A function to pass the state up to the parent component
    @param props: required for passing the state up
     */
    props.onChange(this.state.CurrentQuestionValue)
  }

  updateFootprintTotal(OptionName, value, FootprintData, QuestionNumber, RegionID, props) {
    /*
   @notice A function update the total footprint state
   @param OptionName: string of the selected options name
   @param value: associated footprint value fo that option
   @param currentQuestionState: The quantity of flights displayed by the counter
   @param QuestionNumber: the current question number
   @param RegionID: a number corresponding to the user's region
   @param props: required for updating the total question state
    */
    const FlightFootprints = this.formatFlightFootprints(FootprintData, QuestionNumber, RegionID)
    const additionalValue = this.getFlightFootprintValue(OptionName, FlightFootprints)
    this.setState({
      CurrentQuestionValue:
              this.state.CurrentQuestionValue + (value * additionalValue)
    }, () => {
      this.handleFlightFootprint(props)
    }
    )
  }

  lookupButtonStateName(OptionName) {
    /*
  @notice A function to return corresponding state for a given option
  @param OptionName: string of the selected options name
  @return A state object
   */
    switch (OptionName) {
    case 'Domestic':
      return this.state.DomesticFlights
    case 'Europe':
      return this.state.EuropeFlights
    case 'Asia':
      return this.state.AsiaFlights
    case 'Africa':
      return this.state.AfricaFlights
    case 'North America':
      return this.state.NAFlights
    case 'South America':
      return this.state.SAFlights
    default:
      return this.state.DomesticFlights
    }
  }
  constructFlightQuestions(Options, QuestionNumber, RegionID, props) {
    /*
   @notice A function update the footprint state of the total and the corresponding option
   @param Options: An array of options containing the flight question info
   @param QuestionNumber: the current question number
   @param RegionID: a number corresponding to the user's region
   @param props: required for updating the total question state
   @return The React framework for the flights question
    */
    const questions = Options.map((optionNum, index) => {
      const currentQuestionState = this.lookupButtonStateName(Options[index][0])
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ maxHeight: 70 }} key={index}>
          <Grid item xs={6} >
            <h4 className="region-title" style={{ marginTop: 12, marginBottom: 12, fontWeight: 600 }}>{Options[index][0]}</h4>
          </Grid>
          <Grid item xs={6}>
            <ButtonGroup style={{ backgroundColor: '#F7F7F7', height: 35, color: 'black' }} size="large" color="primary" aria-label="flight-counter">
              <Button
                style={{ color: 'black', border: 'black' }}
                onClick={() => {
                  this.updateFlights(Options[index][0], -1,
                    currentQuestionState, QuestionNumber, RegionID, props)
                }}
              >-
              </Button>
              <Button style={{ color: 'black', border: 'black' }}>{ currentQuestionState }</Button>
              <Button
                style={{ color: 'black', border: 'black' }}
                onClick={() => {
                  this.updateFlights(Options[index][0], 1,
                    currentQuestionState, QuestionNumber, RegionID, props)
                }}
              >+
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      )
    })
    return questions
  }

  handlePreviousQuestion() {
    this.props.onPrevious()
  }

  handleNextQuestion() {
    this.props.onNext()
  }


  render() {
    const { QuestionNumber, RegionID } = this.props
    const QuestionTitle = this.formatQuestionTitle(QuestionData, QuestionNumber)
    const Options = this.formatFlightFootprints(QuestionData, QuestionNumber, RegionID)
    const FlightQuestions = this.constructFlightQuestions(Options,
      QuestionNumber, RegionID, this.props)
    return (
      <div className={styles}>
        <Card style={{
          padding: 32, borderRadius: '0.8rem', marginTop: 70, marginLeft: 10, marginRight: 10
        }}
        >
          <Grid
            container
            className="flight-counter"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <h3 style={{ fontWeight: 1000, marginTop: 0 }}>{QuestionTitle}</h3>
            </Grid>
            <Grid item xs>
              {FlightQuestions}
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" style={{ marginTop: 10 }}>
            <Grid item xs>
              <Button style={{ color: 'grey' }} onClick={() => { this.handlePreviousQuestion(this.props) }} startIcon={<ArrowBackIosIcon />}>
                Previous Question
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                className="next-button"
                color="primary"
                style={{ color: 'white', backgroundColor: '#33972d' }}
                onClick={() => { this.handleNextQuestion(this.props) }}
              >
                Next Question
              </Button>
            </Grid>
          </Grid>
        </Card>
        <a href="https://www.creol.io/">
          <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end">
            <Grid item>
              <h4 className="creol-footer" style={{ margin: 3 }}>Powered by Creol</h4>
            </Grid>
            <Grid item>
              <img src={CreolLogo} alt="Creol Logo" style={{ height: 15 }} />
            </Grid>
          </Grid>
        </a>
      </div>
    )
  }
}
FlightCounter.propTypes = {
  /** The associated position of the accommodation question in the questionnaire */
  QuestionNumber: PropTypes.number.isRequired,
  /** The chosen region of the questionnaire taker */
  RegionID: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default (FlightCounter)
