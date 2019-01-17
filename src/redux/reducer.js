const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
let users = JSON.parse(localStorage.getItem('users')) || [];

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}


/************ API's *****************/
export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    fetch('http://localhost:8081/api/users').then(response =>  response.json())
    .then(resData => {
      dispatch(setLoginPending(false));
      var found = resData.some(function (el) {
        return (el.email === email && el.password===password);
      });
      if(found) {
        var users = resData.find(obj => { return obj.email === email });
       // console.log(users);
        dispatch(setLoginSuccess(true));
        localStorage.setItem('user', JSON.stringify(users));
        
      } else {
        dispatch(setLoginError(new Error('Invalid email and password')));
      }
    });
  }
}
