export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio'); // находим блок в котором будем работать
  const radioCoverImg = document.querySelector('.radio-cover__img'); // находим изображение для обложки
  const radioHeaderBig = document.querySelector('.radio-header__big'); // находим заголовок для отображения выбраной стнции
  const radioNavigation = document.querySelector('.radio-navigation'); // находим блок со списком станций
  const radioItem = document.querySelectorAll('.radio-item'); // находим список станций
  const radioStop = document.querySelector('.radio-stop'); // находим блок управления потоком
  const radioVolume = document.querySelector('.radio-volume'); // находим инпут для регулирования громкости

  const audio = new Audio(); // новый объект
  audio.type = 'audio/aac'; // устанавливаем тип для для получения аудио потока

  radioStop.disabled = true; // отключаем блок управления

  const togglePlayIcon = () => { // функция для смены иконок в блоке управления
    if (audio.paused) { // если аудио на паузе
      radio.classList.remove('play'); // удаляем класс у блока радио, останавливаем вращение
      radioStop.classList.add('fa-play'); // добавляем кнопку плей
      radioStop.classList.remove('fa-stop'); // убираем кнопку стоп
    } else {// если аудио играет
      radio.classList.add('play');// добавлем класс блоку, заставляем работать анимацию и крутится пластинку
      radioStop.classList.add('fa-stop');// добавляем кнопку стоп
      radioStop.classList.remove('fa-play');// убираем кнопку стоп
    }
  };

  const selectItem = (element) => { // функция для определения какая станция сейчас играет
    radioItem.forEach(item => item.classList.remove('select')); // удаляет класс у всех элементов
    element.classList.add('select'); // доавляет класс выбраному
  }

  radioNavigation.addEventListener('change', (event) => {// функция выбора станции
    const target = event.target; // выбор таргета в евенте
    const parrent = target.closest('.radio-item'); // выбор родительского элемента
    selectItem(parrent);

    const title = parrent.querySelector('.radio-name').textContent;// поиск название станции в выбраном элементе
    radioHeaderBig.textContent = title; // присвоение название станции

    const urlImage = parrent.querySelector('.radio-img').src;// поиск картинки в выбраной станции
    radioCoverImg.src = urlImage;// установка картинки

    radioStop.disabled = false; // разблокирует блок управления
    audio.src = target.dataset.radioStantion; // выбор потока вещания из дата атрибута выбраной станции
    audio.play(); // запускает аудиопоток
    togglePlayIcon(); // устанавливаем картинку
  });

  radioStop.addEventListener('click', () => { // управление аудио потоком
    if (audio.paused) { // если на паузе
      audio.play(); // запустит поток
    } else {
      audio.pause();// остановить поток
    }
    togglePlayIcon();// устанавливаем картинку
  });

  radioVolume.addEventListener('input', () => { // функция регулирования громкости
    audio.volume = radioVolume.value / 100;
  });

  radioVolume.value = audio.volume * 100; // устанавливает начальную громкость
}