import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Specialty extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='section-share section-specialty'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-no-border'>
                                    <div className='image section-specialty'></div>     
                                    <div>Nha khoa</div>
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
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
