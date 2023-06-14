import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'; 
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { getInforDoctor } from '../../../services/userService';
import { CRUB_ACTIONS} from '../../../utils';
const mdParser = new MarkdownIt();
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            lisDoctor: [],
            hasOldData: false,
            //Lưu thông tin chi tiết bác sĩ
            listPrice: [],
            listPayment: [],
            listProvinces: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvinces: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

            
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getInforDoctor();
    }
    buildDataCombobox = (inputdata,type) => { 
        let result = [];
        let {language} = this.props;
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelVn = type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVN;
                let labelEn = type === "USERS" ? `${item.lastName} ${item.firstName}`: item.valueEN;
                object.label = language === LANGUAGES.VI ? labelVn : labelEn;
                object.value = item.id;
                result.push(object);

            })
           
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataCombobox(this.props.allDoctor, "USERS")
            this.setState({
                lisDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) { 
            let dataSelect = this.buildDataCombobox(this.props.allDoctor)
            this.setState({
                lisDoctor: dataSelect
            })
        }
        if (prevProps.allData !== this.props.allData)
        {
            let {resPrice, resPayment, resProvince} = this.props.allData;
            let dataSelectPrice = this.buildDataCombobox(resPrice);
            let dataSelectPayment = this.buildDataCombobox(resPayment);
            let dataSelectProvince = this.buildDataCombobox(resProvince)
            console.log(dataSelectPayment,dataSelectProvince,dataSelectPrice)
           
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvinces: dataSelectProvince,
            })
            }

    }   
    handleEditorChange = ({ html, text }) => {
        this.setState ({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => { 
        let {hasOldData} = this.state
        this.props.fetchPostDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUB_ACTIONS.EDIT : CRUB_ACTIONS.CREATE

        });
    }
    handleChange = async  (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
            contentHTML: event.target.value,
            contentMarkdown: event.target.value
        });
    }

    render() {
        
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id = "manage-doctor.title" />
                </div>
                <div className='more-info'>
                    <div className='more-info-content-left'>
                       <label><FormattedMessage id = "manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.lisDoctor}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='more-info-content-right'>
                         <label>
                            <FormattedMessage id = "manage-doctor.details" />
                        </label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value ={this.state.description}
                        >
                        </textarea>
                    </div>                  
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.nameclinic" /></label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 form-group'>
                        
                        <label><FormattedMessage id = "manage-doctor.choose-price" /></label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChange}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-price" />}
                        />
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.choose-payment" /></label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChange}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-payment" />}
                        />
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.choose-province" /></label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChange}
                            options={this.state.listProvinces}
                            placeholder={<FormattedMessage id = "manage-doctor.choose-province" />}
                        />
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.addressclinic" /></label>
                        <input className='form-control'/>
                    </div>
                    <div className='col-4 form-group'> 
                        <label><FormattedMessage id = "manage-doctor.note" /></label>
                        <input className='form-control'/>
                    </div>
                </div>
                <div className='manage-doctor-edit'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value ={this.state.contentMarkdown}
                    />
                </div>
                <button className='btn btn-primary'
                    onClick={()=> this.handleSaveContentMarkdown()}
                
                ><FormattedMessage id = "manage-doctor.save" />

                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        allData: state.admin.allData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getInforDoctor: () => dispatch(actions.getInforDoctor()),

        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchPostDoctor: (data) => dispatch(actions.fetchPostDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
