import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Card } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { styles } from './styles.scss'
import QuestionData from '../../../../data/QuestionnaireData/QuestionnaireData'


/*
The component that populates the checkbox array with appropriate answers
 */
class QuestionCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CurrentQuestionValue: 0
    }
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

  // eslint-disable-next-line class-methods-use-this
  formatQuestionOptions(QuestionJSON, QuestionNumber, RegionID) {
    /*
     @notice A function to return the appropriate values for the question based on the region
     @param QuestionJSON: the entire JSON data for the entire calculator
     @param QuestionNumber: the current question number
     @param RegionID: a number corresponding to the user's region
     @return An array of arrays containing the checkbox options
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

  returnCheckboxArray(QuestionJSON, QuestionNumber, RegionID, props) {
    /*
    @notice A function to return the appropriate checkbox options
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @param RegionID: a number corresponding to the user's region
    @param props: required to pass state up
    @return A React component of the individual checkbox options
     */
    const CheckboxArray = this.formatQuestionOptions(QuestionJSON, QuestionNumber, RegionID)
    return CheckboxArray.map(Array => (
      <FormControlLabel
        key={Array[0]}
        control={<Checkbox name={Array[0]} style={{ color: '#33972d' }} />}
        label={Array[0]}
        onChange={(event, newValue) => this.updateFootprint(Array[1], newValue, props)}
      />
    )
    )
  }

  updateFootprint(value, checkboxState, props) {
    /*
    @notice A function to update the state when a checkbox item is selected or deselected
    @param value: The associated footprint value of that selection
    @param checkboxState: Boolean of whether that particular checkbox is currently selected or not
    @param props: required for updating the total question state
     */
    if (checkboxState === true) {
      this.setState({
        CurrentQuestionValue: this.state.CurrentQuestionValue + value
      }, () => {
        this.handleCheckboxChange(props)
      }
      )
    } else if (checkboxState === false) {
      this.setState({
        CurrentQuestionValue: this.state.CurrentQuestionValue - value
      }, () => {
        this.handleCheckboxChange(props)
      })
    }
  }

  handleCheckboxChange(props) {
    /*
    @notice A function to pass the state up to the parent component
    @param props: required for passing the state up
     */
    props.onChange(this.state.CurrentQuestionValue)
  }

  handlePreviousQuestion() {
    this.props.onPrevious()
  }

  handleNextQuestion() {
    this.props.onNext()
  }

  render() {
    const { RegionID, QuestionNumber } = this.props
    const QuestionTitle = this.formatQuestionTitle(QuestionData, QuestionNumber)
    return (
      <div className={styles}>
        <Card style={{
          padding: 32, borderRadius: '0.8rem', marginLeft: 10, marginRight: 10
        }}
        >
          <Grid
            container
            className="checkbox"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <h3 style={{ fontWeight: 1000, marginTop: 0 }}>{QuestionTitle}</h3>
            </Grid>
            <Grid item xs>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose all that apply</FormLabel>
                <FormGroup>
                  {this.returnCheckboxArray(QuestionData, QuestionNumber, RegionID, this.props)}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
            <Grid item xs>
              <Button style={{ color: 'grey' }} onClick={() => { this.handlePreviousQuestion() }} startIcon={<ArrowBackIosIcon />}>
                Previous Question
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                className="next-button"
                color="primary"
                style={{ color: 'white', backgroundColor: '#33972d' }}
                onClick={() => { this.handleNextQuestion() }}
              >
                Next Question
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    )
  }
}
QuestionCheckbox.propTypes = {
  /** The associated position of the accommodation question in the questionnaire */
  QuestionNumber: PropTypes.number.isRequired,
  /** The chosen region of the questionnaire taker */
  RegionID: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default QuestionCheckbox
