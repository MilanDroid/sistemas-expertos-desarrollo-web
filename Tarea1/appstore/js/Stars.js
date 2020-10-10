/**
 * Genera la vista de la calificacion con los colores determinados y si se desea el numero de la calificacion
 * @param {Integer} calificacion 
 * @param {String} goodColor 
 * @param {String} badColor 
 * @param {Boolean} text
 * @returns {String}
 */
const stars = ((calificacion, goodColor, badColor, text) => {
    let ranking = '';
    for (let index = 1; index <= 5; index++) {
        if (calificacion >= index) {
            ranking += `<i class="fas fa-star ${calificacion > 2 ? goodColor:badColor}"></i>`;
        } else {
            ranking += `<i class="far fa-star ${calificacion > 2 ? goodColor:badColor}"></i>`;
        }
    }
    if (text) {
        ranking += ` <strong class="${calificacion > 2 ? goodColor:badColor}">${calificacion}.0</strong>`;
    }

    return ranking;
});

export default stars;