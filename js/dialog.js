//события
'use strict';
(function () {
    var setup = document.querySelector('.setup');
    var setupOpen = document.querySelector('.setup-open');
    var setupClose = setup.querySelector('.setup-close');
    var inputName = setup.querySelector('.setup-user-name');

    var wizardSetup = setup.querySelector('.setup-player');
    var wizardFireBall = setup.querySelector('.setup-fireball-wrap');

    /** change color in wizard, start */
    var changeColor = function(arr){
        return arr[getRandomArbitary(arr)];
    };

    wizardSetup.addEventListener('click', function (evt) {

        if(evt.target.classList.contains('wizard-coat')){
            evt.target.style.fill = changeColor(COAT_COLORS);
        }
        if(evt.target.classList.contains('wizard-eyes')){
            evt.target.style.fill = changeColor(EYES_COLORS);
        }
    });

    wizardFireBall.addEventListener('click', function (evt) {
        evt.target.style.backgroundColor = changeColor(FIREBALL_COLORS);
    });
    /** change color in wizard, end */

    /** close and open popup, start */
    var onPopupEscPress = function (evt) {
        if( inputName !== document.activeElement) {
            window.util.isEscEvent(evt, closePopup);
        }
    };
    var openPopup = function(){
        setup.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
    };

    var  closePopup = function(){
        setup.style.top = '';
        setup.style.left = '';
        setup.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
    };

    setupOpen.addEventListener('click', function(){
        openPopup();
    });

    setupOpen.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPopup );
    });

    setupClose.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closePopup);
    });

    setupClose.addEventListener('click', function () {
        closePopup();
    });
    /** close and open popup, end */

    //validation form
    var userNameInput = setup.querySelector('.setup-user-name');

    userNameInput.addEventListener('invalid', function (evt) {
        if(userNameInput.validity.tooShort){
            userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
        }else if (userNameInput.validity.tooLong){
            userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
        }else if(userNameInput.validity.valueMissing){
            userNameInput.setCustomValidity('Обязательное поле');
        }else{
            userNameInput.setCustomValidity('');
        }
    });
    /**-------------------------------------------------------    Behavior    --------------------------------------------------------**/

    // move popup, start
    var dialogHandle = document.querySelector('.upload');

    dialogHandle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

      var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            setup.style.top = (setup.offsetTop - shift.y) + 'px';
            setup.style.left = (setup.offsetLeft - shift.x) + 'px';
        };

        var onMouseUp = function(upEvt){
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // move popup, end
})();



