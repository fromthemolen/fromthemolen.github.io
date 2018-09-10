var previousvalue = -1;
var state = false;


window.setInterval(function () {
    let d = new Date();

    let n = d.getTime();

    let nhours = d.getHours().toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false })
    let nminutes = d.getMinutes().toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false });
    let nseconds = d.getSeconds().toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false });
    document.getElementById("hours").innerHTML = nhours;
    document.getElementById("minutes").innerHTML = nminutes;
    document.getElementById("seconds").innerHTML = nseconds;



    setPicture(state, previousvalue, d);

}, 1000);

function generateList(subject, id_of_element, start, min, max, increment) {
    //let min = 0,
    //max = 24,
    let opt,
        j,
        k,
        select = document.getElementById(id_of_element);

    for (let i = min; i < max; i++) {
        if (i < max - increment + 1) {
            j = calculateuptime(i, increment, min, 24);
            opt = document.createElement('option');
            if (i > 23) {
                k = i - 24;
            } else {
                k = i;
            }
            opt.value = k;
            opt.innerHTML = subject + ' is between ' + k + ' and ' + j;
            select.appendChild(opt);
        }
    }
}

function calculateuptime(k, increment, min, max) {
    let j;

    j = k + increment;
    if (j >= max) {
        j = max - j;
        if (j <= min) {
            j = j * (-1);
        }
    } else {

    }
    return j;
}

function PartyTime() {
    let d = new Date();

    setPicture(state, previousvalue, d);

    state = !state;

}

function setPicture(state, previousvalue, d) {
    let wakeup = document.getElementById("wake-up-time");
    let wakeuptime = wakeup.options[wakeup.selectedIndex].value;

    let lunch = document.getElementById("lunch-time");
    let lunchtime = lunch.options[lunch.selectedIndex].value;


    let dinner = document.getElementById("dinner-time");
    let dinnertime = dinner.options[dinner.selectedIndex].value;

    let bed = document.getElementById("bed-time");
    let bedtime = bed.options[bed.selectedIndex].value;


    if (state === true) {
        document.getElementById('cat-photo').src = "./img/party.jpg";
        if (previousvalue > -1) {
            previousvalue = -1
        } else {
            previousvalue = d.getHours();
        }


    } else {
        if (wakeuptime == d.getHours() && previousvalue != d.getHours()) {
            previousvalue = d.getHours();
            document.getElementById('cat-photo').src = "./img/wakeup.jpg";
        } else if (lunchtime == d.getHours() && previousvalue != d.getHours()) {
            previousvalue = d.getHours();
            document.getElementById('cat-photo').src = "./img/lunch.jpg";
        } else if (dinnertime == d.getHours() && previousvalue != d.getHours()) {
            previousvalue = d.getHours();
            document.getElementById('cat-photo').src = "./img/dinner.jpg";
        } else if (bedtime == d.getHours() && calculateuptime(bedtime, 8) > d.getHours() && previousvalue != d.getHours()) {
            previousvalue = d.getHours();
            document.getElementById('cat-photo').src = "./img/bed.jpg";
        } else if (previousvalue != d.getHours() || wakeuptime != d.getHours() && lunchtime != d.getHours() && dinnertime != d.getHours() && bedtime != d.getHours()) {
            document.getElementById('cat-photo').src = "./img/typingcat.jpg";
            previousvalue = -1;
        } else {

        }
    }
}

function setBedTimeAndLunchTime() {
    let wakeup = document.getElementById("wake-up-time");
    let wakeuptime = wakeup.options[wakeup.selectedIndex].value;

    let lunch = document.getElementById("lunch-time");
    let lunchtime = lunch.options[lunch.selectedIndex].value;


    let dinner = document.getElementById("dinner-time");
    let dinnertime = dinner.options[dinner.selectedIndex].value;

    let bed = document.getElementById("bed-time");
    let bedtime = bed.options[bed.selectedIndex].value;



    let selectbed = document.getElementById("bed-time");
    selectbed.options.length = 1;


    let selectlunch = document.getElementById("lunch-time");
    selectlunch.options.length = 1;

    let wakeupsleep = Number(dinnertime) + Number(wakeuptime);
 
    generateList('nap time', 'bed-time', Number(dinnertime) + 1, Number(dinnertime) + 1, wakeupsleep + 6, 8);
    generateList('go to lunch time', 'lunch-time', Number(wakeuptime) + 1, Number(wakeuptime) + 1, Number(dinnertime), 1);

    let selectwakeup = document.getElementById("wake-up-time");
    wakeuptime = wakeup.options[wakeup.selectedIndex].value;
    selectwakeup.options.length = 0;

    generateList('wake up time', 'wake-up-time', Number(wakeuptime), Number(wakeuptime), Number(wakeuptime) + 1, 1);
}

