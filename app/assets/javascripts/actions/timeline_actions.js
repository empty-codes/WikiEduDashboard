import API from '../utils/api.js';
import {
  RECEIVE_TIMELINE,
  SET_BLOCK_EDITABLE,
  CANCEL_BLOCK_EDITABLE,
  UPDATE_BLOCK,
  ADD_BLOCK,
  DELETE_BLOCK,
  INSERT_BLOCK,
  ADD_WEEK,
  DELETE_WEEK,
  API_FAIL,
  SAVED_TIMELINE,
  SAVE_TIMELINE_FAIL,
  RESTORE_TIMELINE
} from '../constants';
import logErrorMessage from '../utils/log_error_message';

const fetchTimelinePromise = courseSlug => {
  return new Promise((res, rej) =>
    $.ajax({
      type: 'GET',
      url: `/courses/${courseSlug}/timeline.json`,
      success(data) {
        return res(data);
      }
    })
    .fail((obj) => {
      logErrorMessage(obj);
      return rej(obj);
    })
  );
};

export const fetchTimeline = courseSlug => dispatch => {
  return fetchTimelinePromise(courseSlug)
    .then(data => dispatch({ type: RECEIVE_TIMELINE, data }))
    .catch(data => dispatch({ type: API_FAIL, data }));
};

export const addWeek = () => ({ type: ADD_WEEK, tempId: Date.now() });

const deleteWeekPromise = weekId => {
  return API.deleteWeek(weekId);
};

export const deleteWeek = weekId => dispatch => {
  return deleteWeekPromise(weekId)
    .then(data => dispatch({
      type: DELETE_WEEK,
      weekId: data.week_id
    }))
    .catch(data => dispatch({ type: API_FAIL, data }));
};

const deleteBlockPromise = blockId => {
  return API.deleteBlock(blockId);
};

export const deleteBlock = blockId => dispatch => {
  return deleteBlockPromise(blockId)
    .then(data => dispatch({ type: DELETE_BLOCK, blockId: data.block_id }))
    .catch(data => dispatch({ type: API_FAIL, data }));
};

export const persistTimeline = (timelineData, courseSlug) => dispatch => {
  return API.saveTimeline(courseSlug, timelineData)
    .then(data => dispatch({ type: SAVED_TIMELINE, data }))
    .catch(data => dispatch({ type: SAVE_TIMELINE_FAIL, data, courseSlug }));
};

export const setBlockEditable = blockId => {
 return { type: SET_BLOCK_EDITABLE, blockId };
};

export const cancelBlockEditable = blockId => {
  return { type: CANCEL_BLOCK_EDITABLE, blockId };
 };

export const updateBlock = block => {
  return { type: UPDATE_BLOCK, block };
};

export const addBlock = weekId => {
  return { type: ADD_BLOCK, weekId, tempId: Date.now() };
};

export const insertBlock = (block, toWeek, afterBlock) => {
  return { type: INSERT_BLOCK, block, toWeek, afterBlock };
};

export const restoreTimeline = () => {
  return { type: RESTORE_TIMELINE };
};
