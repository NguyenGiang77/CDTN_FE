import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import './DetailCategory.scss';
import CategoryExtraInfor from '../InforCategory/CategoryExtraInfor';
import CategorySchedule from '../InforCategory/CategorySchedule';
import ProfieCategory from '../InforCategory/ProfieCategory';
import HomeHeader from '../../HomePage/HomeHeader';
import {  getDetailCategoryById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DetailCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayInforCategoryId: [],
            dataCategory: {},

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailCategoryById({
                id: id,
            });

            if (res && res.errCode === 0 ) {
                let data = res.data;
                let arrayInforCategoryId = []

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.categoryInforCategoryData;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrayInforCategoryId.push(item.id);
                        })
                    }
                }
                this.setState({
                    dataCategory: res.data,
                    arrayInforCategoryId: arrayInforCategoryId,
                })
            }
        }
    }

    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        let { arrayInforCategoryId, dataCategory } = this.state;
        console.log('ii', arrayInforCategoryId)
        return (
            <div className="specialty-container">
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className="description-specialty">
                        {dataCategory && !_.isEmpty(dataCategory)
                            &&
                            <>  
                                <div className='name-clinic'>{dataCategory.name}</div>
                                {/* <div className='address-clinic'><FormattedMessage id ="manage-clinic.address" />: {dataCategory.address}</div> */}
                                <div className='title-clinic'><FormattedMessage id ="manage-clinic.introduction"/></div>
                                <div dangerouslySetInnerHTML={{ __html: dataCategory.categoryHTML }}></div>
                            </>
                            
                        }
                    </div>
                    {arrayInforCategoryId && arrayInforCategoryId.length > 0 &&
                        arrayInforCategoryId.map((item, index) => {
                            return (
                                <div className='infor-doctor' key={index}>
                                    <div className='ds-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfieCategory
                                                id={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice = {false}
                                            // dataSchedule={dataSchedule}
                                            />
                                        </div>
                                    </div>
                                    <div className='ds-content-right'>
                                        <div className='doctor-schedule'>
                                            <CategorySchedule
                                                inforCategoryCheck={item}
                                            />
                                        </div>
                                        <div className='doctor-extra'>
                                            <CategoryExtraInfor
                                                inforCategoryCheck={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategory);
