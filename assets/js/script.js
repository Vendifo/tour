var countChildren = 0;

function togglePeople() {
    var menuPeople = document.querySelector('.search-turs__var__func__menu');
    var containerPeople = document.querySelector('.people__var');
    var closePeopleMenu = document.getElementById('closePeopleMenu');

    menuPeople.classList.toggle('active');
    containerPeople.classList.toggle('active');
    closePeopleMenu.classList.toggle('active');
}


function updateStarCount(checkbox) {
    var starCountElement = document.getElementById('muchStar');
    var checkboxes = document.querySelectorAll('#starCheckboxes input[type="checkbox"]');
    var starTextMap = {
        '2': '1 &#9733;',
        '3': '2 &#9733;',
        '4': '3 &#9733;',
        '5': '4 &#9733;',
        '6': '5 &#9733;',
        '7': 'HV-1',
        '8': 'HV-2',
        '9': 'APART',
        '10': 'Б\\К'
    };

    if (checkbox.value === '11') {
        checkboxes.forEach(function (cb) {
            cb.checked = checkbox.checked;
        });
        starCountElement.innerHTML = 'Все';
    } else {
        var checkedCheckboxes = document.querySelectorAll('#starCheckboxes input[type="checkbox"]:checked');
        if (checkedCheckboxes.length > 0) {
            var selectedStars = Array.from(checkedCheckboxes).map(function (cb) {
                return starTextMap[cb.value];
            });
            starCountElement.innerHTML = selectedStars.join(' ');
        } 
        else {
            starCountElement.innerHTML = '';
        }
    }
}

function toggleStar() {
    var star = document.querySelector('.list__star');

    star.classList.toggle('active');
}

function toggleDropdown() {
    var dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('active');
}




function updateSelection() {
    var anyCheckbox = document.querySelector('#dropdown input[value="1"]');
    var checkboxes = document.querySelectorAll('#dropdown input[type="checkbox"]');
    var selectedCount = 0;

    anyCheckbox.addEventListener('change', function () {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = anyCheckbox.checked;
        });
        dropdown.classList.remove('active');

        updateSelection();
    });

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedCount++;
        }
    });

    var pElement = document.getElementById('eat__value');
    if (selectedCount == 1) {
        pElement.textContent = 'Выбран ' + selectedCount + ' тип';
    }
    else {
        pElement.textContent = 'Выбрано ' + selectedCount + ' типов';
    }

}

var selectedCount = 0;


// Закрываем список при клике в любое место документа
document.addEventListener('click', function (event) {
    var dropdown = document.getElementById('dropdown');
    var dropdownToggle = document.querySelector('.search-turs__var__func');
    var priceDrop = document.getElementById('priceDrop');
    var priceToggle = document.getElementById('priceToggle');

    if (dropdown.classList == 'active') {
        if (!event.target.closest('.var__eat') && !event.target.closest('.search__eat label') && !event.target.closest('.search__eat') && !event.target.closest('.search__eat input')) {
            dropdown.classList.remove('active');
        }
    }
    else {
        if (!event.target.closest('.var__eat') && !event.target.closest('.search__eat label') && !event.target.closest('.search__eat') && !event.target.closest('.search__eat input')) {
            dropdown.classList.remove('active');
        }
    }
    

    var listStar = document.getElementById('starCheckboxes');
    var starCountElement = document.getElementById('muchStar');
    var starCountsElement = document.getElementById('muchsStars');

    // Проверяем, является ли элемент, по которому произошел клик, частью меню
    var isClickInsideMenu1 = listStar.contains(event.target) || starCountElement.contains(event.target) || starCountsElement.contains(event.target);

    // Если клик был вне меню, убираем класс active и сбрасываем текст
    if (!isClickInsideMenu1) {
        listStar.classList.remove('active');
    }

    
});




