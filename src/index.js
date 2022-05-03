import React from 'react';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// reducer - 1
let 초기값 = [
  { id: 0, name: '멋진신발', quantity: 2 },
  { id: 1, name: '멋진신발2', quantity: 1 },
];

function reducer(state = 초기값, action) {
  if (action.type === '항목추가') {
    let found = state.findIndex((a) => {
      return a.id === action.데이터.id;
    });
    // 같은 id 있나 확인
    if (found >= 0) {
      let copy = [...state];
      copy[found].quantity++;
      return copy;
    } else {
      let copy = [...state];
      copy.push(action.데이터);
      return copy;
    }
  } else if (action.type === '수량증가') {
    let copy = [...state]; // 초기 state를 deep copy
    copy[action.데이터].quantity++;
    return copy;
  } else if (action.type === '수량감소') {
    let copy = [...state];
    copy[action.데이터].quantity--;
    return copy;
  } else {
    return state; // reducer는 반드시 state를 리턴해야 한다.
  }
}

// reducer - 2
let alert초기값 = true;
function reducer2(state = alert초기값, action) {
  if (action.type === 'alert닫기') {
    return false;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
