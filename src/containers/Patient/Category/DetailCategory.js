import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import './DetailCategory.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import ProfieDoctor from '../Doctor/ProfieDoctor';
import { getAllCodeService, getDetailCategoryById } from '../../../services/userService';
// import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class DetailCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayPackageId: [],
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
                let arrayPackageId = []

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.packageCategory;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrayPackageId.push(item.packageId);
                        })
                    }
                }
                this.setState({
                    dataCategory: res.data,
                    arrayPackageId: arrayPackageId,
                })
            }
        }
    }

    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    render() {
        let { arrayPackageId, dataCategory } = this.state;
        let { language } = this.props;
        return (
            <div className="specialty-container">
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className="description-specialty">
                        
                        {dataCategory && !_.isEmpty(dataCategory)
                            &&
                            <>  
                                <div className='name-clinic'>{dataCategory.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataCategory.categoryMarkown }}></div>
                            </>
                            
                        }
                    </div>
                    
                    {arrayPackageId && arrayPackageId.length > 0 &&
                        arrayPackageId.map((item, index) => {
                            return (
                                <div className='infor-doctor' key={index}>
                                    <div className='ds-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfieDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice = {false}
                                            // dataSchedule={dataSchedule}
                                            />
                                        </div>
                                    </div>
                                    <div className='ds-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                inforDoctorCheck={item}
                                            />
                                        </div>
                                        <div className='doctor-extra'>
                                            <DoctorExtraInfor
                                                inforDoctorCheck={item}
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
