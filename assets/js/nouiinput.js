document.addEventListener("DOMContentLoaded", function () {
    var rangeSlider = document.getElementById('rangeSlider');
    var nightsElement = document.getElementById('nights');

    noUiSlider.create(rangeSlider, {
        start: [3, 10], // Начальные значения для двух ползунков
        connect: true, // Связь между ползунками
        range: {
            'min': 0,
            'max': 30
        }
    });

    // Обработчик изменения значения
    rangeSlider.noUiSlider.on('update', function (values, handle) {
        var nightsValue = values.map(Math.round); // Округляем значения ползунков
        nightsElement.textContent = nightsValue.join('-') + ' ночей';
    });
});