import React, { Component } from 'react';
import { connect } from "react-redux";
import './SchecduleInforCategory.scss';
import Select from 'react-select';
import { LANGUAGES, CRUB_ACTIONS, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify'
import _ from 'lodash';
import { bulkCreateScheduleCategory } from '../../../services/userService';
import moment from 'moment';
class SchecduleInforCategory extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            listCategory: [],
            selectedCategory: {},
            date: '',
            rangTime: [],
            

        }

    }
    componentDidMount() {
        this.props.fetchAllIforCategory();
        this.props.fetchAllcodeScheduleDate();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allInforCategory !== this.props.allInforCategory) {
            let dataSelect = this.buildDataCombobox(this.props.allInforCategory)
            this.setState({
                listCategory: dataSelect
            })
        }
        if (prevProps.allScheduleDate !== this.props.allScheduleDate) {
            let data = this.props.allScheduleDate;
            if (data && data.length > 0) { 
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item =>({ ...item,isSelected:false}))

            }
            this.setState({
                rangTime: data
            })
        }


    } 
    buildDataCombobox = (inputdata) => { 
        let result = [];
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelName = item.name;
                object.label = labelName;
                object.value = item.id;
                result.push(object);

            })
           
        }
        return result;
    }
    handleChange = async  selectedOption => {
        this.setState({ selectedCategory: selectedOption });

    }
    handleChangeDate = (date) => { 
        this.setState({
            date: date[0]
        });
    }
    handleClickDate = (time) => { 
        let { rangTime } = this.state;
        if (rangTime && rangTime.length > 0)
        {
            rangTime = rangTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({rangTime: rangTime});
            }

    }
    handleSaveSchedule = async() =>{
        let { rangTime, selectedCategory, date } = this.state;
        let result = [];
        if (!date) {
            toast.error("Invalid date!")
        }
        if (selectedCategory && _.isEmpty(selectedCategory)) { 
            toast.error("Invalid selected doctor!")
            return
        }
        let formatedDate = new Date(date).getTime();
        // let formatedDate = moment(date).unix();
        // let formatedDate = moment(date).format(dateFormat.SEND_TO_SERVERS);
        if (rangTime && rangTime.length>0) { 
            let selectedDate = rangTime.filter(item => item.isSelected === true);
            if (selectedDate && selectedDate.length > 0) {
                selectedDate.map((schedule,index) => {
                    let object = {};
                    object.inforCategoryId = selectedCategory.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);


                })
            }
                
             else {
                return;
            }
        }
        let res = await bulkCreateScheduleCategory({
            arrSchedule: result,
            inforCategoryId: selectedCategory.value,
            formatedDate: formatedDate,

        })
        if (res && res.errCode === 0)
        {
            toast.success(<FormattedMessage id="toast.manage-schedule.succeed" />)
           
        }
        else {
            toast.error(<FormattedMessage id="toast.manage-schedule.error-time" />)
        }
        
    }
    
    render() {
        let { rangTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        console.log(rangTime)
        console.log('kk',this.state)
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id ="manage-schedule.title-infor-category"
                        />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "manage-schedule.choose-infor-category" /></label>
                                <Select
                                    value={this.state.selectedCategory}
                                    onChange={this.handleChange}
                                    options={this.state.listCategory}
                                />                              </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDate}
                                    className='form-control'
                                    value={this.state.date[0]}
                                    minDate={yesterday} // lấy gtri ngày hôm nay
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangTime && rangTime.length > 0
                                    && rangTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-date active' : 'btn btn-date'}
                                                key="index"
                                                onClick={() => this.handleClickDate(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVN : item.valueEN}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-primary btn-save-schedule'
                                    onClick={( ) => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id = "manage-schedule.Save" />
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allInforCategory: state.admin.allInforCategory,
        allScheduleDate: state.admin.allScheduleDate

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllIforCategory: () => dispatch(actions.fetchAllIforCategory()),
        fetchAllcodeScheduleDate: () => dispatch(actions.fetchAllcodeScheduleDate()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchecduleInforCategory);
