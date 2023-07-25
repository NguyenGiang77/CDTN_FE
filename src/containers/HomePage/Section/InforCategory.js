import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllInforCategory } from '../../../services/userService';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class InforCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataInforCategory: []
        }
    }
   async componentDidMount () {
        let res = await getAllInforCategory();
        if(res && res.errCode === 0)
        {
            this.setState({
                dataInforCategory: res.data ? res.data: []
            })
        }
    }
    handleDetailInforCategory = (inforCategory) => {
        if (this.props.history)
        {
            this.props.history.push(`/infor-Category/${inforCategory.id}`);
        }
    
    }
    handleAllInforCategory = () =>{
        if (this.props.history)
        {
            this.props.history.push(`/all-inforcategory`);
        }
    }
    render() {
       let {dataInforCategory} = this.state
        return (
            <div className='section-share section-InforCategory'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id ="manage-pack.title"></FormattedMessage></span>
                        <button className='btn-section'
                            onClick={() => this.handleAllInforCategory()}
                        >
                            <FormattedMessage id ="manage-pack.more"></FormattedMessage>
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings} >
                            {dataInforCategory && dataInforCategory.length> 0
                                && dataInforCategory.map((item,index) => {
                                    return(
                                        <div 
                                            className='section-customize' 
                                            key = {index}
                                            onClick={() =>this.handleDetailInforCategory(item)}
                                        >
                                            <div className='customize-no-border'>
                                                <div className='image section-medical'
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                />                                                     
                                                <div className='position-medical text-center'>
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
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InforCategory));
