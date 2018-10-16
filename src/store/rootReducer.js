import { combineReducers } from 'redux';

import auth from './reducers/auth';
import ui from './reducers/ui';

export default combineReducers({
    auth,
    ui,
})