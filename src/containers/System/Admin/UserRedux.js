import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { getAllCodeService } from '../../../services/userService';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            
        }
     }

    async componentDidMount() {
        this.props.getGenderStart();
        
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0)
        //     {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //         }
        //     console.log(res);
            
        // } catch (e) {
        //     console.log(e);
        // }
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState,snapshot) { 
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            });
            //
        }
    }
    render() {
        console.log(this.state);
        let genders = this.state.genderArr;
        let language = this.props.language;
        console.log('genderRedux', this.props.genderRedux);
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id ="manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.email" /></label>
                                <input className="form-control" type='email'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.password" /></label>
                                <input className="form-control" type='password'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.last" /></label>
                                <input className="form-control" type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.first" /></label>
                                <input className="form-control" type='text'/>
                            </div>
                            
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.phone" /></label>
                                <input className="form-control" type='text'/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id ="manage-user.address" /></label>
                                <input className="form-control" type='text'/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.gender" /></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>{
                                                    language === LANGUAGES.VI ? item.valueVN : item.valueEN}</option>
                                            )
                                         })
                                    }
                                    
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.position" /></label>
                                <select  className="form-control">

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.roleid" /></label>
                                <select  className="form-control">

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id ="manage-user.image" /></label>
                                <input type='text' className='form-control'/>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id ="manage-user.save" /></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        
        language: state.app.language,
        genderRedux: state.admin.genders // truyền tham số genders từ reducer vào react

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:() => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
