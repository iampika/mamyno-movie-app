const headerSvg = document.querySelector('#header-svg');
const rubberBand = document.querySelector('#rubberBand');
const heroButton = document.querySelector('#hero-button');
const bodyWrap = document.querySelector('.body-wrap');
const overlay = document.querySelector('#overlay');
const fab = document.querySelectorAll('.fab');
const heroTitle = document.querySelector('.hero-title');
const heroParagraph = document.querySelector('.hero-paragraph');
const themeOne = document.querySelector('.theme-one');
const themeTwo = document.querySelector('.theme-two');
const themeThree = document.querySelector('.theme-three');
const themeFour = document.querySelector('.theme-four');
const themeFive = document.querySelector('.theme-five');
const themeSix = document.querySelector('.theme-six');

// eslint-disable-next-line no-unused-vars
const navToggleClass = () => {
  overlay.classList.toggle('close');
};

const toggleAnimation = () => {
  heroTitle.classList.toggle('paused');
  heroParagraph.classList.toggle('paused');
  heroButton.classList.toggle('paused');
  themeOne.classList.toggle('paused');
  themeTwo.classList.toggle('paused');
  themeThree.classList.toggle('paused');
  themeFour.classList.toggle('paused');
  themeFive.classList.toggle('paused');
  themeSix.classList.toggle('paused');
  rubberBand.classList.toggle('paused');
};

const rubberBandAnimation = () => {
  if (rubberBand.classList.contains('paused')) {
    rubberBand.classList.remove('rubberBand');
    toggleAnimation();
  } else {
    rubberBand.classList.add('rubberBand');
    setTimeout(() => {
      rubberBand.classList.remove('rubberBand');
      toggleAnimation();
    }, 1000);
  }
};

const fadeInUpAnimation = () => {
  if (heroTitle.classList.contains('paused')) {
    heroTitle.classList.remove('fadeInUp');
    heroParagraph.classList.remove('fadeInUp');
    heroButton.classList.remove('fadeInUp');
    themeOne.classList.remove('fadeInUp');
    themeTwo.classList.remove('fadeInUp');
    themeThree.classList.remove('fadeInUp');
    themeFour.classList.remove('fadeInUp');
    themeFive.classList.remove('fadeInUp');
    themeSix.classList.remove('fadeInUp');
    toggleAnimation();
  } else {
    heroTitle.classList.add('fadeInUp');
    heroParagraph.classList.add('fadeInUp');
    heroButton.classList.add('fadeInUp');
    themeOne.classList.add('fadeInUp');
    themeTwo.classList.add('fadeInUp');
    themeThree.classList.add('fadeInUp');
    themeFour.classList.add('fadeInUp');
    themeFive.classList.add('fadeInUp');
    themeSix.classList.add('fadeInUp');
    setTimeout(() => {
      heroTitle.classList.remove('fadeInUp');
      heroParagraph.classList.remove('fadeInUp');
      heroButton.classList.remove('fadeInUp');
      themeOne.classList.remove('fadeInUp');
      themeTwo.classList.remove('fadeInUp');
      themeThree.classList.remove('fadeInUp');
      themeFour.classList.remove('fadeInUp');
      themeFive.classList.remove('fadeInUp');
      themeSix.classList.remove('fadeInUp');
    }, 1000);
  }
};

rubberBandAnimation();
fadeInUpAnimation();

const changeThemeColor = (color1, color2, color3, color4) => {
  headerSvg.style.fill = color1;
  heroButton.style.background = `linear-gradient(65deg, ${color2} 0, ${color3} 100%)`;
  bodyWrap.style.background = color4;

  fab.forEach((ele) => {
    // eslint-disable-next-line no-param-reassign
    ele.style.color = color2;
  });
};

const changeThemeOne = () => {
  toggleAnimation();
  changeThemeColor('#c4c6ff', '#5d55fa', '#7069fa', '#e0e8f9');
  rubberBandAnimation();
  fadeInUpAnimation();
};

const changeThemeTwo = () => {
  toggleAnimation();
  changeThemeColor('#b6e0fe', '#2680c2', '#4098d7', '#dceefb');
  rubberBandAnimation();
  fadeInUpAnimation();
};

const changeThemeThree = () => {
  toggleAnimation();
  changeThemeColor('#fce588', '#de911d', '#f0b429', '#fffbea');
  rubberBandAnimation();
  fadeInUpAnimation();
};

const changeThemeFour = () => {
  toggleAnimation();
  changeThemeColor('#ffb088', '#f35627', '#f9703e', '#ffe8de');
  rubberBandAnimation();
  fadeInUpAnimation();
};

const changeThemeFive = () => {
  toggleAnimation();
  changeThemeColor('#ffb8d2', '#ad2167', '#c42d78', '#ffe0f0');
  rubberBandAnimation();
  fadeInUpAnimation();
};

const changeThemeSix = () => {
  toggleAnimation();
  changeThemeColor('#caff84', '#5cb70b', '#6cd410', '#f8ffed');
  rubberBandAnimation();
  fadeInUpAnimation();
};

themeOne.addEventListener('click', changeThemeOne);
themeTwo.addEventListener('click', changeThemeTwo);
themeThree.addEventListener('click', changeThemeThree);
themeFour.addEventListener('click', changeThemeFour);
themeFive.addEventListener('click', changeThemeFive);
themeSix.addEventListener('click', changeThemeSix);
