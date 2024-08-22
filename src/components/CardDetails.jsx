import React from "react";

export default function CardDetails(props) {
    let{url_image,title,description,price,createdAt}=props.info.attributes
  return (
    <>
      <section className="Details d-flex align-items-center">
        <div className="container">
          <div className="wrapper-card-details">
            <div className="row justify-content-center align-items-center ">
              <div className="col-md-8">
                <div className="wrapper-card flex-column flex-md-row">
                  <div className="wrapper-image ">
                    <img src={url_image} alt="" />
                  </div>
                  <div className="details-card ">
                    <div>
                      <h2 className="title-card">{title}</h2>
                      <p className="des-card">{description}</p>
                    </div>
                    <div className="autor-date">
                      <h3 className="autor-card">
                        By {price}
                      </h3>
                      <div className="date-time">
                        <h4 className="date-card">
                          {createdAt.slice(0, 10)}
                        </h4>
                        <h4 className="time-card">
                          {createdAt.slice(11, 16)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
