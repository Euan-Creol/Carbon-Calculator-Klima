import React, { Component }                 from 'react'
import ReactFullpage                        from '@fullpage/react-fullpage'
import { withRouter }                       from 'react-router-dom'
import MetaTags                             from 'react-meta-tags'
import axios from 'axios'
import {
  Button,
  ButtonGroup,
  Grid,
  CircularProgress,
  Divider,
  Card
}                                           from '@material-ui/core'
import { PieChart, Pie }             from 'recharts'
import { ethers }                           from 'ethers'
import LocalGasStationIcon                  from '@mui/icons-material/LocalGasStation'
import MailOutlineIcon                      from '@mui/icons-material/MailOutline'
import CloudQueueIcon                       from '@mui/icons-material/CloudQueue'
import { Typography } from '@mui/material'

import AccomSelect                          from './components/AccomadationSelect'
import CoverImage                           from '../../assets/images/green-wormhole-transparent.jpg'
import LogoGif                              from '../../assets/images/LogoGif.gif'
import RegionSelect                         from './components/RegionSelection'
import { styles }                           from './styles.scss'
import Question                             from './components/Question'
import QuestionCheckbox                     from './components/Checkbox'
import FlightCounter                        from './components/FlightCounter'
import CreolKlima                           from '../../assets/images/KLIMAxCreol.png'
import tCO2e                                from '../../assets/images/QuestionnaireView/tCO2e.png'
import KLIMA                                from '../../assets/images/QuestionnaireView/KLIMA.png'
import IERC20                               from '../../data/QuestionnaireData/IERC20'
import PairContract                         from '../../data/QuestionnaireData/PairContract'
import addresses                            from '../../data/QuestionnaireData/contractAddresses'
import CreolLogo                            from '../../assets/images/Creol.png'

/*
The parent component incorporating the calculator questions, components and result display
 */
