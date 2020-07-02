'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var cardListElement = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var photosListElement = document.querySelector('.map');
var photosTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup__photos');

var cards = [];
var avatarNumber = 1;

var mocks = {
  title: 'Уютное гнездышко для молодоженов',
  address: '600, 350',
  price: 5200,
  typeArr: ['palace', 'flat', 'house', 'bungalo'],
  rooms: 2,
  guests: 3,
  checkinArr: ['12:00', '13:00', '14:00'],
  checkoutArr: ['12:00', '13:00', '14:00'],
  featuresArr: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
  photosArr: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ]
};

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var maxWidth = document.querySelector('.map').offsetWidth;

function getRandomElement(arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
  return arr[randomElement];
}

function getLengthArr(lengthArr, num) {
  num * -1;
  var randomLength = lengthArr.slice(num);
  return randomLength;
}

function getCard(avatarNumber, maxWidth, mocks) {
  var avatar = 'img/avatars/user' + '0' + avatarNumber + '.png';
  var type = getRandomElement(mocks.typeArr);
  var checkin = getRandomElement(mocks.checkinArr);
  var checkout = getRandomElement(mocks.checkoutArr);

  var featuresLength = getRandomNumber(0, mocks.featuresArr.length - 1);
  var features = getLengthArr(mocks.featuresArr, featuresLength);

  var photosLength = getRandomNumber(0, mocks.photosArr.length - 1);
  var photos = getLengthArr(mocks.photosArr, photosLength);

  var locationX = getRandomNumber(0, maxWidth);
  var locationY = getRandomNumber(130, 630);

  var cardItem = {
    author: { avatar: avatar },
    offer: {
      title: mocks.title,
      address: mocks.address,
      price: mocks.price,
      type: type,
      rooms: mocks.rooms,
      guests: mocks.guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: mocks.description,
      photos: photos
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return cardItem;
}

for (var i = 1; i <= 8; i++) {
  var getCardResult = getCard(avatarNumber, maxWidth, mocks);
  cards.push(getCardResult);
  avatarNumber = 1 + i;
}

function renderPin(getCardResult) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = getCardResult.location.x + 'px';
  pinElement.style.top = getCardResult.location.y + 'px';

  var pinImg = pinElement.querySelector('img');

  pinImg.src = getCardResult.author.avatar;
  pinImg.alt = getCardResult.offer.title;

  return pinElement;
}

function renderCard(getCardResult) {
  var cardElement = cardTemplate.cloneNode(true);

  var popupTitle = cardElement.querySelector('.popup__title');
  popupTitle = getCardResult.offer.title;

  var popupAddress = cardElement.querySelector('.popup__text--address');
  popupAddress = getCardResult.offer.address;

  var popupPrice = cardElement.querySelector('.popup__text--price');
  popupPrice = getCardResult.offer.price + '₽/ночь';

  var popupType = cardElement.querySelector('.popup__type');
  popupType = getCardResult.offer.type;

  var popupCapacity = cardElement.querySelector('.popup__text--capacity');
  popupCapacity = getCardResult.offer.rooms + 'комнаты для ' + getCardResult.offer.guests + ' гостей';

  var popupTime = cardElement.querySelector('.popup__text--time');
  popupTime = 'Заезд после' + getCardResult.offer.checkin + ', выезд до ' + getCardResult.offer.checkout;

  var popupFeatures = cardElement.querySelector('.popup__features');
  popupFeatures = getCardResult.offer.features;

  var popupDescription = cardElement.querySelector('.popup__description');
  popupDescription = getCardResult.offer.description;

  var popupAvatar = cardElement.querySelector('.popup__avatar');
  popupAvatar.src = getCardResult.author.avatar;

  return cardElement;
}

function renderPhotos(getCardResult) {
  var photosElement = photosTemplate.cloneNode(true);

  var popupPhotos = photosElement.querySelector('.popup__photo');
  popupPhotos.src = getCardResult.offer.photos[0];

  return photosElement;
}

var fragment = document.createDocumentFragment();
for (var x = 0; x < cards.length; x++) {
  var rendPin = renderPin(cards[x]);
  fragment.appendChild(rendPin);

  var rendCard = renderCard(cards[x]);
  fragment.appendChild(rendCard);

  var rendPhotos = renderPhotos(cards[x]);
  fragment.appendChild(rendPhotos);
}

similarListElement.appendChild(fragment);
cardListElement.appendChild(fragment);
photosListElement.appendChild(fragment);
