import React, { Component }                              from 'react'
import PropTypes                                         from 'prop-types'
import { Radio, RadioGroup, FormControlLabel, FormControl }   from '@material-ui/core'
import { styles }                                        from './styles.scss'

class Question extends Component {
  constructor() {
    super()
    this.state = {
      QuestionFootprint: 0
    }
  }

  ReturnQuestionContent(QuestionOptions, props) {
    /*
         @notice A function to map and return the question options
         @param QuestionOptions: Array of data corresponding to the regions question options
         @param props: Required to pass state to parent component
         @return React component of the question option mapping
          */
    return QuestionOptions.map(RadioArray => (
      <FormControlLabel
        className="question-icon"
        key={RadioArray[0]}
        value={RadioArray[0]}
        control={<Radio />}
        label={RadioArray[0]}
        onChange={() => this.UpdateFootprint(RadioArray[1], props)}
      />
    ))
  }

  UpdateFootprint(OptionValue, props) {
    /*
         @notice Update state for the question footprint
         @param OptionValue: Value of the chosen option
         @param props: Required to pass state to parent component
          */
    this.setState({
      QuestionFootprint: OptionValue
    }, () => { this.handleFootprintChange(props) })
  }

  handleFootprintChange(props) {
    /*
        @notice A function to pass the state up to the parent component
        @param props: required for passing the state up
        */
    props.onChange(this.state.QuestionFootprint)
  }

  render() {
    const { QuestionOptions } = this.props
    return (
      <div className={styles}>
        <form>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="transport"
              name="customized-radios"
              className="question-array"
            >
              {this.ReturnQuestionContent(QuestionOptions, this.props)}
            </RadioGroup>
          </FormControl>
        </form>

      </div>
    )
  }
}

Question.propTypes = {
  QuestionOptions: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Question
