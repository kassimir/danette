const is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
const main = document.querySelector('#satellite-container');

if (!is_mobile) {
  window.onload = setSatellites;
  window.onresize = setSatellites;
} else {
  main.style.display = 'none';
}

const modal = document.querySelector('#modal');
const modalImage = modal.querySelector('img');
const sats = Array.from(document.querySelectorAll('.satellite'));
const infoContainer = document.querySelector('#info-container');
const info = document.querySelector('#info');
const info1 = 'Kiss & Tell is the debut studio album by American band Selena Gomez & the Scene. The album was released on September 29, 2009 through Hollywood Records. The album is composed mainly of pop rock and electronic rock, with Gomez citing bands such as Forever the Sickest Kids as influences on the album.';
const info2 = 'A Year Without Rain is the second studio album by American band Selena Gomez & the Scene. The album was released on September 21, 2010, via Hollywood Records. Gomez worked with Rock Mafia duo Tim James and Antonina Armato, as well as Fefe Dobson, Toby Gad, and Superspy.';
const info3 = 'When the Sun Goes Down is the third and final studio album by American band Selena Gomez & the Scene, released on June 28, 2011, by Hollywood Records. The band worked with several artists on this album, including writers and producers from their debut, Kiss & Tell (2009).';
const info4 = 'Revival is the second studio album by American singer Selena Gomez. It was released on October 9, 2015, by Interscope Records, her first album released through that label. Preparation for the album began in 2014, when Gomez left her previous label Hollywood Records.';
const info5 = 'Gomez and the Norwegian DJ Kygo released a single together, "It Ain\'t Me", in February 2017.[225] The collaboration reached top ten of most major music charts worldwide, including the U.S. and the U.K.,[226][79] and attained top five peaks in Australia, Canada, Germany and many European countries.[227]';
const info6 = 'In May 2017, Gomez released the single "Bad Liar", alongside a vertical music video which was available for streaming only through Spotify;[242] it was the first-ever music video to premiere on Spotify.';
const informatica = [
  info1,
  info2,
  info3,
  info4,
  info5,
  info6
]

function hover(num) {
  info.style.backgroundColor = 'white';
  const w = infoContainer.offsetWidth;
  const h = infoContainer.offsetHeight;
  info.style.width = `${w * .7}px`;
  info.style.height = `${h * .7}px`;
  info.innerText = informatica[num];
  sats[num].style.filter = 'sepia(0)';
}

function leave(num) {
  info.style.backgroundColor = 'transparent';
  info.innerText = ''
  sats[num].style.filter = 'sepia(1)';
}

function showImage(src) {
  modalImage.src = src;
  modal.style.opacity = '1';
  modal.style.pointerEvents = 'all';
}

function closeModal() {
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
}

sats.forEach((s, i) => {
  s.addEventListener('mouseenter', () => hover(i));
  s.addEventListener('mouseleave', () => leave(i));
})

function setSatellites() {
  const maxWidth = main.offsetWidth;
  const maxHeight = main.offsetHeight;
  const size = maxWidth > maxHeight ? maxWidth * .5 : maxHeight * .5;
  // const infoContainerWidth = maxWidth * .5;
  // const infoContainerHeight = maxHeight * .5;

  infoContainer.style.height = size + 'px';
  infoContainer.style.width = size + 'px';

  let highestRight = lowestRight = highestTop = lowestTop = 0;

  distributeFields();

  function distributeFields() {
    const width = maxWidth / 2;
    const height = maxHeight / 2;
    let angle = 0;
    const step = 2 * Math.PI / sats.length;
    const radius = 0.7 * width;

    angle = -90 * Math.PI / 180;

    sats.forEach(function (element) {
      const x = Math.round(width + radius * Math.cos(angle)) - 75;
      if (x > highestRight) highestRight = x;
      if (x < lowestRight) lowestRight = x;
      const y = (Math.round(height + radius * Math.sin(angle))) - 75;
      if (y > highestTop) highestTop = y;
      if (y < lowestTop) lowestTop = y;
      element.style.right = x + 'px';
      element.style.top = y + 'px';
      angle = angle - step;
    });

    if (width > height) {
      info.style.width = (highestRight - lowestRight) - (radius - 30) + 'px';
      info.style.height = (highestRight - lowestRight) - (radius - 30) + 'px';
    } else {
      info.style.width = (highestTop - lowestTop) - (radius - 30) + 'px';
      info.style.height = (highestTop - lowestTop) - (radius - 30) + 'px';
    }
  }
}

