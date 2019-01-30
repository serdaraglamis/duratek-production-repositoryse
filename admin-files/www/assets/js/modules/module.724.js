// Module 724 STARTS
document.addEventListener("DOMContentLoaded", function() {

    const _body = document.body;
    const _items = document.querySelectorAll('.module-724-item');

    _items.forEach((el) => {
        const _elLink = el.querySelector('.module-724-item-link');
        const _elContent = el.querySelector('.module-724-item-content');
        const _el = el;
        _elLink.addEventListener('click', () => {
            if (_el.classList.contains('active')){
                //console.log('kapatılıyor...');
                _elContent.style.maxHeight = null;
                _el.classList.remove('active');
            } else {
                //console.log('açılıyor...');
                _elContent.style.maxHeight = _elContent.scrollHeight + 96 + 'px';
                _el.classList.add('active');
            } 
        });
    });
});
// Module 724 ENDS