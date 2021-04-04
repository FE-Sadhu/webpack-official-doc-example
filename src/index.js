import _ from 'lodash';
import './style.css';
import Egg from './egg.png';

function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Egg;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());