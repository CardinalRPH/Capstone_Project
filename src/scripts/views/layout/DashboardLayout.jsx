import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../stores/authReducer';
import { AuthVar } from '../../../globals/config';
import ErrorModal1 from '../compoents/ErrorModal1';
import SuccessModal from '../compoents/SuccessModal';
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"
import ErrorModal2 from '../compoents/ErrorModal2';
import Loader from '../compoents/Loader';

const DashboardLayout = () => {
    const [Name, setName] = useState([]);
    const { isAuthenticated } = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    const ExpiredShow = () => {
        const myModal = new Modal(document.getElementById('ErrorModal1'));
        myModal.show();
    }

    
    const getUserInfo = () => {
        fetch(AuthVar.forGetUserInfo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        })
            .then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok && (resolve.data != false)) {
                    setName(resolve.data.Fname)
                }
            }).catch((error) => {
                console.log(error);
            })
    }


    const CheckToken = () => {
        fetch(AuthVar.checkJwt, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        })
            .then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok == false) {
                    ExpiredShow();
                } else {
                    getUserInfo();
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const LogOut = () => {
        dispatch(authAction.logout());
        window.location.href = "/i/login";
    }

    const TExpired = () => {
        dispatch(authAction.logout());
    }

    useEffect(() => {
        if (isAuthenticated) {
            CheckToken();
        }
    }, []);

    return (
        <div>
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    {/* Sidebar - Brand */}
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-icon rotate-n-15">
                            {/* <i className="fas fa-laugh-wink" /> */}
                        </div>
                        <div className="sidebar-brand-text mx-3" style={{ width: '18rem' }}>CropPlanner</div>
                    </a>
                    {/* Divider */}
                    <hr className="sidebar-divider my-0" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fa-solid fa-chart-line"></i>
                            <span>Dashboard</span></Link>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider" />
                    {/* Heading */}
                    <div className="sidebar-heading">
                        Interface
                    </div>
                    {/* Nav Item - Pages Collapse Menu */}
                    {/* Divider */}
                    <hr className="sidebar-divider" />
                    {/* Heading */}
                    {/* Nav Item - Charts */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard/planner">
                            <i className="fa-regular fa-calendar"></i>
                            <span>Planner</span>
                        </Link>
                    </li>
                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard/tips">
                            <i className="fa-regular fa-lightbulb"></i>
                            <span>Tips & Trick</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard/history">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <span>History</span></Link>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block" />
                    {/* Sidebar Toggler (Sidebar) */}
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle" />
                    </div>
                    {/* Sidebar Message */}
                </ul>
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Sidebar Toggle (Topbar) */}
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars" />
                            </button>
                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw" />
                                    </a>
                                    {/* Dropdown - Messages */}
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                {/* Nav Item - Alerts */}
                                {/* <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw" />
                                        Counter - Alerts
                                        <span className="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    Dropdown - Alerts
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                                        <h6 className="dropdown-header">
                                            Alerts Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-primary">
                                                    <i className="fas fa-file-alt text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-success">
                                                    <i className="fas fa-donate text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 7, 2019</div>
                                                $290.29 has been deposited into your account!
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-warning">
                                                    <i className="fas fa-exclamation-triangle text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 2, 2019</div>
                                                Spending Alert: We've noticed unusually high spending for your account.
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                    </div>
                                </li> */}
                                {/* Nav Item - Messages */}
                                <div className="topbar-divider d-none d-sm-block" />
                                {/* Nav Item - User Information */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{Name}</span>
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <Link className="dropdown-item" to="/dashboard/profile">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                            Profile
                                        </Link>
                                        <div className="dropdown-divider" />
                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            <Outlet />
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © CropPlanner 2023</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
            {/* Logout Modal*/}
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" onClick={LogOut}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bootstrap core JavaScript*/}
            {/* Core plugin JavaScript*/}
            {/* Custom scripts for all pages*/}
            {/* Page level plugins */}
            {/* Page level custom scripts */}
            <ErrorModal1 FuClick={TExpired} />
            <SuccessModal />
            <ErrorModal2 />
            <Loader />
        </div>


    );

}

export default DashboardLayout;