document.addEventListener("DOMContentLoaded", function () {
    // Обработчик изменения значения

    var hidenSerch = document.querySelector(".search-turs__hide");
    var searchForm = document.querySelector(".search-turs__form");
    var funcForm = document.querySelector(".search__func");
    var showButton = document.getElementById("show__search");

    showButton.addEventListener("click", function () {
        hidenSerch.classList.toggle("active");
        searchForm.classList.toggle("active");
        funcForm.classList.toggle("active");

        var buttonText = hidenSerch.classList.contains("active") ? "Скрыть" : "Еще фильтры";
        showButton.textContent = buttonText;
    });

    var calendarElement = document.querySelector(".calendar");
    var selectedDates = [];

    // Устанавливаем текущую дату в поле "calendar"
    var currentDate = new Date();
    calendarElement.textContent = currentDate.toLocaleDateString();

    // Инициализируем календарь при клике на "calendar"
    flatpickr(calendarElement, {
        mode: "range",
        onChange: function (selected, dateStr, instance) {
            // Обновляем выбранные даты
            selectedDates = selected;

            // Если выбрана одна и та же дата дважды, отображаем только ее
            if (selectedDates.length === 2 && selectedDates[0].getTime() === selectedDates[1].getTime()) {
                calendarElement.textContent = selectedDates[0].toLocaleDateString();
                return;
            }

            // Если уже выбраны две даты, обновляем текст в поле "calendar"
            if (selectedDates.length === 2) {
                var startDate = selectedDates[0].toLocaleDateString();
                var endDate = selectedDates[1].toLocaleDateString(); // Fix: Use selectedDates[1] for endDate

                calendarElement.textContent = startDate + " - " + endDate;
            }

            // Подсвечиваем и добавляем класс "endRange" к второй дате, если она находится в пределах двух недель
            var flatpickrInstance = instance;

        },
        onOpen: function () {
            calendarElement.classList.add("animate");
        },

        onClose: function () {
            calendarElement.classList.add("animate");
            // Добавьте задержку перед удалением класса для полного завершения анимации
            setTimeout(function () {
                calendarElement.classList.remove("animate");
            }, 300);
        }
    });

    // ======================================================


    var decrementBtn = document.getElementById('decrementBtn');
    var incrementBtn = document.getElementById('incrementBtn');
    var textPeople = document.getElementById('textPeople');
    var closePeopleMenu = document.getElementById('closePeopleMenu');

    // Элемент, отображающий количество взрослых
    var varPeopleElement = document.getElementById('varPeople');

    // Текущее количество взрослых
    var varPeopleCount = 1;

    closePeopleMenu.addEventListener('click', function () {
        var menuPeople = document.querySelector('.search-turs__var__func__menu');
        var containerPeople = document.querySelector('.people__var');

        menuPeople.classList.toggle('active');
        containerPeople.classList.toggle('active');
        closePeopleMenu.classList.toggle('active');
    });

    // Обработчик события для уменьшения количества взрослых
    decrementBtn.addEventListener('click', function () {
        if (varPeopleCount > 1) {
            varPeopleCount--;
            updateVarPeopleElement();
            if (varPeopleCount == 1) {
                textPeople.textContent = varPeopleCount + ' взрослый';
            } else {
                textPeople.textContent = varPeopleCount + ' взрослых';
            }

        }
    });

    // Обработчик события для увеличения количества взрослых
    incrementBtn.addEventListener('click', function () {
        varPeopleCount++;
        updateVarPeopleElement();
        textPeople.textContent = varPeopleCount + ' взрослых';
    });

    // Функция обновления текста с количеством взрослых
    function updateVarPeopleElement() {
        varPeopleElement.textContent = varPeopleCount + ' взрослых';
    }

    var optionsContainer = document.getElementById('optionsContainer');
    var childrenSelect = document.getElementById('childrenSelect');
    var selectedOptionContainer = document.getElementById('selectedOptionContainer');

    childrenSelect.addEventListener('change', function () {
        var selectedOption = childrenSelect.options[childrenSelect.selectedIndex];

        if (selectedOption.value !== '') {
            displaySelectedOption(selectedOption.text);
        }
    });

    function displaySelectedOption(text) {
        // Создать div с нужными стилями
        var flexContainer = document.createElement('div');
        flexContainer.style.display = 'flex';
        flexContainer.style.justifyContent = 'space-between';
        flexContainer.style.alignItems = 'center'; // Для центрирования содержимого

        // Создать pTag и добавить стили
        var pTag = document.createElement('p');
        pTag.textContent = text;
        pTag.style.borderRadius = '5px'; // Border-radius
        pTag.style.padding = '5px 20px'; // Padding

        // Создать pTag с крестиком (✖)
        var closePTag = document.createElement('p');
        closePTag.innerHTML = '&#10006;';
        closePTag.id = 'closeChildrenP';
        closePTag.style.cursor = 'pointer'; // Установить стиль курсора на pointer

        var textChildren = document.getElementById('textChildren');
        

        // Increment countChildren when creating a new flexContainer
        countChildren += 1;
        if (countChildren === 1) { 
            textChildren.textContent = ', ' + countChildren + ' ребёнок';
        } else if (countChildren > 1) { 
            textChildren.textContent = ', ' + countChildren + ' детей';
        }


        // Добавить pTag и closePTag в flexContainer
        flexContainer.appendChild(pTag);
        flexContainer.appendChild(closePTag);

        // Добавить flexContainer в optionsContainer
        optionsContainer.appendChild(flexContainer);

        // Скрыть select
        childrenSelect.style.display = 'none';

        // Переместить select ниже
        selectedOptionContainer.appendChild(childrenSelect.cloneNode(true));

        // Очистить значение выбора в исходном select
        childrenSelect.value = '';

        // Показать select
        childrenSelect.style.display = 'block';

        // Добавить слушатель события для closePTag
        closePTag.addEventListener('click', function () {

            countChildren -= 1;
            if (countChildren === 1) { 
                textChildren.textContent = ', ' + countChildren + ' ребёнок';
            } else if (countChildren > 1) { 
                textChildren.textContent = ', ' + countChildren + ' детей';
            } else if (countChildren < 1) { 
                textChildren.textContent = ', '  + ' без детей';
            }
    
            optionsContainer.removeChild(flexContainer);
        });

        // Добавить flexContainer в optionsContainer
        optionsContainer.appendChild(flexContainer);

        // Скрыть select
        childrenSelect.style.display = 'none';

        // Переместить select ниже
        selectedOptionContainer.appendChild(childrenSelect.cloneNode(true));

        // Очистить значение выбора в исходном select
        childrenSelect.value = '';

        // Показать select
        childrenSelect.style.display = 'block';
    }



});

// Добавим метод addDays к объекту Date
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
