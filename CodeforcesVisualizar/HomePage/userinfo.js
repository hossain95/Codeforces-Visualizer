var han = document.getElementById("handle");
var form = document.getElementById("form1");
form.addEventListener("submit", (e) =>
{
    e.preventDefault();

    //display show and hide
    document.getElementById("usercontainer").style.display = ""
    document.getElementById("error").innerText = "";
    //reload the page
    $( "#usercontainer").load("index.html #usercontainer");
    
    $( "#usercontainertwo").load("index.html #usercontainertwo");


    var handle = han.value;
    var val1 = handle;
    var val2 = val1;
    const userinfo = fetch(`https://codeforces.com/api/user.info?handles= ${handle}`);
    const status = fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const participate = fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    Promise.all([userinfo, status, participate]).then((values)=>
    {
        return Promise.all(values.map( r=> r.json()));
    }).then(([userinfo, status, participate]) =>
    {
        console.log(userinfo);
        console.log(status);
        console.log(participate);
        /*make the form to html start*/
       
        
        function createtable1()
        {
            if(val1 == 0)
            {
                return;
            }
            const sample1 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample1);
            sample1.setAttribute('id', "sample1");
            document.getElementById("sample1").style.width = "900px";
            document.getElementById("sample1").style.height = "250px";
            document.getElementById("sample1").style.textAlign = "center";
            document.getElementById("sample1").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample1").style.backgroundColor = "#dfe6e9";
            //document.getElementById("sample1").style.paddingTop = "50px";
            document.getElementById("sample1").style.marginTop = "30px";
            document.getElementById("sample1").style.marginBottom = "40px";

            const table1 = document.createElement('table');
            document.getElementById("sample1").appendChild(table1);
            table1.setAttribute('id', "table1");
            document.getElementById("table1").style.width = "100%";
            document.getElementById("table1").style.marginTop = "15px";
            document.getElementById("table1").style.borderStyle = "solid";
            for(i = 1; i <= 5; i++)
            {
                var v = document.createElement('tr');
                document.getElementById("table1").appendChild(v);
                v.setAttribute('id', "tr1"+i);
                document.getElementById("tr1"+i).style.height = "50px";
                if(i%2 == 1)
                {
                    document.getElementById("tr1"+i).style.backgroundColor = "#fff";
                }
                for(j = 1; j <= 2; j++)
                {
                    var x = document.createElement('th');
                    document.getElementById("tr1"+i).appendChild(x);
                    x.setAttribute('id', "th1"+i+j);
                    document.getElementById("th1"+i+j).style.width = "50%";
                }
            }
        }
        createtable1();


        var result = userinfo.result[0];
        //console.log(result);
        var rating = result.rating;
        var maxRating = result.maxRating;
        var rank = result.rank;
        var maxRank = result.maxRank;
        var userName = result.firstName+ " "+ result.lastName;
        document.getElementById("th111").innerText = "Name";
        document.getElementById("th112").innerText = userName;
        document.getElementById("th121").innerText = "Rating";
        document.getElementById("th122").innerText = rating;
        document.getElementById("th131").innerText = "Max Rating";
        document.getElementById("th132").innerText = maxRating;
        document.getElementById("th141").innerText = "Rank";
        document.getElementById("th142").innerText = rank;
        document.getElementById("th151").innerText = "Max Rank";
        document.getElementById("th152").innerText = maxRank;

        var ac = [];
        result = status.result;
        //console.log(result);
        for(i = 0; i < result.length; i++)
        {
            //console.log(result[i].verdict);
            if(result[i].verdict === "OK")
            {
                var id = result[i].contestId;
                
                var problem = id+result[i].problem.index;
                ac.push(problem);
            }
        }
        //console.log(ac);
        var accepted = [...new Set(ac)];

        //console.log(accepted.length);
        //console.log(result);
        var verdicted = [];
        var wa = [];
        for(i = 0; i < result.length; i++)
        {
            verdicted.push(result[i].verdict);
            var id = result[i].contestId;
            var problem = id+result[i].problem.index;
            wa.push(problem);
        }
        var total = [...new Set(wa)];
        //console.log(total.length);
        var solved = accepted.length;
        var trid = total.length;
        var unsolved = parseInt(trid)- parseInt(solved);

        result = participate.result;
        //console.log(result);
        var ratedContest = result.length;
        var bestRank = 1222222222222;
        var bestRankId = 0;
        var worstRank = 0;
        var worstRankId = 0;
        var up = -112234;
        var upId = 0;
        var down = 777777;
        var downId = 0;
        var ratingChange = [];
        var contestid = [];
        var time = [];
        //console.log(ratedContest+ " "+bestRank+" "+worstRank+" "+up + " "+down);
        for(i = 0; i < result.length; i++)
        {
            time.push(result[i].ratingUpdateTimeSeconds*1000);
            ratingChange.push(result[i].newRating);
            var a = result[i].newRating;
            contestid.push(result[i].contestId);
            var b = result[i].oldRating;
            if(i == 0 && result[i].contestId >= 1111)
            {
                b = 1400;
            }
            var d = a-b;
            if(up < d)
            {
                up = d;
                upId = result[i].contestId;
            }
            if(down > d)
            {
                down = d;
                downId = result[i].contestId;
            }
            down = Math.min(down, d);
            bestRank = Math.min(bestRank, result[i].rank);
            worstRank = Math.max(worstRank, result[i].rank);
        }

        function createtable2()
        {
            const sample2 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample2);
            sample2.setAttribute('id', "sample2");
            document.getElementById("sample2").style.width = "100%";
            document.getElementById("sample2").style.height = "250px";
            document.getElementById("sample2").style.textAlign = "center";
            document.getElementById("sample2").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample2").style.backgroundColor = "#dfe6e9";
            //document.getElementById("sample2").style.paddingTop = "50px";
            document.getElementById("sample2").style.marginTop = "40px";
            document.getElementById("sample2").style.marginBottom = "40px";

            const table2 = document.createElement('table');
            document.getElementById("sample2").appendChild(table2);
            table2.setAttribute('id', "table2");
            document.getElementById("table2").style.width = "100%";
            document.getElementById("table2").style.marginTop = "15px";
            document.getElementById("table2").style.borderStyle = "solid";
            for(i = 1; i <= 5; i++)
            {
                var v = document.createElement('tr');
                document.getElementById("table2").appendChild(v);
                v.setAttribute('id', "tr2"+i);
                document.getElementById("tr2"+i).style.height = "50px";
                if(i%2 == 1)
                {
                    document.getElementById("tr2"+i).style.backgroundColor = "#fff";
                }
                for(j = 1; j <= 2; j++)
                {
                    var x = document.createElement('th');
                    document.getElementById("tr2"+i).appendChild(x);
                    x.setAttribute('id', "th2"+i+j);
                    document.getElementById("th2"+i+j).style.width = "50%";
                }
            }
        }
        createtable2();
        
        document.getElementById("th211").innerText = "Rated Contest";
        document.getElementById("th212").innerText = ratedContest;
        document.getElementById("th221").innerText = "Best Rank";
        document.getElementById("th222").innerText = bestRank;
        document.getElementById("th231").innerText = "Worst Rank";
        document.getElementById("th232").innerText = worstRank;
        document.getElementById("th241").innerText = "Max Up";
        document.getElementById("th242").innerText = up;
        document.getElementById("th251").innerText = "Max Down";
        document.getElementById("th252").innerText = down;



        function createtable3()
        {
            const sample3 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample3);
            sample3.setAttribute('id', "sample3");
            document.getElementById("sample3").style.width = "100%";
            document.getElementById("sample3").style.height = "150px";
            document.getElementById("sample3").style.textAlign = "center";
            document.getElementById("sample3").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample3").style.backgroundColor = "#dfe6e9";
            //document.getElementById("sample3").style.paddingTop = "50px";
            document.getElementById("sample3").style.marginTop = "40px";
            document.getElementById("sample3").style.marginBottom = "40px";

            const table3 = document.createElement('table');
            document.getElementById("sample3").appendChild(table3);
            table3.setAttribute('id', "table3");
            document.getElementById("table3").style.width = "100%";
            document.getElementById("table3").style.marginTop = "15px";
            document.getElementById("table3").style.borderStyle = "solid";

            for(i = 1; i <= 3; i++)
            {
                var v = document.createElement('tr');
                document.getElementById("table3").appendChild(v);
                v.setAttribute('id', "tr3"+i);
                document.getElementById("tr3"+i).style.height = "50px";
                if(i%2 == 1)
                {
                    document.getElementById("tr3"+i).style.backgroundColor = "#fff";
                }
                for(j = 1; j <= 2; j++)
                {
                    var x = document.createElement('th');
                    document.getElementById("tr3"+i).appendChild(x);
                    x.setAttribute('id', "th3"+i+j);
                    document.getElementById("th3"+i+j).style.width = "50%";
                }
            }
        }
        createtable3();
        document.getElementById("th311").innerText = "Solved";
        document.getElementById("th312").innerText = solved;
        document.getElementById("th321").innerText = "Tried";
        document.getElementById("th322").innerText = trid;
        document.getElementById("th331").innerText = "Unsolved";
        document.getElementById("th332").innerText = unsolved;



        function createtable4()
        {
            const sample4 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample4);
            sample4.setAttribute('id', "sample4");
            document.getElementById("sample4").style.width = "900px";
            document.getElementById("sample4").style.height = "600px";
            document.getElementById("sample4").style.textAlign = "center";
            document.getElementById("sample4").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample4").style.backgroundColor = "#fff";
            document.getElementById("sample4").style.paddingTop = "50px";
            document.getElementById("sample4").style.paddingLeft = "30px";
            document.getElementById("sample4").style.paddingRight = "30px";
            document.getElementById("sample4").style.marginTop = "40px";
            document.getElementById("sample4").style.marginBottom = "40px";
            

            const div1 = document.createElement('div');
            document.getElementById("sample4").appendChild(div1);
            div1.setAttribute('id', "div1");

            const div2 = document.createElement('div');
            document.getElementById("div1").appendChild(div2);
            div2.setAttribute('id', "div2");
            const h1 = document.createElement('p');
            document.getElementById("div2").appendChild(h1);
            h1.setAttribute('id', "h1");
            document.getElementById("h1").style.fontWeight = "bolder";
            document.getElementById("h1").style.color = "#0c2461";

            const can1 = document.createElement('canvas');
            document.getElementById("div2").appendChild(can1);
            can1.setAttribute('id', "can1");
            document.getElementById("div2").style.height = "470px";
            document.getElementById("div2").style.width = "400px"
            document.getElementById("div2").style.marginTop = "10px";
            document.getElementById("div1").style.display = "flex";
            document.getElementById("div1").style.flexWrap = "wrap";
            document.getElementById("div1").style.justifyContent = "center";
        }
        createtable4();


        var v = {};
        v["OK"] = 0;
        v["WRONG_ANSWER"] = 0;
        v["TIME_LIMIT_EXCEEDED"] = 0;
        v["RUNTIME_ERROR"] = 0;
        v["COMPILATION_ERROR"] = 0;
        v["MEMORY_LIMIT_EXCEEDED"] = 0;
        for(i = 0; i < verdicted.length; i++)
        {
            if(!v[verdicted[i]])
            {
                v[verdicted[i]] = 0;
            }
            v[verdicted[i]]++;
        }

        //pie chart start
        const dataStore = [];
        const labels = [];
        const backgroundColors = [];
        if(v.OK > 0)
        {
            dataStore.push(v.OK);
            labels.push("AC");
            backgroundColors.push("green");
        }
        if(v.WRONG_ANSWER > 0)
        {
            dataStore.push(v.WRONG_ANSWER);
            labels.push("WA");
            backgroundColors.push("red");
        }
        if(v.COMPILATION_ERROR > 0)
        {
            dataStore.push(v.COMPILATION_ERROR);
            labels.push("CPE");
            backgroundColors.push("pink");
        }
        if(v.TIME_LIMIT_EXCEEDED > 0)
        {
            dataStore.push(v.TIME_LIMIT_EXCEEDED);
            labels.push("TLE");
            backgroundColors.push("blue");
        }
        if(v.MEMORY_LIMIT_EXCEEDED > 0)
        {
            dataStore.push(v.MEMORY_LIMIT_EXCEEDED);
            labels.push("MLE");
            backgroundColors.push("navy");
        }

        //labels
        //dataStore
        function pieFunction()
        {
            const data =
            {
                labels: labels,
                datasets:
                [
                    {
                    
                        backgroundColor: backgroundColors,
                        data: dataStore,
                    }
                ]
            };

              const config =
              {
                type: 'pie',
                data,
                options:
                {
                    events: ['mousemove']
                }
            };
            var myChart = new Chart(
              document.getElementById('can1'),
              config
            );
            
        }
        pieFunction();

        document.getElementById("h1").innerText = "Verdicts of "+val2;



        function createtable5()
        {
            const sample5 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample5);
            sample5.setAttribute('id', "sample5");
            document.getElementById("sample5").style.width = "100%";
            document.getElementById("sample5").style.height = "600px";
            document.getElementById("sample5").style.textAlign = "center";
            document.getElementById("sample5").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample5").style.backgroundColor = "#fff";
            document.getElementById("sample5").style.paddingTop = "50px";
            document.getElementById("sample5").style.marginTop = "40px";
            document.getElementById("sample5").style.marginBottom = "40px";
            document.getElementById("sample5").style.paddingLeft = "30px";
            document.getElementById("sample5").style.paddingRight = "30px";
            

            const div3 = document.createElement('div');
            document.getElementById("sample5").appendChild(div3);
            div3.setAttribute('id', "div3");

            const div4 = document.createElement('div');
            document.getElementById("div3").appendChild(div4);
            div4.setAttribute('id', "div4");
            const h2 = document.createElement('p');
            document.getElementById("div4").appendChild(h2);
            h2.setAttribute('id', "h2");
            document.getElementById("h2").style.fontWeight = "bolder";
            document.getElementById("h2").style.color = "#0c2461";

            const can2 = document.createElement('canvas');
            document.getElementById("div4").appendChild(can2);
            can2.setAttribute('id', "can2");
            document.getElementById("div4").style.height = "470px";
            document.getElementById("div4").style.width = "100%"
            document.getElementById("div4").style.marginTop = "10px";
            document.getElementById("div3").style.display = "flex";
            document.getElementById("div3").style.flexWrap = "wrap";
            document.getElementById("div3").style.justifyContent = "center";
        }
        createtable5();

        var labelCount = {};
        labelCount["A"] = 0;
        labelCount["B"] = 0;
        labelCount["C"] = 0;
        labelCount["D"] = 0;
        labelCount["E"] = 0;
        labelCount["F"] = 0;
        labelCount["G"] = 0;
        labelCount["H"] = 0;
        labelCount["I"] = 0;
        labelCount["J"] = 0;
        labelCount["K"] = 0;
        for(i = 0; i < accepted.length; i++)
        {
            var x = accepted[i].charAt(accepted[i].length-1);
            if(!labelCount[x])
            {
                labelCount[x] = 0;
            }
            labelCount[x]++;
        }
        const labelData = [];
        const lablelabel = [];
        labelData.push(labelCount.A);
        lablelabel.push("A");
        labelData.push(labelCount.B);
        lablelabel.push("B");
        labelData.push(labelCount.C);
        lablelabel.push("C");
        labelData.push(labelCount.D);
        lablelabel.push("D");
        labelData.push(labelCount.E);
        lablelabel.push("E");
        labelData.push(labelCount.F);
        lablelabel.push("F");
        labelData.push(labelCount.G);
        lablelabel.push("G");
        labelData.push(labelCount.H);
        lablelabel.push("H");
        labelData.push(labelCount.I);
        lablelabel.push("I");
        labelData.push(labelCount.J);
        lablelabel.push("J");
        labelData.push(labelCount.K);
        lablelabel.push("K");

        console.log(labelCount);
        console.log(labelData);
        //console.log(labelData);
        function barFunction()
        {
            const data =
            {
                labels: lablelabel,
                datasets:
                [
                    {
                        data: labelData,
                        label: 'solved',
                        backgroundColor: '#3498db',
                        borderColor: '#3498db',
                        borderWidth: 1
                    }
                ]
            };
            const config =
            {
                type: 'bar',
                data: data,
                options:
                {
                  scales:
                  {
                    y:
                    {
                      beginAtZero: true
                    }
                  }
                },
              };
              var myChart = new Chart(
                document.getElementById('can2'),
                config
              );
        }
        barFunction();
        document.getElementById("h2").innerText = "Labels of "+val2;

        var statusData = status.result;
        var allTag = {};
        var Count = {};
        for(i = 0; i < statusData.length; i++)
        {
            if(statusData[i].verdict == "OK")
            {
                var problemName = statusData[i].contestId+statusData[i].problem.index;

                //arr.push(result[i].problem.tags);
                if(!Count[problemName])
                {
                    var arr = statusData[i].problem.tags;
                    if(arr.length == 0)
                    {
                        continue;
                    }
                    for(j = 0; j < arr.length; j++)
                    {
                        if(!allTag[arr[j]])
                        {
                            allTag[arr[j]] = 0;
                        }
                        allTag[arr[j]]++;
                    }
                    Count[problemName] = 1;
                }
            }
        }
        //console.log(allTag);

        var Data = [];
        var tags = [];
        if(allTag["binary search"])
        {
            Data.push(allTag["binary search"]);
            tags.push("binary search");
        }
        if(allTag["bitmasks"])
        {
            Data.push(allTag["bitmasks"]);
            tags.push("bitmasks");
        }
        if(allTag["brute force"])
        {
            Data.push(allTag["brute force"]);
            tags.push("brute force");
        }
        if(allTag["chinese remainder theorem"])
        {
            Data.push(allTag["chinese remainder theorem"]);
            tags.push("chinese remainder theorem");
        }
        if(allTag["combinatorics"])
        {
            Data.push(allTag["combinatorics"]);
            tags.push("combinatorics");
        }
        if(allTag["constructive algorithms"])
        {
            Data.push(allTag["constructive algorithms"]);
            tags.push("constructive algorithms");
        }
        if(allTag["data structures"])
        {
            Data.push(allTag["data structures"]);
            tags.push("data structures");
        }
        if(allTag["dfs and similar"])
        {
            Data.push(allTag["dfs and similar"]);
            tags.push("dfs and similar");
        }
        if(allTag["divide and conquer"])
        {
            Data.push(allTag["divide and conquer"]);
            tags.push("divide and conquer");
        }
        if(allTag["dp"])
        {
            Data.push(allTag["dp"]);
            tags.push("dp");
        }
        if(allTag["dsu"])
        {
            Data.push(allTag["dsu"]);
            tags.push("dsu");
        }
        if(allTag["expression parsing"])
        {
            Data.push(allTag["expression parsing"]);
            tags.push("expression parsing");
        }
        if(allTag["flows"])
        {
            Data.push(allTag["flows"]);
            tags.push("flows");
        }
        if(allTag["games"])
        {
            Data.push(allTag["games"]);
            tags.push("games");
        }
        if(allTag["games"])
        {
            Data.push(allTag["games"]);
            tags.push("games");
        }
        if(allTag["graph matchings"])
        {
            Data.push(allTag["graph matchings"]);
            tags.push("graph matchings");
        }
        if(allTag["graphs"])
        {
            Data.push(allTag["graphs"]);
            tags.push("graphs");
        }if(allTag["greedy"])
        {
            Data.push(allTag["greedy"]);
            tags.push("greedy");
        }
        if(allTag["hashing"])
        {
            Data.push(allTag["hashing"]);
            tags.push("hashing");
        }
        if(allTag["implementation"])
        {
            Data.push(allTag["implementation"]);
            tags.push("implementation");
        }
        if(allTag["math"])
        {
            Data.push(allTag["math"]);
            tags.push("math");
        }
        if(allTag["matrices"])
        {
            Data.push(allTag["matrices"]);
            tags.push("matrices");
        }
        if(allTag["meet-in-the-middle"])
        {
            Data.push(allTag["meet-in-the-middle"]);
            tags.push("meet-in-the-middle");
        }
        if(allTag["number theory"])
        {
            Data.push(allTag["number theory"]);
            tags.push("number theory");
        }
        if(allTag["probabilities"])
        {
            Data.push(allTag["probabilities"]);
            tags.push("probabilities");
        }
        if(allTag["shortest paths"])
        {
            Data.push(allTag["shortest paths"]);
            tags.push("shortest paths");
        }
        if(allTag["sortings"])
        {
            Data.push(allTag["sortings"]);
            tags.push("sortings");
        }
        if(allTag["string suffix structures"])
        {
            Data.push(allTag["string suffix structures"]);
            tags.push("string suffix structures");
        }
        if(allTag["strings"])
        {
            Data.push(allTag["strings"]);
            tags.push("strings");
        }
        if(allTag["ternary search"])
        {
            Data.push(allTag["ternary search"]);
            tags.push("ternary search");
        }
        if(allTag["trees"])
        {
            Data.push(allTag["trees"]);
            tags.push("trees");
        }
        if(allTag["two pointers"])
        {
            Data.push(allTag["two pointers"]);
            tags.push("two pointers");
        }
        if(allTag["expression parsing"])
        {
            Data.push(allTag["expression parsing"]);
            tags.push("expression parsing");
        }
        if(allTag["fft"])
        {
            Data.push(allTag["fft"]);
            tags.push("fft");
        }
        if(allTag["interactive"])
        {
            Data.push(allTag["interactive"]);
            tags.push("interactive");
        }
        if(allTag["probabilities"])
        {
            Data.push(allTag["probabilities"]);
            tags.push("probabilities");
        }
        if(allTag["schedules"])
        {
            Data.push(allTag["schedules"]);
            tags.push("schedules");
        }



        function createtable6()
        {
            const sample6 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample6);
            sample6.setAttribute('id', "sample6");
            document.getElementById("sample6").style.width = "100%";
            document.getElementById("sample6").style.height = "600px";
            document.getElementById("sample6").style.textAlign = "center";
            document.getElementById("sample6").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample6").style.backgroundColor = "#fff";
            document.getElementById("sample6").style.paddingTop = "50px";
            document.getElementById("sample6").style.marginTop = "40px";
            document.getElementById("sample6").style.marginBottom = "40px";
            document.getElementById("sample6").style.paddingLeft = "30px";
            document.getElementById("sample6").style.paddingRight = "30px";
            

            const div5 = document.createElement('div');
            document.getElementById("sample6").appendChild(div5);
            div5.setAttribute('id', "div5");

            const div6 = document.createElement('div');
            document.getElementById("div5").appendChild(div6);
            div6.setAttribute('id', "div6");
            const h3 = document.createElement('p');
            document.getElementById("div6").appendChild(h3);
            h3.setAttribute('id', "h3");
            document.getElementById("h3").style.fontWeight = "bolder";
            document.getElementById("h3").style.color = "#0c2461";

            const can3 = document.createElement('canvas');
            document.getElementById("div6").appendChild(can3);
            can3.setAttribute('id', "can3");
            document.getElementById("div6").style.height = "470px";
            document.getElementById("div6").style.width = "100%"
            document.getElementById("div6").style.marginTop = "10px";
            document.getElementById("div5").style.display = "flex";
            document.getElementById("div5").style.flexWrap = "wrap";
            document.getElementById("div5").style.justifyContent = "center";
        }
        createtable6();

        function tagFunction()
        {
            const data = {
            labels: tags,
            datasets: [{
                data: Data,
                label: 'tags',
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 2
            }]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                },
              };
              var myChart = new Chart(
                document.getElementById('can3'),
                config
              );
        }
        tagFunction();
        
        document.getElementById("h3").innerText = "Solved Problem by tag of "+val2;

        function createtable7()
        {
            const sample7 = document.createElement('div');
            document.getElementById("usercontainer").appendChild(sample7);
            sample7.setAttribute('id', "sample7");
            document.getElementById("sample7").style.width = "900px";
            document.getElementById("sample7").style.height = "600px";
            document.getElementById("sample7").style.textAlign = "center";
            document.getElementById("sample7").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample7").style.backgroundColor = "#fff";
            document.getElementById("sample7").style.paddingTop = "50px";
            document.getElementById("sample7").style.marginTop = "40px";
            document.getElementById("sample7").style.marginBottom = "40px";
            document.getElementById("sample7").style.paddingLeft = "30px";
            document.getElementById("sample7").style.paddingRight = "30px";

            const div7 = document.createElement('div');
            document.getElementById("sample7").appendChild(div7);
            div7.setAttribute('id', "div7");

            const div8 = document.createElement('div');
            document.getElementById("div7").appendChild(div8);
            div8.setAttribute('id', "div8");
            const h4 = document.createElement('p');
            document.getElementById("div8").appendChild(h4);
            h4.setAttribute('id', "h4");
            document.getElementById("h4").style.fontWeight = "bolder";
            document.getElementById("h4").style.color = "#0c2461";

            const can4 = document.createElement('canvas');
            document.getElementById("div8").appendChild(can4);
            can4.setAttribute('id', "can4");
            document.getElementById("div8").style.height = "470px";
            document.getElementById("div8").style.width = "95%"
            document.getElementById("div8").style.marginTop = "10px";
            document.getElementById("div7").style.display = "flex";
            document.getElementById("div7").style.flexWrap = "wrap";
            document.getElementById("div7").style.justifyContent = "center";
        }
        createtable7();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var timeObject = new Date().getTime();
        var monthYear = [];
        for(i = 0; i < time.length; i++)
        {
          var tem = time[i];
          var d = tem-timeObject;
          tem = d+timeObject;
          var sp = new Date(tem);
          var a = sp.getMonth();
          var b = sp.getFullYear();
          var x = monthNames[a] + " " + b + " "+ "Contest id "+ contestid[i];
          //console.log(x);
          monthYear.push(x);
        }



        function ratingChangefunction()
        {
            const data =
            {
                labels:monthYear,
                datasets:
                [
                    {
                        data: ratingChange,
                        label: 'rating',
                        backgroundColor: '#2980b9',
                        borderColor: '#2980b9',
                        borderWidth: 3,
                    }
                ]
            };
            const config =
            {
                type: 'line',
                data: data,
                options:
                {
                    scales:
                    {
                        responsive: true,
                    }
                },
            };
            var myChart = new Chart(
                    document.getElementById('can4'),
                    config
                  );
        }
        ratingChangefunction();
        document.getElementById("h4").innerText = "Rating Change of "+val2;

    }).catch((ee)=>
    {
        console.log(ee);
        document.getElementById("error").innerText="Something is worng please reload...";
    });
});