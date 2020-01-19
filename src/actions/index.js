import * as actions from "./action-types";

export const takePhoto = payload => dispatch =>
  dispatch({ type: actions.TAKE_PHOTO, payload });

export const changeResolution = payload => dispatch =>
    dispatch({ type: actions.CHANGE_RESOLUTION, payload });

export const changeName = ({ id, name }) => dispatch =>
    dispatch({ type: actions.CHANGE_NAME, payload: { id, name } });
