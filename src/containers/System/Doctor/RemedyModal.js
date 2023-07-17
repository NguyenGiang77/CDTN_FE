import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, ToastHeader } from 'reactstrap'
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }
    async componentDidMount() {
        if(this.props.dataModal)
        {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    async componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevProps.dataModal !== this.props.dataModal)
        {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnchangeEmail  = (event,id) =>{
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
    handleImageChange =  async (event) => { 
        let datafile = event.target.files;
        let file = datafile[0];
        if (file)
        {
            let base64 = await CommonUtils.getBase64(file);            
            this.setState({
                imgBase64: base64
            })
            
                
            
        }
    }
    handleSendRemedy = () =>{
        this.props.sendRemedy(this.state)
    }
        render(){
            let {isOpenModal, dataModal,closeModal, sendRemedy} =this.props
            return (
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-container'}
                    size="md"
                    centered
                >
                    <ModalHeader toggle={closeModal}>Modal title</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                    <label>Email bệnh nhân</label>
                                    <input className='form-control' type='email' value ={this.state.email}
                                        onChange={(event) => this.handleOnchangeEmail(event,"email")}
                                    />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                    <label>Chọn file hóa đơn</label>
                                    <input className='form-control-file' type='file'
                                        onChange={(event) => this.handleImageChange(event)}
                                    />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.handleSendRemedy()}>Send</Button>
                        <Button color='secondart' onClick={closeModal}>Cancel</Button>                    
                    </ModalFooter>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
