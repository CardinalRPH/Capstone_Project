import { createSlice } from '@reduxjs/toolkit';

const getAuthLocalStorage = () => {
  const getLocalStorage = localStorage.getItem("ADXauthentication")
  if (getLocalStorage === null) {
    return {
      isAuthenticatedADX: false,
      token: "",
    }
  } else {
    const { isAuthenticatedADX, token} = JSON.parse(getLocalStorage)
    return {
      isAuthenticatedADX,
      token,
    }
  }
}

const saveAuthLocalStorage = (isAuthenticatedADX, token) => {
  const ADXauthentication = { isAuthenticatedADX, token}
  localStorage.setItem("ADXauthentication", JSON.stringify(ADXauthentication));
}

const removeAuthLocalStorage = () => {
  localStorage.removeItem("ADXauthentication");
}


const initialState = getAuthLocalStorage();

const authSliceADX = createSlice({
  name:'authADX',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticatedADX = true;
      state.token = action.payload.token;
      saveAuthLocalStorage(true, state.token);
    },
    logout(state) {
      state.isAuthenticatedADX = false
      state.token = '';
      removeAuthLocalStorage();
    },
  },
});

export const authActionADX = authSliceADX.actions;
export default authSliceADX.reducer;
