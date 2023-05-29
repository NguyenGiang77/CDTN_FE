import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Medical extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='section-share section-medical'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-medical'></div>     
                                    <div className='position-medical text-center'>
                                        <div>Bệnh viện Trung ương Quân đội 108</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Medical);
