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

export { g_variable, AuthVar, WeatherandPlant, EventURI };