function setWakeUpTimeAndDinnerTime() {
    let wakeup = document.getElementById("wake-up-time");
    let wakeuptime = wakeup.options[wakeup.selectedIndex].value;

    let lunch = document.getElementById("lunch-time");
    let lunchtime = lunch.options[lunch.selectedIndex].value;


    let dinner = document.getElementById("dinner-time");
    let dinnertime = dinner.options[dinner.selectedIndex].value;

    let bed = document.getElementById("bed-time");
    let bedtime = bed.options[bed.selectedIndex].value;



    let selectwakeup = document.getElementById("wake-up-time");
    selectwakeup.options.length = 1;


    let selectdinner = document.getElementById("dinner-time");
    selectdinner.options.length = 1;

    let wakeupsleep = Number(bedtime) + 8;

    if(wakeupsleep > 24){
        wakeupsleep = wakeupsleep - 24;
    }else{

    }
 
    //generateList('go to lunch time', 'lunch-time', Number(wakeuptime)+2, 1);
    generateList('wake up time', 'wake-up-time', Number(wakeupsleep), Number(wakeupsleep), Number(lunchtime), 1);
    generateList('go to dinner time', 'dinner-time', Number(lunchtime) + 1, Number(lunchtime) + 1, Number(bedtime), 1);

    let selectlunch = document.getElementById("lunch-time");
    lunchtime = selectlunch.options[selectlunch.selectedIndex].value;
    selectlunch.options.length = 0;

    generateList('lunch time', 'lunch-time', Number(lunchtime), Number(lunchtime), Number(lunchtime) + 1, 1);

}

function setLunchTimeAndBedTime() {
    let wakeup = document.getElementById("wake-up-time");
    let wakeuptime = wakeup.options[wakeup.selectedIndex].value;
    let dinner = document.getElementById("dinner-time");
    let dinnertime = dinner.options[dinner.selectedIndex].value;
    let bed = document.getElementById("bed-time");
    let bedtime = bed.options[bed.selectedIndex].value;


    let selectlunch = document.getElementById("lunch-time");
    selectlunch.options.length = 1;


    let wakeupsleep = Number(wakeuptime) + 24;
    generateList('go to lunch time', 'lunch-time', Number(wakeuptime) + 1, Number(wakeuptime) + 1, Number(dinnertime), 1);

    let selectdinner = document.getElementById("dinner-time");
    dinnertime = selectdinner.options[selectdinner.selectedIndex].value;
    selectdinner.options.length = 0;

    generateList('dinner time', 'dinner-time', Number(dinnertime), Number(dinnertime), Number(dinnertime) + 1, 1);

    let selectbed = document.getElementById("bed-time");

    if(Number(selectbed.options[selectbed.selectedIndex].value) <= Number(selectdinner.options[0].value)){
        selectbed.options.length = 0;

    }else{
        selectbed.options.length = 1;

    }
    generateList('nap time', 'bed-time', Number(dinnertime) + 1, Number(dinnertime) + 1, wakeupsleep, 8);


}

function setDinnerTimeAndWakeUpTime() {
    let wakeup = document.getElementById("wake-up-time");
    let wakeuptime = wakeup.options[wakeup.selectedIndex].value;

    let lunch = document.getElementById("lunch-time");
    let lunchtime = lunch.options[lunch.selectedIndex].value;


    let dinner = document.getElementById("dinner-time");
    let dinnertime = dinner.options[dinner.selectedIndex].value;

    let bed = document.getElementById("bed-time");
    let bedtime = bed.options[bed.selectedIndex].value;

    let wakeupsleep = Number(bedtime) + 8;

    if(wakeupsleep > 24){
        wakeupsleep = wakeupsleep - 24;
    }else{

    }
    let selectdinner = document.getElementById("dinner-time");
    selectdinner.options.length = 1;
    let selectwakeup = document.getElementById("wake-up-time");
    selectwakeup.options.length = 1;

    generateList('wake up time', 'wake-up-time', Number(wakeupsleep), Number(wakeupsleep), Number(lunchtime), 1);
    generateList('go to dinner time', 'dinner-time', Number(lunchtime) + 1, Number(lunchtime) + 1, Number(bedtime), 1);

}




generateList('wake up time', 'wake-up-time', 8, 8, 12, 1);
generateList('go to lunch time', 'lunch-time', 12, 12, 17, 1);
generateList('go to dinner time', 'dinner-time', 18, 18, 24, 1);
generateList('nap time', 'bed-time', 19, 19, 32, 8);