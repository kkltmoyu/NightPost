import { SHOWMODAL, HIDEMODAL } from '../constants'

function switchModal(state = { visable: false, innerComponentType: 'login' }, action) {
    //console.log('switchModal in reducers,state is ', state, 'action is ', action);
    if (action.type === SHOWMODAL) {
        return { visable: true,innerComponentType:action.data,title:action.title }
        //return Object.assign({},state,{visable: true,innerComponentType:action.data,title:action.title})
    } else if (action.type === HIDEMODAL) {
        return { visable: false }
    }
    return state
}

export default switchModal
