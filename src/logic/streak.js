export const calculateStreak = (days) => {

    const values = Object.values(days);

    const keys = Object.keys(days);

    // const todayIs = keys.indexOf(new Date().getDay());

    let racha = 0;

    if (values[todayIs - 1] === true) {
        racha++;
    } else {
        racha = 0;
    }

    /*for (let i = values[todayIs - 1]; i < values.length; i++) {
        if (values[i] === true) {
            racha++;
        } else if (values[i] === false) {
            racha = 0;
        }
    }  */

    return racha;
}