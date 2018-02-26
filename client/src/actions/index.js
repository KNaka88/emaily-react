import axios from 'axios';
import { FETCH_USER } from './types';
import { connect } from 'react-redux';
import * as actions from '../actions';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
