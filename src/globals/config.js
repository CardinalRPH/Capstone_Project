const g_variable = {
    jwt_code: 'GoodCrop',
    mailformat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passFormat: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
}

const BackBaseURI = 'http://localhost:3000';


const AuthVar = {
    forLogin: `${BackBaseURI}/login-email`,
    forLoginG: `${BackBaseURI}/login-google`,
}

export { g_variable, AuthVar };