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

export default function reducer(state = { users: [], loans: [], user: {}, loan: {} }, action) {
  switch (action.type) {
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

export function getLoans(borrowerId) {
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
        url: url
      }
    }
  };
}
export function getLoan(id) {
  return {
    type: GET_LOAN,
    payload: {
      request: {
        url: `/loan-service/loans/${id}`
      }
    }
  };
}
