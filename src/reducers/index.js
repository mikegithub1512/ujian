import {combineReducers} from 'redux'

const init ={
    id:'',
    username:'',
    error:'',
    success:'',
    addedItem:[],
    total:0
   
}

const AuthReducer = (state= init, action)=>{
    // boleh menggunakan if / switch, tapi utk reducer lebih umum menggunakan switch

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, id: action.payload.id, username: action.payload.username}
        
        case 'TIMEOUT':
            return{...state, error:'', success:''}

        case 'LOGOUT':
            return {...state, ...init}

        case 'AUTH_ERROR':
            return {...state, error:action.payload, success:''}

        case 'AUTH_SUCCESS':
        return {...state,error:'', success:action.payload}

        case 'ADD_TO_CART':
        return {...state, id:action.payload.id}

        default:
           return state

    }
}

export default combineReducers(
    {
        auth: AuthReducer
    }
)