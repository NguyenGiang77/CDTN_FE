import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
class Category extends Component {
    // history = useHistory();
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
    handleViewCategory = (category) => { 
        if (this.props.history)
        {
            this.props.history.push(`/detail-category/${category.id}`);
        }
    }

    render() {
        let { language } = this.props;
        // let settings = this.props.settings
        let arrCategory = this.state.arrCategory;
        //arrCategory = arrCategory.concat(arrCategory).concat(arrCategory)
        
        return (
            
            <div className='section-share section-category'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="manage-category.title_FE"></FormattedMessage>
                        </span>
                       
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {arrCategory && arrCategory.length > 0 &&
                                arrCategory.map((item, index) => {
                                    
                                   
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewCategory(item) }
                                    >

                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='image section-category'
                                                    style={{ backgroundImage: `url(${item.image})`}}
                                                />
                                            </div>
                                            <div className='position-category text-center'>
                                                <div>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
