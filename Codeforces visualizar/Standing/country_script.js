document.getElementById("form2").addEventListener("submit", (e)=>
{
    e.preventDefault();
    var countryName = document.getElementById("country").value;
    var contestId = document.getElementById("contestid2").value;
    console.log(countryName);
    console.log(contestId);

    //reload
    $( "#div1").load("index.html #div1");
    $( "#div").load("index.html #div");

    const AllUser = fetch(`https://codeforces.com/api/user.ratedList?activeOnly=true`);
    const Round = fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&showUnofficial=true`);
    Promise.all([AllUser, Round]).then((values)=>
    {
        return Promise.all(values.map(r=>r.json()));
    }).then(([AllUser, Round]) =>
    {
        console.log(AllUser);
        console.log(Round);
        var handleObj = {};
        var result = AllUser.result;
        for(i = 0; i < result.length; i++)
        {
            if(result[i].country === countryName)
            {
               handleObj[result[i].handle] = result[i].rating;
            }
        }
        
        var standing = Round.result.rows;
        var info = [];
        for(i = 0; i < standing.length; i++)
        {
            var findHandle = standing[i].party.members;
            findHandle = findHandle[0].handle;
            //var ok = handleArr.includes(findHandle);//here
            if(handleObj[findHandle] > 0)
            {
                if(standing[i].party.participantType === "CONTESTANT")
                {
                    var arr = [];
                    var rank = standing[i].rank;
                    if(rank === 0)
                    {
                        rank = standing.length;
                    }
                    arr.push(rank);
                    arr.push(findHandle);
                    arr.push(standing[i].points);
                    arr.push(handleObj[findHandle]);
                    info.push(arr);
                }
            }
        }
        console.log(info);
        document.getElementById("countryname").innerText = countryName;
        for(i = 0; i < info.length; i++)
        {
            const trow = document.createElement('tr');
            document.getElementById("table1").appendChild(trow);
            trow.setAttribute('id', "tr1"+i);
            if(i%2 == 1)
            {
                document.getElementById("tr1"+i).style.backgroundColor = "#fff";
            }
            const th5 = document.createElement('th');
            document.getElementById("tr1"+i).appendChild(th5);
            th5.setAttribute('id', "th1"+i);
            document.getElementById("th1"+i).innerText = i+1;
        
            const th6 = document.createElement('th');
            document.getElementById("tr1"+i).appendChild(th6);
            th6.setAttribute('id', "th2"+i);
            document.getElementById("th2"+i).innerText = info[i][0];
        
            const th7 = document.createElement('th');
            document.getElementById("tr1"+i).appendChild(th7);
            th7.setAttribute('id', "th3"+i);
            document.getElementById("th3"+i).innerText = info[i][1];
        
            const th8 = document.createElement('th');
            document.getElementById("tr1"+i).appendChild(th8);
            th8.setAttribute('id', "th4"+i);
            document.getElementById("th4"+i).innerText = info[i][2];
        }
        document.getElementById("h4").style.display = "none";
        document.getElementById("table1").style.display = "";
    }).catch((e) =>
    {
        console.log(e);
        document.getElementById("h4").innerText = "Something is Worng Plase reload..";
    });
});