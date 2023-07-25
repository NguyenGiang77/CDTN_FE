import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllInforCategory.scss"
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
class AllInforCategory extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            arrInforCategory: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allInforCategoryRedux !== this.props.allInforCategoryRedux) {
            this.setState({
                arrInforCategory: this.props.allInforCategoryRedux
            })
        }
    }
    componentDidMount() { 
        this.props.fetchAllIforCategory();
    }
    handleDetailInforCategory = (inforCategory) => {
        if (this.props.history)
        {
            this.props.history.push(`/infor-Category/${inforCategory.id}`);
        }
    
    }
    returnHome = () => {
        if (this.props.history)
        {
            this.props.history.push(`/home`);
        }
    }
    render() {
        let arrInforCategory = this.state.arrInforCategory;        
        return (
            
            <div className='section-share section-InforCategory'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="manage-pack.title"></FormattedMessage>
                        </span>
                    </div>
                    <div className='section-body'>
                            {arrInforCategory && arrInforCategory.length > 0 &&
                                arrInforCategory.map((item, index) => {
                                    
                                    let nameVn = item.name;
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleDetailInforCategory(item) }
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
        allInforCategoryRedux: state.admin.allInforCategory

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllIforCategory: () => dispatch(actions.fetchAllIforCategory())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllInforCategory));
