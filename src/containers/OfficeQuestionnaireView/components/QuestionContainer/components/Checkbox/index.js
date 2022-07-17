import React, { Component }        from 'react'
import PropTypes                   from 'prop-types'
import { FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox }                       from '@material-ui/core'

import { styles }                  from './styles.scss'


class QuestionCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      QuestionFootprint: 0
    }
  }

  ReturnCheckboxContent(CheckboxOptions, props) {
    /*
         @notice A function to map and return the checkbox options
         @param CheckboxOptions: Array of data corresponding to the regions checkbox options
         @param props: Required to pass state to parent component
         @return React component of the checkbox option mapping
          */
    return CheckboxOptions.map(Array => (
      <FormControlLabel
        key={Array[0]}
        control={<Checkbox name={Array[0]} />}
        label={Array[0]}
        onChange={(event, newValue) => this.UpdateFootprint(Array[1], newValue, props)}
      />
    ))
  }

  UpdateFootprint(Value, CheckboxState, props) {
    /*
        @notice A function to update the state when a
        checkbox item is selected or deselected
        @param Value: The associated footprint value of that selection
        @param CheckboxState: Boolean of whether that
        particular checkbox is currently selected or not
        @param props: required for updating the total question state
        */
    if (CheckboxState === true) {
      this.setState({
        QuestionFootprint: this.state.QuestionFootprint + Value
      }, () => {
        this.handleCheckboxChange(props)
      }
      )
    } else if (CheckboxState === false) {
      this.setState({
        QuestionFootprint: this.state.QuestionFootprint - Value
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
    props.onChange(this.state.QuestionFootprint)
  }


  render() {
    const { CheckboxOptions } = this.props
    return (
      <div className={styles}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose all that apply</FormLabel>
          <FormGroup>
            {this.ReturnCheckboxContent(CheckboxOptions, this.props)}
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

QuestionCheckbox.propTypes = {
  /* Array containing the checkbox data for that question and region */
  CheckboxOptions: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default QuestionCheckbox
