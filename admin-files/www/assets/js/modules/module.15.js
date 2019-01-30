// Module 15 STARTS
document.addEventListener("DOMContentLoaded", function() {

    var _body = document.body,
        _container = document.querySelector('.module-15'),
        _loaderLogo = document.querySelector('.module-15-image'),
        _navLogo = document.querySelector('.module-800-brand'),
        _navLogoRect,
        _navLogoWidth,
        _navLogoTop,
        _navLogoLeft,
        _loaderLogoRect,
        _loaderLogoWidth,
        _loaderLogoTop,
        _loaderLogoLeft;
    
    
    
    _body.classList.add('noscroll');

    Pace.on('done', function(){
        _container.style.backgroundColor = 'transparent';
        _loaderLogo.classList.add('free');

        //console.log(_loaderLogoWidth + ' - ' + _loaderLogoTop + ' - ' + _loaderLogoLeft);

        _navLogoRect = _navLogo.getBoundingClientRect();
        _navLogoWidth = _navLogoRect.width;
        _navLogoTop = _navLogoRect.top;
        _navLogoLeft = _navLogoRect.left;

        _loaderLogo.style.left = _navLogoLeft + 'px';
        _loaderLogo.style.top = _navLogoTop + 'px';
        _loaderLogo.style.width = _navLogoWidth + 'px';
        _loaderLogo.style.opacity = 0;

        //console.log(_navLogoWidth + ' - ' + _navLogoTop + ' - ' + _navLogoLeft);

        setInterval(function() {
            _body.classList.remove('noscroll');
            document.querySelector('.module-15').setAttribute('aria-hidden', 'true');
        }, 300);
 
    });
});
// Module 15 ENDS