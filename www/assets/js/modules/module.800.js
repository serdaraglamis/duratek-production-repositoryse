// Module 800 STARTS
document.addEventListener("DOMContentLoaded", function() {

    var _body = document.body,
        _hasSubMenu = document.querySelector('.module-800-menu-item.has-children'),
        _targetID = _hasSubMenu.getAttribute('data-target'),
        _target = document.getElementById(_targetID),
        _isOpened;

    //_hasSubMenu.addEventListener('click', openCloseSubmenu, true);
    //document.querySelector('.module-800').addEventListener('blur', openCloseSubmenu, true);
    
    function openSubmenu() {
        _target.classList.add('show');
        _hasSubMenu.classList.add('active');
    }
    function closeSubmenu() {
        _target.classList.remove('show');
        _hasSubMenu.classList.remove('active');
    }
    
    window.addEventListener('click', function(e){
        _isOpened = _target.classList.contains('show');
        if (_hasSubMenu.contains(e.target)){
            if(!_isOpened) {
                openSubmenu();  
            } else {
                closeSubmenu();
            }
        } else {
            closeSubmenu();
        }
    }, true);

    document.querySelector('.module-801-close').addEventListener('click', function() {
        closeSubmenu();
    });

    document.querySelector('.module-800-options-item.hamburger').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.module-800-menu').classList.toggle('mobile');        
    });
    
});
// Module 800 ENDS