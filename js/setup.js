
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomArbitary = function (array){
    var min = 0;
    var max = array.length - 1;
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

var wizards = [
    {
        name: WIZARD_NAMES[getRandomArbitary(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomArbitary(WIZARD_SURNAMES)],
        coatColor: COAT_COLORS[getRandomArbitary(COAT_COLORS)],
        eyesColor: EYES_COLORS[getRandomArbitary(EYES_COLORS)]
    },
    {
        name: WIZARD_NAMES[getRandomArbitary(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomArbitary(WIZARD_SURNAMES)],
        coatColor: COAT_COLORS[getRandomArbitary(COAT_COLORS)],
        eyesColor: EYES_COLORS[getRandomArbitary(EYES_COLORS)]
    },
    {
        name: WIZARD_NAMES[getRandomArbitary(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomArbitary(WIZARD_SURNAMES)],
        coatColor: COAT_COLORS[getRandomArbitary(COAT_COLORS)],
        eyesColor: EYES_COLORS[getRandomArbitary(EYES_COLORS)]
    },
    {
        name: WIZARD_NAMES[getRandomArbitary(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomArbitary(WIZARD_SURNAMES)],
        coatColor: COAT_COLORS[getRandomArbitary(COAT_COLORS)],
        eyesColor: EYES_COLORS[getRandomArbitary(EYES_COLORS)]
    }
];


//create similar wizards, start
var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
};

var fragment = document.createDocumentFragment();
for(var i = 0; i < wizards.length; i++){
    fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
//create similar wizards, end


// artifacts shop, start
var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;
var artifactsElement = document.querySelector('.setup-artifacts');


shopElement.addEventListener('dragstart', function (evt) {
    if(evt.target.tagName.toLowerCase() === 'img'){
        draggedItem = evt.target;
        artifactsElement.style.outline = '2px dashed red';
        evt.dataTransfer.setData('text/plain', evt.target.alt);

    }
});

artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
});

artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if(evt.target.childElementCount === 0 && evt.target.className === 'setup-artifacts-cell'){
        evt.target.appendChild(draggedItem.cloneNode(true));
    }
    artifactsElement.style.outline = '';
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
// artifacts shop, end