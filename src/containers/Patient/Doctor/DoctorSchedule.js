import React, { Component } from 'react';
import { connect } from "react-redux";
// import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
class DoctorSchedule extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            allDays: [],
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        console.log(moment(new Date()).format('dddd - DD/MM')); // tieng viet, thứ trong tiếng việt có dạng dddd
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM')); // tieng anh. thứ trong tiếng anh có dạng ddd
        let allDays = []
        for (let i = 0; i < 7; i++){
            let object = {};
            if (language === LANGUAGES.VI) { 
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');               
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        console.log(allDays)
        this.setState = ({
            allDays: allDays
        })
    }

    //để biets được khi nào prop thay đổi
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { 
            let allDays = []
            for (let i = 0; i < 7; i++){
                let object = {};
                if (this.props.language === LANGUAGES.VI) { 
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');               
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                allDays.push(object);
            }
            console.log(allDays)
            this.setState = ({
                allDays: allDays
            })
        }
    }
    render() {
        let{allDays} = this.state;
        return (
          
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select>
                        {allDays && allDays.length > 0
                            && allDays.map((item,index) => {
                                return (
                                    <option
                                        value={item.value} 
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                        
                    </select>
                </div>
                <div className='all-time'>
                    
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
