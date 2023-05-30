import { createSlice } from '@reduxjs/toolkit';

const getAuthLocalStorage = () => {
  const getLocalStorage = localStorage.getItem("authentication")
  if (getLocalStorage === null) {
    return {
      isAuthenticated: false,
      token: "",
    }
  } else {
    const { isAuthenticated, token} = JSON.parse(getLocalStorage)
    return {
      isAuthenticated,
      token,
    }
  }
}

const saveAuthLocalStorage = (isAuthenticated, token, id) => {
  const authentication = { isAuthenticated, token}
  localStorage.setItem("authentication", JSON.stringify(authentication));
}

const removeAuthLocalStorage = () => {
  localStorage.removeItem("authentication");
}


const initialState = getAuthLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      saveAuthLocalStorage(true, state.token, state.id);
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = '';
      removeAuthLocalStorage();
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
