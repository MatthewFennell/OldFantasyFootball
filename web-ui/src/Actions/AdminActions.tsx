export enum ActionTypes {
  SET_ADMIN_PAGE_BEING_VIEWED = 'SET_ADMIN_PAGE_BEING_VIEWED'
}

export interface SetAdminPageBeingViewed {
  type: ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED;
  payload: { adminPageBeingViewed: string };
}

export const setAdminPageBeingViewed = (adminPageBeingViewed: string): SetAdminPageBeingViewed => {
  return {
    type: ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED,
    payload: { adminPageBeingViewed }
  };
};

export type Action = SetAdminPageBeingViewed;
