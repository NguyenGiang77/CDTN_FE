import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'; 
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select';
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
            hasOldData: false

            
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
    }
    buildDataCombobox = (inputdata) => { 
        let result = [];
        let {language} = this.props;
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelVn = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVn : labelEn;
                object.value = item.id;
                result.push(object);

            })
           
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataCombobox(this.props.allDoctor)
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
    handleChange = async  selectedDoctor => {
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
            description: event.target.value
            
        });
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    hahaa
                </div>
                <div className='more-info'>
                    <div className='more-info-content-left'>
                       <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.lisDoctor}
                        />
                    </div>
                    <div className='more-info-content-right'>
                         <label>
                            Thông tin giới thiệu
                        </label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value ={this.state.description}
                        >

                        </textarea>
                        
                    </div>
                    
                </div>
                <div className='manage-doctor-edit'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={ this.handleEditorChange } />
                </div>
                <button className='btn btn-primary'
                    onClick={()=> this.handleSaveContentMarkdown()}
                
                >Lưu thông tin

                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchPostDoctor: (data) => dispatch(actions.fetchPostDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
