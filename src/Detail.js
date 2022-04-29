/*eslint-disable*/

import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';
import { useEffect, useState } from 'react';

function Detail(props) {
  let history = useHistory();
  let { id } = useParams();

  // let 찾은상품 = props.prod.find(상품 => {
  //   return 상품.id == id;
  // });
  let 찾은상품 = props.prod.find((x) => x.id == id);

  let [alert, alert변경] = useState(true);
  let 타이머 = setTimeout(() => {
    alert변경(false);
    return () => {
      clearTimeout(타이머);
    };
  }, 2000);

  useEffect(() => {
    타이머;
  }, [alert]);

  return (
    <div className="container">
      {alert === true ? (
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>

          <p>재고 : ??</p>

          <button className="btn btn-danger">주문하기</button>
          <button
            onClick={() => {
              history.goBack();
            }}
            className="btn btn-danger">
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

function Info() {
  return <p>재고</p>;
}

export default Detail;
