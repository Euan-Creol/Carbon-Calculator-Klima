import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'

/*
The dialogue popup displaying information on the questionnaire
 */
class DialogBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setOpen: false
    }
  }

  handleClickOpen() {
    this.setState({
      setOpen: true
    })
  }
  handleClose() {
    this.setState({
      setOpen: false
    })
  }

  render() {
    return (
      <div>
        <Button style={{ color: 'white' }} onClick={() => { this.handleClickOpen() }}> FAQs </Button>
        <Dialog open={this.state.setOpen} onBackdropClick={() => { this.handleClose() }}>
          <h3 align="center">
            What is a carbon footprint?
          </h3>
          <MuiDialogContent>
            <h4>
              A carbon footprint is the total amount of Greenhouse Gases generated as a result of one's actions.
            </h4>
          </MuiDialogContent>
          <h3 align="center">
            What is tCO2e?
          </h3>
          <MuiDialogContent>
            <h4>
              tCO2e stands for 1 ton CO2 equivalent. Whilst CO2 makes up a large proportion of total emissions, other Greenhouse Gases also have an impact on the climate. 1 ton of methane, for example, has 29x the impact one ton of CO2 has, so it is useful to factor in the total impact by converting to CO2 equivalent.
            </h4>
          </MuiDialogContent>
          <h3 align="center">
            Where is the carbon footprint average from?
          </h3>
          <MuiDialogContent>
            <h4>
              This average and the calculations in this calculator are based on data provided by
              the <a href="https://data.worldbank.org/indicator/EN.ATM.CO2E.PC">World Bank</a> and
              the <a href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019">
              UK Government
            </a>.
              Read more about carbon footprints <a>here</a>
            </h4>
          </MuiDialogContent>
          <h3 align="center">
            What can I do about my personal footprint?
          </h3>
          <MuiDialogContent>
            <h4>
              A useful mantra to live by is "Reduce where you can, offset where you can't", we hope that, based on the calculator results, you can reexamine parts of your lifestyle and decide what is important to you.
              For unavoidable emissions, carbon offsetting offers an option to fund green initiatives and promote a regenerative economy.
              It is important to mention, whilst lifestyle and personal carbon footprint deserves examination, it is only a small part of a bigger picture - there are many other ways to have a positive impact on the planet such as pushing for regulatory changes and supporting land stewardship.
            </h4>
          </MuiDialogContent>
          <h3 align="center">
            Disclaimer
          </h3>
          <MuiDialogContent>
            <h4>
              The purpose of this calculator is just to provide a rough estimate of your personal carbon footprint, it should not be taken as an absolute value. For a more complete idea of your footprint, cross-reference your results with other online carbon footprint calculators.
            </h4>
          </MuiDialogContent>
        </Dialog>
      </div>
    )
  }
}

export default DialogBox
