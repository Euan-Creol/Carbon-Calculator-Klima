import React, { Component }                   from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { styles }                             from './styles.scss'

class NumberInput extends Component {
  constructor() {
    super()
    this.state = {
      TextInput: 0
    }
  }

  handleChange(input, props) {
    /*
        @notice Update the input state if it is a number
        @param input: text input from the user
        @param props: Required to pass state to parent component
         */

    if (!(+input).isNaN) {
      this.setState({
        TextInput: parseInt(input, 10)
      }, () => { this.handleInputChange(props) })
    }
  }

  handleInputChange(props) {
    /*
        @notice Pass state to parent component
        @param props: Required for passing state to parent component
         */
    props.onChange(this.state.TextInput)
  }


  render() {
    const { InputLabel } = this.props
    return (
      <div className={styles}>
        <form>
          <TextField className="text-input" label={InputLabel} variant="outlined" onChange={event => this.handleChange(event.target.value, this.props)} />
        </form>
      </div>
    )
  }
}


NumberInput.propTypes = {
  InputLabel: PropTypes.string.isRequired
}

export default NumberInput
