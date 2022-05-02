import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map(function (n, i) {
            return (
              <tr key={i}>
                <td>{n.id}</td>
                <td>{n.name}</td>
                <td>{n.quantity}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      props.dispatch({ type: '수량증가', 데이터: n.id }); // 클릭한 데이터의 아이디를 reducer로 보내줌
                    }}>
                    +
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      props.dispatch({ type: '수량감소', 데이터: n.id });
                    }}>
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alert === true ? (
        <div className="my-alert2">
          <p>지금 구매하시면 20% 할인</p>
          <button
            onClick={() => {
              props.dispatch({ type: 'alert닫기' });
            }}>
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

function stateToProps(state) {
  return {
    // redux.store안에 있는 data를 가져와서 props로 변환해주는 함수
    // state 중에 name이라는 데이터가 있으면 상품명이라는 props로 변환
    // state를 props로 바꿔주기
    state: state.reducer,
    alert: state.reducer2,
  };
}

export default connect(stateToProps)(Cart);
