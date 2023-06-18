import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import _ from 'lodash';
import ProfieDoctor from '../ProfieDoctor';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
class BookingModal extends Component {
    constructor(props) { 
        super(props);
        this.state = {


        }
    }
     componentDidMount() {

    }
    
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    
    render() {
        let { isOpenModalBooking, closeModalBooking, dataSchedule } = this.props;
        let doctorId = '';
        // cách 1
        //  if(dataSchedule && _.isEmpty(dataSchedule)) {
        //     doctorId = dataSchedule.doctorId
        // }
        // Cách 2
        doctorId = dataSchedule && !_.isEmpty(dataSchedule) ? dataSchedule.doctorId : '';
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
                            <i class="fas fa-times-circle"></i>
                            
                        </span>
                    </div>
                    <div className='booking-body'>
                        <div className='infor-doctor'>
                            <ProfieDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataSchedule={dataSchedule}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ và tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control' />
                            </div>
                            
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-footer'>
                        <button className='btn btn-primary save'
                            onClick={closeModalBooking}
                        >Xác nhận</button>
                        <button className='btn btn-primary cancel'
                            onClick={closeModalBooking}
                        >Hủy</button>
                    </div>
                </div>
                
            </Modal>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
