import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllSpecialty.scss"
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
class AllSpecialty extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            arrSpecialty: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allInforSpecialtyRedux !== this.props.allInforSpecialtyRedux) {
            this.setState({
                arrSpecialty: this.props.allInforSpecialtyRedux
            })
        }
    }
    componentDidMount() { 
        this.props.fetchInforSpecialty();
    }
    handleViewInforSpecialty = (item) => { 
        if (this.props.history)
        {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }
    returnHome = () => {
        if (this.props.history)
        {
            this.props.history.push(`/home`);
        }
    }
    render() {
        let arrSpecialty = this.state.arrSpecialty;        
        return (
            
            <div className='container-specialty'>
                <div className='container-top'>
                    <div className='back'>
                        <i className="fas fa-arrow-alt-circle-left"
                         onClick={ () => this.returnHome()}
                        ></i>
                    </div>
                    <span className='title-container'>
                        <FormattedMessage id="manage-specialty.title_infor"></FormattedMessage>
                    </span>
                </div>   
                <div className='container-down'>
                    <div className='section-body'>
                            {arrSpecialty && arrSpecialty.length > 0 &&
                                arrSpecialty.map((item, index) => {
                                    
                                    let nameVn = item.name;
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewInforSpecialty(item) }
                                    >

                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='image section-infor-category'
                                                    style={{backgroundImage: `url(${item.image})`}}                                                />
                                            </div>
                                            <div className='position-doctor'>
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
        allInforSpecialtyRedux: state.admin.allInforSpecialty

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInforSpecialty: () => dispatch(actions.fetchInforSpecialty())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllSpecialty));
