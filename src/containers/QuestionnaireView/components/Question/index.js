import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import styles from './styles.scss'
import QuestionData from '../../../../data/QuestionnaireData/QuestionnaireData'

/*
The component that populates the question array with appropriate answers
 */
class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CurrentQuestionValue: 0
    }
  }

  formatQuestionTitle(QuestionJSON, QuestionNumber) {
    /*
   @notice A function to parse the question from the JSON file for a given question
   @param QuestionJSON: the entire JSON data for the entire calculator
   @param QuestionNumber: the current question number
   @return A string of the question
    */
    return (QuestionJSON.Questions[QuestionNumber.QuestionNumber].Question)
  }

  formatQuestionOptions(QuestionJSON, QuestionNumber, RegionID) {
    /*
    @notice A function to return the appropriate values for the question based on the region
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @param RegionID: a number corresponding to the user's region
    @return An array of arrays containing the question options
     */
    let RegionOption = QuestionJSON.Questions[QuestionNumber.QuestionNumber].UKOption
    switch (RegionID) {
    case 0:
      RegionOption = QuestionJSON.Questions[QuestionNumber.QuestionNumber].UKOption
      break
    case 1:
      RegionOption = QuestionJSON.Questions[QuestionNumber.QuestionNumber].EUOption
      break
    case 2:
      RegionOption = QuestionJSON.Questions[QuestionNumber.QuestionNumber].USOption
      break
    case 3:
      RegionOption = QuestionJSON.Questions[QuestionNumber.QuestionNumber].WorldOption
      break
    default:
      RegionOption = QuestionJSON.Questions[QuestionNumber.QuestionNumber].UKOption
      break
    }
    return RegionOption
  }

  returnRadioArray(QuestionJSON, QuestionNumber, RegionID, props) {
    /*
    @notice A function to return the appropriate question options
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @param RegionID: a number corresponding to the user's region
    @return A Material-UI component of the individual dropdown options
     */
    const RadioArray = this.formatQuestionOptions(QuestionJSON, QuestionNumber, RegionID)
    return RadioArray.map(OptionArray => (
      <FormControlLabel
        key={OptionArray[0]}
        value={OptionArray[0]}
        control={<Radio />}
        label={OptionArray[0]}
        onChange={() => this.updateFootprint(OptionArray[1], props)}
      />
    )
    )
  }

  updateFootprint(value, props) {
    /*
    @notice A function to update the state when a question option is chosen
    @param value: The associated footprint value of that option
    @param props: required for updating the total question state
     */
    this.setState({
      CurrentQuestionValue: value
    }, () => {
      this.handleRadioChange(props)
    }
    )
  }

  handleRadioChange(props) {
    /*
    @notice A function to pass the state up to the parent component
    @param props: required for passing the state up
     */
    props.onChange(this.state.CurrentQuestionValue)
  }

  // const { Question, Options } = props;
  render() {
    const QuestionNumber = this.props
    const { RegionID } = this.props
    const QuestionTitle = this.formatQuestionTitle(QuestionData, QuestionNumber)
    return (
      <div className={styles}>
        <Grid
          container
          className="question"
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <h3>{QuestionTitle}</h3>
            <form>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="transport"
                  name="customized-radios"
                >
                  {this.returnRadioArray(QuestionData, QuestionNumber, RegionID, this.props)}
                </RadioGroup>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}
Question.propTypes = {
  /** The associated position of the accommodation question in the questionnaire */
  QuestionNumber: PropTypes.number.isRequired,
  /** The chosen region of the questionnaire taker */
  RegionID: PropTypes.number.isRequired
}

export default (Question)
