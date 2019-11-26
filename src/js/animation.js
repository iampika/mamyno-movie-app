const rubberBand = document.querySelector('#rubberBand');
const heroButton = document.querySelector('#hero-button');
const heroTitle = document.querySelectorAll('.hero-title');
const heroParagraph = document.querySelectorAll('.hero-paragraph');
const themeOne = document.querySelector('.theme-one');
const themeTwo = document.querySelector('.theme-two');
const themeThree = document.querySelector('.theme-three');
const themeFour = document.querySelector('.theme-four');
const themeFive = document.querySelector('.theme-five');
const themeSix = document.querySelector('.theme-six');

export const toggleAnimation = () => {
  heroTitle.forEach(title => {
    title.classList.toggle('paused');
  });
  heroParagraph.forEach(paragraph => {
    paragraph.classList.toggle('paused');
  });
  heroButton.classList.toggle('paused');
  themeOne.classList.toggle('paused');
  themeTwo.classList.toggle('paused');
  themeThree.classList.toggle('paused');
  themeFour.classList.toggle('paused');
  themeFive.classList.toggle('paused');
  themeSix.classList.toggle('paused');
  rubberBand.classList.toggle('paused');
};

export const rubberBandAnimation = (fetching = false) => {
  if (fetching) {
    toggleAnimation();
    rubberBand.classList.add('rubberBand');
    setTimeout(() => {
      rubberBand.classList.remove('rubberBand');
      toggleAnimation();
    }, 1000);
  } else {
    if (rubberBand.classList.contains('rubberBand')) {
      if (rubberBand.classList.contains('paused')) {
        rubberBand.classList.remove('rubberBand');
        toggleAnimation();
      }
    } else if (rubberBand.classList.contains('paused')) {
      toggleAnimation();
      rubberBand.classList.add('rubberBand');
      setTimeout(() => {
        rubberBand.classList.remove('rubberBand');
        toggleAnimation();
      }, 1000);
    } else {
      rubberBand.classList.add('rubberBand');
      setTimeout(() => {
        rubberBand.classList.remove('rubberBand');
        toggleAnimation();
      }, 1000);
    }
  }
};

export const fadeInUpAnimation = () => {
  if (themeOne.classList.contains('paused')) {
    heroTitle.forEach(title => {
      title.classList.remove('fadeInUp');
    });
    heroParagraph.forEach(paragraph => {
      paragraph.classList.remove('fadeInUp');
    });
    heroButton.classList.remove('fadeInUp');
    themeOne.classList.remove('fadeInUp');
    themeTwo.classList.remove('fadeInUp');
    themeThree.classList.remove('fadeInUp');
    themeFour.classList.remove('fadeInUp');
    themeFive.classList.remove('fadeInUp');
    themeSix.classList.remove('fadeInUp');
    toggleAnimation();
  } else {
    heroTitle.forEach(title => {
      title.classList.add('fadeInUp');
    });
    heroParagraph.forEach(paragraph => {
      paragraph.classList.add('fadeInUp');
    });
    heroButton.classList.add('fadeInUp');
    themeOne.classList.add('fadeInUp');
    themeTwo.classList.add('fadeInUp');
    themeThree.classList.add('fadeInUp');
    themeFour.classList.add('fadeInUp');
    themeFive.classList.add('fadeInUp');
    themeSix.classList.add('fadeInUp');
    setTimeout(() => {
      heroTitle.forEach(title => {
        title.classList.remove('fadeInUp');
      });
      heroParagraph.forEach(paragraph => {
        paragraph.classList.remove('fadeInUp');
      });
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
