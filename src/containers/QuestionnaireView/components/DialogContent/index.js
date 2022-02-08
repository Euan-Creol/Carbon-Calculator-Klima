import React, { Component } from 'react'
import {Dialog, Grid} from "@material-ui/core";
import Subscription from '../../../../assets/images/AccountView/Eco_Purple_Burner@3x.png'
import EmailSignup from "../EmailSignup";
import PropTypes from "prop-types";
import { styles } from './styles.scss'

class DialogContent extends Component {
    constructor() {
        super();
        this.state = {
            setOpen:true
        }
    }
    handleClose(props) {
        /*
        @notice: A function to change the state controlling whether the modal is open
        @props: Required to pass state up to parent component
         */
        this.setState({
            setOpen: !this.state.setOpen
        }, () => {this.handleChange(props)})
    }

    handleChange(props) {
        /*
        @notice: A function to pass state up to parent component
        @props: Required to pass state up to parent component
         */
        props.onChange(this.state.setOpen)
    }

    render() {
        const {
            ModalOn,
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
            HotelFootprint,
            FashionFootprint,
            AccessoryFootprint,
            RegionID
        } = this.props

        return (
            <div className={ styles }>
                <Dialog open={ModalOn} onBackdropClick={() => { this.handleClose(this.props) }}>
                    <Grid container direction='column' justify="center" alignItems="center" className="dialog-box" style={{backgroundColor:"#33972d", height:500}}>
                        <Grid item xs>
                            <img src={Subscription} alt={Subscription} style={{height:150, width:150, paddingTop: 20}}/>
                        </Grid>
                        <Grid item xs>
                            <h2 style={{padding:20}} align="center">
                                Enter your email at the end to receive 25% off today!
                            </h2>
                        </Grid>
                        <Grid item xs>
                            <EmailSignup
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
                                onChange={() => {this.handleClose(this.props)}}
                            />
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}

DialogContent.propTypes = {
    ModalOn: PropTypes.bool.isRequired,
    /** The user's total footprint from the calculator */
    TotalFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Car question*/
    CarFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Motorcycle question*/
    MotorcycleFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Bus question*/
    BusFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Train question*/
    TrainFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Flight question*/
    FlightFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Home question*/
    HomeFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Home Improvements question*/
    HomeImprovements: PropTypes.number.isRequired,
    /** The user's footprint from the Food question*/
    FoodFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Restaurant question*/
    RestaurantFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Hotel question*/
    HotelFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Fashion question*/
    FashionFootprint: PropTypes.number.isRequired,
    /** The user's footprint from the Accessory question*/
    AccessoryFootprint: PropTypes.number.isRequired
}

export default DialogContent
