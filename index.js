document.addEventListener('DOMContentLoaded', () => {
  const prince = document.querySelector('#prince');

  let bottom = 0;
  let left = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId = '';
  let rightTimerId = '';

  function jump() {
    if (isJumping) return; // jump only if at bottom, jump only once
    let timerUpId = setInterval(() => {
      if (bottom >= 200) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(() => {
          if (bottom <= 0) {
            prince.classList.add('prince');
            prince.classList.remove('prince-slide');
            clearInterval(timerDownId);
            isJumping = false;
          }
          bottom -= 5;
          prince.style.bottom = bottom + 'px';
        }, 20);
      }
      isJumping = true;
      prince.classList.add('prince-slide');
      prince.classList.remove('prince');
      bottom += 30;
      bottom = bottom * gravity;
      prince.style.bottom = bottom + 'px';
    }, 20);
  }

  function slideLeft() {
    if(isJumping) {
      prince.classList.add('prince-slide');
      prince.classList.remove('prince');
    }
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    clearInterval(leftTimerId);
    leftTimerId = setInterval(() => {
      if (left <= 0) return;
      left -= 5;
      prince.style.left = left + 'px';
    }, 20);
  }

  function slideRight() {
    if (isJumping) {
      prince.classList.add('prince-slide');
      prince.classList.remove('prince');
    }
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    clearInterval(rightTimerId);
    rightTimerId = setInterval(() => {
      if(left >= 550) {
        return;
      }
      left += 5;
      prince.style.left = left + 'px';
    }, 20);
  }




  // assign function control to key codes

  function control(e) {
    if (e.keyCode === 38) {
      jump();
    } else if (e.keyCode === 37) {
      slideLeft();
    } else if (e.keyCode === 39) {
      slideRight();
    }
  }

  document.addEventListener('keydown', control);
});