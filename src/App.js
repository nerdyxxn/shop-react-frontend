/*eslint-disable*/

import React, { useState, useContext } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Jumbotron,
} from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail';
import Cart from './Cart';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

export let 재고context = React.createContext();

function App() {
  let [prod, prod변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12, 13, 14, 15]);
  let [shoesAll, setShoesAll] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">yungShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route exact path="/">
        <div className="background">
          <h1>20% Season Off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button>Learn more</Button>
          </p>
        </div>

        <div className="container">
          <재고context.Provider value={재고}>
            <div className="row">
              {prod.map((a, i) => {
                return <Card prod={prod[i]} i={i} key={i} />;
              })}
            </div>
            <Watched shoesAll={shoesAll} setShoesAll={setShoesAll}></Watched>
          </재고context.Provider>
          <button
            className="btn btn-primary"
            onClick={() => {
              axios
                .get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  console.log(result.data);
                  prod변경([...prod, ...result.data]);
                })
                .catch(() => {
                  console.log('Ajax 통신 실패!');
                });
            }}>
            더보기
          </button>
        </div>
      </Route>

      <Route path="/detail/:id">
        <재고context.Provider value={재고}>
          <Detail prod={prod} 재고={재고} 재고변경={재고변경} />
        </재고context.Provider>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);

  return (
    <div
      className="col-md-4"
      onClick={() => {
        window.location.href = '/detail/' + props.i;
      }}>
      {/* <img src={require('./prod0' + (props.i + 1) + '.jpeg')} /> */}
      <img
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'
        }
        width="100%"
      />
      <h4>{props.prod.title}</h4>
      <p>{props.prod.content}</p>
      <p>{props.prod.price}</p>
      <p>재고 : {재고[props.i]}</p>
    </div>
  );
}

function Watched(props) {
  let watchedAll = JSON.parse(localStorage.getItem('watched'));
  let findWatched = [];
  if (watchedAll !== null) {
    for (let i = 0; i < watchedAll.length; i++) {
      findWatched.push(
        props.shoesAll.find(function (item) {
          return item.id === parseInt(watchedAll[i]);
        }),
      );
    }
  }

  let history = useHistory();

  return (
    <div className="watched">
      <p className="item">최근 본 상품</p>
      {findWatched.map((watched, idx) => {
        return (
          <div
            className="watched-item"
            key={idx}
            onClick={() => {
              history.push(`/detail/${watched.id}`);
            }}>
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                watched.id + 1
              }.jpg`}
              alt="item"
            />
            <p className="name">{watched.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
