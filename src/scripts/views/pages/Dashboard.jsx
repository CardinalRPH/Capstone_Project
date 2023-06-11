import React from "react";

const Dashboard_pg = () => {
    const recentData = [
        { id: 1, title: "Lorem Ipsum", date: "2023-06-09" },
        { id: 2, title: "Dolor Sit Amet", date: "2023-06-08" },
        { id: 3, title: "Consectetur Adipiscing", date: "2023-06-07" },
        { id: 4, title: "Pellentesque Euismod", date: "2023-06-06" },
        { id: 5, title: "Fusce Tristique", date: "2023-06-05" },
      ];
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <section className="vh-10">
        <div className="container py-1 h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-md-6">
              <div
                className="card"
                style={{
                  color: "#4B515D",
                  borderRadius: "35px",
                  backgroundImage:
                    'url("https://res.cloudinary.com/dxfq3iotg/image/upload/v1557323760/weather.svg")',
                  backgroundSize: "cover",
                }}
              >
                <div className="card-body p-4">
                <h5>Cuaca Terkini</h5>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-location-dot mr-2" />
                    <h6 className="flex-grow-1 mb-0">West Jakarta</h6>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                      alt=""
                      width="80px"
                    />
                  </div>
                  <div className="d-flex flex-column text-center mt-5 mb-4 ">
                    <h6
                      className="display-4 mb-0 font-weight-bold"
                      style={{ color: "#1C2331" }}
                    >
                      15:07 PM
                    </h6>
                    <span className="small" style={{ color: "#868B94" }}>
                      Wednesday, 17 June 2023
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                      <div>
                        <i
                          className="fas fa-wind fa-fw"
                          style={{ color: "#868B94" }}
                        />
                        <span className="ms-1">40 km/h</span>
                      </div>
                      <div>
                        <i
                          className="fas fa-tint fa-fw"
                          style={{ color: "#868B94" }}
                        />
                        <span className="ms-1">84%</span>
                      </div>
                      <div>
                        <i
                          className="fas fa-sun fa-fw"
                          style={{ color: "#868B94" }}
                        />
                        <span className="ms-1">0.2h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mt-2">
        <div className="card" style={{ borderRadius: "35px" }}>
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontSize: "1.5rem", color: "#012970" }}
            >
              History
            </h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      </div>
      </section>

      <div className="col-md-6 mt-2">
        <div className="card" style={{ borderRadius: "35px" }}>
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontSize: "1.5rem", color: "#012970" }}
            >
              News & Updates | Today
            </h5>
            <div className="news">
            <div className="post-item clearfix">
                      <div className="d-flex align-items-center">
                        <img src="https://amtast.id/wp-content/uploads/padi-compressed.jpg" alt="" style={{ width: "80px", marginRight: "10px" }}/>
                        <div>
                          <h4 style={{ fontSize: "1.2rem" }}>
                            <a href="#" style={{ color: "#012970", textDecoration: "none" }}>
                              Nihil blanditiis at in nihil autem
                            </a>
                          </h4>
                          <p>
                            Sit recusandae non aspernatur laboriosam. Quia enim
                            eligendi sed ut harum...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="post-item clearfix">
                      <div className="d-flex align-items-center">
                        <img
                          src="https://amtast.id/wp-content/uploads/padi-compressed.jpg"
                          alt=""
                          style={{ width: "80px", marginRight: "10px" }}
                        />
                        <div>
                          <h4 style={{ fontSize: "1.2rem" }}>
                            <a href="#" style={{ color: "#012970", textDecoration: "none" }}>
                              Quidem autem et impedit
                            </a>
                          </h4>
                          <p>
                            Illo nemo neque maiores vitae officiis cum eum turos
                            elan dries werona nande...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="post-item clearfix">
                      <div className="d-flex align-items-center">
                        <img
                          src="https://amtast.id/wp-content/uploads/padi-compressed.jpg"
                          alt=""
                          style={{ width: "80px", marginRight: "10px" }}
                        />
                        <div>
                          <h4 style={{ fontSize: "1.2rem" }}>
                            <a href="#" style={{ color: "#012970", textDecoration: "none" }}>
                              Id quia et et ut maxime similique occaecati ut
                            </a>
                          </h4>
                          <p>
                            Fugiat voluptas vero eaque accusantium eos.
                            Consequuntur sed ipsam et totam...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="post-item clearfix">
                      <div className="d-flex align-items-center">
                        <img
                          src="https://amtast.id/wp-content/uploads/padi-compressed.jpg"
                          alt=""
                          style={{ width: "80px", marginRight: "10px" }}
                        />
                        <div>
                          <h4 style={{ fontSize: "1.2rem" }}>
                            <a href="#" style={{ color: "#012970", textDecoration: "none" }}>
                              Laborum corporis quo dara net para
                            </a>
                          </h4>
                          <p>
                            Qui enim quia optio. Eligendi aut asperiores enim
                            repellendusvel rerum cuder...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="post-item clearfix">
                      <div className="d-flex align-items-center">
                        <img
                          src="https://amtast.id/wp-content/uploads/padi-compressed.jpg"
                          alt=""
                          style={{ width: "80px", marginRight: "10px" }}
                        />
                        <div>
                          <h4 style={{ fontSize: "1.2rem" }}>
                            <a href="#" style={{ color: "#012970", textDecoration: "none" }}>
                              Et dolores corrupti quae illo quod dolor
                            </a>
                          </h4>
                          <p>
                            Odit ut eveniet modi reiciendis. Atque cupiditate
                            libero beatae dignissimos eius...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
    </>
  );
};

export default Dashboard_pg;
