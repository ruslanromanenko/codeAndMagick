
var getMaxElement = function(arr){

    var max = -1;
    var maxIndex = -1;
    var result = [];

    for (var i = 0; i < arr.length; i++){

        var time = arr[i];
        if(time > max){
            max = Math.round(time);
            maxIndex = i;
        }
    }
    result = [max, maxIndex];
    return result;
}

var drawCloudRect = function(x, y, width, heigth, ctx){

    ctx.strokeRect(x, y, width, heigth);
    ctx.fillRect(x, y, width, heigth);

}

var drawText = function( text, x, y, ctx ){

    ctx.fillText(text, x, y);
}


window.renderStatistics = function (ctx, names, times) {

    //рисуем тень под облаком
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    drawCloudRect(110, 20, 420, 270, ctx);

    //рисуем облако
    ctx.fillStyle = 'white';
    drawCloudRect(100, 10, 420, 270, ctx);

    //пишем текст
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    drawText('Ура, вы победили!', 120, 40, ctx);
    drawText('Список результатов:', 120, 55, ctx);



    var max = getMaxElement(times)[0];
    var maxIndex = getMaxElement(times)[1];

    var histogramWidth = 150;
    var histogramHeigth = -150;
    var step = histogramHeigth / (max - 0);

    ctx.fillText('Худшее время: ' + max + 'мс у игрока ' + names[maxIndex], 120, 70);

/*
    var barHeigth = 15;  // px;
    var indent = 40;     // px;
    var initialX = 120;  // px;
    var initialY = 90;   // px;
    var lineHeigth = 15; // px;

    for(var i = 0; i < times.length; i++){

        if(names[i] === 'Вы'){
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        }else{
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        }
        ctx.fillRect(initialX, initialY + indent * i, times[i] * step, barHeigth );
        ctx.fillText(names[i], initialX + histogramHeigth, initialY + lineHeigth + indent * i);
    }*/

    var barWidth = 40;  // px;
    var indent = 50;     // px;
    var initialX = 200;  // px;
    var initialY = 270;   // px;
    var lineHeigth = 15; // px;


    for(var i = 0; i < times.length; i++){
        if(names[i] === 'Вы'){
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        }else{
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        }
        ctx.fillRect(initialX + indent * i, initialY, barWidth, times[i] * step );
        ctx.fillText(names[i], initialX  + indent * i , initialY + histogramHeigth - lineHeigth);
    }
}