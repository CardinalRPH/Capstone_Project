import { createSlice } from '@reduxjs/toolkit';

const getAuthLocalStorage = () => {
  const getLocalStorage = localStorage.getItem("authentication")
  if (getLocalStorage === null) {
    return {
      isAuthenticated: false,
      token: "",
      id:""
    }
  } else {
    const { isAuthenticated, token, id } = JSON.parse(getLocalStorage)
    return {
      isAuthenticated,
      token,
      id
    }
  }
}

const saveAuthLocalStorage = (isAuthenticated, token, id) => {
  const authentication = { isAuthenticated, token, id }
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
      state.id = action.payload.id;
      state.token = action.payload.token;
      saveAuthLocalStorage(true, state.token, state.id);
    },
    logout(state) {
      state.isAuthenticated = false
      state.id = '';
      state.token = '';
      removeAuthLocalStorage();
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
