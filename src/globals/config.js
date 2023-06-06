const g_variable = {
    jwt_code: 'GoodCrop',
    mailformat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    passFormat: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
}

const BackBaseURI = 'http://localhost:3000';


const AuthVar = {
    forLogin: `${BackBaseURI}/login-email`,
    forLoginG: `${BackBaseURI}/login-google`,
    forForgetPw: `${BackBaseURI}/forgot-pass`,
    forSignUp: `${BackBaseURI}/sign-up`,
}

const WeatherandPlant = (code) => {
    const getPlant = () => {
        return `${BackBaseURI}/weather/${code}`
    }

    const getAllPlant = () => {
        return `${BackBaseURI}/getAllPlant`
    }

    return { getPlant, getAllPlant }
}

export { g_variable, AuthVar, WeatherandPlant };