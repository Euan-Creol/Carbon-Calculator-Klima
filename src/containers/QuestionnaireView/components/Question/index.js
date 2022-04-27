import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button, Card, CardActionArea } from '@material-ui/core'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import styles from './styles.scss'
import CreolLogo from '../../../../assets/images/Creol.png'
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

  returnButtonArray(QuestionJSON, QuestionNumber, RegionID, props) {
    const ButtonArray = this.formatQuestionOptions(QuestionJSON, QuestionNumber, RegionID)
    return ButtonArray.map(OptionArray => (
      <Grid item style={{ width: '60%' }}>
        <Card
          style={{
            backgroundColor: '#F7F7F7', width: '100%', margin: 6, textAlign: 'left'
          }}
          key={OptionArray[0]}
          elevation={0}
        >
          <CardActionArea onClick={() => this.updateFootprint(OptionArray[1], props)}>
            <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
              <Grid item xs={10} md={10}>
                <h4 style={{
                  margin: 6, paddingLeft: 16, fontWeight: 600, align: 'flex-start'
                }}
                >{OptionArray[0]}
                </h4>
              </Grid>
              <Grid item xs={2} md={2}>
                <ArrowForwardIosIcon style={{ color: 'grey', padding: 8, height: 15 }} />
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    ))
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

  handlePreviousQuestion() {
    this.props.onPrevious()
  }

  // const { Question, Options } = props;
  render() {
    const { RegionID, QuestionNumber } = this.props
    const QuestionTitle = this.formatQuestionTitle(QuestionData, QuestionNumber)
    return (
      <div className={styles}>
        <Card style={{
          width: '100%', padding: 32, borderRadius: '0.8rem', marginTop: 120
        }}
        >
          <Grid
            container
            className="question"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <h3 className="question-title" style={{ fontWeight: 1000, marginTop: 0 }}>{QuestionTitle}</h3>
            </Grid>
          </Grid>
          <Grid
            container
            className="question"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >

            {this.returnButtonArray(QuestionData, QuestionNumber, RegionID, this.props)}
            {/*
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
                */}
          </Grid>
          <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start">
            <Grid item xs>
              <Button style={{ color: 'grey' }} onClick={() => { this.handlePreviousQuestion(this.props) }} startIcon={<ArrowBackIosIcon />}>
                Previous Question
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
Question.propTypes = {
  /** The associated position of the accommodation question in the questionnaire */
  QuestionNumber: PropTypes.number.isRequired,
  /** The chosen region of the questionnaire taker */
  RegionID: PropTypes.number.isRequired,
  onPrevious: PropTypes.number.isRequired
}

export default (Question)
