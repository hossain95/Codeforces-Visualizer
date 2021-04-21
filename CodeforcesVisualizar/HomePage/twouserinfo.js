document.getElementById("form2").addEventListener("submit", (e)=>
{
    e.preventDefault();
    var han1 = document.getElementById("handle1").value;
    var han2 = document.getElementById("handle2").value;

    
    //display reload
    $( "#usercontainer").load("index.html #usercontainer");
    $( "#usercontainertwo").load("index.html #usercontainertwo");

    //display show and hide
    document.getElementById("usercontainertwo").style.display = "";
    document.getElementById("error").innerText = "";

    const userinfo1 = fetch(`https://codeforces.com/api/user.info?handles=${han1};${han2}`);
    const status1 = fetch(`https://codeforces.com/api/user.status?handle=${han1}`);
    const status2 = fetch(`https://codeforces.com/api/user.status?handle=${han2}`);
    const participate1 = fetch(`https://codeforces.com/api/user.rating?handle=${han1}`);
    const participate2 = fetch(`https://codeforces.com/api/user.rating?handle=${han2}`);
    Promise.all([userinfo1, status1, status2, participate1, participate2]).then((values)=>
    {
        return Promise.all(values.map(r=>r.json()));
    }).then(([userinfo1, status1, status2, participate1, participate2]) =>
    {
        console.log(userinfo1);
        console.log(status1);
        console.log(status2);
        console.log(participate1);
        console.log(participate2);

        
        function createtable1()
        {
            if(han1 == 0 || han2 == 0)
            {
                console.log("hi");
                return;
            }
            const sample1 = document.createElement('div');
            document.getElementById("containtwoinfo").appendChild(sample1);
            sample1.setAttribute('id', "sample1");
            document.getElementById("sample1").style.width = "900px";
            document.getElementById("sample1").style.height = "320px";
            document.getElementById("sample1").style.textAlign = "center";
            document.getElementById("sample1").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample1").style.backgroundColor = "#fff";
            document.getElementById("sample1").style.marginTop = "5px";
            document.getElementById("sample1").style.marginBottom = "40px";

            const table1 = document.createElement('table');
            document.getElementById("sample1").appendChild(table1);
            table1.setAttribute('id', "table1");
            document.getElementById("table1").style.width = "100%";
            document.getElementById("table1").style.marginTop = "15px";
            for(i = 1; i <= 6; i++)
            {
                var v = document.createElement('tr');
                document.getElementById("table1").appendChild(v);
                v.setAttribute('id', "tr1"+i);
                document.getElementById("tr1"+i).style.height = "50px";
                if(i%2 == 1)
                {
                    document.getElementById("tr1"+i).style.backgroundColor = "#dfe6e9";
                }
                for(j = 1; j <= 3; j++)
                {
                    var x = document.createElement('th');
                    document.getElementById("tr1"+i).appendChild(x);
                    x.setAttribute('id', "th1"+i+j);
                    document.getElementById("th1"+i+j).style.width = "33%";
                }
            }
            document.getElementById("tr1"+1).style.backgroundColor = "#3742fa";
            document.getElementById("tr1"+1).style.color = "#fff";
        }
        createtable1();

        var user1 = userinfo1.result[0];
        var user2 = userinfo1.result[1];
        console.log(user1);
        console.log(user2);
        //first table
        document.getElementById("th112").innerText = han1;
        document.getElementById("th113").innerText = han2;
        document.getElementById("th121").innerText = "Name";
        document.getElementById("th122").innerText = user1.firstName+" "+user1.lastName;
        document.getElementById("th123").innerText = user2.firstName+" "+user2.lastName;
        document.getElementById("th131").innerText = "Rating";
        document.getElementById("th132").innerText = user1.rating;
        document.getElementById("th133").innerText = user2.rating;
        document.getElementById("th141").innerText = "Max Rating";
        document.getElementById("th142").innerText = user1.maxRating;
        document.getElementById("th143").innerText = user2.maxRating;
        document.getElementById("th151").innerText = "Rank";
        document.getElementById("th152").innerText = user1.rank;
        document.getElementById("th153").innerText = user2.rank;
        document.getElementById("th161").innerText = "Max Rank";
        document.getElementById("th162").innerText = user1.maxRank;
        document.getElementById("th163").innerText = user2.maxRank;

        function createtable2()
        {
            const sample2 = document.createElement('div');
            document.getElementById("containtwoinfo").appendChild(sample2);
            sample2.setAttribute('id', "sample2");
            document.getElementById("sample2").style.width = "100%";
            document.getElementById("sample2").style.height = "320px";
            document.getElementById("sample2").style.textAlign = "center";
            document.getElementById("sample2").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample2").style.backgroundColor = "#fff";
            document.getElementById("sample2").style.marginTop = "40px";
            document.getElementById("sample2").style.marginBottom = "40px";

            const table2 = document.createElement('table');
            document.getElementById("sample2").appendChild(table2);
            table2.setAttribute('id', "table2");
            document.getElementById("table2").style.width = "100%";
            document.getElementById("table2").style.marginTop = "15px";
            for(i = 1; i <= 6; i++)
            {
                var v = document.createElement('tr');
                document.getElementById("table2").appendChild(v);
                v.setAttribute('id', "tr2"+i);
                document.getElementById("tr2"+i).style.height = "50px";
                if(i%2 == 1)
                {
                    document.getElementById("tr2"+i).style.backgroundColor = "#dfe6e9";
                }
                for(j = 1; j <= 3; j++)
                {
                    var x = document.createElement('th');
                    document.getElementById("tr2"+i).appendChild(x);
                    x.setAttribute('id', "th2"+i+j);
                    document.getElementById("th2"+i+j).style.width = "33%";
                }
            }
            document.getElementById("tr2"+1).style.backgroundColor = "#3742fa";
            document.getElementById("tr2"+1).style.color = "#fff";
        }
        createtable2();


        document.getElementById("th212").innerText = han1;
        document.getElementById("th213").innerText = han2;
        document.getElementById("th221").innerText = "Rated Contest";
        document.getElementById("th222").innerText = participate1.result.length;
        document.getElementById("th223").innerText = participate2.result.length;
        var Bestrank = 10000000000000;
        var Worstrank = 0;
        var arr = [];
        var Maxdown = 0;
        var Maxup = 0;
        for(i = 0; i < participate1.result.length; i++)
        {
            Bestrank = Math.min(Bestrank, participate1.result[i].rank);
            Worstrank = Math.max(Worstrank, participate1.result[i].rank);
            var a = participate1.result[i].newRating;
            var b = participate1.result[i].oldRating;
            if(i == 0)
            {
                
                if(participate1.result[i].contestId < 1360)
                {
                    console.log("yes");
                    b = 1500;
                }
                else
                {
                    b = 100;
                }
            }
            var d = a-b;
            arr.push(d);
        }
        arr.sort(function(a, b){return a-b});
        console.log(arr);
        if(arr.length !== 0)
        {
            Maxdown = arr[0];
            Maxup = arr[arr.length-1];
        }
        var Bestrank2 = 10000000000000;
        var Worstrank2 = 0;
        var arr2 = [];
        var Maxdown2 = 0;
        var Maxup2 = 0;
        for(i = 0; i < participate2.result.length; i++)
        {
            Bestrank2 = Math.min(Bestrank2, participate2.result[i].rank);
            Worstrank2 = Math.max(Worstrank2, participate2.result[i].rank);
            var a = participate2.result[i].newRating;
            var b = participate2.result[i].oldRating;
            if(i == 0)
            {
                
                if(participate2.result[i].contestId < 1360)
                {
                    console.log("yes");
                    b = 1500;
                }
                else
                {
                    b = 100;
                }
            }
            var d = a-b;
            arr2.push(d);
        }
        arr2.sort(function(a, b){return a-b});
        console.log(arr2);
        if(arr2.length !== 0)
        {
            Maxdown2 = arr2[0];
            Maxup2 = arr2[arr2.length-1];
        }
        document.getElementById("th231").innerText = "Best Rank";
        document.getElementById("th232").innerText = Bestrank;
        document.getElementById("th233").innerText = Bestrank2;

        document.getElementById("th241").innerText = "Worst Rank";
        document.getElementById("th242").innerText = Worstrank;
        document.getElementById("th243").innerText = Worstrank2;

        document.getElementById("th251").innerText = "Max Up";
        document.getElementById("th252").innerText = Maxup;
        document.getElementById("th253").innerText = Maxup2;
        
        document.getElementById("th261").innerText = "Max Down";
        document.getElementById("th262").innerText = Maxdown;
        document.getElementById("th263").innerText = Maxdown2;



        function createchart1()
        {
            const sample3 = document.createElement('div');
            document.getElementById("containtwoinfo").appendChild(sample3);
            sample3.setAttribute('id', "sample3");
            document.getElementById("sample3").style.width = "900px";
            document.getElementById("sample3").style.height = "600px";
            document.getElementById("sample3").style.textAlign = "center";
            document.getElementById("sample3").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample3").style.backgroundColor = "#fff";
            document.getElementById("sample3").style.paddingTop = "50px";
            document.getElementById("sample3").style.paddingLeft = "30px";
            document.getElementById("sample3").style.paddingRight = "30px";
            document.getElementById("sample3").style.marginTop = "40px";
            document.getElementById("sample3").style.marginBottom = "40px";
            

            const div1 = document.createElement('div');
            document.getElementById("sample3").appendChild(div1);
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
            document.getElementById("div2").style.width = "100%"
            document.getElementById("div2").style.marginTop = "10px";
            document.getElementById("div1").style.display = "flex";
            document.getElementById("div1").style.flexWrap = "wrap";
            document.getElementById("div1").style.justifyContent = "center";
        }
        createchart1();


        var tried = [];
        var sovled = [];
        for(i = 0; i < status1.result.length; i++)
        {
            var problem = status1.result[i].contestId+status1.result[i].problem.index;
            tried.push(problem);
            if(status1.result[i].verdict === "OK")
            {
                //console.log(problem);
                sovled.push(problem);
            }
        }
        var uniqueTried = [...new Set(tried)];
        var uniqueSolved = [...new Set(sovled)];
        var Unsolved = uniqueTried.length-uniqueSolved.length;
        var data1 = [];
        data1.push(uniqueTried.length);
        data1.push(uniqueSolved.length);
        data1.push(Unsolved);

        console.log(tried);
        var tried2 = [];
        var sovled2 = [];
        for(i = 0; i < status2.result.length; i++)
        {
            var problem = status2.result[i].contestId+status2.result[i].problem.index;
            tried2.push(problem);
            if(status2.result[i].verdict == "OK")
            {
                sovled2.push(problem);
            }
        }
        var uniqueTried2 = [...new Set(tried2)];
        var uniqueSolved2 = [...new Set(sovled2)];
        var Unsolved2 = uniqueTried2.length-uniqueSolved2.length;
        var data2 = [];
        data2.push(uniqueTried2.length);
        data2.push(uniqueSolved2.length);
        data2.push(Unsolved);
        var label1 = [];
        label1.push("tried");
        label1.push("solved");
        label1.push("unsolved");
        console.log(data1);
        console.log(data2);
        console.log(label1);
        function trySolvedFunction()
        {
            const data =
            {
                labels: label1,
                datasets:
                [
                    {
                        label: han1,
                        backgroundColor: '#0984e3',
                        data: data1,
                    },
                    {
                        label: han2,
                        backgroundColor: '#6c5ce7',
                        data: data2,
                    }
                ]
            };
              const config =
              {
                    type: 'bar',
                    data,
                    options:
                    {
                        y:
                        {
                            beginAtZero: true
                        }
                    }
                };
            var myChart = new Chart(
              document.getElementById('can1'),
              config
            ); 
        }
        trySolvedFunction();
        document.getElementById("h1").innerText = "Trid-Solved-Unsolved";




       


        function createchart2()
        {
            const sample4 = document.createElement('div');
            document.getElementById("containtwoinfo").appendChild(sample4);
            sample4.setAttribute('id', "sample4");
            document.getElementById("sample4").style.width = "100%";
            document.getElementById("sample4").style.height = "600px";
            document.getElementById("sample4").style.textAlign = "center";
            document.getElementById("sample4").style.boxShadow = "0 8px 10px 0 rgba(0.1, 0, 0, 0.1)";
            document.getElementById("sample4").style.backgroundColor = "#fff";
            document.getElementById("sample4").style.paddingTop = "50px";
            document.getElementById("sample4").style.marginTop = "40px";
            document.getElementById("sample4").style.marginBottom = "40px";
            document.getElementById("sample4").style.paddingLeft = "30px";
            document.getElementById("sample4").style.paddingRight = "30px";
            

            const div3 = document.createElement('div');
            document.getElementById("sample4").appendChild(div3);
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
        createchart2();

        var v = {};
        v["OK"] = 0;
        v["WRONG_ANSWER"] = 0;
        v["TIME_LIMIT_EXCEEDED"] = 0;
        v["RUNTIME_ERROR"] = 0;
        v["COMPILATION_ERROR"] = 0;
        v["MEMORY_LIMIT_EXCEEDED"] = 0;
        for(i = 0; i < status1.result.length; i++)
        {
            if(!v[status1.result[i].verdict])
            {
                v[status1.result[i].verdict] = 0;
            }
            v[status1.result[i].verdict]++;
        }

        const data3 = [];
        const label2 = [];
        const backgroundColors3 = [];
        if(v.OK > 0)
        {
            data3.push(v.OK);
            label2.push("AC");
            backgroundColors3.push("green");
        }
        else
        {
            data3.push(0);
            label2.push("AC");
            backgroundColors3.push("green");
        }
        if(v.WRONG_ANSWER > 0)
        {
            data3.push(v.WRONG_ANSWER);
            label2.push("WA");
            backgroundColors3.push("red");
        }
        else
        {
            data3.push(0);
            label2.push("WA");
            backgroundColors3.push("red");
        }
        if(v.COMPILATION_ERROR > 0)
        {
            data3.push(v.COMPILATION_ERROR);
            label2.push("CPE");
            backgroundColors3.push("pink");
        }
        else
        {
            data3.push(0);
            label2.push("CPE");
            backgroundColors3.push("pink");
        }
        if(v.TIME_LIMIT_EXCEEDED > 0)
        {
            data3.push(v.TIME_LIMIT_EXCEEDED);
            label2.push("TLE");
            backgroundColors3.push("blue");
        }
        else
        {
            data3.push(0);
            label2.push("TLE");
            backgroundColors3.push("blue");
        }
        if(v.MEMORY_LIMIT_EXCEEDED > 0)
        {
            data3.push(v.MEMORY_LIMIT_EXCEEDED);
            label2.push("MLE");
            backgroundColors3.push("navy");
        }
        else
        {
            data3.push(0);
            label2.push("MLE");
            backgroundColors3.push("navy");
        }

        var v2 = {};
        v2["OK"] = 0;
        v2["WRONG_ANSWER"] = 0;
        v2["TIME_LIMIT_EXCEEDED"] = 0;
        v2["RUNTIME_ERROR"] = 0;
        v2["COMPILATION_ERROR"] = 0;
        v2["MEMORY_LIMIT_EXCEEDED"] = 0;
        for(i = 0; i < status2.result.length; i++)
        {
            if(!v2[status2.result[i].verdict])
            {
                v2[status2.result[i].verdict] = 0;
            }
            v2[status2.result[i].verdict]++;
        }

        const data4 = [];
        const label3 = [];
        const backgroundColors4 = [];
        if(v2.OK > 0)
        {
            data4.push(v2.OK);
            label3.push("AC");
            backgroundColors4.push("green");
        }
        else
        {
            data4.push(0);
            label3.push("AC");
            backgroundColors4.push("green");
        }
        if(v2.WRONG_ANSWER > 0)
        {
            data4.push(v2.WRONG_ANSWER);
            label3.push("WA");
            backgroundColors4.push("red");
        }
        else
        {
            data4.push(0);
            label3.push("WA");
            backgroundColors4.push("red");
        }
        if(v2.COMPILATION_ERROR > 0)
        {
            data4.push(v2.COMPILATION_ERROR);
            label3.push("CPE");
            backgroundColors4.push("pink");
        }
        else
        {
            data4.push(v2.COMPILATION_ERROR);
            label3.push("CPE");
            backgroundColors4.push("pink");
        }
        if(v2.TIME_LIMIT_EXCEEDED > 0)
        {
            data4.push(v2.TIME_LIMIT_EXCEEDED);
            label3.push("TLE");
            backgroundColors4.push("blue");
        }
        if(v2.MEMORY_LIMIT_EXCEEDED > 0)
        {
            data4.push(v2.MEMORY_LIMIT_EXCEEDED);
            label3.push("MLE");
            backgroundColors4.push("navy");
        }
        else
        {
            data4.push(0);
            label3.push("MLE");
            backgroundColors4.push("navy");
        }


        function verdicteSolvedFunction()
        {
            const data =
            {
                labels: label2,
                datasets:
                [
                    {
                        label: han1,
                        backgroundColor: '#0984e3',
                        data:  data3,
                    },
                    {
                        label: han2,
                        backgroundColor: '#6c5ce7',
                        data: data4,
                    }
                ]
            };
              const config =
              {
                    type: 'bar',
                    data,
                    options:
                    {
                        y:
                        {
                            beginAtZero: true
                        }
                    }
                };
            var myChart = new Chart(
              document.getElementById('can2'),
              config
            ); 
        }
        verdicteSolvedFunction();
        document.getElementById("h2").innerText = "Verdicted";


        function createchart3()
        {
            const sample5 = document.createElement('div');
            document.getElementById("containtwoinfo").appendChild(sample5);
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
            

            const div5 = document.createElement('div');
            document.getElementById("sample5").appendChild(div5);
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
        createchart3();
        

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
        for(i = 0; i < uniqueSolved.length; i++)
        {
            var x = uniqueSolved[i].charAt(uniqueSolved[i].length-1);
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
        labelData.push(labelCount.K);2
        lablelabel.push("K");

        var labelCount2 = {};
        labelCount2["A"] = 0;
        labelCount2["B"] = 0;
        labelCount2["C"] = 0;
        labelCount2["D"] = 0;
        labelCount2["E"] = 0;
        labelCount2["F"] = 0;
        labelCount2["G"] = 0;
        labelCount2["H"] = 0;
        labelCount2["I"] = 0;
        labelCount2["J"] = 0;
        labelCount2["K"] = 0;
        for(i = 0; i < uniqueSolved2.length; i++)
        {
            var x = uniqueSolved2[i].charAt(uniqueSolved2[i].length-1);
            if(!labelCount2[x])
            {
                labelCount2[x] = 0;
            }
            labelCount2[x]++;
        }
        const labelData2 = [];
        const lablelabel2 = [];
        labelData2.push(labelCount2.A);
        lablelabel2.push("A");
        labelData2.push(labelCount2.B);
        lablelabel2.push("B");
        labelData2.push(labelCount2.C);
        lablelabel2.push("C");
        labelData2.push(labelCount2.D);
        lablelabel2.push("D");
        labelData2.push(labelCount2.E);
        lablelabel2.push("E");
        labelData2.push(labelCount2.F);
        lablelabel2.push("F");
        labelData2.push(labelCount2.G);
        lablelabel2.push("G");
        labelData2.push(labelCount2.H);
        lablelabel2.push("H");
        labelData2.push(labelCount2.I);
        lablelabel2.push("I");
        labelData2.push(labelCount2.J);
        lablelabel2.push("J");
        labelData2.push(labelCount2.K);
        lablelabel2.push("K");

        console.log(labelData);
        console.log(labelData2);
        function lavelSolvedFunction()
        {
            const data =
            {
                labels: lablelabel,
                datasets:
                [
                    {
                        label: han1,
                        backgroundColor: '#0984e3',
                        data: labelData,
                    },
                    {
                        label: han2,
                        backgroundColor: '#6c5ce7',
                        data: labelData2,
                    }
                ]
            };
              const config =
              {
                    type: 'bar',
                    data,
                };
            var myChart = new Chart(
              document.getElementById('can3'),
              config
            ); 
        }
        lavelSolvedFunction();
        document.getElementById("h3").innerText= "Solved By Label";




    }).catch((ee)=>
    {
        console.log(ee);
        document.getElementById("error").innerText="Something is worng please reload...";
    });
});