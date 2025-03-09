import {createStore} from "redux";

const modalVisible = createStore((state = false, action)=>{
    switch (action.type) {
        case 'SHOW':
            return true;
        default:
            return false;
    }
});

export default modalVisible;
