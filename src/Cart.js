import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>

        {props.state.map(function (n, i) {
          return (
            <tr key={i}>
              <td>{n.id}</td>
              <td>{n.name}</td>
              <td>{n.quantity}</td>
              <td>변경</td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}

function stateToProps(state) {
  return {
    // redux.store안에 있는 data를 가져와서 props로 변환해주는 함수
    // state 중에 name이라는 데이터가 있으면 상품명이라는 props로 변환
    // state를 props로 바꿔주기
    state: state,
  };
}

export default connect(stateToProps)(Cart);
