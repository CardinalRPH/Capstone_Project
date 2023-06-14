export const for_planner_Save = (name, type, date) => {
    if ((name == null || name == '') || (type == null || type == '' || type == 'Choose...') || (date == null || date == '')) {
        return false;
    } else {
        return true;
    }
}

export const for_planner_update = (name) => {
    if (name == null || name == '') {
        return false;
    } else {
        return true;
    }
}

export const for_submit_panen = (hasil) => {
    if (hasil == null || hasil == '' || hasil <= 0) {
        return false;
    } else {
        return true;
    }
}

export const Check_single_Vaalue = (value) => {
    if (value == '') {
        return false;
    } else {
        return true;
    }
}

export const Check_Object = (object) => {
    const hasNullValue = Object.values(object).some(value => value === '');
    const isAllNotNull = !hasNullValue;
    return isAllNotNull
}
