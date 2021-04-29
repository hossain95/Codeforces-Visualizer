function RunAll()
{
  var color = ['#3498db', '#1abc9c', '#9b59b6', '#e67e22', 'green', 'red', 'blue', 'yellow', '#7147e7', '#0abde3', 'pink'];

  $( "#loadhere").load("jsonDataForSubject.php");
  $( "#loadhere").load("jsonDataForTime.php");
  const subjectData = fetch(`http://localhost/studytimeanalyser/subject.json`);
  const timeData = fetch(`http://localhost/studytimeanalyser/routine.json`);
  Promise.all([subjectData, timeData]).then((values)=>
  {
      return Promise.all(values.map(r=>r.json()));
      
  }).then(([subjectData, timeData]) =>
  {
    if(subjectData.length == 0)
    {
      return;
    }
    document.getElementById("p1").style.display = "none";
      var arr = [];
      for(i = 0; i < subjectData.length; i++)
      {
          var x = subjectData[i].subject;
          arr.push(x);
      }
      //console.log(arr);
      var disArray = [...new Set(arr)];
      //console.log(disArray);
      for(i = 0; i < disArray.length; i++)
      {
          var data1 = disArray[i];
          var data2 = data1.charAt(0).toUpperCase()+data1.slice(1);
          const div = document.createElement('div');
          document.getElementById("insertHere").appendChild(div);
          div.setAttribute('id', "div"+i);
          const input = document.createElement('input');
          document.getElementById("div"+i).appendChild(input);
          input.setAttribute('id', "input"+i);
          input.setAttribute("type", "radio");
          input.setAttribute("name", "subject")
          input.setAttribute("value", data1);

          const lablel = document.createElement('label');
          document.getElementById("div"+i).appendChild(lablel);
          lablel.setAttribute('id', "label"+i);
          document.getElementById("label"+i).innerText = data2;
          document.getElementById("label"+i).style.marginLeft = "5px";
      }

      //console.log(timeData);
      if(timeData.length == 0)
      {
        return;
      }
      document.getElementById("container3").style.display = "";
      var TotalTime = 0;
      var allSubject = {};
      var uniqueSubject = [];
      for(i = 0; i < timeData.length; i++)
      {
          var x = parseInt(timeData[i].time);
          var y = timeData[i].subject;
          if(!allSubject[y])
          {
              allSubject[y] = 0;
              uniqueSubject.push(y);
          }
          allSubject[y] += x;;
          TotalTime += x;
      }
      //console.log(allSubject);
      var subject = [];
      var time = [];
      for(i = 0; i < uniqueSubject.length; i++)
      {
          var x = allSubject[uniqueSubject[i]];
          var y =  uniqueSubject[i];
          var p = (x*100)/TotalTime;
          p = p.toFixed(2);
          subject.push(p + "%  "+y);
          time.push(x);
      }
      //console.log(subject);
      //console.log(time);

      function barFunction()
      {
          const data =
          {
            labels: subject,
            datasets:
            [
              {
                label: 'My First Dataset',
                data: time,
                backgroundColor:color,
                hoverOffset: 4
              }
            ]
          };
          const config =
          {
              type: 'pie',
              data: data,
            };
            var myChart = new Chart(
              document.getElementById('showAll'),
              config
            );
      }
      barFunction();
      document.getElementById("h1").innerText = "Total Study\n in minutes";

      var d = new Date();
      //console.log(d.getDate());

      var dd = new Date();
      var x = dd.getTime();
      var y = x - (7*86400*1000);
      var p = new Date(y);
      //console.log(p.getDate());
      var sevenDaySubject = [];
      var sevenDayTime = [];
      var subjectObj = {};
      var unSubject = [];
      TotalTime = 0;
      for(i = 0; i < timeData.length; i++)
      {
          var tem = new Date(timeData[i].date);
          var findTime = tem.getTime();
          if(findTime <= x && findTime >= y)
          {
              //console.log(timeData[i].subject + " "+ timeData[i].date);
              if(!subjectObj[timeData[i].subject])
              {
                  subjectObj[timeData[i].subject] = 0;
                  unSubject.push(timeData[i].subject);
              }
              subjectObj[timeData[i].subject] += parseInt(timeData[i].time);
              TotalTime += parseInt(timeData[i].time);
          }
      }
      //console.log(subjectObj);

      for(i = 0; i < unSubject.length; i++)
      {
          var x = subjectObj[unSubject[i]];
          var p = (x*100)/TotalTime;
          p = p.toFixed(2);
          sevenDaySubject.push(p+ "%  "+unSubject[i]);
          sevenDayTime.push(x);
      }
      //console.log(sevenDaySubject);
      //console.log(sevenDayTime);

      function barFunction2()
      {
        const data =
        {
          labels: sevenDaySubject,
          datasets:
          [
            {
              label: 'My First Dataset',
              data: sevenDayTime,
              backgroundColor:color,
              hoverOffset: 4
            }
          ]
        };
        const config =
        {
            type: 'pie',
            data: data,
          };
            var myChart = new Chart(
              document.getElementById('lastSevenDays'),
              config
            );
      }
      barFunction2();
      document.getElementById("h2").innerText = "Study in Last Seven Days\n in minutes";

      //var dd = new Date();
      x = dd.getTime();
      y = x - (30*86400*1000);

      var lastMonthSubject = [];
      var lastMonthTime = [];
      var monthSubjectObj = {};
      var monthUniSubject = [];
      TotalTime = 0;
      for(i = 0; i < timeData.length; i++)
      {
          var tem = new Date(timeData[i].date);
          var findTime = tem.getTime();
          if(findTime <= x && findTime >= y)
          {
              //console.log(timeData[i].subject + " "+ timeData[i].date);
              if(!monthSubjectObj[timeData[i].subject])
              {
                  monthSubjectObj[timeData[i].subject] = 0;
                  monthUniSubject.push(timeData[i].subject);
              }
              monthSubjectObj[timeData[i].subject] += parseInt(timeData[i].time);
              TotalTime += parseInt(timeData[i].time);
          }
      }
      //console.log(monthSubjectObj);

      for(i = 0; i < monthUniSubject.length; i++)
      {
          var x = monthSubjectObj[monthUniSubject[i]];
          var p = (x*100)/TotalTime;
          p = p.toFixed(2);
          lastMonthSubject.push(p+ "%  "+monthUniSubject[i]);
          lastMonthTime.push(x);
      }
      //console.log(lastMonthSubject);
      //console.log(lastMonthTime);
      function barFunction3()
      {
        const data =
        {
          labels: lastMonthSubject,
          datasets:
          [
            {
              label: 'My First Dataset',
              data: lastMonthTime,
              backgroundColor:color,
              hoverOffset: 4
            }
          ]
        };
        const config =
        {
            type: 'pie',
            data: data,
          };
            var myChart = new Chart(
              document.getElementById('lastMonth'),
              config
            );
      }
      barFunction3();
      document.getElementById("h3").innerText = "Study in Last one Month\nin minutes";
      console.log("This is a test");
  }).catch((ee)=>
  {
      console.log(ee);
      //document.getElementById("error").innerText="Something is worng please reload...";
  });
}
RunAll();