import { combineReducers } from 'redux';

import alert from './alert';
import amadeus from './amadeus';

export default combineReducers({ alert, amadeus });
