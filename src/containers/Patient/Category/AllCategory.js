import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
class AllCategory extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            arrCategory: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.categoryRedux !== this.props.categoryRedux) {
            this.setState({
                arrCategory: this.props.categoryRedux
            })
        }
    }
    componentDidMount() { 
        this.props.fetchCategoryStart();
    }
    handleDetailCategory = (category) => {
        if (this.props.history)
        {
            this.props.history.push(`/detail-category/${category.id}`);
        }
    
    }
    render() {
        
        let arrCategory = this.state.arrCategory;        
        return (
            
            <div className='section-share section-Category'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="manage-clinic.title_FE"></FormattedMessage>
                        </span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {arrCategory && arrCategory.length > 0 &&
                                arrCategory.map((item, index) => {
                                    
                                    let nameVn = item.name;
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleDetailCategory(item) }
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
        categoryRedux: state.admin.categories

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryStart: () => dispatch(actions.fetchCategoryStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCategory));
