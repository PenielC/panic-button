import{
REGISTER_REQUEST,
REGISTER_FAILED,
REGISTER_SUCCESSFUL,
LOGIN_REQUEST,
LOGIN_FAILED,
LOGIN_SUCCESSFUL 
} from "../actions/auth";

interface Action {
  type: string;
  payload: any;
}
interface State {
  data: any[];
  loading: boolean;
}

const intialState = {
  data: [],
  loading: false
};

export const registerReducer = (state: State = intialState, action: Action) => {
  switch (action.type) {
    case REGISTER_FAILED:
      return {
        ...state,
        data: action.payload
      };
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        data: [action.payload]
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};


export const loginReducer = (state: State = intialState, action: Action) => {
    switch (action.type) {
      case LOGIN_SUCCESSFUL:
        return {
          ...state,
          data: action.payload
        };
      case LOGIN_FAILED:
        return {
          ...state,
          data: [action.payload]
        };
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: action.payload
        };
      default:
        return state;
    }
  };

