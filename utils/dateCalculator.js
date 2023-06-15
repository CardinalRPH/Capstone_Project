export const getHarvest = (targetDate, plusRef) => {
    const date = new Date(targetDate);
    date.setDate(date.getDate() + parseInt(plusRef));

    const newDate = date.toISOString().split('T')[0];
    return newDate;
}

export const getWatering = (targetDate, plusRef, harvestDate, title, color, idEvent) => {
    const TargetDate = new Date(targetDate);
    const HarvestDate = new Date(harvestDate);
    const Watering = [];

    let currentDate = new Date(TargetDate);
    let Numo = 1;
    while (currentDate < HarvestDate) {
        currentDate.setDate(currentDate.getDate() + parseInt(plusRef));
        const result = currentDate.toISOString().split('T')[0];
        Watering.push({
            id: `2${idEvent}${Numo}`,
            groupId: idEvent,
            title: `Watering: ${title}`,
            start: result,
            end: result,
            color:color
        });
        Numo++;
    }
    return Watering;
}

export const getFertilization = (targetDate, plusRef, harvestDate, title, color, idEvent) => {
    const TargetDate = new Date(targetDate);
    const HarvestDate = new Date(harvestDate);
    const Fertilization = [];

    let currentDate = new Date(TargetDate);
    let Numo = 1;
    while (currentDate < HarvestDate) {
        currentDate.setDate(currentDate.getDate() + parseInt(plusRef));
        const result = currentDate.toISOString().split('T')[0];
        Fertilization.push({
            id: `3${idEvent}${Numo}`,
            groupId: idEvent,
            title: `Fertilization: ${title}`,
            start: result,
            end: result,
            color:color
        });
        Numo++;
    }
    return Fertilization;
}