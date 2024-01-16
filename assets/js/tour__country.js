
var variants = document.querySelectorAll('.cinfo__variants__item');
var background = document.querySelector('.cfilter__info__items__back');
var background1 = document.querySelector('.cfilter__info__items__back1');

variants.forEach(function (variant) {
    variant.addEventListener('click', function () {
        // Удаление класса "active" у всех элементов
        variants.forEach(function (v) {
            v.classList.remove('active');
        });

        // Добавление класса "active" к текущему элементу
        variant.classList.add('active');
    });
});

function toggleMenu(menuId) {
    var menuElement = document.getElementById(menuId);
    if (menuElement) {
        menuElement.classList.toggle('visible');
        background.classList.toggle('visible');
    }
}

function getCheckedCheckboxes(menuId) {
    var menuElement = document.getElementById(menuId);
    var checkedCheckboxes = [];

    if (menuElement) {
        var checkboxes = menuElement.querySelectorAll('.checkbox:checked');
        
        checkboxes.forEach(function (checkbox) {
            checkedCheckboxes.push(checkbox.id);
        });
    }

    return checkedCheckboxes;
}

function applyFilters() {


    var menus = document.querySelectorAll('.submenu');
    for (var i = 0; i < menus.length; i++) {
        menus[i].classList.remove('visible');
    }
    document.getElementById('menuFilter').classList.remove('visible');
    background.classList.remove('visible');
}

function openSubMenu(subMenuId) {
    var subMenuElement = document.getElementById(subMenuId);
    if (subMenuElement) {
        document.getElementById('menuFilter').classList.remove('visible');
        subMenuElement.classList.add('visible');
    }
}

function reopenSubMenu(subMenuId, subMenuIdClose, imgId, pId) {
    var subMenuElement = document.getElementById(subMenuId);
    var subMenuElementClose = document.getElementById(subMenuIdClose);
    var submenuImg = document.getElementById(imgId);
    var pValue = document.getElementById(pId);

    if (subMenuElement) {
        
        document.getElementById('menuFilter').classList.remove('visible');
        subMenuElementClose.classList.remove('visible');
        subMenuElement.classList.add('visible');
    }
    // Получаем все отмеченные чекбоксы в подменю
    var checkedCheckboxes = document.querySelectorAll('.submenu input[type="checkbox"]:checked');
    var checkedBudgetCheckboxes = getCheckedCheckboxes(subMenuIdClose);
    var filterMenuContent = document.getElementById('filterMenuContent');

    if (checkedBudgetCheckboxes.length > 0) { 
        submenuImg.style.display = 'block';
        pValue.textContent = 'Выбрано ' + checkedBudgetCheckboxes.length + ' фильтров'; 
    } else { 
        submenuImg.style.display = 'none';
    }

    if (checkedCheckboxes.length > 0) {
        filterMenuContent.textContent = 'Выбрано ' + checkedCheckboxes.length + ' фильтров';      
    } else {
        filterMenuContent.textContent = 'Фильтр';
    }
}

function closeSubMenu(subMenuId , imgId, pId) {
    var subMenuElement = document.getElementById(subMenuId);
    var submenuImg = document.getElementById(imgId);
    var pValue = document.getElementById(pId);

    if (subMenuElement) {
        subMenuElement.classList.remove('visible');
        document.getElementById('menuFilter').classList.add('visible');
    }

    var checkedCheckboxes = document.querySelectorAll('.submenu input[type="checkbox"]:checked');
    var checkedBudgetCheckboxes = getCheckedCheckboxes(subMenuId);
    var filterMenuContent = document.getElementById('filterMenuContent');

    if (checkedBudgetCheckboxes.length > 0) { 
        submenuImg.style.display = 'block';
        pValue.textContent = 'Выбрано ' + checkedBudgetCheckboxes.length + ' фильтров'; 
    } else { 
        submenuImg.style.display = 'none';
    }

    if (checkedCheckboxes.length > 0) {
        filterMenuContent.textContent = 'Выбрано ' + checkedCheckboxes.length + ' фильтров';      
    } else {
        filterMenuContent.textContent = 'Фильтр';
    }
}




document.addEventListener("DOMContentLoaded", function () {
    var sortMenuTrigger = document.getElementById('sortMenuTrigger');
    var sortMenu = document.getElementById('sortMenu');
    var sortMenuText = document.getElementById('sortMenuText');

    sortMenuTrigger.addEventListener('click', function () {
        sortMenu.classList.toggle('visible');
        background1.classList.toggle('visible');
    });

    sortMenu.addEventListener('click', function (event) {
        var target = event.target;

        if (target.classList.contains('menu-item')) {
            var action = target.getAttribute('data-action');

            switch (action) {
                case 'back':
                    sortMenu.classList.remove('visible');
                    background1.classList.remove('visible');
                    break;
                case 'popularity':
                case 'expensive':
                case 'cheap':
                case 'rating':
                    // Убираем класс 'selected' у всех элементов
                    document.querySelectorAll('.menu-item').forEach(function (menuItem) {
                        menuItem.classList.remove('selected');
                    });

                    // Добавляем класс 'selected' к выбранному элементу
                    target.classList.add('selected');

                    // Логика для выбора "По популярности", "Сначала дороже", "Сначала дешевле", "По оценкам"
                    sortMenuText.textContent = target.textContent;
                    sortMenu.classList.remove('visible');
                    background1.classList.remove('visible');
                    break;
                default:
                    break;
            }
        }
    });
    // Получаем контейнер слайдера
    var sliderContainer = document.getElementById("sliderContainer");

    // Генерируем слайды для 13 дней вперед и 13 дней назад (бесконечность)
    for (var i = 0; i < 14; i++) {
        var date = new Date();
        date.setDate(date.getDate() + i);
        var slide = createSlide(date);
        sliderContainer.appendChild(slide);
    }

    // Инициализация Slick Slider после добавления слайдов
    var slick = $('.cfilter__dates').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false
    });

    $('.chot__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        centerMode: true,
        centerPadding: '10px',
    });

    $('.creviews__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: '10px',
    });

    var slider = $('.creviews__slider');
    var progressBar = $('.progress-bar');
    var progressIndicator = $('.progress-indicator');

    slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var percent = (nextSlide / (slick.slideCount - 1)) * 100;
        progressIndicator.css('left', percent + '%');
    });


    // Добавляем обработчик события afterChange для выделения активного слайда
    $('.cfilter__dates').on('afterChange', function (event, slick, currentSlide) {
        $('.cfilter__dates__slide').removeClass('active');
        $('.cfilter__dates__slide').eq(currentSlide).addClass('active');
    });
});

// Функция для создания HTML-разметки для одного слайда с датой
function createSlide(date) {
    var daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    var dayOfWeek = daysOfWeek[date.getDay()];
    var dayOfMonth = date.getDate();
    var month = date.toLocaleString("ru-RU", { month: "long" });

    // Создаем элемент слайда
    var slide = document.createElement("div");
    slide.classList.add("cfilter__dates__slide");

    // Добавляем содержимое в слайд
    slide.innerHTML = `
        <div class="cfilter__dates__week">${dayOfWeek}</div>
        <div class="cfilter__dates__day">${dayOfMonth}</div>
        <div class="cfilter__dates__month">${month}</div>
    `;

    return slide;
}

