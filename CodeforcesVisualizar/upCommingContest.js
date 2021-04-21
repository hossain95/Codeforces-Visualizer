function daysInMonth (month, year)
{
    return new Date(year, month, 0).getDate();
}
var feb = daysInMonth(2, new Date().getFullYear());
var day_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
day_in_months[1] = feb;


var tableStyle = {
    "width": "90%",
    "margin-top": "10px",
    "background-color": "#ecf0f1",
    "border-style": "solid",
    "margin-left": "35px",
};
var trStyle = {
    "width":"100%",
};
var th1Style = {
    "width": "20%",
    "text-align" : "right",
};
var th2Style = {
    "width": "80%",
    "text-align": "left",
    "padding-left": "30px",
};

url = `https://codeforces.com/api/contest.list?gym=false`;
fetch(url).then((response)=>
{
    return response.json();
}).then((data)=>
{
    result = data.result;
    var name = [];
    var type = [];
    var time = [];
    var dur = [];
    for(i = 0; i < result.length; i++)
    {
        if(result[i].phase !== "BEFORE")
        {
            break;
        }
        name.push(result[i].name);
        type.push(result[i].type);
        time.push(result[i].startTimeSeconds);
        dur.push(result[i].durationSeconds);
    }
    for(i = name.length-1; i >= 0; i--)
    {
        //console.log(name[i] + " "+ id[i] + " "+ time[i] + " "+ dur[i]);
        var startTimes = time[i];
        //before constest start
        var totalTime = parseInt(new Date().getTime()/1000);
        var TimeStore = totalTime;

        var targetTime = startTimes;

        totalTime = targetTime-totalTime;
        var remS = totalTime%60;
        totalTime = parseInt(totalTime/60);
        var remM = totalTime%60
        totalTime = parseInt(totalTime/60);
        var remH = totalTime%24;
        totalTime = parseInt(totalTime/24);
        var remD = totalTime;
        //console.log(remD + " " + remH + " "+ remM + " "+ remS);
        //before contest end


        var myDate = new Date();
        var preD = myDate.getDate();
        var preH = myDate.getHours();
        var preM = myDate.getMinutes();
        var preS = myDate.getSeconds();
        var preMonth = myDate.getMonth();
        var preYear = myDate.getFullYear();
        //console.log(preYear+ " "+ preMonth+ " || "+ preD+ " "+ preH+ " "+preM + " "+ preS);

        var rem = Math.floor((preS+remS)/60);
        var Min = (preM+remM+rem);
        var MM = Min%60;
        rem = Math.floor(Min/60);
        Min = MM;
        var Hour = (preH+remH+rem);
        var HH = Hour%24;
        rem = Math.floor(Hour/24);
        Hour = HH;
        var Day = (preD+remD+rem);
        if(Day > day_in_months[preMonth])
        {
            Day = Day-day_in_months[preMonth];
            preMonth++;
        }
        preMonth += 1;
        if(preMonth > 12)
        {
            preYear++;
        }
        //console.log(preYear+" "+preMonth+" "+ Day+ " || "+ Hour+ " "+Min);
        var durr = dur[i];
        durr = parseInt(durr/60);
        var durHour = parseInt(durr/60);
        var durMin = durr%60;
        var ampm = "AM";
        if(Hour > 12)
        {
            ampm = "PM";
            Hour = Hour%12;
        }
        Min = check(Min);
        Hour = check(Hour);
        Day = check(Day);
        preMonth = check(preMonth);
        durHour = check(durHour);
        durMin = check(durMin);
        console.log(durHour+ " " +durMin);



        document.getElementById("upcomming").innerText = "Up Comming Contest";
        const table = document.createElement('table');
        document.getElementById("upcommingcontest").appendChild(table);
        table.setAttribute('id', "table"+i);

        var x = document.getElementById("table"+i);
        Object.assign(x.style, tableStyle);

        const tr1 = document.createElement('tr');
        document.getElementById("table"+i).appendChild(tr1);
        tr1.setAttribute('id', "tr1"+i);

        x = document.getElementById("tr1"+i);
        Object.assign(x.style, trStyle);

        const th1 = document.createElement('th');
        document.getElementById("tr1"+i).appendChild(th1);
        th1.setAttribute('id', "th1"+i);
        x = document.getElementById("th1"+i);
        Object.assign(x.style, th1Style);
        document.getElementById("th1"+i).innerText = "Name: ";

        const th2 = document.createElement('th');
        document.getElementById("tr1"+i).appendChild(th2);
        th2.setAttribute('id', "th2"+i);
        x = document.getElementById("th2"+i);
        Object.assign(x.style, th2Style);
        document.getElementById("th2"+i).innerText = name[i];


        const tr2 = document.createElement('tr');
        document.getElementById("table"+i).appendChild(tr2);
        tr2.setAttribute('id', "tr2"+i);

        x = document.getElementById("tr2"+i);
        Object.assign(x.style, trStyle);
        

        const th3 = document.createElement('th');
        document.getElementById("tr2"+i).appendChild(th3);
        th3.setAttribute('id', "th3"+i);
        x = document.getElementById("th3"+i);
        Object.assign(x.style, th1Style);
        document.getElementById("th3"+i).innerText = "Type: ";

        const th4 = document.createElement('th');
        document.getElementById("tr2"+i).appendChild(th4);
        th4.setAttribute('id', "th4"+i);
        x = document.getElementById("th4"+i);
        Object.assign(x.style, th2Style);
        document.getElementById("th4"+i).innerText = type[i];



        const tr3 = document.createElement('tr');
        document.getElementById("table"+i).appendChild(tr3);
        tr3.setAttribute('id', "tr3"+i);

        x = document.getElementById("tr3"+i);
        Object.assign(x.style, trStyle);

        const th5 = document.createElement('th');
        document.getElementById("tr3"+i).appendChild(th5);
        th5.setAttribute('id', "th5"+i);
        x = document.getElementById("th5"+i);
        Object.assign(x.style, th1Style);
        document.getElementById("th5"+i).innerText = "Duration: ";

        const th6 = document.createElement('th');
        document.getElementById("tr3"+i).appendChild(th6);
        th6.setAttribute('id', "th6"+i);
        x = document.getElementById("th6"+i);
        Object.assign(x.style, th2Style);
        document.getElementById("th6"+i).innerText = durHour+":"+durMin;

        const tr4 = document.createElement('tr');
        document.getElementById("table"+i).appendChild(tr4);
        tr4.setAttribute('id', "tr4"+i);

        x = document.getElementById("tr4"+i);
        Object.assign(x.style, trStyle);

        const th7 = document.createElement('th');
        document.getElementById("tr4"+i).appendChild(th7);
        th7.setAttribute('id', "th7"+i);
        x = document.getElementById("th7"+i);
        Object.assign(x.style, th1Style);
        document.getElementById("th7"+i).innerText = "Start: ";
        const th8 = document.createElement('th');
        document.getElementById("tr4"+i).appendChild(th8);
        th8.setAttribute('id', "th8"+i);
        x = document.getElementById("th8"+i);
        Object.assign(x.style, th2Style);
        document.getElementById("th8"+i).innerText = Day + "/"+preMonth+"/"+preYear+" "+Hour+":"+Min+" "+ampm;
        document.getElementById("fullcontainer").style.display = "";
    }
});

function check(d)
{
    if(d < 10)
    {
        return (`0${d}`);
    }
    else
    {
        return d;
    }
}