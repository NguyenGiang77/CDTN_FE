import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
class Doctor extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            arrDoctor: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() { 
        this.props.loadTopDoctor();
    }
    render() {
        console.log(this.props.topDoctorRedux)
        let { language } = this.props;
        // let settings = this.props.settings
        let arrDoctor = this.state.arrDoctor;
        arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor)
        
        return (
            <div className='section-share section-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi tiếng</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {arrDoctor && arrDoctor.length > 0 &&
                                arrDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVn = `${item.positionData.valueVN}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEN}, ${item.lastName} ${item.firstName}`;
                                return (
                                    <div className='section-customize' key = {index}>
                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='image section-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})`}}
                                                />
                                            </div>
                                            <div className='position-doctor text-center'>
                                                <div>{ language === LANGUAGES.VI ? nameVn: nameEn}</div>
                                                <div>Da liễu</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })
                            }
                        </Slider>
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
        topDoctorRedux: state.admin.topDoctor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
