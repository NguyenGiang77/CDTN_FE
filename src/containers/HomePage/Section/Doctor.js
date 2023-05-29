import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Doctor extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='section-share section-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi tiếng</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='image section-doctor'></div>
                                    </div>
                                    <div className='position-doctor text-center'>
                                        <div>Tiến sĩ, Bác sĩ Vũ Thái Hà</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='image section-doctor'></div>
                                    </div>
                                    <div className='position-doctor text-center'>
                                        <div>Tiến sĩ, Bác sĩ Vũ Thái Hà</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='image section-doctor'></div>
                                    </div>
                                    <div className='position-doctor text-center'>
                                        <div>Tiến sĩ, Bác sĩ Vũ Thái Hà</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='image section-doctor'></div>
                                    </div>
                                    <div className='position-doctor text-center'>
                                        <div>Tiến sĩ, Bác sĩ Vũ Thái Hà</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-background'>
                                        <div className='image section-doctor'></div>
                                    </div>
                                    <div className='position-doctor text-center'>
                                        <div>Tiến sĩ, Bác sĩ Vũ Thái Hà</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
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
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
