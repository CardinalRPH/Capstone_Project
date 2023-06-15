import React from 'react';
import { Link } from 'react-router-dom';
import dava from '../../../public/images/team/dava.jpg';
import rayhan from '../../../public/images/team/rayhan.jpg';
import mila from '../../../public/images/team/mila.JPG';
import selvi from '../../../public/images/team/selvi.jpg';
// import '../../../styles/stylesLP.css';


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
                            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
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
                    <a className="btn btn-primary btn-xl text-uppercase" href="#about">Tell Me More</a>
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
            <section id="about" class="about">
              <div class="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">About Us</h2>
                        <h3 className="section-subheading text-muted" />
                    </div>
                <div class="row content">
                  <div class="col-lg-6">
                    <p>CropPlanner is an innovative platform specially designed to help farmers and plant lovers plan their plantings more efficiently. By providing up-to-date information on planting calendars, weather, and planting history, CropPlanner ensures that every step in the planting process can be executed with in-depth knowledge.</p>
                    <p>With CropPlanner, users can easily access a cropping calendar that is updated in real-time, so they know the best time to plant each type of crop. Accurate weather information is also provided, so farmers can take into account factors such as temperature, rainfall, and humidity to maximize their yields.</p>
                    <p>One of the great features of CropPlanner is access to planting history data. Users can view past records of plantings made in their area, including the type of crops planted, when they were planted, and yields achieved. This information is invaluable in identifying patterns and trends that may affect the success of future plantings.</p>
                  </div>
                  <div class="col-lg-6 pt-4 pt-lg-0">
                    <p>
                    Not only that, CropPlanner also provides practical tips and tricks for caring for plants properly. From proper watering to effective fertilization, users can find a comprehensive guide to keeping their plants healthy and thriving all year round.
                    </p>
                    <p>With CropPlanner, we are committed to providing our users with a better understanding of the agricultural environment. We believe that with the right information and the right tools, every farmer and plant lover can achieve better yields and improve their quality of life.</p>
                    <p>Join CropPlanner today and explore a world of planting full of potential!</p>
                    <a href="i/login" class="btn-learn-more">Join Us!</a>
                  </div>
                </div>

              </div>
            </section>
            {/* Team*/}
            <section className="page-section bg-light text-center" id="team">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                        <h3 className="section-subheading text-muted">A good team is not a team that has the same abilities but a team that complements each other.</h3>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4">
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
