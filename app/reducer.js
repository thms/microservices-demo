export const GET_USERS = 'app/users/LOAD';
export const GET_USERS_SUCCESS = 'app/users/LOAD_SUCCESS';
export const GET_USERS_FAIL = 'app/users/LOAD_FAIL';

export const GET_USER = 'app/user/LOAD';
export const GET_USER_SUCCESS = 'app/user/LOAD_SUCCESS';
export const GET_USER_FAIL = 'app/user/LOAD_FAIL';

export const GET_LOANS = 'app/loans/LOAD';
export const GET_LOANS_SUCCESS = 'app/loans/LOAD_SUCCESS';
export const GET_LOANS_FAIL = 'app/loans/LOAD_FAIL';

export const GET_LOAN = 'app/loan/LOAD';
export const GET_LOAN_SUCCESS = 'app/loan/LOAD_SUCCESS';
export const GET_LOAN_FAIL = 'app/loan/LOAD_FAIL';

export const POST_TOKEN = 'app/token/LOAD';
export const POST_TOKEN_SUCCESS = 'app/token/LOAD_SUCCESS';
export const POST_TOKEN_FAIL = 'app/token/LOAD_FAIL';

export function reducer(state = { users: [], loans: [], user: {}, loan: {}, token: null }, action) {
  switch (action.type) {
    case POST_TOKEN:
      return { ...state, loadingToken: true, token: null };
    case POST_TOKEN_SUCCESS:
      let token = action.payload.data.access_token;
      return { ...state, loadingToken: false, token: token };
    case POST_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        token: null,
        error: 'Error while fetching token'
      };
    case GET_USERS:
      return { ...state, loadingUsers: true, users: [] };
    case GET_USERS_SUCCESS:
      return { ...state, loadingUsers: false, users: action.payload.data.users };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: 'Error while fetching users'
      };
      case GET_USER:
        return { ...state, loadingUser: true, user: {} };
      case GET_USER_SUCCESS:
        return { ...state, loadingUser: false, user: action.payload.data };
      case GET_USER_FAIL:
        return {
          ...state,
          loading: false,
          user: {},
          error: 'Error while fetching users'
        };
        case GET_LOANS:
          return { ...state, loadingLoans: true, loans: [] };
        case GET_LOANS_SUCCESS:
          return { ...state, loadingLoans: false, loans: action.payload.data.loans };
        case GET_LOANS_FAIL:
          console.warn('failed to load loan')
          return {
            ...state,
            loading: false,
            loans: [],
            error: 'Error while fetching loans'
          };
          case GET_LOAN:
            return { ...state, loadingLoan: true, loan: {} };
          case GET_LOAN_SUCCESS:
            return { ...state, loadingLoan: false, loan: action.payload.data };
          case GET_LOAN_FAIL:
            return {
              ...state,
              loading: false,
              loan: {},
              error: 'Error while fetching loan'
            };
    default:
      return state;
  }
}

export function getAccessToken() {
  return {
    type: POST_TOKEN,
    payload: {
      request: {
        url: `/authentication-service/tokens`,
        method: 'post',
        data: {
          grant_type: 'client_credentials',
          client_id: 'mobile-app',
          client_secret: 'mobile-app-secret'
        }
      }
    }
  }
}
export function getUsers() {
  return {
    type: GET_USERS,
    payload: {
      request: {
        url: `/user-service/users`
      }
    }
  };
}

export function getUser(id) {
  return {
    type: GET_USER,
    payload: {
      request: {
        url: `/user-service/users/${id}`
      }
    }
  };
}

export function getLoans(token, borrowerId) {
  let url = ''
  if (borrowerId == null) {
    url = `/loan-service/loans`
  } else {
    url = `/loan-service/loans?borrower_id=${borrowerId}`
  }
  return {
    type: GET_LOANS,
    payload: {
      request: {
        url: url,
          headers: {
            Authorization: `Bearer ${token}`
          }

      }
    }
  };
}
export function getLoan(token, id) {
  return {
    type: GET_LOAN,
    payload: {
      request: {
        url: `/loan-service/loans/${id}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
      }
    }
  };
}
