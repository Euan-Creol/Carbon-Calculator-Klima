import React, { Component }                              from 'react'
import PropTypes                                         from 'prop-types'
import { FormControl, Select, MenuItem, InputLabel }          from '@material-ui/core'
import { styles }                                        from './styles.scss'


class Selection extends Component {
  constructor() {
    super()
    this.state = {
      QuestionFootprint: 0
    }
  }

  ReturnSelectArray = (SelectOptions) => {
    /*
     @notice A function to map and return the select options
     @param CheckboxOptions: Array of data corresponding to the regions select options
     @return React component of the select option mapping
      */
    return SelectOptions.map(Array => (
      <MenuItem
        key={Array[0]}
        value={Array[1]}
      >
        {Array[0]}
      </MenuItem>
    ))
  }

  UpdateFootprint(Value, props) {
    /*
        @notice A function to update the state when a select option is chosen
        @param Value: The associated footprint value of that selection
        @param props: required for updating the total question state
        */
    this.setState({
      QuestionFootprint: Value
    }, () => { this.handleSelectChange(props) })
  }

  handleSelectChange(props) {
    /*
        @notice A function to pass the state up to the parent component
        @param props: required for passing the state up
        */
    props.onChange(this.state.QuestionFootprint)
  }

  render() {
    const { SelectOptions, DefaultValue, DefaultBool } = this.props
    return (
      <div className={styles}>
        <FormControl fullWidth={DefaultBool}>
          <InputLabel style={{ color: 'white' }}> {DefaultValue} </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            autoWidth
            displayEmpty
            defaultValue=""
            onChange={event => this.UpdateFootprint(event.target.value, this.props)}
          >
            {this.ReturnSelectArray(SelectOptions)}
          </Select>
        </FormControl>
      </div>
    )
  }
}

Selection.propTypes = {
  /* Relevant data to populate select component */
  SelectOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /* Placeholder label for select component */
  DefaultValue: PropTypes.string.isRequired,
  /* Determine whether full width component or not */
  DefaultBool: PropTypes.bool.isRequired
}

export default Selection
