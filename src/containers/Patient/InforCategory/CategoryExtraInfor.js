import React, { Component } from 'react';
import { connect } from "react-redux";
import './CategoryExtraInfor.scss';
import NumberFormat from 'react-number-format';
import { getDetailInforCategoryById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class CategoryExtraInfor extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}

        }
    }
    async componentDidMount() {
         if (this.props.inforCategoryCheck)
         {
             let res = await getDetailInforCategoryById(this.props.inforCategoryCheck);
             if (res && res.errCode === 0) {
                 this.setState({
                     extraInfor: res.data
                 })
             }
            }
    }
    
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            
        }
        if (this.props.inforCategoryCheck !== prevProps.inforCategoryCheck)
        {
            let res = await getDetailInforCategoryById(this.props.inforCategoryCheck);
            if (res && res.errCode === 0)
            {
                this.setState({
                    extraInfor: res.data
                })
                }
            
            
        }
    }
    showHideDetailInfor = (status) => { 
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let {language} = this.props
        return (
            <div className='doctor-infor-conteiner'>
                <div className='content-up'>
                    <div className='title-address'>
                        <FormattedMessage id = "extra-infor-doctor.address" />
                    </div>
                    <div className='body-address'>
                        {extraInfor &&  extraInfor.clinicInforCategoryData && extraInfor.clinicInforCategoryData.address &&
                            <span>
                                {extraInfor.clinicInforCategoryData.address}
                            
                            </span>
                        }
                    </div>

                </div>
                <div className='content-down'>
                    
                    {isShowDetailInfor === false ?
                        <>
                            <div className='title-cash'>
                                <FormattedMessage id = "extra-infor-doctor.price-1" />
                                {extraInfor && extraInfor.priceInforCategoryData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                    className='currency'
                                        value={extraInfor.priceInforCategoryData.valueVN }
                                        displayType={'text' }
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                    />
                                }
                                {extraInfor && extraInfor.priceInforCategoryData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                    className='currency'
                                        value={extraInfor.priceInforCategoryData.valueEN }
                                        displayType={'text' }
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                            </div>    
                            <div className='detail'>
                                    <span  onClick={() => this.showHideDetailInfor(true)}>
                                        <FormattedMessage id = "extra-infor-doctor.more" />
                                    </span>
                            </div>    
                         </>   
                        
                        :
                        <>
                            <div className='title-cash-hide'>
                                <div className='cash'>
                                    <div className='price'>
                                        <span className='price-left'>
                                            <FormattedMessage id="extra-infor-doctor.price-2" />
                                        </span>
                                        <span className='price-right'>
                                            {extraInfor && extraInfor.priceInforCategoryData && language === LANGUAGES.VI &&
                                                <NumberFormat
                                                className='currency'
                                                    value={extraInfor.priceInforCategoryData.valueVN }
                                                    displayType={'text' }
                                                    thousandSeparator={true}
                                                    suffix={'VNĐ'}
                                                />
                                            }
                                            {extraInfor && extraInfor.priceInforCategoryData && language === LANGUAGES.EN &&
                                                <NumberFormat
                                                className='currency'
                                                    value={extraInfor.priceInforCategoryData.valueEN }
                                                    displayType={'text' }
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            }
                                        </span>
                                    </div>
                                    </div>
                                <div className='payment'>
                                    <FormattedMessage id = "extra-infor-doctor.payment" />
                                    {extraInfor && extraInfor.paymentInforCategoryData && language === LANGUAGES.VI
                                        ? extraInfor.paymentInforCategoryData.valueVN: ''}
                                    {extraInfor && extraInfor.paymentInforCategoryData && language === LANGUAGES.EN
                                        ? extraInfor.paymentInforCategoryData.valueEN: ''}   
                                </div>
                            </div> 
                            <div className='hide'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id = "extra-infor-doctor.hide" />
                                </span>
                            </div>
                            
                        </>
                    }
                    
                    
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryExtraInfor);
