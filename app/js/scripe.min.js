const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItems = document.querySelectorAll('.tabs__item');

//Красим активные кнопки
tabsBtn.forEach(onTabClick);

//Это наша функция которая всё далает, а выше мы её вязвали, и теперь в случае чего мы можем вызвать жту функцию в любой момент
function onTabClick(item) {
    item.addEventListener('click', function () {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab'); //Даёт нам атрибут на который мы нажали
        let currentTab = document.querySelector(tabId); //Тут кнопка на которую мы нажали

        //Небольшая оптимизация, тепреь при нажатии на кнопку у которой уже есть класс active нечего не будет происходить
        if (!currentBtn.classList.contains('active')) {
            //contains - проверяет на содержимое, ! - делает обратную проверку(если чгео-то нет)
            //Убираем класс active у не нужных элементов
            tabsBtn.forEach(function (item) {
                item.classList.remove('active');
            });

            //Убираем класс active у не абзацев
            tabsItems.forEach(function (item) {
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}

//Сделает так чтобы js сам выбирал первую кнопку и добавлял к ней класс active
//Маленькая хитрость в том что querySelector использует первый найденный им тег, а clik иммитирует нажатие
document.querySelector('.tabs__nav-btn').click(); //через nth-child можно указать второй ээлемент
