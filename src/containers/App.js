import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage/HomePage.js';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import InforDoctor from './Patient/Doctor/InforDoctor';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import EmailBook from './Patient/EmailBook';
import EmailBookCategory from './Patient/EmailBookCategory';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import DetailInforCategory from './Patient/InforCategory/DetailInforCategory';
import AllDoctor from './Patient/Doctor/AllDoctor/AllDoctor';
import AllClinic from './Patient/Clinic/AllClinic';
import DetailCategory from './Patient/Category/DetailCategory';
import AllSpecialty from './Patient/Specialty/AllSpecialty';
import AllInforCategory from './Patient/InforCategory/AllInforCategory';
import HomePageCategory from './Category/HomePageCategory';
// import EmialBook from './Patient/EmialBook';
// import ConfirmModal from '../components/ConfirmModal';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });

            }
        }
    };

    
    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style = {{height:'100vh', width:'100%'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGECATEGORY} component={HomePageCategory} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.ALL_DOCTOR} component={AllDoctor} />
                                    <Route path={path.ALL_CLINIC} component={AllClinic} />
                                    <Route path={path.ALL_SPECIALTY} component={AllSpecialty} />
                                    <Route path={path.ALL_INFORCATEGORY} component={AllInforCategory} />
                                    <Route path={path.INFOR_DOCTOR} component={InforDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CATEGORY} component={DetailCategory} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} /> 
                                    <Route path={path.INFOR_CATEGORY} component={DetailInforCategory} /> 
                                    <Route path={path.EMAIL_BOOKING} component={EmailBook} />
                                    <Route path={path.VERIFY_BOOKING_CATEGORY} component={EmailBookCategory} />
                                </Switch>
                            </CustomScrollbars> 
                            
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position='top-center'
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);