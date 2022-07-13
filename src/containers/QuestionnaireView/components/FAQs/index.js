import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'
import Grid                       from '@material-ui/core/Grid'
import { Card, CardActionArea }   from '@material-ui/core'
import ArrowUpwardIcon            from '@mui/icons-material/ArrowUpward'

class FAQs extends Component {
  handleHomeSelection() {
    this.props.onHome()
  }

  render() {
    return (
      <div>
        <Card style={{
          width: '100%', padding: 32, borderRadius: '0.8rem'
        }}
        >
          <Grid
            container
            className="checkbox"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{ textAlign: 'left' }}
          >
            <Grid item xs>
              <h3 style={{ fontWeight: 1000, marginTop: 0, marginBottom: 0 }}>FAQs</h3>
            </Grid>
          </Grid>
          <Grid
            container
            className="checkbox"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <h4 style={{ fontWeight: 600, marginTop: 0, marginBottom: 0 }}>
                What is a Carbon Footprint?
              </h4>
            </Grid>
            <Grid item xs style={{ textAlign: 'left' }}>
              <h4>
                A carbon footprint is the total amount of Greenhouse Gases generated as a result of
                one&apos;s actions.
                tCO2e stands for 1 ton CO2 equivalent. Whilst CO2 makes up a large proportion of
                total emissions, other Greenhouse Gases also have an tCO2e stands for 1 ton CO2
                equivalent. Whilst CO2 makes up a large proportion of total emissions, other
                Greenhouse Gases also have an impact on the climate. 1 ton of methane, for example,
                has 29x the impact one ton of CO2 has, so it is useful to factor in the total
                impact by converting to CO2 equivalent.
              </h4>
            </Grid>
            <Grid item xs>
              <h4 style={{ fontWeight: 600, marginTop: 0, marginBottom: 0 }}>
                Where is the carbon footprint average for my region from?
              </h4>
            </Grid>
            <Grid item xs style={{ textAlign: 'left' }}>
              <h4>
                This average and the calculations in this
                calculator are based on data provided by the
                <a href="https://data.worldbank.org/indicator/EN.ATM.CO2E.PC"> World Bank </a>
                and the
                <a href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019"> UK Government </a>
                . Read more about carbon footprints
                <a href="https://www.footprintnetwork.org/our-work/climate-change/"> here</a>.
              </h4>
            </Grid>
            <Grid item xs>
              <h4 style={{ fontWeight: 600, marginTop: 0, marginBottom: 0 }}>
                Where is this data from?
              </h4>
            </Grid>
            <Grid item xs style={{ textAlign: 'left' }}>
              <h4>
                This methodology and dataset is largely based on the work of <a href="https://www.carbonfootprint.com/calculator.aspx">carbonfootprint.com</a>,
                they provide a more in-depth and accurate calculator on their website.
              </h4>
            </Grid>
            <Grid item xs>
              <Card elevation={0} >
                <CardActionArea onClick={() => { this.handleHomeSelection() }}>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs>
                      <ArrowUpwardIcon />
                    </Grid>
                    <Grid item xs>
                      <h4 style={{ fontWeight: 600, margin: 0 }}>
                        Home
                      </h4>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </div>
    )
  }
}

FAQs.propTypes = {
  onHome: PropTypes.func.isRequired
}

export default FAQs
