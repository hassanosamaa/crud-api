import React from "react";
import { Link } from "react-router-dom";

export default function CardHome(props) {
  let { title, description, price, url_image, createdAt } =
    props.info.attributes;
  return (
    <>
      <div className="col-10 col-md-6 col-lg-3">
        <div className="wrapper-card">
          <Link to={`/${props.info.id}`} className="wrapper-image">
            <img src={url_image} alt="" />
          </Link>
          <div className="details-card">
            <div>
              <h2 className="title-card">{title}</h2>
              <p className="des-card">{description}</p>
            </div>
            <div className="autor-date">
              <h3 className="autor-card">By {price}</h3>
              <div className="date-time">
                <h4 className="date-card">{createdAt.slice(0, 10)}</h4>
                <h4 className="time-card">{createdAt.slice(11, 16)}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
