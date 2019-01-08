// Modal STARTS
document.addEventListener("DOMContentLoaded", function() {

    var _body = document.body,
        _targetModalID,
        _targetModal;

    document.querySelectorAll('[data-modal="modal"]').forEach(function(item) {
        item.addEventListener('click', function() {
            openModal(this);
        }, false);
    });

    var openModal = function(item) {

        _targetModalID = item.getAttribute('data-target');
        _targetModal = document.querySelector(_targetModalID);        

        _targetModal.setAttribute('aria-hidden', 'false'); // shows modal screen
        _body.classList.add('noscroll'); // disable scroll on body

        setTimeout(function() {
            _targetModal.scrollTop = 0;
            if(_targetModalID == '#searchModule') {
                _targetModal.querySelector('input').focus(); // focuses to input area
            }
        }, 100);

        _targetModal.querySelectorAll('.close').forEach(function(item) {
            item.addEventListener('click', function() {
                closeModal(_targetModal);
            });
        });

        _targetModal.querySelector('.modal-backdrop').addEventListener('click', function() {
            closeModal(_targetModal);
        });
        
        
    }

    var closeModal = function(item) {
        if(item.querySelector('input')) {
            item.querySelector('input').value = ''; // clears input value
        }
        item.setAttribute('aria-hidden', 'true'); // hides modal screen
        _body.classList.remove('noscroll'); // enable scroll on body
    }

    

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            if(document.querySelectorAll('[aria-hidden="false"]').length > 0) {
                closeModal(_targetModal);
            }  
        }
    };
    
});
// Modal ENDS