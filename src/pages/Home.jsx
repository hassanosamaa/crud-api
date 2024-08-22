import axios from "axios";
import React, { useEffect, useState } from "react";
import news from "../../src/assets/news.png";
import { useSelector } from "react-redux";
import CardHome from "../components/CardHome";

export default function Home() {
  let [data, setData] = useState([]);
  let { dataRedux, stateSearch } = useSelector((state) => state.SearchReduc);

  function showData() {
    let data_search = [];
    dataRedux[0]?.map((ele) => data_search.push(ele));

    {
      stateSearch
        ? setData(data_search)
        : axios.get(`${import.meta.env.VITE_API_URL}/products`).then((res) => {
            setData(res.data.data);
          });
    }
  }

  useEffect(() => {
    showData();
  }, [dataRedux]);

  return (
    <>
      <section className="show">
        <div className="container">
          <div className="wrapper-card-show">
            <div className="row g-4 justify-content-center ">
              {data?.length !== 0 ? (
                data?.map((e, i) => <CardHome key={i} info={e} />)
              ) : (
                <div className="spinner ">
                  <img src={news} alt="no-content" />\
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
