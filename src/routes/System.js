import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
// import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import Header from '../containers/Header/Header';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageCategory from '../containers/System/Category/ManageCategory';
import ManageInforCategory from '../containers/System/Package/ManageInforCategory';
import ManageAllcode from '../containers/System/Allcode/ManageAllcode';
import SchecduleInforCategory from '../containers/System/Package/SchecduleInforCategory';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
class System extends Component {
    render() {
       
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header /> }
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/specialty-manage" component={ManageSpecialty} />
                            <Route path="/system/clinic-manage" component={ManageClinic} />
                            <Route path="/system/category-manage" component={ManageCategory} />
                            <Route path="/system/package-manage" component={ManageInforCategory} />
                            <Route path="/system/allcode-manage" component={ManageAllcode} />
                            <Route path="/system/schecdule-category" component={SchecduleInforCategory} />
                            <Route path="/system/manage-schedule" component={ManageSchedule} />
                            {/* <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} /> */}
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            
                            
                        </Switch>
                    </div>
                </div>
                </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
