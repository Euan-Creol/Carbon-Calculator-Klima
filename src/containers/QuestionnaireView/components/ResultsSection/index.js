import React, { Component }             from 'react'
import PropTypes                        from 'prop-types'
import { Button, Card, Divider, Grid }  from '@material-ui/core'
import LocalGasStationIcon              from '@mui/icons-material/LocalGasStation'
import { Pie, PieChart, Cell }                from 'recharts'
import MailOutlineIcon                  from '@mui/icons-material/MailOutline'
import CloudQueueIcon                   from '@mui/icons-material/CloudQueue'

import { styles }                       from './styles.scss'
import tCO2e                            from '../../../../assets/images/QuestionnaireView/tCO2e.png'
import KLIMA                            from '../../../../assets/images/QuestionnaireView/KLIMA.png'
import CreolLogo                        from '../../../../assets/images/Creol.png'

class ResultsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSegment: null
    }
  }
  render() {
    const {
      TotalFootprint,
      CarFootprint,
      MotorcycleFootprint,
      BusFootprint,
      TrainFootprint,
      FlightFootprint,
      HomeFootprint,
      HomeImprovements,
      FoodFootprint,
      RestaurantFootprint,
      FashionFootprint,
      HotelFootprint,
      AccessoryFootprint,
      klimaBacking
    } = this.props

    const {
      selectedSegment
    } = this.state

    const resultData = [
      {
        name: 'Transport',
        value: (CarFootprint +
          MotorcycleFootprint +
          TrainFootprint +
          BusFootprint +
          FlightFootprint)
      },
      {
        name: 'Energy',
        value: (HomeFootprint + HomeImprovements)
      },
      {
        name: 'Food',
        value: FoodFootprint + RestaurantFootprint
      },
      {
        name: 'Extras',
        value: HotelFootprint + FashionFootprint + AccessoryFootprint
      }
    ]

    const COLOURS = ['#33972d', '#3CB235', '#47D73F', '#54FE4A']

    function returnCategoryText(name, valueArray, totalFootprint, segment) {
      let categoryFootprint = 0

      for (let i = 0; i < valueArray.length; i + 1) {
        categoryFootprint += valueArray[i]
      }

      const percentageOfTotal = (categoryFootprint / totalFootprint) * 100

      let categoryTextWeight = 'normal'

      if (segment === name) {
        categoryTextWeight = 'bold'
      }


      return (
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={6} md={6}>
            <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" style={{ textAlign: 'left' }}>
              <Grid item xs>
                <h4
                  style={{
                    marginTop: 0, marginBottom: 0, fontSize: '14pt', color: 'grey', fontWeight: categoryTextWeight
                  }}
                  className="category-text"
                >
                  {name.toUpperCase()}
                </h4>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6}>
            <Grid container direction="column" alignItems="flex-end" justifyContent="flex-end" style={{ textAlign: 'right' }}>
              <Grid item xs>
                <h4
                  style={{
                    marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                  }}
                >
                  {categoryFootprint.toFixed(1)} |
                  <strong>
                    {percentageOfTotal.toFixed(1)}%
                  </strong>
                </h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    }

    return (
      <div className={styles}>
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={false} md={3} />
          <Grid item xs={12} md={3}>
            <Card className="result-card">
              <Grid container direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={6} md={6}>
                  <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" style={{ textAlign: 'left' }}>
                    <Grid item xs>
                      <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" style={{ textAlign: 'left' }}>
                        <Grid item xs>
                          <Button startIcon={<LocalGasStationIcon />} disabled style={{ color: 'black', fontSize: 'large' }}>FOOTPRINT</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <h1 style={{ marginTop: 0, marginBottom: 0, fontSize: '42pt' }}>{TotalFootprint.toFixed(1)}</h1>
                    </Grid>
                    <Grid item xs>
                      <h4 style={{
                        marginTop: 0, color: 'grey', fontSize: '18pt', fontWeight: 400
                      }}
                      >TONNES
                      </h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Grid container direction="column" alignItems="flex-end" justifyContent="flex-end">
                    <Grid item xs>
                      <PieChart width={120} height={120}>
                        <Pie
                          data={resultData}
                          cx="50%"
                          cy="50%"
                          dataKey="value" // make sure to map the dataKey to "value"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#33972d"
                          onMouseEnter={(e) => {
                            this.setState({
                              selectedSegment: e.name
                            })
                          }}
                        >
                          {resultData.map((entry, index) => (
                            <Cell
                              fill={COLOURS[index % COLOURS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {returnCategoryText('Transport', [CarFootprint, MotorcycleFootprint, TrainFootprint, BusFootprint, FlightFootprint], TotalFootprint, selectedSegment)}
              {returnCategoryText('Energy', [HomeFootprint + HomeImprovements], TotalFootprint, selectedSegment)}
              {returnCategoryText('Food', [FoodFootprint, RestaurantFootprint], TotalFootprint, selectedSegment)}
              {returnCategoryText('Extras', [FashionFootprint, AccessoryFootprint, HotelFootprint], TotalFootprint, selectedSegment)}
            </Card>
            <Card style={{ textAlign: 'left' }} className="result-card">
              <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
                <Grid item xs={1}>
                  <Button startIcon={<MailOutlineIcon />} disabled style={{ color: 'black', fontSize: 'large' }}>REDUCE</Button>
                </Grid>
              </Grid>
              <h4 style={{ marginTop: 0, marginBottom: 0, fontSize: '12pt' }}>
                There are many ways to live a lower carbon life. With these results you
                can start to assess the largest contributors and what you might change.
              </h4>
              <h4> </h4>
              <h4 style={{ marginTop: 0, marginBottom: 0, fontSize: '12pt' }}>
                Can you take public transport rather than driving?
              </h4>
              <h4> </h4>
              <h4 style={{ marginTop: 0, marginBottom: 0, fontSize: '12pt' }}>
                Are there any clean energy providers in your area?
              </h4>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="result-card">
              <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start">
                <Grid item xs>
                  <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end" style={{ textAlign: 'left' }}>
                    <Grid item xs>
                      <Button startIcon={<CloudQueueIcon />} disabled style={{ color: 'black', fontSize: 'large' }}>OFFSET</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <h4 style={{ fontSize: '14pt', fontWeight: 600, color: 'grey' }} className="result-text">
                    Reduce where you can, offset where you can&apos;t.
                  </h4>
                </Grid>
                <Grid item xs>
                  <h4 style={{ fontSize: '12pt' }} className="result-text">
                    KLIMA DAO is fighting climate change by embedding the cost of
                    carbon into a carbon backed currency called KLIMA.
                  </h4>
                </Grid>
                <Grid item xs>
                  <h4 style={{ fontSize: '12pt' }} className="result-text">
                    Each KLIMA token is backed by at least 1 ton of carbon. Below is a
                    conversion of your footprint in Klima, you can choose to offset
                    this.
                  </h4>
                </Grid>
                <Grid item xs style={{ paddingTop: 5 }}>
                  <Grid container direction="row" >
                    <Grid item xs={2}>
                      <img src={tCO2e} alt="tCO2e Circle" style={{ height: 40, marginBottom: 5 }} />
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: 10 }}>
                        <Grid item xs>
                          <h3 style={{
                            fontSize: '12pt', fontWeight: 500, marginTop: 0, marginBottom: 0
                          }}
                          >YOUR FOOTPRINT
                          </h3>
                        </Grid>
                        <Grid item xs>
                          <h3 style={{
                            fontSize: '14pt', fontWeight: 500, marginTop: 0, marginBottom: 0, color: '#33972d'
                          }}
                          >{TotalFootprint.toFixed(1)} TONS
                          </h3>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider style={{ color: 'grey' }} />
                <Grid item xs>
                  <Grid container direction="row" >
                    <Grid item xs={2}>
                      <img src={KLIMA} alt="KLIMA Circle" style={{ height: 40, marginTop: 5 }} />
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" style={{ textAlign: 'left', paddingLeft: 10 }}>
                        <Grid item xs>
                          <h3 style={{
                            fontSize: '12pt', fontWeight: 500, marginTop: 0, marginBottom: 0
                          }}
                          >IS EQUIVALENT TO
                          </h3>
                        </Grid>
                        <Grid item xs>
                          <h3 style={{
                            fontSize: '14pt', fontWeight: 500, marginTop: 0, marginBottom: 0, color: '#33972d'
                          }}
                          >
                            {(TotalFootprint / klimaBacking).toFixed(1)} KLIMA
                          </h3>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item xs>
                  <Button
                    variant="contained"
                    className="offset-button"
                    color="primary"
                    style={{ color: 'white', backgroundColor: '#33972d' }}
                    onClick={() => { window.location.href = `http://app.klimadao.finance/#/offset?quantity=${ (TotalFootprint).toFixed(1) }&inputToken=klima&retirementToken=bct` }}
                  >
                    OFFSET
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
          </Grid>
          <Grid item xs={false} md={3} />
        </Grid>
      </div>
    )
  }
}

ResultsSection.propTypes = {
  TotalFootprint: PropTypes.number.isRequired,
  CarFootprint: PropTypes.number.isRequired,
  MotorcycleFootprint: PropTypes.number.isRequired,
  BusFootprint: PropTypes.number.isRequired,
  TrainFootprint: PropTypes.number.isRequired,
  FlightFootprint: PropTypes.number.isRequired,
  HomeFootprint: PropTypes.number.isRequired,
  HomeImprovements: PropTypes.number.isRequired,
  FoodFootprint: PropTypes.number.isRequired,
  RestaurantFootprint: PropTypes.number.isRequired,
  FashionFootprint: PropTypes.number.isRequired,
  HotelFootprint: PropTypes.number.isRequired,
  AccessoryFootprint: PropTypes.number.isRequired,
  klimaBacking: PropTypes.number.isRequired
}

export default ResultsSection
