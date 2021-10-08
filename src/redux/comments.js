import * as ActionTypes from './ActionType';
export const Comments=(state={
    errMess:null,
    comments:[]
},actions)=>{
    switch(actions.type){
        case ActionTypes.ADD_COMMENT:
            var comment=actions.payload;
            return {...state,comments:state.comments.concat(comment)};
        case ActionTypes.ADD_COMMENTS:
            return {...state,errMess:null,comments:actions.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state,errMess:actions.payload,comments:[]};
        default:return state;
    }
}