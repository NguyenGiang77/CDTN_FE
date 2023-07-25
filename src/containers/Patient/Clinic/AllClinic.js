import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllClinic.scss"
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
class AllClinic extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            arrClinic: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinicRedux !== this.props.clinicRedux) {
            this.setState({
                arrClinic: this.props.clinicRedux
            })
        }
    }
    componentDidMount() { 
        this.props.fetchClinicStart();
    }
    handleDetailClinic = (clinic) => {
        if (this.props.history)
        {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    
    }
    render() {
        let arrClinic = this.state.arrClinic;        
        return (
            
            <div className='section-share section-medical'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="manage-clinic.title_FE"></FormattedMessage>
                        </span>
                    </div>
                    <div className='section-body'>
                            {arrClinic && arrClinic.length > 0 &&
                                arrClinic.map((item, index) => {
                                    
                                    let nameVn = item.name;
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleDetailClinic(item) }
                                    >

                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='image section-doctor'
                                                    style={{backgroundImage: `url(${item.image})`}}                                                />
                                            </div>
                                            <div className='position-doctor text-center'>
                                                <div>{nameVn}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })
                            }
                    </div>
                    
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        clinicRedux: state.admin.clinics

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicStart: () => dispatch(actions.fetchClinicStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllClinic));
