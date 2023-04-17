export const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('User', JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data }

    default:
      return state
  }
}
