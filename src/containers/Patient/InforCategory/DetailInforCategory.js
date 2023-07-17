import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailInforCategory.scss';
import CategoryExtraInfor from './CategoryExtraInfor';
import { LANGUAGES } from '../../../utils';
import {getDetailInforCategoryById} from '../../../services/userService';
class DetailInforCategory extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            inforCategory: {},
            currentInforCategoryId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) { 
            let id = this.props.match.params.id;
            this.setState({
                currentInforCategoryId: id
            });
            let res = await getDetailInforCategoryById({id:id});
            if (res && res.errCode === 0)
            {
                this.setState({
                    inforCategory: res.data,                   
                })
            }
        }
    }
    //để biets được khi nào prop thay đổi
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { language } = this.props;
        let { inforCategory } = this.state;
        console.log('h',inforCategory)
        let nameVn = ''
            nameVn = inforCategory.name;
        
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='infor-doctor-container'>
                    <div className='infor-doctor-content'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${inforCategory.image ? inforCategory.image: ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {nameVn}
                            </div>
                            <div className='down'>
                                    <span>
                                        {inforCategory.description}
                                    </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                        </div>
                        <div className='content-right'>
                            <CategoryExtraInfor
                                inforCategoryCheck = {this.state.currentInforCategoryId}
                            />
                        </div> 
                    </div>
                    <div className='detail-infor-doctor'>

                            <div dangerouslySetInnerHTML={{ __html: inforCategory.inforCategoryHTML }}>
                                
                            </div>
                    </div>
                    <div className="comment-doctor">
                        
                    </div>
                </div>
            </>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailInforCategory);
