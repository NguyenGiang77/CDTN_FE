import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import DatePicker from '../../../../components/Input/DatePicker';
import ProfieCategory from '../ProfieCategory';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { postBookingCategorySchedule } from '../../../../services/userService';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGenders: '',
            inforCategoryId: '',
            timeType: '',
            


        }
    }
    componentDidMount() {
        this.props.getGenderStart();

    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVN : item.valueEN;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            });
        }
        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                this.setState({
                    genders: this.buildDataGender(this.props.genders)
                });
            }
        }
        if (this.props.dataSchedule !== prevProps.dataSchedule) {
            if (this.props.dataSchedule && !_.isEmpty(this.props.dataSchedule)) {
                let inforCategoryId = this.props.dataSchedule.inforCategoryId;
                let timeType = this.props.dataSchedule.timeType;
                this.setState({
                    inforCategoryId: inforCategoryId,
                    timeType: timeType,
                })
            }
        }
    }
        handleOnChangeInput = (event, id) => {
            let valueInput = event.target.value;
            let stateCopy = { ...this.state } // dùng {} sẽ hiểu biến là 1 object, ... copy lại tên state hiện tại
            stateCopy[id] = valueInput;
            this.setState({ ...stateCopy });
        }
        handleOnChangeInputDate = (date) => {
            this.setState({
                birthday: date[0]
            });
        }
        handleChangeGenders = (selectedOption) => {
            this.setState({ selectedGenders: selectedOption });
            
        }
    
    buildTimeBooking = (dataSchedule) => { 
        let { language } = this.props
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let time = language === LANGUAGES.VI ? dataSchedule.timeScheduleCateData.valueVN : dataSchedule.timeScheduleCateData.valueEN;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataSchedule.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }
    buildCategoryName = (dataSchedule) => { 
        let { language } = this.props
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let name = dataSchedule.schecduleInforCategoryData.name
            return name
        }
        return ''
    }
    handleSave = async () => {
            
        // !data.email || !data.inforCategoryId || !data.timeType || !data.date
        let inforCategoryName = this.buildCategoryName(this.props.dataSchedule);
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataSchedule)
            let res = await postBookingCategorySchedule({
                Name: this.state.Name,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: this.props.dataSchedule.date,
                birthday: date,
                selectedGenders: this.state.selectedGenders.value,
                inforCategoryId: this.state.inforCategoryId,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                inforCategoryName: inforCategoryName,
            })
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.booking-modal.comfirm-success" />)
                this.props.closeModalBooking();
            }
            else {
                toast.error(<FormattedMessage id="toast.booking-modal.comfirm-warning" />)
        }

    }
        render(){
            let { isOpenModalBooking, closeModalBooking, dataSchedule } = this.props;
            let inforCategoryId = '';
            // // cách 1
            //  if(dataSchedule && _.isEmpty(dataSchedule)) {
            //     inforCategoryId = dataSchedule.inforCategoryId
            // }
            // Cách 2
            
            inforCategoryId = dataSchedule && !_.isEmpty(dataSchedule) ? dataSchedule.inforCategoryId : '';
            return (
                <Modal
                    isOpen={isOpenModalBooking}
                    className={'booking-container'}
                    size="lg"
                    centered
                >
                    <div className='booking-content'>
                        <div className='booking-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='right' onClick={closeModalBooking}>
                                <i className="fas fa-times-circle"></i>
                            
                            </span>
                        </div>
                        <div className='booking-body'>
                            <div className='infor-doctor'>
                                <ProfieCategory
                                    inforCategoryId={inforCategoryId}
                                    isShowDescription={false}
                                    dataSchedule={dataSchedule}
                                    isShowLinkDetail={true}
                                    isShowPrice = {true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.email" /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.name" /></label>
                                    <input className='form-control'
                                        value={this.state.Name}
                                        onChange={(event) => this.handleOnChangeInput(event, 'Name')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.sex" /></label>
                                    <Select
                                        value={this.state.selectedGenders}
                                        onChange={this.handleChangeGenders}
                                        options={this.state.genders}
                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeInputDate}
                                        className="form-control"
                                        value={this.state.birthday}
                                    
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.number" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="bookings-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                            
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="bookings-modal.reasons" /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-footer'>
                            <button className='btn btn-primary save'
                                onClick={() => this.handleSave()}
                            ><FormattedMessage id="bookings-modal.save" /></button>
                            <button className='btn btn-primary cancel'
                                onClick={closeModalBooking}
                            ><FormattedMessage id="bookings-modal.cancel" /></button>
                        </div>
                    </div>
                
                </Modal>
    
            );
        }
    }

const mapStateToProps = state => {
    return {
        genders: state.admin.genders, // truyền tham số genderss từ reducer vào react
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
   
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
