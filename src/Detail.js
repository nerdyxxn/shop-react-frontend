/*eslint-disable*/

import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { 재고context } from './App.js';

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [누른탭, 누른탭변경] = useState(0);
  let 재고 = useContext(재고context);
  let history = useHistory();
  let { id } = useParams();

  // let 찾은상품 = props.prod.find(상품 => {
  //   return 상품.id == id;
  // });
  let 찾은상품 = props.prod.find((x) => x.id == id);

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
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>

          <Info 재고={props.재고}></Info>

          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 11, 12]);
            }}>
            주문하기
          </button>
          <button
            onClick={() => {
              history.goBack();
            }}
            className="btn btn-danger">
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0);
            }}>
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              누른탭변경(1);
            }}>
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent 누른탭={누른탭} />
    </div>
  );
}

function TabContent(props) {
  if (props.누른탭 === 0) {
    return <div>0번째 내용입니니다</div>;
  } else if (props.누른탭 === 1) {
    return <div>1번째 내용입니니다</div>;
  } else if (props.누른탭 === 2) {
    return <div>2번째 내용입니니다</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.재고[0]}</p>;
}

export default Detail;
