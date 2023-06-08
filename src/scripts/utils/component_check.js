export const for_planner_Save = (name, type, date) => {
    if ((name == null || name == '') || (type == null || type == '' || type =='Choose...') || (date == null || date == '')) {
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