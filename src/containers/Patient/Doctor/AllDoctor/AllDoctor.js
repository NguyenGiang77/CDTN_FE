import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllDoctor.scss"
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions';
import { FormattedMessage } from 'react-intl';
class AllDoctor extends Component {
    // history = useHistory();
    constructor(props) { 
        super(props);
        this.state = {
            arrDoctor: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allInforDoctorRedux !== this.props.allInforDoctorRedux) {
            this.setState({
                arrDoctor: this.props.allInforDoctorRedux
            })
        }
    }
    componentDidMount() { 
        this.props.fetchAllInforDoctor();
    }
    handleViewInforDoctor = (doctor) => { 
        if (this.props.history)
        {
            this.props.history.push(`/infor-doctor/${doctor.id}`);
        }
    }
    render() {
        let { language } = this.props;
        let arrDoctor = this.state.arrDoctor;        
        return (
            
            <div className='section-share section-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.doctor"></FormattedMessage>
                        </span>
                    </div>
                    <div className='section-body'>
                            {arrDoctor && arrDoctor.length > 0 &&
                                arrDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVn = `${item.positionData.valueVN}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEN}, ${item.lastName} ${item.firstName}`;
                                    let nameSpecialty = item.InforDoctor.specialtyData.name
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewInforDoctor(item) }
                                    >

                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='image section-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})`}}
                                                />
                                            </div>
                                            <div className='position-doctor text-center'>
                                                <div>{ language === LANGUAGES.VI ? nameVn: nameEn}</div>
                                                <div>{nameSpecialty}</div>
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
        allInforDoctorRedux: state.admin.allInforDoctor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllInforDoctor: () => dispatch(actions.fetchAllInforDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDoctor));
