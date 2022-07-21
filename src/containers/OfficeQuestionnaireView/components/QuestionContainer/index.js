import React, { Component }                   from 'react'
import PropTypes                              from 'prop-types'
import { Grid }                               from '@material-ui/core'

import OfficeData                             from '../../../../data/OfficeQuestionnaireData/OfficeQuestionnaireData'
import { styles }                             from './styles.scss'
import NumberInput                            from './components/NumberInput'
import MultipleNumberInput                    from './components/MultipleNumberInput'
import Question                               from './components/Question'
import QuestionCheckbox                       from './components/Checkbox'
import Selection                              from './components/Select'
import Counter                                from './components/Counter'

/*
The container component for each question - handles the region selection and data parsing
 */
class QuestionContainer extends Component {
  constructor() {
    super()
    this.state = {
      QuestionFootprint: 0,
      Output: []
    }
  }

  ReturnQuestionTitle = (QuestionNumber) => {
    /*
     @notice A function to find the question title for a given question
     @param QuestionNumber: A numerical representation of current question
     @return React component of the question title
      */
    return <h2>{OfficeData.Questions[QuestionNumber].Question}</h2>
  }

  DetermineRegionOptions = (QuestionNumber, RegionID) => {
    /*
     @notice A function to return the appropriate question options based on region
     @param QuestionNumber: A numerical representation of current question
     @param RegionID: A numerical representation of the user's geographical location
     @return An array specifying which component to use and what the associated options are
      */
    const component = OfficeData.Questions[QuestionNumber].Component
    let Options = OfficeData.Questions[QuestionNumber].Options.UKOptions
    switch (RegionID) {
    case 0:
      Options = OfficeData.Questions[QuestionNumber].Options.UKOptions
      break
    case 1:
      Options = OfficeData.Questions[QuestionNumber].Options.EUOptions
      break
    case 2:
      Options = OfficeData.Questions[QuestionNumber].Options.USOptions
      break
    case 3:
      Options = OfficeData.Questions[QuestionNumber].Options.WorldOptions
      break
    default:
      Options = OfficeData.Questions[QuestionNumber].Options.UKOptions
      break
    }
    return [component, Options]
  }

  UpdateQuestionFootprint(footprintAddition, footprintMultiplier, props) {
    /*
     @notice A function to update state based on the question answer
     @param footprintAddition: Result from the question
     @param footprintMultiplier: Carbon footprint impact of the chosen option
     @param props: Required to pass state to parent component
      */
    if (Array.isArray(footprintAddition)) {
      this.setState({
        Output: footprintAddition
      }, () => { this.handleArrayChange(props) })
    } else {
      this.setState({
        QuestionFootprint: footprintAddition * footprintMultiplier
      }, () => { this.handleFootprintChange(props) })
    }
  }

  ReturnQuestionComponents(RegionOptions, props) {
    /*
     @notice A function to return the appropriate component
     @param RegionOptions: An array containing component type and appropriate region options
     @param props: Required to pass state to parent component
     @return Relevant React component
      */
    switch (RegionOptions[0]) {
    default:
      return (
        <h2>Component Missing</h2>
      )
    case 'Number Input':
      return (<NumberInput
        InputLabel={RegionOptions[1][0][0]}
        onChange={footprintAddition =>
          this.UpdateQuestionFootprint(footprintAddition, RegionOptions[1][0][1], props)}
      />)
    case 'Question':
      return (<Question
        QuestionOptions={RegionOptions[1]}
        onChange={footprintAddition =>
          this.UpdateQuestionFootprint(footprintAddition, 1, props)}
      />)
    case 'Checkbox':
      return (<QuestionCheckbox
        CheckboxOptions={RegionOptions[1]}
        onChange={footprintAddition =>
          this.UpdateQuestionFootprint(footprintAddition, 1, props)}
      />)
    case 'Select':
      return (<Selection
        SelectOptions={RegionOptions[1]}
        onChange={footprintAddition =>
          this.UpdateQuestionFootprint(footprintAddition, 1, props)}
      />)

    case 'Counter':
      return (<Counter
        CounterOptions={RegionOptions[1]}
        onChange={footprintAddition =>
          this.UpdateQuestionFootprint(footprintAddition, 1, props)}
      />)
    case 'Multiple Number Input':
      return (<MultipleNumberInput
        InputData={RegionOptions[1]}
        onChange={output =>
          this.UpdateQuestionFootprint(output, 1, props)}
      />)
    case 'Counter and Select':
      return (<Counter
        CounterOptions={RegionOptions[1].Counter}
        SelectOptions={RegionOptions[1].Select}
        onChange={footprintAddition =>
          this.UpdateQuestionFootprint(footprintAddition, 1, props)}
      />)
    case 'Multiple Inputs':
      return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
          <Grid item xs>
            <NumberInput
              InputLabel={RegionOptions[1].Input1[0][0]}
              onChange={footprintAddition =>
                this.UpdateQuestionFootprint(
                  footprintAddition,
                  RegionOptions[1].Input1[0][1],
                  props
                )}
            />
          </Grid>
          <Grid item xs>
            <h2>OR</h2>
          </Grid>
          <Grid item xs>
            <NumberInput
              InputLabel={RegionOptions[1].Input2[0][0]}
              onChange={footprintAddition =>
                this.UpdateQuestionFootprint(
                  footprintAddition,
                  RegionOptions[1].Input2[0][1],
                  props
                )}
            />
          </Grid>
        </Grid>
      )
    case 'Info':
      return <h2><a href="mailto:corporate@creol.io">corporate@creol.io</a></h2>
    }
    // return component
  }

  ReturnQuestionContent(QuestionNumber, RegionID, props) {
    /*
     @notice A function to combine the different content for the question
     @param QuestionNumber: A numerical representation of current question
     @param RegionID: A numerical representation of user's geographical location
     @param props: Required to pass state to parent component
     @return Entire React component for the question
      */
    const QuestionTitle = this.ReturnQuestionTitle(QuestionNumber)
    const RegionOptions = this.DetermineRegionOptions(QuestionNumber, RegionID)
    const QuestionComponents = this.ReturnQuestionComponents(RegionOptions, props)
    return (
      <div>
        <div>{QuestionTitle}</div>
        <div>{QuestionComponents}</div>
      </div>
    )
  }

  handleFootprintChange(props) {
    /*
      @notice Pass state to parent component
      @param props: Required for passing state to parent component
       */
    props.onChange(this.state.QuestionFootprint)
  }

  handleArrayChange(props) {
    /*
      @notice Pass state to parent component
      @param props: Required for passing state to parent component
       */
    props.onChange(this.state.Output)
  }

  render() {
    const { QuestionNumber, RegionID } = this.props
    return (
      <div className={styles}>
        <Grid style={{ paddingTop: 50 }} container direction="column" justify="center" alignItems="center" spacing={1}>
          <Grid item xs={10}>
            {this.ReturnQuestionContent(QuestionNumber, RegionID, this.props)}
          </Grid>
        </Grid>
      </div>
    )
  }
}


QuestionContainer.propTypes = {
  /** The numerical position of the question in the questionnaire */
  QuestionNumber: PropTypes.number.isRequired,
  /** Numerical representation of user's geographic location */
  RegionID: PropTypes.number.isRequired
}

export default QuestionContainer
