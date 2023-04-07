import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEO_CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(function(event) {
  const currentTime = event.seconds;
  localStorage.setItem(VIDEO_CURRENT_TIME_KEY, currentTime);
}, 1000));

const currentTime = localStorage.getItem(VIDEO_CURRENT_TIME_KEY);
if (currentTime) {
  player.setCurrentTime(currentTime);
}