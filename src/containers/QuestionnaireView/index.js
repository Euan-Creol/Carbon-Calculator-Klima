import React, { Component }                 from 'react'
import ReactFullpage                        from '@fullpage/react-fullpage'
import { withRouter }                       from 'react-router-dom'
import MetaTags                             from 'react-meta-tags'
import { PieChart } from 'react-minimal-pie-chart'
import {
  Button,
  Grid,
  CircularProgress,
  Divider,
  Card
}                                           from '@material-ui/core'
import LogoGif                              from 'assets/images/LogoCroppedCenturyGothic.gif'
import AccomSelect                          from './components/AccomadationSelect'
import CoverImage                           from '../../assets/images/LandingView/Optimized-Images_Colourised2.png'
import RegionSelect                         from './components/RegionSelection'
import { styles }                           from './styles.scss'
import Question                             from './components/Question'
import QuestionCheckbox                     from './components/Checkbox'
import FlightCounter                        from './components/FlightCounter'
import LinearWithValueLabel                 from './components/LinearProgressWithLabel'
import DialogContent                        from './components/DialogContent'


/*
The parent component incorporating the calculator questions, components and result display
 */
class QuestionnaireView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TotalFootprint: 0.0,

      RegionID: 0,

      QuestionCategory: 'Transport',

      TransportNo: 0,
      EnergyNo: 0,
      FoodNo: 0,
      ExtrasNo: 0,
      ProgressOn: '',
      ResultsOn: '',
      ModalOn: false,

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

      initSliderVal: 0,

      fullpageSet: false,
      fullpage: null,
      previousQuestion: [0, 0]
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

  StartQuestionnaire(fullpageApi) {
    /*
    @notice A function to render content and move to the appropriate slide on beginning the questionnaire
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
    @notice A function to render content and move to the appropriate slide on finishing the questionnaire
    @param fullpageApi: The API necessary to move to different slides
     */
    this.setState({
      ProgressOn: '',
      ResultsOn: '-active',
      ModalOn: true
    }, () => {
      fullpageApi.moveTo(6, 0)
    })
  }

  HandleTransportChoice(fullpageApi, value) {
    /*
    @notice A function to move the user to the appropriate question based on the answer to the first transport question
    @param fullpageApi: The API necessary to move to different slides
    @param value: The user's answer to the first transport question
     */
    if (value === 1) {
      // Car
      fullpageApi.moveTo(2, 1)
    } else if (value === 2) {
      // Motorcycle
      fullpageApi.moveTo(2, 3)
    } else {
      // Bus,Train,Cycling,Walking
      fullpageApi.moveTo(2, 4)
    }
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
        previousPage: [2, 0]
      }, () => { this.HandleTransportChoice(fullpageApi, value) })
      break
    case 1:
      this.setState({
        Q2: value,
        previousPage: [2, 1]
      }, () => { this.UpdateCarFootprint() })
      fullpageApi.moveTo(2, 2)
      break
    case 2:
      this.setState({
        Q3: value,
        previousPage: [2, 2]
      }, () => { this.UpdateCarFootprint() })
      fullpageApi.moveTo(2, 4)
      break
    case 3:
      this.setState({
        MotorcycleFootprint: value,
        previousPage: [2, 3]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(2, 4)
      break
    case 4:
      this.setState({
        BusFootprint: value,
        previousPage: [2, 4]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(2, 5)
      break
    case 5:
      this.setState({
        TrainFootprint: value,
        previousPage: [2, 5]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(2, 6)
      break
    case 6:
      this.setState({
        FlightFootprint: value,
        previousPage: [2, 6]
      }, () => { this.UpdateTotalFootprint() })
      break
    case 7:
      this.setState({
        FlightFootprint: this.state.FlightFootprint * value,
        previousPage: [2, 7],
        QuestionCategory: 'Energy'
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(3, 0)
      break
    case 8:
      this.setState({
        HomeFootprint: value,
        previousPage: [3, 0]
      }, () => { this.UpdateTotalFootprint() })
      break
    case 9:
      this.setState({
        HomeFootprint: this.state.HomeFootprint * value,
        previousPage: [3, 1]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(3, 2)
      break
    case 10:
      this.setState({
        HomeImprovements: -value,
        previousPage: [3, 2]
      }, () => { this.UpdateTotalFootprint() })
      break
    case 11:
      this.setState({
        FoodFootprint: value,
        previousPage: [4, 0]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(4, 1)
      break
    case 12:
      this.setState({
        FoodFootprint: this.state.FoodFootprint - (0.11 * value * this.state.FoodFootprint),
        previousPage: [4, 1]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(4, 2)
      break
    case 13:
      this.setState({
        FoodFootprint: this.state.FoodFootprint * value,
        previousPage: [4, 2]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(4, 3)
      break
    case 14:
      this.setState({
        RestaurantFootprint: value,
        previousPage: [4, 3],
        QuestionCategory: 'Extras'
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(5, 0)
      break
    case 15:
      this.setState({
        HotelFootprint: value,
        previousPage: [5, 0]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(5, 1)
      break
    case 16:
      this.setState({
        FashionFootprint: value,
        previousPage: [5, 1]
      }, () => { this.UpdateTotalFootprint() })
      fullpageApi.moveTo(5, 2)
      break
    case 17:
      this.setState({
        AccessoryFootprint: value,
        previousPage: [5, 2]
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
    }, () => {
      this.SubscriptionRecommendation()
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

  SubscriptionRecommendation() {
    /*
   @notice A function to suggest subscription tier based on calculated footprint
    */
    if (this.state.TotalFootprint > 7 && this.state.TotalFootprint < 14) {
      this.setState({ initSliderVal: 50 })
    } else if (this.state.TotalFootprint > 14) {
      this.setState({ initSliderVal: 100 })
    } else {
      this.setState({ initSliderVal: 0 })
    }
  }

    pluginWrapper = () => {
      // require('./statics/fullpage.extensions.min');
    };
    componentDidMount() {
      const ghostArtifact = document.querySelector('.landing-header')
      if (ghostArtifact !== null) {
        ghostArtifact.parentNode.removeChild(ghostArtifact)
      }
    }

    render() {
      const {
        ModalOn,
        TotalFootprint,
        initSliderVal,
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
        PopupOn,
        ResultsOn
      } = this.state
      const { history } = this.props
      return (
        <div className={styles}>
          <MetaTags>
            <title>Creol Offsets - Carbon Footprint Calculator</title>
            <meta name="title" content="Creol Offsets - Carbon Footprint Calculator" />
            <meta name="description" content="Calculate your Carbon Footprint And Offset your Flights and lifestyle today for as little as £2.37/week! Start a 2-week free Trial today!" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://footprint.creol.io/" />
            <meta property="og:title" content="Creol Offsets - Carbon Footprint Calculator" />
            <meta property="og:description" content="Calculate your Carbon Footprint And Offset your Flights and lifestyle today for as little as £2.37/week! Start a 2-week free Trial today!" />
            <meta property="og:image" content={`https://beta.creol.io/${LogoGif}`} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://footprint.creol.io/" />
            <meta property="twitter:title" content="Creol Offsets - Carbon Footprint Calculator" />
            <meta property="twitter:description" content="Calculate your Carbon Footprint And Offset your Flights and lifestyle today for as little as £2.37/week! Start a 2-week free Trial today!" />
            <meta property="twitter:image" content={`https://beta.creol.io/${LogoGif}`} />
          </MetaTags>
          <div className={`progress-icon${ProgressOn}`}>
            <div className="circular-progress-background">
              <CircularProgress
                style={{
                  color: 'lightGrey'
                }}
                variant="static"
                size={120}
                thickness={6}
                value={100}
              />
            </div>
            <div className="circular-progress-transport">
              <CircularProgress
                style={{
                  color: 'primary',
                  opacity: 1
                }}
                variant="static"
                size={120}
                thickness={6}
                value={(TransportNo / 18) * 100}
              />
            </div>
            <div className="circular-progress-energy">
              <CircularProgress
                style={{
                  color: 'primary',
                  opacity: 0.7
                }}
                variant="static"
                size={120}
                thickness={6}
                value={(EnergyNo / 18) * 100}
              />
            </div>
            <div className="circular-progress-food">
              <CircularProgress
                style={{
                  color: 'primary',
                  opacity: 0.4
                }}
                variant="static"
                size={120}
                thickness={6}
                value={(FoodNo / 18) * 100}
              />
            </div>
            <div className="circular-progress-extras">
              <CircularProgress
                style={{
                  color: 'primary',
                  opacity: 0.1
                }}
                variant="static"
                size={120}
                thickness={6}
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
                  <div className="section">
                    <div
                      className="slide"
                      style={{
                        backgroundImage: `url(${CoverImage})`,
                        backgroundSize: 'cover'
                      }}
                    >
                      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                        <Grid item xs>
                          <h2>Calculate your carbon footprint</h2>
                        </Grid>
                        <Grid item xs style={{ paddingBottom: 100 }}>
                          <Button
                            variant="contained"
                            className="question-button"
                            color="primary"
                            onClick={() =>
                              this.StartQuestionnaire(fullpageApi)}
                          >Take the Questionnaire!
                          </Button>
                        </Grid>
                        <Button
                          onClick={() =>
                            this.EndQuestionnaire(fullpageApi)}
                        >
                          Skipppp
                        </Button>
                        <Grid item xs>
                          <RegionSelect onChange={RegionID => this.UpdateRegion(RegionID)} displayText />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={0}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(0, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={1}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(1, fullpageApi, footprintAddition)}
                              />
                              <div className="previous-button">
                                <Button onClick={() => { this.handlePreviousQuestion(fullpageApi) }}> Previous Question </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>

                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={2}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(2, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>

                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={3}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(3, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={4}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(4, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={5}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(5, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" spacing={1} justify="center" alignItems="center">
                            <Grid item xs={12} md={6} style={{ paddingTop: 70 }}>
                              <FlightCounter
                                QuestionNumber={6}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(6, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                            <Grid item xs>
                              <Button
                                variant="contained"
                                className="question-button"
                                color="secondary"
                                onClick={() => { fullpageApi.moveTo(2, 7) }}
                              > Next Question
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={7}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(7, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                  </div>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="row">
                        <Grid item xs />
                        <Grid item xs={12} md={6} style={{ paddingTop: 70 }}>
                          <AccomSelect
                            QuestionNumber={8}
                            RegionID={RegionID}
                            onChange={footprintAddition =>
                              this.UpdateStateVariable(8, fullpageApi, footprintAddition)}
                          />
                          <Button
                            className="question-button"
                            variant="contained"
                            color="secondary"
                            onClick={() => fullpageApi.moveTo(3, 1)}
                          >
                            Next Question
                          </Button>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs >
                              <Question
                                QuestionNumber={9}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(9, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                            <Grid item xs>
                              <QuestionCheckbox
                                QuestionNumber={10}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(10, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                            <Grid item xs>
                              <Button
                                variant="contained"
                                className="question-button"
                                color="secondary"
                                onClick={() => {
                                  this.setState({ QuestionCategory: 'Food' })
                                  fullpageApi.moveTo(4, 0)
                                }}
                              >
                                NEXT QUESTION
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                  </div>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={11}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(11, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={12}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(12, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={13}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(13, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                            <Grid item xs />
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={14}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(14, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                  </div>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={15}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(15, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>

                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <Question
                                QuestionNumber={16}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(16, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>

                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid item xs />
                        <Grid item xs={12} md={6}>
                          <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs>
                              <QuestionCheckbox
                                QuestionNumber={17}
                                RegionID={RegionID}
                                onChange={footprintAddition =>
                                  this.UpdateStateVariable(17, fullpageApi, footprintAddition)}
                              />
                            </Grid>
                            <Grid item xs>
                              <Button
                                variant="contained"
                                className="question-button"
                                color="secondary"
                                onClick={() => { this.EndQuestionnaire(fullpageApi) }}
                              > See Results
                              </Button>
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
                      }}
                    >
                      {/*
                      <DialogContent ModalOn={ModalOn}
                          TotalFootprint={TotalFootprint}
                                     CarFootprint={CarFootprint}
                                     MotorcycleFootprint={MotorcycleFootprint}
                                     BusFootprint={BusFootprint}
                                     TrainFootprint={TrainFootprint}
                                     FlightFootprint={FlightFootprint}
                                     HomeFootprint={HomeFootprint}
                                     HomeImprovements={HomeImprovements}
                                     FoodFootprint={FoodFootprint}
                                     RestaurantFootprint={RestaurantFootprint}
                                     HotelFootprint={HotelFootprint}
                                     FashionFootprint={FashionFootprint}
                                     AccessoryFootprint={AccessoryFootprint}
                                     Region={RegionID}
                      onChange={setOpen => this.setState({ModalOn:setOpen})}/>
                      */}
                      <h2 className="results-h3"> RESULTS </h2>
                      <h3 className="results-value">{TotalFootprint.toFixed(1)}</h3>
                      <h3 className="results-unit">Tons CO2e</h3>
                      <div className={`results-container${ResultsOn}`} />

                      {/*
                        <PieChart
                          animate
                          animationDuration={2000}
                          animationEasing="ease-out"
                          radius={25}
                          startAngle={0}
                          paddingAngle={5}
                          labelStyle={{
                            fontSize: '5px',
                            fill: '#000'
                          }}
                          labelPosition={63}
                          lineWidth={30}
                          data={
                            [
                              { title: 'Transport', value: 3, color: '#800080' },
                              { title: 'Energy', value: 1, color: '#cd34cd' },
                              { title: 'Food', value: 2, color: '#e77ae7' },
                              { title: 'Extras', value: 4, color: '#f5b8f5' }
                            ]
                            /*
                            [
                            { title: 'Transport', value: CarFootprint + MotorcycleFootprint + TrainFootprint + BusFootprint + FlightFootprint, color: '#800080' },
                            { title: 'Energy', value: HomeFootprint + HomeImprovements, color: '#cd34cd' },
                            { title: 'Food', value: FoodFootprint + RestaurantFootprint, color: '#e77ae7' },
                            { title: 'Extras', value: FashionFootprint + HotelFootprint + AccessoryFootprint, color: '#f5b8f5' }
                          ]
                          */
                      }
                      />
                      */}

                      <h4>*This is only a rough estimate of your total carbon footprint</h4>
                      <Button
                        variant="outlined"
                        className="question-button"
                        color="primary"
                        onClick={() =>
                          fullpageApi.moveTo(6, 1)}
                      >Detailed Breakdown
                      </Button>
                      <Button
                        variant="contained"
                        className="question-button"
                        color="primary"
                        onClick={() =>
                          fullpageApi.moveTo(7, 0)}
                      >Reducing your footprint
                      </Button>

                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                          <Grid item xs={12} md={6}>
                            <h1 className="results-h1">Footprint Breakdown</h1>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Transport</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((CarFootprint + MotorcycleFootprint + TrainFootprint + BusFootprint + FlightFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Home</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((HomeFootprint + HomeImprovements) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Food</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((FoodFootprint + RestaurantFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Extras</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((HotelFootprint + FashionFootprint + AccessoryFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="outlined"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(6, 2)}
                            >Transport
                            </Button>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="contained"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(7, 0)}
                            >Reducing your footprint
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                          <Grid item xs={12} md={6}>
                            <h1 className="results-h1">Transport</h1>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((CarFootprint + MotorcycleFootprint + TrainFootprint + BusFootprint + FlightFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Car</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((CarFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Motorcycle</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((MotorcycleFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Bus</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((BusFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Train</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((TrainFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Flights</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((FlightFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="outlined"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(6, 3)}
                            >Home
                            </Button>
                            <Button
                              variant="contained"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(7, 0)}
                            >Reducing your footprint
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                          <Grid item xs={12} md={6}>
                            <h1 className="results-h1">Home</h1>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Home</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((HomeFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Home Improvements</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((HomeImprovements) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="outlined"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(6, 4)}
                            >Food
                            </Button>
                            <Button
                              variant="contained"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(7, 0)}
                            >Reducing your footprint
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                          <Grid item xs={12} md={6}>
                            <h1 className="results-h1">Food</h1>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Food</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((FoodFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Restaurants</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((RestaurantFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="outlined"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(6, 5)}
                            >Extras
                            </Button>
                            <Button
                              variant="contained"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(7, 0)}
                            >Reducing your footprint
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                        <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                          <Grid item xs={12} md={6}>
                            <h1 className="results-h1">Extras</h1>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Hotels</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((HotelFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Fashion</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((FashionFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <h3>Accessory</h3>
                          </Grid>
                          <Grid item xs={12} md={6} style={{ width: '100%' }}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={6} style={{ width: '70%' }}>
                                <LinearWithValueLabel value={((AccessoryFootprint) / TotalFootprint) * 100} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="contained"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                fullpageApi.moveTo(7, 0)}
                            >Reducing your footprint
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                          <h1 className="results-h1">Reducing your footprint</h1>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <h4>There are hundreds of ways to live a lower carbon life, we hope that this calculator has helped identify the largest contributors to your carbon footprint</h4>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <h3 className="results-h1">What can I do about my footprint?</h3>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <h4>A simple mantra to live by is "Reduce where you can, offset where you can't". Now that you have identified the high emission aspects of your life, you can start assessing which lifestyle choices aren't as necessary as you first thought: Can you take public transport rather than driving? Are there any clean energy providers in your area? How often are you updating your wardrobe?</h4>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <h4>Inevitably, there will be areas of your life which will be difficult to decarbonize - in these situations, offsetting provides an effective way to support green projects and also reduce your net carbon footprint</h4>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Button
                            variant="contained"
                            className="question-button"
                            color="primary"
                            onClick={() =>
                              fullpageApi.moveTo(7,1)}
                          >Offsetting with KLIMA
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="slide">
                      <Grid container direction="column" spacing={0} justify="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                          <h1 className="results-h1">Offsetting with KLIMA</h1>
                        </Grid>
                        <Card>
                          <Grid item xs={12} md={12}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={1} md={1}/>
                              <Grid item xs={10} md={10}>
                                <h3>To offset your calculated footprint, you would need</h3>
                              </Grid>
                              <Grid item xs={1} md={1}/>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Grid container direction="row" spacing={0} justify="center" alignItems="center">
                              <Grid item xs={12} md={4}>
                                <h1 className="conversion-h1">{TotalFootprint}</h1>
                                <h3 className="results-h1">tCO2e</h3>
                              </Grid>
                              <Grid item xs={12} md={2}>
                                <h1 className="results-h1">=></h1>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <h1 className="conversion-h1">{TotalFootprint*5}</h1>
                                <h3 className="results-h1">KLIMA</h3>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Button
                              style={{paddingBottom: 10}}
                              variant="contained"
                              className="question-button"
                              color="primary"
                              onClick={() =>
                                console.log("FREE MONEY")
                                }
                            >Buy KLIMA
                            </Button>
                          </Grid>
                        </Card>
                        <Grid item xs={12} md={6}>
                          <h4>KLIMA DAO is fighting climate change by embedding the cost of carbon into a carbon-backed currency called KLIMA. Each KLIMA token is backed by at least 1 ton of carbon. As well as creating a carbon-backed currency, KLIMA is also pushing the price of carbon higher, forcing large corporations to reconsider their carbon emissions or pay a much more substantial fee to meet their net zero commitments</h4>
                          <h4>Read more at <a href={'https://www.klimadao.finance/'}>https://www.klimadao.finance/</a></h4>
                        </Grid>

                      </Grid>
                    </div>
                  </div>
                </ReactFullpage.Wrapper>
              )
            }}
          />
          <div className={`previous-button${ProgressOn}`}>
            <Button onClick={() => { this.handlePreviousQuestion() }}> Previous Question </Button>
          </div>
        </div>
      )
    }
}

export default withRouter(QuestionnaireView)
