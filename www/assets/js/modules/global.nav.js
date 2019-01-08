// Global Navigation STARTS
document.addEventListener("DOMContentLoaded", () => {
  
  const _hasSubnav = document.querySelectorAll('.gn-menu-item.has-children');
  const _subnavBackdrop = document.querySelectorAll('.gn-subnav-backdrop');

  let _openedSubnav = null;
  let _clickedMenuitem;

  _hasSubnav.forEach( (el) => {
    el.addEventListener('click', () => {
      const _targetID = '#' + el.querySelector('a').dataset.target;
      const _targetSubnav = document.querySelector(_targetID);
      const _isOpened = _targetSubnav.classList.contains('show');

      _clickedMenuitem = el;
      //console.log(_isOpened);

      if(!_isOpened) {
        //console.log('openSubnav activated...');
        openSubnav(_targetSubnav);
      } else {
        //console.log('closeSubnav activated...');
        closeSubnav(_targetSubnav);
      }
      
    });
    
  });

  _subnavBackdrop.forEach((el) => {
    el.addEventListener('click', () => {
      closeSubnav(_openedSubnav);
    });
  });

  function openSubnav(el) {
    _openedSubnav = el;
    el.classList.add('show');
    _clickedMenuitem.classList.add('subnav-shown');
  }
  function closeSubnav(el) {
    el.classList.remove('show');
    _clickedMenuitem.classList.remove('subnav-shown');
  }




  const _globalHamburger = document.querySelector('.gn-options-item.hamburger');
  _globalHamburger.querySelector('a').addEventListener('click', function() {
    const _isActive = _globalHamburger.classList.contains('active');
    if(_isActive) {
      //console.log(_isActive);
      _globalHamburger.classList.remove('active');
      closeMainMenu();
    } else {
      //console.log(_isActive);
      _globalHamburger.classList.add('active');
      openMainMenu();
    }
    
  });

  document.querySelector('.gn-subnav-close').addEventListener('click', () => {
    closeSubnav(_openedSubnav);
  });

  function openMainMenu() {
    document.querySelector('body').classList.add('noscroll');
    document.querySelector('.gn-menu').classList.add('show');
  }
  function closeMainMenu() {
    document.querySelector('body').classList.remove('noscroll');
    document.querySelector('.gn-menu').classList.remove('show');
  }
});
// Global Navigation ENDS