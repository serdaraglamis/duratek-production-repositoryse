// Accordion Script STARTS
document.addEventListener("DOMContentLoaded", () => {

    const _items = document.querySelectorAll('.accordion-item');

    document.querySelectorAll('.accordion-item.active').forEach((item) => {
        const _el = item;
        const _elLink = _el.querySelector('.accordion-link');
        const _elContent = _el.querySelector('.accordion-content');
        //console.log('açılıyor...[once]');
        _elContent.style.maxHeight = _elContent.scrollHeight + 96 + 'px';
        _el.classList.add('active');
    });

    _items.forEach((el) => {
        const _el = el;
        const _elLink = _el.querySelector('.accordion-link');
        const _elContent = _el.querySelector('.accordion-content');
        
        _elLink.addEventListener('click', () => {
            //console.log('clicked');
            if (_el.classList.contains('active')){
                //console.log('kapatılıyor... [if]');
                _elContent.style.maxHeight = null;
                _el.classList.remove('active');
            } else {
                //console.log('açılıyor... [else]');
                _elContent.style.maxHeight = _elContent.scrollHeight + 96 + 'px';
                _el.classList.add('active');
            } 
        });
    });

});
// Accordion Script ENDS