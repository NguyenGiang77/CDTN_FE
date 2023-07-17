import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import { sendRemedy, getlisPatientForDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { flatMap } from 'lodash';
class ManagePatient extends Component {
    constructor(props) { 
        super(props);
        this.state = {

            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal:  false,
            dataModal: {},
            isShowLoading: false
            

        }

    }
    async componentDidMount() {
       this.getDataPatient()
    }
    getDataPatient = async () =>{
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getlisPatientForDoctor({
            doctorId: user.id,
            date:formatedDate
        })
        if(res && res.errCode ===0)
        {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleChangeDate = (date) => { 
        this.setState({
            currentDate: date[0]
        });
    }
    
    //để biets được khi nào prop thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    handleOnChangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        }, async() =>{
            await this.getDataPatient()
        }
        )
    }
    handleConfirm = (item) =>{
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenModal: true,
            dataModal : data
        })
    }
    closeModal = () =>{
        this.setState({
            isOpenModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (data) =>{
        let {dataModal} = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await sendRemedy ({
            email: data.email,
            imgBase64: data.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType:dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if(res && res.errCode === 0)
        {
            this.setState({
                isShowLoading: false
            })
            toast.success(<FormattedMessage id="toast.manage-patient.comfirm-success" />);
            this.closeModal();
            await this.getDataPatient();
        }
        else{
            this.setState({
                isShowLoading:false
            })
        }
        
    }
    render() {
        let {dataPatient, isOpenModal, dataModal} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <>
                <LoadingOverlay
                        active={this.state.isShowLoading}
                        spinner
                        text =  'Loading'
                    
                    >
                <div className='manage-patient-container'>
                    <div className='mp-title'>
                        <FormattedMessage id ="manage-patient.title"/>
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id ="manage-patient.date"/></label>
                            <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.currentDate}
                                        minDate={yesterday} // lấy gtri ngày hôm nay
                            />
                        </div>
                        <div className='col-12'>
                            <React.Fragment>
                                <table id = "TablePatient">
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id ="manage-patient.stt"></FormattedMessage></th>
                                            <th><FormattedMessage id ="manage-patient.time"></FormattedMessage></th>
                                            <th><FormattedMessage id ="manage-patient.name"></FormattedMessage></th>
                                            <th><FormattedMessage id ="manage-patient.gender"></FormattedMessage></th>
                                            <th><FormattedMessage id ="manage-patient.address"></FormattedMessage></th>
                                            <th><FormattedMessage id ="manage-patient.phone"></FormattedMessage></th>
                                            <th><FormattedMessage id ="manage-patient.action"></FormattedMessage></th>    
                                        </tr>
                                        {dataPatient && dataPatient.length>0 ?
                                            dataPatient.map((item,index) => {
                                                let time = language === LANGUAGES.VI ? item.timeData.valueVN: item.timeData.valueEN;
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVN: item.patientData.genderData.valueEN

                                            return (
                                                <tr key = {index}>
                                                    <td>{index+1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.patientData.phoneNumber}</td>
                                                    <td>
                                                        <button
                                                            onClick={()=> this.handleConfirm(item)}
                                                            className='btn-confirm'><FormattedMessage id ="manage-patient.confirm"></FormattedMessage></button>
                                                        
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="7" style={{textAlign:"center"}}>
                                            <FormattedMessage id ="manage-patient.nodata"></FormattedMessage>
                                            </td>
                                        </tr>
                                        }
                                        
                                        
                                    </tbody>
                                </table>
                            </React.Fragment>
                        </div>
                    </div>
                
                </div>
                <RemedyModal 
                    isOpenModal={isOpenModal}
                    dataModal={dataModal}
                    closeModal ={this.closeModal}
                    sendRemedy = {this.sendRemedy}
                />                    
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.UserInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
