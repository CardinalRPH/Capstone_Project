import React from 'react';
import { Link } from 'react-router-dom';
import dava from '../../../public/images/team/dava.jpg';
import rayhan from '../../../public/images/team/rayhan.jpg';
import mila from '../../../public/images/team/mila.JPG';
import selvi from '../../../public/images/team/selvi.jpg';

const LandingPage = () => {
    return (<>

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="#page-top">
                        <h2>CropPlanner</h2></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                            <li className="nav-item"><a className="nav-link" href="#team">Team</a></li>
                            <li className="nav-item"><Link className="nav-link" to="/i/login">SignUp / Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Masthead*/}
            <header className="masthead">
                <div className="container">
                    <div className="masthead-subheading">Welcome To CropPlanner!</div>
                    <div className="masthead-heading text-uppercase">It's Nice To Plan a Planting!</div>
                    <a className="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
                </div>
            </header>
            {/* Services*/}
            <section className="page-section" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Services</h2>
                        <h3 className="section-subheading text-muted" />
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-success" />
                                <i className="fas fa-calendar-check fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Planner</h4>
                            <p className="text-muted">schedule / schedule your planting now</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-success" />
                                <i className="fas fa-clock fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">History</h4>
                            <p className="text-muted">see your plant history here</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-success" />
                                <i className="fas fa-cloud-sun fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Weather Information</h4>
                            <p className="text-muted">information about the weather in your place</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* About*/}
            <section className="page-section" id="about">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">About</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <ul className="timeline">
                        <li>
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/1.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>2009-2011</h4>
                                    <h4 className="subheading">Our Humble Beginnings</h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/2.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>March 2011</h4>
                                    <h4 className="subheading">An Agency is Born</h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/3.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>December 2015</h4>
                                    <h4 className="subheading">Transition to Full Service</h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/4.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>July 2020</h4>
                                    <h4 className="subheading">Phase Two Expansion</h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image">
                                <h4>
                                    Be Part
                                    <br />
                                    Of Our
                                    <br />
                                    Story!
                                </h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            {/* Team*/}
            <section className="page-section bg-light" id="team">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                        <h3 className="section-subheading text-muted">A good team is not a team that has the same abilities but a team that complements each other.</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-4-center">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle" src={rayhan} alt="..." />
                                <h4>Rayhan Febriyan Saputra</h4>
                                <p className="text-muted">Lead Project &amp; Back End Developer</p>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.instagram.com/_reean/" aria-label="Parveen Anand Twitter Profile"><i className="fab fa-instagram" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/rayhan-febriyan-saputra-945a05162/" aria-label="Parveen Anand LinkedIn Profile"><i className="fab fa-linkedin-in" /></a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle" src={dava} alt="..." />
                                <h4>Dava Attabrani</h4>
                                <p className="text-muted">Front End Developer</p>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.instagram.com/davaattabrani/" aria-label="Parveen Anand Twitter Profile"><i className="fab fa-instagram" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/dava-attabrani-b584b0267/" aria-label="Parveen Anand LinkedIn Profile"><i className="fab fa-linkedin-in" /></a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle" src={selvi} alt="..." />
                                <h4>Selvi Jenifer Ezenwune</h4>
                                <p className="text-muted">Front End Developer</p>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.instagram.com/selvijenifer11/" aria-label="Diana Petersen Twitter Profile"><i className="fab fa-instagram" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/selvi-jenifer-57b455235/" aria-label="Diana Petersen LinkedIn Profile"><i className="fab fa-linkedin-in" /></a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle" src={mila} alt="..." />
                                <h4>Mila Yuliani</h4>
                                <p className="text-muted">UI/UX Developer</p>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.instagram.com/_mila.yyy/" aria-label="Parveen Anand Twitter Profile"><i className="fab fa-instagram" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/mila-yuliani-67b2ba218/" aria-label="Parveen Anand LinkedIn Profile"><i className="fab fa-linkedin-in" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center"><p className="large text-muted"></p></div>
                    </div>
                </div>
            </section>
            {/* Footer*/}
            <footer className="footer py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-lg-start">Copyright © CropPlanner 2023</div>
                        <div className="col-lg-4 text-lg-end">
                            <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                            <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    </>
    );
}

export default LandingPage;
