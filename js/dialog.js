//события
'use strict';
(function () {

    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

    var setup = document.querySelector('.setup');
    var setupOpen = document.querySelector('.setup-open');
    var setupClose = setup.querySelector('.setup-close');
    var inputName = setup.querySelector('.setup-user-name');

    var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
    var wizardSetup = setup.querySelector('.setup-player');
    var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
    var wizardFireBall = setup.querySelector('.setup-fireball-wrap');
    var setupFireball = setup.querySelector('.setup-fireball');

    /** change color in wizard-coat, start */
    var changeColor = function(arr){
        return arr[getRandomArbitary(arr)];
    };

    wizardSetup.addEventListener('click', function (evt) {

        if(wizardCoat === evt.target){
            evt.target.style.fill = changeColor(COAT_COLORS);
        }
        if(wizardEyes === evt.target){
            evt.target.style.fill = changeColor(EYES_COLORS);
        }
    });

    wizardFireBall.addEventListener('click', function (evt) {
        evt.target.style.backgroundColor = changeColor(FIREBALL_COLORS);
    });

    var onPopupEscPress = function (evt) {
        document.addEventListener('keydown', function (evt) {
            if(evt.keyCode === ESC_KEYCODE && inputName !== document.activeElement){
                setup.classList.add('hidden');
            }
        });
    };

    /** change color in wizard-coat, end */


    var openPopup = function(){
        setup.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function(){
        setup.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
    };

    setupOpen.addEventListener('click', function(){
        openPopup();
    });

    setupOpen.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE){
            openPopup();
        }
    });

    setupClose.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE){
            closePopup();
        }
    });

    setupClose.addEventListener('click', function () {
        closePopup();
    });

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

    var dialogHandle = document.querySelector('.setup-title');


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

    var shopElement = document.querySelector('.setup-artifacts-shop');
    var draggedItem = null;

    shopElement.addEventListener('dragstart', function (evt) {
        if(evt.target.tagName.toLowerCase() === 'img'){
            draggedItem = evt.target;
            evt.dataTransfer.setData('text/plain'. evt.target.alt);
        }
    });

    var artifactsElement = document.querySelector('.setup-artifacts');

    artifactsElement.addEventListener('dragover', function (evt) {
        evt.preventDefault();
        return false;
    });

    artifactsElement.addEventListener('drop', function (evt) {
        evt.target.style.backgroundColor = '';
        evt.target.appendChild(draggedItem.cloneNode(true));
        evt.preventDefault();
    });

    artifactsElement.addEventListener('dragenter', function (evt) {
        evt.target.style.backgroundColor = 'yellow';
        evt.preventDefault();
    });

    artifactsElement.addEventListener('dragleave', function (evt) {
        evt.target.style.backgroundColor = '';
        evt.preventDefault();
    });

})();