class QuestionnaireView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TotalFootprint: 0.0,

      RegionID: 2,

      QuestionCategory: 'Transport',

      TransportNo: 0,
      EnergyNo: 0,
      FoodNo: 0,
      ExtrasNo: 0,
      ProgressOn: '',

      // Transport
      CarFootprint: 0,
      Q2: 0,
      Q3: 0,
      MotorcycleFootprint: 0,
      BusFootprint: 0,
      TrainFootprint: 0,
      FlightFootprint: 0,

      // Home
      HomeFootprint: 0,
      HomeImprovements: 0,

      // Food
      FoodFootprint: 0,
      RestaurantFootprint: 0,

      // Extras
      HotelFootprint: 0,
      FashionFootprint: 0,
      AccessoryFootprint: 0,

      fullpageSet: false,
      fullpage: null,
      previousQuestion: [0, 0],

      klimaBacking: 1
    }
  }

  componentWillMount() {
    this.getGeoInfo()
    this.getKlimaData()
  }

  componentDidMount() {
    const ghostArtifact = document.querySelector('.landing-header')
    if (ghostArtifact !== null) {
      ghostArtifact.parentNode.removeChild(ghostArtifact)
    }
  }

  getKlimaData = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com')
    const bctContract = new ethers.Contract(
      addresses.mainnet.bct,
      IERC20.abi,
      provider
    )

    const nakedBCT = await bctContract.balanceOf(addresses.mainnet.treasury)

    const klimaTokenContract = new ethers.Contract(
      addresses.mainnet.klima,
      IERC20.abi,
      provider
    )

    const totalSupply = await klimaTokenContract.totalSupply()

    // const bctUSDC = await this.getOwnedBCTFromSLP(provider, addresses.mainnet.bctUsdcLp)
    const klimaBCT = await this.getOwnedBCTFromSLP(provider, addresses.mainnet.klimaBctLp)

    const nakedBCTInt = this.getInteger(nakedBCT)
    const totalSupplyInt = totalSupply.toNumber() / 1000000000

    // Backing per KLIMA = (nakedBCTInt + klimaBCT) / totalSupplyInt)

    this.setState({
      klimaBacking: ((nakedBCTInt + klimaBCT) / totalSupplyInt)
    })
  }

  getOwnedBCTFromSLP = async (provider, slpAddress) => {
    const contract = new ethers.Contract(slpAddress, PairContract.abi, provider)
    const [token0, token1, [reserve0, reserve1], treasurySLP, totalSLP] =
      await Promise.all([
        contract.token0(),
        contract.token1(),
        contract.getReserves(),
        contract.balanceOf(addresses.mainnet.treasury),
        contract.totalSupply()
      ])
    let reserve
    if (token0.toLowerCase() === addresses.mainnet.bct.toLowerCase()) {
      reserve = reserve0
    } else if (token1.toLowerCase() === addresses.mainnet.bct.toLowerCase()) {
      reserve = reserve1
    } else {
      throw new Error('No BCT reserve found')
    }
    const bctSupply = this.getInteger(reserve)
    const ownership = treasurySLP / totalSLP // decimal (percent) e.g. 0.95999
    const bctOwned = Math.floor(bctSupply * ownership)
    return bctOwned
  };

  getInteger = (num) => {
    const str = ethers.utils.formatUnits(num)
    return Math.floor(Number(str))
  };

  getGeoInfo() {
    // 'https://ipapi.co/json/' 'http://api.hostip.info' is blocked by Brave, Firefox

    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        const { data } = response
        const countryName = data.country_name
        const continentCode = data.continent_code
        if (countryName === 'United Kingdom') {
          this.setState({
            RegionID: 0
          })
        } else if (continentCode === 'EU') {
          this.setState({
            RegionID: 1
          })
        } else if (continentCode === 'NA') {
          this.setState({
            RegionID: 2
          })
        } else {
          this.setState({
            RegionID: 3
          })
        }
        // eslint-disable-next-line no-console
      }).catch((e) => { console.log(e) })
  }

  setPreviousSlide() {
    /*
   @notice A function to store the index of the preceding slide
    */
    const { fullpage } = this.state
    const SectionNumber = fullpage.getActiveSection()
    const SlideNumber = fullpage.getActiveSlide()
    this.setState({
      previousQuestion: [SectionNumber.index, SlideNumber.index]
    })
  }

  setFullpage(fullpageApi) {
    /*
   @notice A function to handle the loading and startup of the fullpageApi
   @param fullpageApi: The API necessary to move to different slides
    */
    if (this.state.fullpageSet === false) {
      fullpageApi.setAllowScrolling(false)
      this.setState({
        fullpageSet: true,
        fullpage: fullpageApi
      })
    }
  }

  pluginWrapper = () => {
    // require('./statics/fullpage.extensions.min');
  };

  HandleTransportChoice = (fullpageApi, value) => {
    /*
    @notice A function to move the user to the appropriate question based on the answer to the
    first transport question
    @param fullpageApi: The API necessary to move to different slides
    @param value: The user's answer to the first transport question
     */
    if (value === 1) {
      // Car
      fullpageApi.moveTo(2, 1)
    } else if (value === 2) {
      // Motorcycle
      fullpageApi.moveTo(2, 3)
    } else if (value === 4) {
      // Train
      fullpageApi.moveTo(2, 5)
    } else {
      // Bus,Train,Cycling,Walking
      fullpageApi.moveTo(2, 4)
    }
  };

  StartQuestionnaire(fullpageApi) {
    /*
    @notice A function to render content and move to the appropriate slide on beginning
    the questionnaire
    @param fullpageApi: The API necessary to move to different slides
     */
    this.setState({
      ProgressOn: '-active'
    }, () => {
      fullpageApi.moveTo(2, 0)
    })
  }

  EndQuestionnaire(fullpageApi) {
    /*
    @notice A function to render content and move to the appropriate slide on finishing
    the questionnaire
    @param fullpageApi: The API necessary to move to different slides
     */
    this.setState({
      ProgressOn: ''
    }, () => {
      fullpageApi.moveTo(6, 0)
    })
  }

  UpdateQuestionNumber(QuestionNo) {
    /*
    @notice A function to update the progress display and section title based on the question number
    @param QuestionNo: A number corresponding to the user's progress in the Questionnaire
     */
    if (QuestionNo < 8) {
      this.setState({
        TransportNo: QuestionNo,
        QuestionCategory: 'Transport'
      })
    } else if (QuestionNo > 8 && QuestionNo < 11) {
      this.setState({
        EnergyNo: QuestionNo,
        QuestionCategory: 'Energy'
      })
    } else if (QuestionNo > 11 && QuestionNo < 15) {
      this.setState({
        FoodNo: QuestionNo,
        QuestionCategory: 'Food'
      })
    } else if (QuestionNo > 15) {
      this.setState({
        ExtrasNo: QuestionNo,
        QuestionCategory: 'Extras'
      })
    }
  }

  handlePreviousQuestion() {
    /*
   @notice A function to get the index of the preceding question
    */
    const { fullpage, previousQuestion } = this.state
    const SectionNumber = fullpage.getActiveSection()
    const SlideNumber = fullpage.getActiveSlide()
    if (SlideNumber.isFirst === true) {
      fullpage.moveTo(previousQuestion[0] + 1, previousQuestion[1])
    } else {
      fullpage.moveTo(SectionNumber.index + 1, SlideNumber.index - 1)
    }
  }

  UpdateRegion(RegionID) {
    /*
    @notice A function to update the region of the user
    @param RegionID: A number corresponding to a region
     */
    this.setState({
      RegionID
    })
  }

  UpdateStateVariable(QuestionNumber, fullpageApi, value) {
    /*
    @notice A function to perform the appropriate actions for a given question
    @param QuestionNumber: A number corresponding to the user's progress in the Questionnaire
    @param fullpageApi: The API necessary to move to different slides
    @param value: The user's answer to the question
     */
    this.UpdateQuestionNumber(QuestionNumber + 1)
    switch (QuestionNumber) {
    case 0:
      this.setState({
      }, () => { this.HandleTransportChoice(fullpageApi, value) })
      break
    case 1:
      this.setState({
        Q2: value
      }, () => { this.UpdateCarFootprint() })
      fullpageApi.moveTo(2, 2)
      break
    case 2:
      this.setState({
        Q3: value
      }, () => { this.UpdateCarFootprint() })
      fullpageApi.moveTo(2, 4)
      break
    case 3:
      this.setState({
        MotorcycleFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(2, 4)
      break
    case 4:
      this.setState({
        BusFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(2, 5)
      break
    case 5:
      this.setState({
        TrainFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(2, 6)
      break
    case 6:
      this.setState({
        FlightFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      break
    case 7:
      this.setState({
        FlightFootprint: this.state.FlightFootprint * value,
        QuestionCategory: 'Energy'
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(3, 0)
      break
    case 8:
      this.setState({
        HomeFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      break
    case 9:
      this.setState({
        HomeFootprint: this.state.HomeFootprint * value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(3, 2)
      break
    case 10:
      this.setState({
        HomeImprovements: -value
      }, () => { this.UpdateTotalFootprint() })
      break
    case 11:
      this.setState({
        FoodFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(4, 1)
      break
    case 12:
      this.setState({
        FoodFootprint: this.state.FoodFootprint - (0.11 * value * this.state.FoodFootprint)
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(4, 2)
      break
    case 13:
      this.setState({
        FoodFootprint: this.state.FoodFootprint * value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(4, 3)
      break
    case 14:
      this.setState({
        RestaurantFootprint: value,
        QuestionCategory: 'Extras'
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(5, 0)
      break
    case 15:
      this.setState({
        HotelFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(5, 1)
      break
    case 16:
      this.setState({
        FashionFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(5, 2)
      break
    case 17:
      this.setState({
        AccessoryFootprint: value
      }, () => { this.UpdateTotalFootprint() })
      break
    default:
      break
    }
  }

  UpdateCarFootprint() {
    /*
    @notice A function to update the state of the CarFootprint based on the combination of answers
     */
    this.setState({
      CarFootprint: this.state.Q2 * this.state.Q3
    }, () => { this.UpdateTotalFootprint() })
  }

  UpdateTotalFootprint() {
    /*
    @notice A function to update the user's total footprint based on their questionnaire answers
     */
    let TotalFootprint = this.state.CarFootprint +
      this.state.MotorcycleFootprint +
      this.state.BusFootprint +
      this.state.TrainFootprint +
      this.state.FlightFootprint +
      this.state.HomeFootprint +
      this.state.HomeImprovements +
      this.state.FoodFootprint +
      this.state.RestaurantFootprint +
      this.state.HotelFootprint +
      this.state.FashionFootprint +
      this.state.AccessoryFootprint
    if (TotalFootprint < 0) {
      TotalFootprint = 0
    } else if (TotalFootprint > 99.9) {
      TotalFootprint = 99.9
    }
    this.setState({
      TotalFootprint
    })
  }

  render() {
    const {
      TotalFootprint,
      RegionID,
      TransportNo,
      EnergyNo,
      FoodNo,
      ExtrasNo,
      ProgressOn,
      QuestionCategory,
      CarFootprint,
      MotorcycleFootprint,
      BusFootprint,
      TrainFootprint,
      FlightFootprint,
      HomeFootprint,
      HomeImprovements,
      FoodFootprint,
      RestaurantFootprint,
      HotelFootprint,
      FashionFootprint,
      AccessoryFootprint,
      klimaBacking
    } = this.state
    // const { history } = this.props
    const resultData = [
      {
        name: 'Transport',
        value: ((CarFootprint +
            MotorcycleFootprint +
            TrainFootprint +
            BusFootprint +
            FlightFootprint) / TotalFootprint) * 100
      },
      {
        name: 'Energy',
        value: (HomeFootprint + HomeImprovements) / TotalFootprint
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

    return (
      <div className={styles}>
        <MetaTags>
          <title>Creol Offsets - Carbon Footprint Calculator</title>
          <meta name="title" content="Creol Offsets - Carbon Footprint Calculator" />
          <meta
            name="description"
            content="Calculate your Carbon Footprint And Offset your Flights and lifestyle
                  today for as little as £2.37/week! Start a 2-week free Trial today!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://footprint.creol.io/" />
          <meta property="og:title" content="Creol Offsets - Carbon Footprint Calculator" />
          <meta
            property="og:description"
            content="Calculate your Carbon Footprint And Offset your Flights and lifestyle
                  today for as little as £2.37/week! Start a 2-week free Trial today!"
          />
          <meta property="og:image" content={`https://beta.creol.io/${LogoGif}`} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://footprint.creol.io/" />
          <meta property="twitter:title" content="Creol Offsets - Carbon Footprint Calculator" />
          <meta
            property="twitter:description"
            content="Calculate your Carbon Footprint And Offset your Flights and lifestyle
                  today for as little as £2.37/week! Start a 2-week free Trial today!"
          />
          <meta property="twitter:image" content={`https://beta.creol.io/${LogoGif}`} />
        </MetaTags>

        <ReactFullpage
          pluginWrapper={this.pluginWrapper}
          licenseKey="0628BF63-A12B4E50-ADE30A94-A3F386A1"
          scrollingSpeed={1500}
          scrollHorizontally
          continuousHorizontal
          scrollHorizontallyKey="BDE6C1A9-83CE4414-BE5ED262-E1A09447"
          controlArrows={false}
          navigation={false}
          slidesNavigation={false}
          scrollBar={false}
          responsiveWidth={500}
          fadingEffect

          onLeave={() => { this.setPreviousSlide() }}

          render={({ fullpageApi }) => {
            if (fullpageApi !== undefined && !this.state.fullpageApi) {
              this.setFullpage(fullpageApi)
            }

            return (
              <ReactFullpage.Wrapper>
                <div
                  className="section"
                >
                  <div
                    className="slide"
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Grid item xs>
                        <img
                          src={CreolKlima}
                          alt="Creol x KLIMA Logo"
                          style={
                            {
                              height: 30, position: 'fixed', left: '10%', top: '1%'
                            }
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item xs>
                        <h2>CALCULATE YOUR FOOTPRINT</h2>
                        <h4 style={{ color: 'grey', marginBottom: 0 }}>Calculate your carbon footprint</h4>
                        <h4 style={{ color: 'grey', marginTop: 0 }}>with Creol and Offset with Klima Infinity</h4>
                      </Grid>
                      <Grid item xs style={{ paddingBottom: 100 }}>
                        <Button
                          variant="contained"
                          className="question-button"
                          color="primary"
                          onClick={() =>
                            this.StartQuestionnaire(fullpageApi)}
                        >Start
                        </Button>
                      </Grid>
                      <Grid item xs>
                        <RegionSelect
                          onChange={regionID => this.UpdateRegion(regionID)}
                          displayText
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="section">
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs style={{ width: '50%' }}>
                            <Question
                              QuestionNumber={0}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(0, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={3} />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={1}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(1, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                            <div className="previous-button">
                              <Button onClick={() => {
                                this.handlePreviousQuestion(fullpageApi)
                              }}
                              >
                                Previous Question
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>

                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={2}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(2, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>

                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={3}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(3, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={4}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(4, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={5}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(5, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center">
                          <Grid item xs={12} md={6} style={{ paddingTop: 70, paddingBottom: 30 }}>
                            <FlightCounter
                              QuestionNumber={6}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(6, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                              onNext={() => { fullpageApi.moveTo(2, 7) }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={7}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(7, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                </div>
                <div className="section">
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                      <Grid item xs={12} md={12} style={{ paddingTop: 70 }}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <AccomSelect
                              QuestionNumber={8}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(8, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                              onNext={() => { fullpageApi.moveTo(3, 1) }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs >
                            <Question
                              QuestionNumber={9}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(9, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                          <Grid item xs>
                            <h4><a href="https://www.wri.org/initiatives/utility-green-tariffs#:~:text=A%20green%20tariff%20is%20a,their%20electricity%20from%20renewable%20resources." target="_blank" rel="noopener noreferrer">What is a green tariff?</a></h4>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Grid item xs>
                            <QuestionCheckbox
                              QuestionNumber={10}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(10, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                              onNext={() => { fullpageApi.moveTo(4, 0) }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                </div>
                <div className="section">
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={11}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(11, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={12}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(12, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={13}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(13, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                          <Grid item xs />
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={14}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(14, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                </div>
                <div className="section">
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={15}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(15, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <Question
                              QuestionNumber={16}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(16, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>

                  <div
                    className="slide"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" spacing={0} justifyContent="center" alignItems="center">
                      <Grid item xs />
                      <Grid item xs={12} md={12}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                          <Grid item xs>
                            <QuestionCheckbox
                              QuestionNumber={17}
                              RegionID={RegionID}
                              onChange={footprintAddition =>
                                this.UpdateStateVariable(17, fullpageApi, footprintAddition)}
                              onPrevious={() => { this.handlePreviousQuestion() }}
                              onNext={() => { this.EndQuestionnaire(fullpageApi) }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs />
                    </Grid>
                  </div>
                </div>
                <div className="section results-section">
                  <div
                    className="slide"
                    styles="secondary"
                    style={{
                      backgroundImage: `url(${CoverImage})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                      <Grid item xs={3} md={3} />
                      <Grid item xs={3} md={3}>
                        <Card style={{ margin: 12, padding: 32 }}>
                          <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                <Grid item xs>
                                  <Grid container direction="row" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                    <Grid item xs>
                                      <LocalGasStationIcon />
                                    </Grid>
                                    <Grid item xs>
                                      <h3 style={{
                                        marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                                      }}
                                      >FOOTPRINT
                                      </h3>
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
                              <Grid container direction="column" alignItems="right" justifyContent="right">
                                <Grid item xs>
                                  <PieChart width={120} height={120}>
                                    <Pie
                                      data={resultData}
                                      cx="50%"
                                      cy="50%"
                                      dataKey="value" // make sure to map the dataKey to "value"
                                      innerRadius={45}
                                      outerRadius={60}
                                      fill="#33972d"
                                    />
                                  </PieChart>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, color: 'grey', fontSize: '14pt', fontWeight: 400
                                  }}
                                  >TRANSPORT
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="right" justifyContent="right" style={{ textAlign: 'right' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                                  }}
                                  >{(
                                      CarFootprint +
                                    MotorcycleFootprint +
                                    TrainFootprint +
                                    BusFootprint +
                                    FlightFootprint).toFixed(1)} |
                                    <strong>{(((
                                      CarFootprint +
                                    MotorcycleFootprint +
                                    TrainFootprint +
                                    BusFootprint +
                                    FlightFootprint) / TotalFootprint) * 100).toFixed(1)}%
                                    </strong>
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, color: 'grey', fontSize: '14pt', fontWeight: 400
                                  }}
                                  >ENERGY
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="right" justifyContent="right" style={{ textAlign: 'right' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                                  }}
                                  >{(
                                      HomeFootprint + HomeImprovements).toFixed(1)} |
                                    <strong>{(((
                                      HomeFootprint +
                                      HomeImprovements) /
                                      TotalFootprint) * 100).toFixed(1)}%
                                    </strong>
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, color: 'grey', fontSize: '14pt', fontWeight: 400
                                  }}
                                  >FOOD
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="right" justifyContent="right" style={{ textAlign: 'right' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                                  }}
                                  >{(
                                      FoodFootprint +
                                    RestaurantFootprint).toFixed(1)} |
                                    <strong>{(((
                                      FoodFootprint +
                                      RestaurantFootprint) /
                                      TotalFootprint) * 100).toFixed(1)}%
                                    </strong>
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, color: 'grey', fontSize: '14pt', fontWeight: 400
                                  }}
                                  >EXTRAS
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Grid container direction="column" alignItems="right" justifyContent="right" style={{ textAlign: 'right' }}>
                                <Grid item xs>
                                  <h4 style={{
                                    marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                                  }}
                                  >{(
                                      FashionFootprint +
                                    AccessoryFootprint +
                                    HotelFootprint).toFixed(1)} |
                                    <strong>{(((
                                      FashionFootprint +
                                    AccessoryFootprint +
                                    HotelFootprint) /
                                    TotalFootprint) * 100).toFixed(1)}%
                                    </strong>
                                  </h4>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Card>
                        <Card style={{ margin: 12, padding: 32, textAlign: 'left' }}>
                          <Grid container direction="row" alignItems="left" justifyContent="left">
                            <Grid item xs={1}>
                              <MailOutlineIcon />
                            </Grid>
                            <Grid item xs={11}>
                              <h3 style={{
                                marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                              }}
                              >REDUCING YOUR FOOTPRINT
                              </h3>
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
                      <Grid item xs={3} md={3}>
                        <Card style={{ margin: 12, padding: 32 }}>
                          <Grid container direction="column" alignItems="left" justifyContent="left">
                            <Grid item xs>
                              <Grid container direction="row" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
                                <Grid item xs={1}>
                                  <CloudQueueIcon />
                                </Grid>
                                <Grid item xs={11}>
                                  <h3 style={{
                                    marginTop: 0, marginBottom: 0, fontSize: '14pt', fontWeight: 400
                                  }}
                                  >OFFSET
                                  </h3>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs>
                              <h4 style={{ fontSize: '14pt', fontWeight: 600, color: 'grey' }}>
                                Reduce where you can, offset where you can&apos;t.
                              </h4>
                            </Grid>
                            <Grid item xs>
                              <h4 style={{ fontSize: '12pt' }}>
                                KLIMA DAO is fighting climate change by embedding the cost of
                                carbon into a carbon backed currency called KLIMA.
                              </h4>
                            </Grid>
                            <Grid item xs>
                              <h4 style={{ fontSize: '12pt' }}>
                                Each KLIMA token is backed by at least 1 ton of carbon. Below is a
                                conversion of your footprint in Klima, you can choose to offset
                                this.
                              </h4>
                            </Grid>
                            <Grid item xs>
                              <Grid container direction="row" >
                                <Grid item xs={2}>
                                  <img src={tCO2e} alt="tCO2e Circle" style={{ height: 40, marginBottom: 10 }} />
                                </Grid>
                                <Grid item xs={10}>
                                  <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
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
                            <Divider />
                            <Grid item xs>
                              <Grid container direction="row" >
                                <Grid item xs={2}>
                                  <img src={KLIMA} alt="KLIMA Circle" style={{ height: 40, marginTop: 10 }} />
                                </Grid>
                                <Grid item xs={10}>
                                  <Grid container direction="column" alignItems="left" justifyContent="left" style={{ textAlign: 'left' }}>
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
                                      >{(TotalFootprint / klimaBacking).toFixed(1)} KLIMA
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs>
                              <a href="https://www.klimadao.finance/buy">
                                <Button
                                  variant="contained"
                                  className="next-button"
                                  color="primary"
                                  style={{ color: 'white', backgroundColor: '#33972d' }}
                                >
                                  OFFSET
                                </Button>
                              </a>
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
                      <Grid item xs={3} md={3} />
                    </Grid>
                  </div>
                </div>
              </ReactFullpage.Wrapper>
            )
          }}
        />
        <div className={`progress-icon${ProgressOn}`}>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <Grid item xs>
              <Typography style={{ position: 'fixed', right: '40%', fontSize: '20pt' }}>
                YOUR <strong>CARBON</strong> TOTAL
              </Typography>
            </Grid>
          </Grid>

          <div className="circular-progress-background">
            <CircularProgress
              style={{
                color: 'lightGrey'
              }}
              variant="determinate"
              size={120}
              thickness={4}
              value={100}
            />
          </div>
          <div className="circular-progress-transport">
            <CircularProgress
              style={{
                color: '#33972d',
                opacity: 1
              }}
              variant="determinate"
              size={120}
              thickness={4}
              value={(TransportNo / 18) * 100}
            />
          </div>
          <div className="circular-progress-energy">
            <CircularProgress
              style={{
                color: '#33972d',
                opacity: 0.7
              }}
              variant="determinate"
              size={120}
              thickness={4}
              value={(EnergyNo / 18) * 100}
            />
          </div>
          <div className="circular-progress-food">
            <CircularProgress
              style={{
                color: '#33972d',
                opacity: 0.4
              }}
              variant="determinate"
              size={120}
              thickness={4}
              value={(FoodNo / 18) * 100}
            />
          </div>
          <div className="circular-progress-extras">
            <CircularProgress
              style={{
                color: '#33972d',
                opacity: 0.1
              }}
              variant="determinate"
              size={120}
              thickness={4}
              value={(ExtrasNo / 18) * 100}
            />
          </div>
          <div className="footprint-display">
            <h2 className="footprint-text"> {TotalFootprint.toFixed(1)} </h2>
            <h4 style={{ marginTop: 0 }}> t CO2 e </h4>
          </div>
          <div className="category-display">
            <h2 className="category-text"> {QuestionCategory} </h2>
          </div>
        </div>
        <div className="footer">
          <Grid container direction="row">
            <Grid item xs>
              <ButtonGroup variant="text" style={{ color: 'grey' }}>
                <Button className="footer-button" onClick={() => { window.location.href = 'https://offset.creol.io/#/office/' }}>Business Calculator</Button>
                <Button className="footer-button" onClick={() => { window.location.href = 'https://www.klimadao.finance/' }}>Klima Dao</Button>
                <Button className="footer-button" onClick={() => { window.location.href = 'https://app.klimadao.finance/#/stake' }}>App</Button>
                <Button className="footer-button" onClick={() => { window.location.href = 'https://docs.klimadao.finance/' }}>Docs</Button>
                <Button className="footer-button" onClick={() => { window.location.href = 'https://www.klimadao.finance/blog' }}>Newsletter</Button>
                <Button className="footer-button" onClick={() => { window.location.href = 'https://www.klimadao.finance/community' }}>Community</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withRouter(QuestionnaireView)
