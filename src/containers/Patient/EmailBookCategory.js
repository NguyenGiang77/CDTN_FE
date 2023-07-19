import React, { Component } from 'react';
import { connect } from "react-redux";
import './EmailBookCategory.scss';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookCategory } from '../../services/userService'
import { FormattedMessage } from 'react-intl';
class EmailBookCategory extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            statusEmail: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search )
         {
            let urlParms = new URLSearchParams(this.props.location.search);
            let token = urlParms.get('token');
            let inforCategoryId = urlParms.get('inforCategoryId');
            let res = await postVerifyBookCategory({
                token: token,
                inforCategoryId: inforCategoryId
            })
            if (res && res.errCode === 0)
            {
                this.setState({
                    statusEmail: true,
                    errCode: res.errCode
                })
            } 
            else {
                this.setState({
                    statusEmail: true,
                    errCode: res.errCode && res ? res.errCode : -1
                })
            }
        }
        
         
    }
    
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        let {statusEmail, errCode} = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-container'>
                    {statusEmail === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        
                        <div>
                            {+errCode === 0 ?
                                <div className='comfirm'><FormattedMessage id = "bookings-modal.comfirm" /></div>
                                    :
                                <div className='faile'><FormattedMessage id = "bookings-modal.failed" /></div>
                            }
                        </div>
                    }
                </div>
                
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailBookCategory);
