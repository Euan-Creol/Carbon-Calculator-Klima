import React, { Component }                 from 'react'
import ReactFullpage                        from '@fullpage/react-fullpage'
import { Button, CircularProgress, Grid }   from '@material-ui/core'
import RadarChart                           from 'react-svg-radar-chart'
import { withRouter }                       from 'react-router-dom'

import QuestionContainer                    from './components/QuestionContainer'
import { styles }                           from './styles.scss'
import RegionSelect                         from './components/RegionSelection'
import OfficeData                           from '../../data/OfficeQuestionnaireData/OfficeQuestionnaireData'
import EmailSignup                          from './components/EmailSignup'

/*
The parent component of the office footprint calculator tool
 */
class OfficeQuestionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullpageSet: false,
      fullpage: null,

      ProgressOn: '',

      RegionID: 0,
      TotalFootprint: 0,

      EnergyFootprint: 1.227, // TBC
      EnergyUsedByEmployee: 1.6, // TBC
      TotalEmployeeNumber: 0,
      TotalEmployeeFootprint: 0,
      LowTravelEmployees: 0,
      MidTravelEmployees: 0,
      HighTravelEmployees: 0,
      LowTravelFootprint: 1.3,
      MidTravelFootprint: 3.4,
      HighTravelFootprint: 9.7,
      Floorspace: 0,
      RecyclingFootprint: 1.72,
      RecyclingPercentage: 1,
      GreenSupplierReduction: 1,
      LightingType: 0.0001,
      OfficeImprovements: 0,
      TechPurchases: 0,
      DeviceFootprintPerEmployee: 3.2, // TBC
      DeviceReplacementRate: 1,
      FleetVehicleFootprint: 0,
      FoodFootprint: 1.76,
      MeatFreeDays: 1,
      LocallySourced: 1,
      FoodWasted: 1,

      QuestionNumber: 1,
      Category: 'Office',
      EmployeeProgress: 0,
      EnergyProgress: 0,
      GoodsProgress: 0,
      EquipmentProgress: 0,
      FoodProgress: 0,

      EmployeeResult: 0,
      EnergyResult: 0,
      GoodsResult: 0,
      EquipmentResult: 0,
      FoodResult: 0
    }
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

  StartQuestionnaire(fullpageApi) {
    /*
        @notice A function to move to the first question and make the progress display visible
        @param fullpageApi: The API necessary to move to different slides
        */
    fullpageApi.moveTo(2, 0)
    this.setState({
      ProgressOn: 'active'
    })
  }

  MoveQuestionnaire(fullpage, QuestionNumber) {
    /*
        @notice A function to control the slide movement when the 'next question' button is pressed
        @param fullpageApi: The API necessary to move to different slides
        @param QuestionNumber: Numerical value of current slide
        */
    this.UpdateTotalFootprint()
    if (fullpage.getActiveSlide().isLast) {
      this.setState({
        ProgressOn: ''
      }, () => { fullpage.moveTo(fullpage.getActiveSection().index + 2, 0) })
    } else {
      fullpage.moveTo(fullpage.getActiveSection().index + 1, QuestionNumber)
    }
  }

  MoveToPreviousQuestion = (fullpage, QuestionNumber) => {
    /*
        @notice A function to move to the previous
        question when the 'previous question' button is pressed
        @param fullpageApi: The API necessary to move to different slides
        @param QuestionNumber: Numerical value of current slide
        */
    const ActiveSlide = fullpage.getActiveSlide()
    const ActiveSection = fullpage.getActiveSection()
    if (ActiveSlide.isFirst === false) {
      fullpage.moveTo(ActiveSection.index + 1, QuestionNumber - 1)
    }
  }

  UpdateRegion(RegionID) {
    /*
        @notice A function to move to update the state when RegionID is selected
        @param RegionID: Numerical representation of user's geographical region
        */
    this.setState({
      RegionID
    })
  }

  UpdateCategory(QuestionNumber) {
    /*
        @notice A function to update the text in the category display
        @param QuestionNumber: Numerical representation of current question
        */
    const NewCategory = OfficeData.Questions[QuestionNumber + 1].Category
    this.setState({
      Category: NewCategory
    }, () => { this.UpdateProgress(QuestionNumber, NewCategory) })
  }

  UpdateProgress(QuestionNumber, Category) {
    /*
        @notice A function to update the circular progress display
        @param QuestionNumber: Numerical representation of current question
        @param Category: String representation of current question category
        */
    const TotalNumberOfQuestions = 17 // TO-DO Remove hard-coded value
    const Percentage = (QuestionNumber / TotalNumberOfQuestions) * 100
    switch (Category) {
    case 'Employees':
      this.setState({
        EmployeeProgress: Percentage
      })
      break
    case 'Premises, Energy & Recycling':
      this.setState({
        EnergyProgress: Percentage
      })
      break
    case 'Goods and Services':
      this.setState({
        GoodsProgress: Percentage
      })
      break
    case 'Equipment':
      this.setState({
        EquipmentProgress: Percentage
      })
      break
    case 'Food':
      this.setState({
        FoodProgress: Percentage
      })
      break
    default:
      break
    }
  }

  ReturnQuestion(QuestionNumber, RegionID, fullpageApi) {
    /*
        @notice A function to return the React components based on the question number
        @param QuestionNumber: Numerical representation of current question
        @param RegionID: Numerical representation of user's geographical region
        @param fullpageApi: The API necessary to move to different slides
        @return The React components based on the specified regionID and QuestionNumber
        */
    return (
      <div className="slide">
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
          <Grid item xs>
            <QuestionContainer
              QuestionNumber={QuestionNumber}
              RegionID={RegionID}
              onChange={footprintAddition =>
                this.UpdateQuestionFootprint(footprintAddition, QuestionNumber, fullpageApi)}
            />
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              className="question-button"
              onClick={() => { this.MoveQuestionnaire(fullpageApi, QuestionNumber) }}
            >
              Next Question
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  UpdateQuestionFootprint(footprintAddition, QuestionNumber, fullpageApi) {
    /*
        @notice A function to handle the outputs from each question
        @param footprintAddition: The output from the given question
        @param QuestionNumber: Numerical representation of current question
        @param fullpageApi: The API necessary to move to different slides
        */
    switch (QuestionNumber) {
    default:
      break
    case 1:
      this.setState({
        LowTravelEmployees: footprintAddition[0],
        MidTravelEmployees: footprintAddition[1],
        HighTravelEmployees: footprintAddition[2],
        TotalEmployeeNumber: footprintAddition[0] + footprintAddition[1] + footprintAddition[2]
      },)
      break
    case 2:
      this.setState({
        Floorspace: footprintAddition
      },)
      break
    case 3:
      if (footprintAddition === 1) {
        fullpageApi.moveTo(2, 3)
      } else if (footprintAddition === 0) {
        fullpageApi.moveTo(2, 4)
      }
      break
    case 4:
      fullpageApi.moveTo(2, 4)
      this.setState({
        RecyclingPercentage: footprintAddition
      },)
      break
    case 5:
      if (footprintAddition === 1) {
        fullpageApi.moveTo(2, 5)
      } else if (footprintAddition === 0) {
        fullpageApi.moveTo(2, 6)
      }
      break
    case 6:
      fullpageApi.moveTo(2, 6)
      this.setState({
        GreenSupplierReduction: footprintAddition
      },)
      break
    case 7:
      fullpageApi.moveTo(2, 7)
      this.setState({
        LightingType: footprintAddition
      },)
      break
    case 8:
      this.setState({
        OfficeImprovements: footprintAddition
      },)
      break
    case 9:
      this.setState({
        TechPurchases: footprintAddition
      },)
      break
    case 10:
      this.setState({
        DeviceReplacementRate: footprintAddition
      },)
      break
    case 11:
      if (footprintAddition === 1) {
        fullpageApi.moveTo(2, 11)
      } else if (footprintAddition === 0) {
        fullpageApi.moveTo(2, 12)
      }
      break
    case 12:
      this.setState({
        FleetVehicleFootprint: footprintAddition
      },)
      break
    case 13:
      if (footprintAddition === 1) {
        fullpageApi.moveTo(2, 13)
      } else if (footprintAddition === 0) {
        fullpageApi.moveTo(2, 17)
      }
      break
    case 14:
      fullpageApi.moveTo(2, 14)
      this.setState({
        FoodFootprint: footprintAddition
      },)
      break
    case 15:
      fullpageApi.moveTo(2, 15)
      this.setState({
        MeatFreeDays: footprintAddition
      },)
      break
    case 16:
      fullpageApi.moveTo(2, 16)
      this.setState({
        LocallySourced: footprintAddition
      }, () => { this.UpdateTotalFootprint() })
      break
    case 17:
      fullpageApi.moveTo(2, 17)
      this.setState({
        FoodWasted: footprintAddition
      }, () => { this.UpdateTotalFootprint() })
      break
    }
    this.setState({
      QuestionNumber
    })
  }

  UpdateTotalFootprint() {
    /*
        @notice A function to calculate the total footprint of the calculator
        */
    const {
      EnergyUsedByEmployee,
      TotalEmployeeNumber,
      LowTravelEmployees,
      MidTravelEmployees,
      HighTravelEmployees,
      LowTravelFootprint,
      MidTravelFootprint,
      HighTravelFootprint,
      Floorspace,
      RecyclingFootprint,
      RecyclingPercentage,
      EnergyFootprint,
      GreenSupplierReduction,
      LightingType,
      OfficeImprovements,
      TechPurchases,
      DeviceFootprintPerEmployee,
      DeviceReplacementRate,
      FleetVehicleFootprint,
      FoodFootprint,
      MeatFreeDays,
      LocallySourced,
      FoodWasted
    } = this.state

    let EmployeeResult = ((LowTravelEmployees * LowTravelFootprint) +
            (MidTravelEmployees * MidTravelFootprint) +
            (HighTravelEmployees * HighTravelFootprint))
    if (EmployeeResult < 0) {
      EmployeeResult = 0
    }

    let EnergyResult = ((EnergyUsedByEmployee * TotalEmployeeNumber) +
            (Floorspace * EnergyFootprint * GreenSupplierReduction * LightingType) +
            (RecyclingFootprint * RecyclingPercentage * TotalEmployeeNumber))
    if (EnergyResult < 0) {
      EnergyResult = 0
    }

    let EquipmentResult = (OfficeImprovements) +
            (TechPurchases) +
            (DeviceFootprintPerEmployee * TotalEmployeeNumber * DeviceReplacementRate) +
            (FleetVehicleFootprint)
    if (EquipmentResult < 0) {
      EquipmentResult = 0
    }

    let FoodResult = (
      FoodFootprint *
      MeatFreeDays *
      LocallySourced *
      FoodWasted *
      TotalEmployeeNumber)
    if (FoodResult < 0) {
      FoodResult = 0
    }

    this.setState({
      TotalEmployeeFootprint: EmployeeResult,
      EmployeeResult,
      EnergyResult,
      EquipmentResult,
      FoodResult,
      TotalFootprint: EmployeeResult + EnergyResult + EquipmentResult + FoodResult
    }, () => { this.ScaleResults([EmployeeResult, EnergyResult, EquipmentResult, FoodResult]) })
  }

  ScaleResults() {
    /*
        @notice A function to appropriately scale the
        graph results based on the previous months results
        @param ResultArray An array of the results
        for each category (Employee,Energy,Equipment,Food)
        */

    /*
        const BiggestResult = ResultArray.reduce(function(a,b) {
            return Math.max(a,b)
        });
        const ScaleFactor = 1/BiggestResult

        this.setState({
            EmployeeResult: this.state.EmployeeResult*(0.7/this.state.EmployeeResult),
            EnergyResult: this.state.EnergyResult*(0.7/this.state.EnergyResult),
            EquipmentResult: this.state.EquipmentResult*(0.7/this.state.EquipmentResult),
            FoodResult: this.state.FoodResult*(0.7/this.state.FoodResult),
        })
         */
    this.setState({
      EmployeeResult: 0.7,
      EnergyResult: 0.7,
      EquipmentResult: 0.7,
      FoodResult: 0.7
    })
  }


  render() {
    const {
      TotalFootprint,
      RegionID,
      Category,
      QuestionNumber,
      EmployeeProgress,
      EnergyProgress,
      GoodsProgress,
      EquipmentProgress,
      FoodProgress,
      EmployeeResult,
      EnergyResult,
      GoodsResult,
      EquipmentResult,
      FoodResult,
      fullpage,
      ProgressOn,
      TotalEmployeeNumber,
      RecyclingPercentage,
      EnergyFootprint,
      GreenSupplierReduction,
      LightingType,
      OfficeImprovements,
      TechPurchases,
      DeviceReplacementRate,
      FleetVehicleFootprint,
      MeatFreeDays,
      LocallySourced,
      FoodWasted,
      TotalEmployeeFootprint
    } = this.state
    const data = [
      {
        data: {
          office: EmployeeResult,
          energy: EnergyResult,
          goods: GoodsResult,
          equipment: EquipmentResult,
          food: FoodResult
        },
        meta: { color: '#fffcfc' }
      }
    ]

    const captions = {
      // columns
      office: 'Office',
      energy: 'Energy',
      goods: 'Goods',
      equipment: 'Equipment',
      food: 'Food'
    }
    const FootprintPerCapita = TotalEmployeeFootprint / TotalEmployeeNumber
    return (
      <div className={styles}>
        <div className="menu-buttons">
          <Grid container direction="column" justify="flex-end" alignItems="center" spacing={1}>
            <Grid item xs={2}>
              <Button className="menu-button" onClick={() => { fullpage.moveTo(2, 0) }}>
                EMPLOYEES
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button className="menu-button" onClick={() => { fullpage.moveTo(2, 1) }}>
                ENERGY
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button className="menu-button" onClick={() => { fullpage.moveTo(2, 8) }}>
                EQUIPMENT
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button className="menu-button"onClick={() => { fullpage.moveTo(2, 12) }}>
                FOOD
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button className="menu-button" onClick={() => { fullpage.moveTo(2, 17) }}>
                GOODS
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className={`progress-icon-${ ProgressOn}`}>
          <div className="circular-progress-background">
            <CircularProgress
              variant="static"
              size={120}
              thickness={6}
              value={100}
            />
          </div>
          <div className="circular-progress-office">
            <CircularProgress
              style={{
                color: 'white',
                opacity: 0.7
              }}
              variant="static"
              size={120}
              thickness={6}
              value={EmployeeProgress}
            />
          </div>
          <div className="circular-progress-energy">
            <CircularProgress
              style={{
                color: 'white',
                opacity: 0.5
              }}
              variant="static"
              size={120}
              thickness={6}
              value={EnergyProgress}
            />
          </div>
          <div className="circular-progress-equipment">
            <CircularProgress
              style={{
                color: 'white',
                opacity: 0.1
              }}
              variant="static"
              size={120}
              thickness={6}
              value={EquipmentProgress}
            />
          </div>
          <div className="circular-progress-food">
            <CircularProgress
              style={{
                color: 'white',
                opacity: 0.1
              }}
              variant="static"
              size={120}
              thickness={6}
              value={FoodProgress}
            />
          </div>
          <div className="circular-progress-goods">
            <CircularProgress
              style={{
                color: 'white',
                opacity: 0.3
              }}
              variant="static"
              size={120}
              thickness={6}
              value={GoodsProgress}
            />
          </div>
        </div>
        <div className={`category-display-${ProgressOn}`}>
          <h2 className="category-text"> {Category} </h2>
        </div>
        <div className={`previous-button-${ProgressOn}`}>
          <Button
            style={{ color: 'white' }}
            onClick={() => { this.MoveToPreviousQuestion(fullpage, QuestionNumber) }}
          >Previous Question
          </Button>
        </div>
        <div className={`contact-button-${ProgressOn}`}>
          <a href="mailto:corporate@creol.io" style={{ color: 'white' }}>
            Please contact Creol if a personalised calculator is required for your business
          </a>
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

          onSlideLeave={() => { this.UpdateCategory(QuestionNumber) }}

          render={({ fullpageApi }) => {
            if (fullpageApi !== undefined && !this.state.fullpageApi) {
              this.setFullpage(fullpageApi)
            }
            return (
              <div className={styles}>
                <ReactFullpage.Wrapper>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                        <Grid item xs>
                          <h2> Calculate the carbon footprint for your office </h2>
                        </Grid>
                        <Grid item xs>
                          <Button
                            variant="contained"
                            className="question-button"
                            onClick={() => { this.StartQuestionnaire(fullpageApi) }}
                          > Take the Questionnaire
                          </Button>
                        </Grid>
                      </Grid>
                      <div>
                        <RegionSelect
                          displayText={false}
                          onChange={(region) => { this.UpdateRegion(region) }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    {this.ReturnQuestion(1, RegionID, fullpageApi)}
                    {this.ReturnQuestion(2, RegionID, fullpageApi)}
                    {this.ReturnQuestion(3, RegionID, fullpageApi)}
                    {this.ReturnQuestion(4, RegionID, fullpageApi)}
                    {this.ReturnQuestion(5, RegionID, fullpageApi)}
                    {this.ReturnQuestion(6, RegionID, fullpageApi)}
                    {this.ReturnQuestion(7, RegionID, fullpageApi)}
                    {this.ReturnQuestion(8, RegionID, fullpageApi)}
                    {this.ReturnQuestion(9, RegionID, fullpageApi)}
                    {this.ReturnQuestion(10, RegionID, fullpageApi)}
                    {this.ReturnQuestion(11, RegionID, fullpageApi)}
                    {this.ReturnQuestion(12, RegionID, fullpageApi)}
                    {this.ReturnQuestion(13, RegionID, fullpageApi)}
                    {this.ReturnQuestion(14, RegionID, fullpageApi)}
                    {this.ReturnQuestion(15, RegionID, fullpageApi)}
                    {this.ReturnQuestion(16, RegionID, fullpageApi)}
                    {this.ReturnQuestion(17, RegionID, fullpageApi)}
                  </div>
                  <div className="section">
                    <div className="slide">
                      <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                        <Grid item xs>
                          <h2> RESULTS </h2>
                        </Grid>
                        <Grid item xs>
                          <div>
                            <RadarChart
                              captions={captions}
                              data={data}
                              size={300}
                            />
                          </div>
                        </Grid>
                        <Grid item xs>
                          <EmailSignup
                            TotalFootprint={TotalFootprint}
                            EmployeeFootprint={FootprintPerCapita}
                            EnergyFootprint={EnergyFootprint}
                            RecyclingPercentage={RecyclingPercentage}
                            GreenSupplierReduction={GreenSupplierReduction}
                            LightingType={LightingType}
                            OfficeImprovements={OfficeImprovements}
                            TechPurchases={TechPurchases}
                            DeviceReplacementRate={DeviceReplacementRate}
                            FleetVehicleFootprint={FleetVehicleFootprint}
                            MeatFreeDays={MeatFreeDays}
                            LocallySourced={LocallySourced}
                            FoodWasted={FoodWasted}
                            RegionID={RegionID}
                          />
                        </Grid>
                        <Grid item xs>
                          <h4 className="goods-text">
                            Please contact Creol for More personalised footprint
                            calculations on the carbon impact of your business
                          </h4>
                          <h2 style={{ paddingTop: 0 }}>
                            <a href="mailto:corporate@creol.io" className="email-link">
                              corporate@creol.io
                            </a>
                          </h2>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </ReactFullpage.Wrapper>
              </div>
            )
          }}
        />
      </div>
    )
  }
}


export default withRouter(OfficeQuestionnaire)
