import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import './HomePageCategory.scss';
import HomeFooter from '../HomePage/HomeFooter';
import Category from './Section/Category';
import Clinic from './Section/Clinic';
import InforCategory from './Section/InforCategory';
class HomePageCategory extends Component {
    // handleAfterChange = (index, dontAnimate) => {
    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slideToScroll: 2,
            // slickGoTo: this.handleAfterChange,
        }
        
        return (
            <div>
                <HomeHeader />
                <Category settings={settings} />
                <InforCategory settings={settings} />

                <Clinic settings={settings} />
                {/* <AllCategory settings={settings} /> */}
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageCategory);
