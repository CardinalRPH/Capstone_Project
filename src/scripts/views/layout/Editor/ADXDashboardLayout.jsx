import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthVar } from '../../../../globals/config';
import ErrorModal1 from '../../compoents/ErrorModal1';
import { authActionADX } from '../../../stores/ADXauthReducer';
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"
import SuccessModal from '../../compoents/SuccessModal';
import ErrorModal2 from '../../compoents/ErrorModal2';
import Loader from '../../compoents/Loader';

const ADXDashboardLayout = () => {
    const [Name, setName] = useState([]);
    const { isAuthenticatedADX } = useSelector((state) => state.authADX)

    const dispatch = useDispatch();

    const getEditorInfo = () => {
        fetch(AuthVar.forGetEditorInfo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
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

    const sidehandleToggle = () => {
        document.body.classList.toggle('sidebar-toggled');
        document.querySelector('.sidebar').classList.toggle('toggled');
        if (document.querySelector('.sidebar').classList.contains('toggled')) {
            document.querySelectorAll('.sidebar .collapse').forEach(function (el) {
                el.classList.remove('show');
            });
        }
    }

    const CheckToken = () => {
        fetch(AuthVar.checkJwtEditor, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
            }
        })
            .then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok == false) {
                    ExpiredShow();
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const ExpiredShow = () => {
        const myModal = new Modal(document.getElementById('ErrorModal1'));
        myModal.show();
    }

    const LogOut = () => {
        dispatch(authActionADX.logout());
        window.location.href = "/e/login";
    }

    const TExpired = () => {
        dispatch(authActionADX.logout());
    }

    useEffect(() => {
        if (isAuthenticatedADX) {
            CheckToken();
            getEditorInfo();
        }
    }, []);

    return (
        <>
            <Loader />
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    {/* Sidebar - Brand */}
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/e/dashboard">
                        <div className="sidebar-brand-icon rotate-n-15">
                            {/* <i className="fas fa-laugh-wink" /> */}
                        </div>
                        <div className="sidebar-brand-text mx-3" style={{ width: '18rem' }}>CropPlanner</div>
                    </a>
                    {/* Divider */}
                    <h6 className='text-center text-warning'>Editor Panel</h6>
                    <hr className="sidebar-divider my-0" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <Link className="nav-link" to="/e/dashboard">
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
                        <Link className="nav-link" to="/e/dashboard/users">
                            <i className="fa-solid fa-users"></i>
                            <span>Users</span>
                        </Link>
                    </li>
                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/e/dashboard/content">
                            <i className="fa-solid fa-newspaper"></i>
                            <span>Content</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/e/dashboard/plants">
                            <i className="fa-solid fa-seedling"></i>
                            <span>Plants</span></Link>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block" />
                    {/* Sidebar Toggler (Sidebar) */}
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" onClick={sidehandleToggle} id="sidebarToggle" />
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
                            <button id="sidebarToggleTop" onClick={sidehandleToggle} className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars" />
                            </button>
                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                {/* Nav Item - Alerts */}
                                {/* Nav Item - Messages */}
                                <div className="topbar-divider d-none d-sm-block" />
                                {/* Nav Item - User Information */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{Name}</span>
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
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
        </>


    );

}

export default ADXDashboardLayout;