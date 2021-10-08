import * as ActionType from './ActionType';
export const Leaders=(state={
    isLoading:true,
    leaders:[],
    errMess:null
},actions)=>{
    switch(actions.type){
        case ActionType.LEADERS_LOADING:
            return {...state,isLoading:true,leaders:[],errMess:null};
        case  ActionType.ADD_LEADERS:
            return {...state,isLoading:false,leaders:actions.payload,errMess:null};
        case ActionType.LEADERS_FAILED:
            return {...state,isLoading:false,leaders:[],errMess:actions.payload};
        default:return state;
    }
}