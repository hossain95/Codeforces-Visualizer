var targetTime = new Date("1 Jan 2022");
function CountDownTime()
{
    var presetTime = new Date();
    var TotalTime = targetTime.getTime()-presetTime.getTime();
    var rem = TotalTime%1000;
    TotalTime -= rem;
    TotalTime /= 1000;
    var sec = TotalTime%60;
    TotalTime -= sec;
    TotalTime = TotalTime/60;
    var min = TotalTime%60;
    TotalTime -= min;
    TotalTime = TotalTime/60;
    var hour = TotalTime%24;
    TotalTime -= hour;
    var day = TotalTime/24;

    console.log(day, hour, min,sec);
    document.getElementById("days").innerHTML = checkFormat(day);
    document.getElementById("hours").innerHTML = checkFormat(hour);
    document.getElementById("mins").innerHTML = checkFormat(min);
    document.getElementById("seconds").innerHTML = checkFormat(sec);
}

function checkFormat(tim)
{
    if(tim < 10)
    {
        return (`0${tim}`);
    }
    else
    {
        return tim;
    }
}
CountDownTime();

setInterval(CountDownTime, 1000);