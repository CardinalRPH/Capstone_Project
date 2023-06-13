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
    forUpdateUserInfo: `${BackBaseURI}/user-info`,
    checkJwt: `${BackBaseURI}/checkJwt`,
}

const WeatherandPlant = (code) => {
    const getPlant = () => {
        return `${BackBaseURI}/weather/${code}`;
    }

    const getAllPlant = () => {
        return `${BackBaseURI}/getAllPlant`;
    }

    const getUserLocation = () => {
        return `${BackBaseURI}/user-location`;
    }

    return { getPlant, getAllPlant, getUserLocation }
}

const EventURI = (code) => {
    const getOneEvent = () => {
        return `${BackBaseURI}/event/${code}`;
    }

    const createEvent = () => {
        return `${BackBaseURI}/event`;
    }

    const getAllEvent = () => {
        return `${BackBaseURI}/getAllEvent`;
    }
    const updateEvent = () => {
        return `${BackBaseURI}/event`;
    }
    const deleteEvent = () => {
        return `${BackBaseURI}/event/${code}`;
    }

    return { getOneEvent, createEvent, getAllEvent, updateEvent, deleteEvent }
}

const HistoryURI = (code) => {
    const createHistory = () => {
        return `${BackBaseURI}/history`;
    }
    const getHistory = () => {
        return `${BackBaseURI}/history`;
    }
    return { createHistory, getHistory }
}

const TipsURI = (code) => {
    const getTips = () => {
        return `${BackBaseURI}/tips-trick`;
    }
    const getTipsOne = () => {
        return `${BackBaseURI}/tips-trick/${code}`;
    }
    return { getTips, getTipsOne }
}


const EditorURI = (code) => {
    const getAllUsers = () => {
        return `${BackBaseURI}/e/AllUser`;
    }
    const EnableUser = () => {
        return `${BackBaseURI}/e/EnableUser/${code}`;
    }
    const DisableUser = () => {
        return `${BackBaseURI}/e/DisableUser/${code}`;
    }
    const DeleteUser = () => {
        return `${BackBaseURI}/e/Deleteuser/${code}`;
    }
    const CreatePlant = () => {
        return `${BackBaseURI}/e/CreatePlant`;
    }
    const UpdatePlant = () => {
        return `${BackBaseURI}/e/UpdatePlant/${code}`;
    }
    const DeletePlant = () => {
        return `${BackBaseURI}/e/DeletePlant/${code}`;
    }
    const CreateTips = () => {
        return `${BackBaseURI}/e/CreateTips`;
    }
    const UpdateTips = () => {
        return `${BackBaseURI}/e/UpdateTips/${code}`;
    }
    const DeleteTips = () => {
        return `${BackBaseURI}/e/DeleteTips/${code}`;
    }

    return { getAllUsers, CreatePlant, UpdatePlant, DeletePlant, CreateTips, UpdateTips, DeleteTips, EnableUser, DisableUser, DeleteUser }
}

export { g_variable, AuthVar, WeatherandPlant, EventURI, HistoryURI, TipsURI, EditorURI };