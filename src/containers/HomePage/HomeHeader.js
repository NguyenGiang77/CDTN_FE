import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/bookingcare.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import {changeLanguageApp} from '../../store/actions'
class HomeHeader extends Component {
    changeLanguage = (language) => { 
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions

    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='left-content-child'>
                                <i className="fas solid fa-bars"></i>
                                <div className='image logo-home'></div>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='home-children'>
                                <div><b><FormattedMessage id="home-header.specialty"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.infor"/></div>
                            </div>
                            <div className='home-children'>
                                <div><b><FormattedMessage id="home-header.hospital"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.choose-hospital"/></div>
                            </div>
                            <div className='home-children'>
                                <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.choose-doctor"/></div>
                            </div>
                            <div className='home-children'>
                                <div><b><FormattedMessage id="home-header.medical"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.choose-medical"/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='help-home'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.help"/>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active': 'language-vi'}><span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>Vietnamese</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active': 'language-en'}><span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>English</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='banner-up'>
                        <div className='tile-text1'><FormattedMessage id="banner.title1"/></div>
                        <div className='tile-text2'><b><FormattedMessage id="banner.title2"/></b></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm kiếm chuyên khoa'/>
                        </div>
                    </div>
                    <div className='banner-down'>
                        <div className='options'>
                            <div className='options-specialist'>
                                <div className='icon-child'>
                                    <i className="fas fa-hospital-alt"></i>
                                </div>
                                <div className='text-child'><b><FormattedMessage id="banner.specialty"/></b></div>
                            </div>
                            <div className='options-specialist'>
                                <div className='icon-child'>
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className='text-child'><b><FormattedMessage id="banner.faraway"/></b></div>
                            </div>
                            <div className='options-specialist'>
                                <div className='icon-child'>
                                    <i className="fas fa-hospital"></i>
                                </div>
                                <div className='text-child'><b><FormattedMessage id="banner.generality"/></b></div>
                            </div>
                            <div className='options-specialist'>
                                <div className='icon-child'>
                                    <i class="fas fa-flask"></i>
                                </div>
                                <div className='text-child'><b><FormattedMessage id="banner.test"/></b></div>
                            </div>
                            <div className='options-specialist'>
                                <div className='icon-child'>
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className='text-child'><b><FormattedMessage id="banner.nerve"/></b></div>
                            </div>
                            <div className='options-specialist'>
                                <div className='icon-child'>
                                    <i class="fas fa-stethoscope"></i>
                                </div>
                                <div className='text-child'><b><FormattedMessage id="banner.dental"/></b></div>
                            </div>
                        </div>
                    </div>               
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
