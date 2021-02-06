import {
  FETCH_LIST_ITEM_REQUEST,
  FETCH_LIST_ITEM_SUCCESS,
  FETCH_LIST_ITEM_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  DELETE_LIST_ITEM_REQUEST,
  DELETE_LIST_ITEM_SUCCESS,
  DELETE_LIST_ITEM_FAILURE,
  CHANGE_ITEM_FIELD,
  CANCEL_CHANGE_ITEM,
  SAVE_CHANGE_ITEM_REQUEST,
  SAVE_CHANGE_ITEM_SUCCESS,
  SAVE_CHANGE_ITEM_FAILURE
} from './ActionTypes'

export function fetchLsitItemRequest() {
  return { type: FETCH_LIST_ITEM_REQUEST }
}

export function fetchLsitItemSuccess(items) {
  return { type: FETCH_LIST_ITEM_SUCCESS, payload: { items } }
}

export function fetchLsitItemFailure() {
  return { type: FETCH_LIST_ITEM_FAILURE }
}

export function fetchItemRequest() {
  return { type: FETCH_ITEM_REQUEST }
}

export function fetchItemSuccess(item) {
  return { type: FETCH_ITEM_SUCCESS, payload: { item } }
}

export function fetchItemFailure() {
  return { type: FETCH_ITEM_FAILURE }
}

export function deleteListItemRequest(id) {
  return { type: DELETE_LIST_ITEM_REQUEST, payload: { id } }
}

export function deleteListItemSuccess(id) {
  return { type: DELETE_LIST_ITEM_SUCCESS, payload: { id } }
}

export function deleteListItemFailure() {
  return { type: DELETE_LIST_ITEM_FAILURE }
}

export function changeItemField(name, value) {
  return { type: CHANGE_ITEM_FIELD, payload: { name, value } }
}

export function canceChangeItem() {
  return { type: CANCEL_CHANGE_ITEM }
}

export function saveChangeItemRequest( item ) {
  return { type: SAVE_CHANGE_ITEM_REQUEST, payload: { item } }
}

export function saveChangeItemSuccess() {
  return { type: SAVE_CHANGE_ITEM_SUCCESS }
}

export function saveChangeItemFailure() {
  return { type: SAVE_CHANGE_ITEM_FAILURE }
}


export const getFetchItems = () => async(dispatch, getState, api) => {
  try {
    dispatch(fetchLsitItemRequest());
    const resp = await fetch(api);
    const items = await resp.json();
    dispatch(fetchLsitItemSuccess(items))
  } catch (e) {
    dispatch(fetchLsitItemFailure())
  }
};

export const getDeleteItem = (id) => async(dispatch, getState, api) => {
  dispatch(deleteListItemRequest(id));
  try {
    await fetch(`${api}/${id}`, {
      method: "DELETE"
    });
    dispatch(deleteListItemSuccess(id))
  } catch (e) {
    dispatch(deleteListItemFailure())
  }
};

export const getFetchItem = (id) => async(dispatch, getState, api) => {
  dispatch(fetchItemRequest());
  try {
    const resp = await fetch(`${api}/${id}`)
    const item = await resp.json();
    dispatch(fetchItemSuccess(item))
  } catch (e) {
    dispatch(fetchItemFailure())
  }
}

export const saveChangeItem = (data) => async(dispatch, getState, api) => {
  dispatch(saveChangeItemRequest(data));
  try {
    await fetch(api, {
      method: 'POST',
      body: JSON.stringify({
        ...data
      })
    })
    dispatch(saveChangeItemSuccess())
  } catch (e) {
    dispatch(saveChangeItemFailure())
  }
}