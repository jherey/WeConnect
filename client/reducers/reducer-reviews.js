/**
 * @description - Review reducer
 *
 * @param {*} state
 * @param {*} action
 *
 * @returns { review } - State
 */
export default function (state = [], action = {}) {
  switch (action.type) {
    case 'GET_REVIEWS':
      return action.reviews;

    default:
      return state;
  }
}
