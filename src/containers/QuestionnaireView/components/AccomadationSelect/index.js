import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import QuestionData from '../../../../data/QuestionnaireData/QuestionnaireData'
import styles from '../Question/styles.scss'

/*
The component handling the dropdown selections for the accommodation question
 */

class AccomSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Select1: 0,
      Select2: 0,
      Select3: 1,
      CurrentQuestionValue: 0
    }
  }

  formatQuestionTitle = (QuestionJSON, QuestionNumber) => {
    /*
    @notice A function to parse the question from the JSON file for a given question
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @return A string of the question
     */
    return (QuestionJSON.Questions[QuestionNumber.QuestionNumber].Question)
  }

  formatQuestionOptions = (QuestionJSON, QuestionNumber, RegionID) => {
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

  formatQuestionOptions2 = (QuestionJSON, QuestionNumber) => {
    /*
    @notice A function to return the appropriate answers for the second select dropdown
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @return An array of arrays containing the question options
     */
    return QuestionJSON.Questions[QuestionNumber.QuestionNumber].Options2
  }

  formatQuestionOptions3 = (QuestionJSON, QuestionNumber) => {
    /*
    @notice A function to return the appropriate answers for the third select dropdown
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @return An array of arrays containing the question options
     */
    return QuestionJSON.Questions[QuestionNumber.QuestionNumber].Options3
  }

  returnSelectArray(QuestionJSON, QuestionNumber, SelectNumber, RegionID) {
    /*
    @notice A function to return the appropriate dropdown options
    @param QuestionJSON: the entire JSON data for the entire calculator
    @param QuestionNumber: the current question number
    @param RegionID: a number corresponding to the user's region
    @return A React component of the individual dropdown options
     */
    let SelectArray = []
    switch (SelectNumber) {
    case 1:
      SelectArray = this.formatQuestionOptions(QuestionJSON, QuestionNumber, RegionID)
      break
    case 2:
      SelectArray = this.formatQuestionOptions2(QuestionJSON, QuestionNumber)
      break
    case 3:
      SelectArray = this.formatQuestionOptions3(QuestionJSON, QuestionNumber)
      break
    default:
      SelectArray = []
    }
    return SelectArray.map((Array, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <MenuItem key={index} value={Array[1]}> {Array[0]} </MenuItem>
    )
    )
  }

  UpdateFootprint(value, selectNumber, props) {
    /*
    @notice A function to update the state when a select option is chosen
    @param value: The associated footprint value of that selection
    @param selectNumber: The numerical index of the chosen select component
    @param props: required for updating the total question state
     */
    switch (selectNumber) {
    case 1:
      this.setState({
        Select1: value
      })
      break
    case 2:
      this.setState({
        Select2: value
      })
      break
    case 3:
      this.setState({
        Select3: value
      })
      break
    default:
      break
    }
    this.UpdateQuestionValue(props)
  }

  UpdateQuestionValue(props) {
    /*
    @notice A function to update the total footprint for the question
    @param props: required for passing the state up
     */
    this.setState({
      CurrentQuestionValue: (this.state.Select1 * this.state.Select2) / this.state.Select3
    }, () => { this.handleSelectChange(props) }
    )
  }

  handleSelectChange(props) {
    /*
    @notice A function to pass the state up to the parent component
    @param props: required for passing the state up
     */
    props.onChange(this.state.CurrentQuestionValue)
  }

  render() {
    const { RegionID, QuestionNumber } = this.props
    const QuestionTitle = this.formatQuestionTitle(QuestionData, QuestionNumber)
    return (
      <div className={styles}>
        <Grid container direction="column">
          <Grid item>
            <h3> {QuestionTitle} </h3>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <Grid item>
              <h3>I live in a </h3>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  labelWidth={100}
                  id="demo-simple-select"
                  autoWidth
                  displayEmpty
                  defaultValue=""
                  onChange={event => this.UpdateFootprint(event.target.value, 2, this.props)}
                >
                  {this.returnSelectArray(QuestionData, QuestionNumber, 2, RegionID)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <h3>bedroom</h3>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  onChange={event => this.UpdateFootprint(event.target.value, 1, this.props)}
                >
                  {this.returnSelectArray(QuestionData, QuestionNumber, 1, RegionID)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <h3>with</h3>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  onChange={event => this.UpdateFootprint(event.target.value, 3, this.props)}
                >
                  {this.returnSelectArray(QuestionData, QuestionNumber, 3, RegionID)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <h3>people</h3>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}
AccomSelect.propTypes = {
  /** The associated position of the accommodation question in the questionnaire */
  QuestionNumber: PropTypes.number.isRequired,
  /** The chosen region of the questionnaire taker */
  RegionID: PropTypes.number.isRequired
}

export default (AccomSelect)
