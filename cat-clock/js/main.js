var previousvalue = -1;
var state;


window.setInterval(function () {

    let d = new Date();
    let n = d.getTime();

    let nhours = d.getHours().toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false })
    let nminutes = d.getMinutes().toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false });
    let nseconds = d.getSeconds().toLocaleString('en', { minimumIntegerDigits: 2, minimumFractionDigits: 0, useGrouping: false });
    document.getElementById("hours").innerHTML = nhours;
    document.getElementById("minutes").innerHTML = nminutes;
    document.getElementById("seconds").innerHTML = nseconds;

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
}, 1000);

function generateList(subject, id_of_element, start, increment) {
    let min = 8,
        max = 20,
        opt,
        j,
        k,
        select = document.getElementById(id_of_element);

    for (let i = min; i < max; i++) {
        if (i + start < max) {
            k = start + i;

        } else {
            k = start + i - max + min;
        }
        j = calculateuptime(k, increment, min, max);
        opt = document.createElement('option');
        opt.value = k;
        opt.innerHTML = subject + ' is between ' + k + ' and ' + j;
        select.appendChild(opt);
    }
}

function calculateuptime(k, increment, min, max) {
    //let max = 21;
    let j;

    j = k + increment;
    if (j > max) {
        j = max - j;
        if (j < min) {
            j = j * (-1);
        }
    } else {

    }
    return j;
}

function PartyTime() {
    state = !state;
}

generateList('wake up time', 'wake-up-time', 0, 1);
generateList('go to lunch time', 'lunch-time', 4, 1);
generateList('go to dinner time', 'dinner-time', 10, 1);
generateList('nap time', 'bed-time', 5, 1);