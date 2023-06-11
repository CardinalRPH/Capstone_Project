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
    forGetUserInfo: `${BackBaseURI}/user-info`,
    forUpdateUserInfo: `${BackBaseURI}/update-user-info`,
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

const EventURI = (code) => {
    const getOneEvent = () => {
        return `${BackBaseURI}/getOneEvent/${code}`;
    }

    const createEvent = () => {
        return `${BackBaseURI}/create-event`;
    }

    const getAllEvent = () => {
        return `${BackBaseURI}/getAllEvent`;
    }
    const updateEvent = () => {
        return `${BackBaseURI}/updateEvent`;
    }
    const deleteEvent = () => {
        return `${BackBaseURI}/deleteEvent/${code}`;
    }

    return { getOneEvent, createEvent, getAllEvent, updateEvent, deleteEvent }
}

const HistoryURI = (code) => {
    const createHistory = () => {
        return `${BackBaseURI}/create-history`;
    }
    const getHistory = () => {
        return `${BackBaseURI}/getHistory`;
    }
    return { createHistory, getHistory }
}

const TipsURI = (code) => {
    const getTips = () => {
        return `${BackBaseURI}/tips-trick`;
    }
    return { getTips }
}

export { g_variable, AuthVar, WeatherandPlant, EventURI, HistoryURI, TipsURI };