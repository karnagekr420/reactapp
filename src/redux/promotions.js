import * as ActionType from './ActionType';
export const Promotions=(state={
    isLoading:true,
    errMess:null,
    promotions:[]
},actions)=>{
    switch(actions.type){
        case ActionType.PROMOS_LOADING:
            return {...state,isLoading:true,promotions:[],errMess:null};
        case ActionType.ADD_PROMOS:
            return {...state,isLoading:false,errMess:null,promotions:actions.payload};
        case ActionType.PROMOS_FAILED:
            return {...state,isLoading:false,errMess:actions.payload,promotions:[]};
        default:return state;
    }
}