import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import * as actions from '../../../store/actions';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify'
import TableSpecialty from './TableSpecialty';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgURL: '',
            isOpen: false,
            // dữ liệu
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkown: '',
            action: '',
            specialtyEditId: ''
        }
     }

    async componentDidMount() {

        
    }
    componentDidUpdate(prevProps, prevState, snapshot) { 
        if (prevProps.specialty !== this.props.specialty)
        {
            this.setState({
                name: '',
                image: '',
                descriptionHTML: '',
                descriptionMarkown: '',
                action: CRUB_ACTIONS.CREATE,
                imgURL: ''
            })
            }
    }
    handleImageChange =  async (event) => { 
        let datafile = event.target.files;
        let file = datafile[0];
        if (file)
        {
            let base64 = await CommonUtils.getBase64(file);            
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                imgURL: objectUrl,
                image: base64
            })
            
                
            
        }
    }

    openImg = () => { 
        if (!this.state.imgURL) return;
    
        this.setState({ isOpen: true })
    }
    handleOnChangeInput = (event,id) =>{
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
     handleEditChange= ({ html, text }) => {
        this.setState ({
            descriptionHTML: html,
            descriptionMarkown: text,
            
        })
        
    }
    checkValidateInput = () => { 
        let isValid = true;
        let arrCheck = ['name','descriptionHTML','descriptionMarkown' ]
        for (let i = 0; i < arrCheck.length; i++) { 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(<FormattedMessage id="toast.manage-clinic.please" />+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveSpecialtyFE = async () => { 
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUB_ACTIONS.CREATE)
        {
            this.props.createSpecialty({
            name: this.state.name,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkown: this.state.descriptionMarkown,
            image: this.state.image,
            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editSpecialtyStart({
                id:this.state.specialtyEditId,
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkown: this.state.descriptionMarkown,
                image: this.state.image,
            })
            
        }
    }
    handleEditSpecialtyFromParent = (specialty) => { 
        let imageBase64 = '';
        if (specialty.image) { 
            imageBase64 = new Buffer(specialty.image, 'base64').toString('binary');
        }
        
        this.setState({
            specialtyEditId: specialty.id,
            name: specialty.name,
            address: specialty.address,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkown: specialty.descriptionMarkown,
            imgURL: imageBase64,
            image: '',
            action: CRUB_ACTIONS.EDIT
            })
    }
 
    render() {
        
        // let language = this.props.language;
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                    <FormattedMessage id ="manage-specialty.title" />
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-specialty.name" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.name} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                                />
                            </div>
                            <div className='col-6 my-3'>
                                <label><FormattedMessage id="manage-specialty.image" /></label>
                                <div className='img-container'>
                                    <input id='previewImg' type="file" hidden
                                        onChange={(event) =>this.handleImageChange(event)}
                                    
                                    />
                                    <label className='label-img' htmlFor='previewImg'><FormattedMessage id="manage-specialty.file" /><i className="fas fa-upload"></i> </label>
                                    <div className='image'
                                        style={{ backgroundImage: `url(${this.state.imgURL})`}}
                                        onClick={() => this.openImg()}
                                    >
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className='col-12 manage-doctor-edit'>
                                <MdEditor
                                    style={{ height: '300px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditChange}
                                    value ={this.state.descriptionMarkown}
                                />
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUB_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => { this.handleSaveSpecialtyFE() }}
                                >
                                    {this.state.action === CRUB_ACTIONS.EDIT ? 
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                         <FormattedMessage id="manage-user.save" />
                                    }
                               </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableSpecialty
                                    handleEditSpecialtyFromParent={this.handleEditSpecialtyFromParent}
                                    action = {this.state.action}
                                />
                            </div>
                        </div>

                    </div>
                
                </div>
                
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    
                    />
                }



            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        
        language: state.app.language,
        specialty: state.admin.specialties,

    };

};

const mapDispatchToProps = dispatch => {
    return {
        createSpecialty: (data) => dispatch(actions.createSpecialty(data)),
        fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart()),
        editSpecialtyStart: (data) => dispatch(actions.editSpecialtyStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
