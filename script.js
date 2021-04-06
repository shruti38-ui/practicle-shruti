$(document).ready(function(){

    axios.get('https://api.spacexdata.com/v3/launches?limit=100')
    .then((response) => {
        var data = response.data;

          var ly = [];
          var k = 0;
      
          for(let i=0;i<data.length;i++)
          {
            ly[k++] = data[i];
          }
          $("#ans").html("");
          for(let i=0;i<k;i++)
          {
              var img = ly[i].links.mission_patch;
              var name = ly[i].mission_name;
              var number = ly[i].flight_number;
              var launch_year = ly[i].launch_year;
              var mission_ids = ly[i].mission_id;
              var land_success = ly[i].rocket.first_stage.cores[0].land_success;
      
              var card = ' <div class="col-12 col-md-6 col-xl-3 boxed"><div class="bg-white p-3 rounded-2 boxed__card"><img src='+ img +' alt="image" class="w-100 boxed__card-img"><h3 class="text-primary mt-3">'+ name +' #'+ number +'</h3><h3 class="mt-2">Mission Ids:</h3><ul class="text-primary" id="mission_'+number+'"></ul> <h3 class="mt-2">Launch Year: <span class="fw-normal text-primary">'+ launch_year +'</span></h3><h3 class="mt-2">Successful Launch: <span class="fw-normal text-primary">'+ land_success +'</span></h3></div></div></div>';
     
              $("#ans").append(card);
              $("#mission_"+number).html(appendMissionId(mission_ids));
          }
        }).catch(err => {
          // Do something for an error here
          console.log("Error");
        });

      
})

$(document).ready(function(){
    var prev = null;
    var launch = null, landing = null;
    $(".year").on("click",function(){
      
        $('.successLaunch').removeClass("active");
        $('.successLanding').removeClass("active");

        $(this).addClass("active");
        axios.get('https://api.spacexdata.com/v3/launches?limit=100')
        .then((response) => {
            var data = response.data;

          var ans = data;
         var yr = this.id;
         if(prev == yr)
         {
            $(this).addClass("active");
         }
         else
         {
            $('.year').not($(this)).removeClass("active");
         }
        prev = yr;
        console.log("Prev : "+prev+" Yr : "+yr);
         console.log("Year : "+yr);
          filterYear(data, yr);
        
        }).catch(err => {
          // Do something for an error here
          console.log("Error");
        });
        
    })
 
    $(".successLaunch").on("click",function(){

    $('.year').removeClass("active");
    $('.successLanding').removeClass("active");

    axios.get('https://api.spacexdata.com/v3/launches?limit=100')
    .then((response) => {
        var data = response.data;

        var ans = data;
        var val = this.id;
        if(val == "trueId")
        {
            $("#trueId").addClass("active");
            $("#falseId").removeClass("active");
        }
        else
        {
            $("#trueId").removeClass("active");
            $("#falseId").addClass("active");
        }

        filterSuccessLaunch(data, val);
     
     }).catch(err => {
       // Do something for an error here
       console.log("Error");
     });
    })
 
    $(".successLanding").on("click",function(){

    $('.year').removeClass("active");
    $('.successLaunch').removeClass("active");

    axios.get('https://api.spacexdata.com/v3/launches?limit=100')
    .then((response) => {
        var data = response.data;

       var ans = data;
      var val = this.id;
      console.log(val);
      console.log('Inside Landing');
        if(val == "successFalse")
        {
            $("#successFalse").addClass("active");
            $("#successTrue").removeClass("active");
        }
        else
        {
            $("#successFalse").removeClass("active");
            $("#successTrue").addClass("active");
        }
      
      filterSuccessLanding(data, val);
     
     }).catch(err => {
       // Do something for an error here
       console.log("Error");
     });
    })
 });
 
 function filterYear(data,year){
 
     var ly = [];
     var k = 0;
 
     for(let i=0;i<data.length;i++)
     {
         if(data[i].launch_year == year)
         {
             ly[k++] = data[i];
         }
     }
     $("#ans").html("");
     for(let i=0;i<k;i++)
     {
         var img = ly[i].links.mission_patch;
         var name = ly[i].mission_name;
         var number = ly[i].flight_number;
         var launch_year = ly[i].launch_year;
         var mission_ids = ly[i].mission_id;
         var land_success = ly[i].rocket.first_stage.cores[0].land_success;
 
         var card = ' <div class="col-12 col-md-6 col-xl-3 boxed"><div class="bg-white p-3 rounded-2 boxed__card"><img src='+ img +' alt="image" class="w-100 boxed__card-img"><h3 class="text-primary mt-3">'+ name +' #'+ number +'</h3><h3 class="mt-2">Mission Ids:</h3><ul class="text-primary" id="mission_'+number+'"></ul> <h3 class="mt-2">Launch Year: <span class="fw-normal text-primary">'+ launch_year +'</span></h3><h3 class="mt-2">Successful Launch: <span class="fw-normal text-primary">'+ land_success +'</span></h3></div></div></div>';

         $("#ans").append(card);
         $("#mission_"+number).html(appendMissionId(mission_ids));
     }
 }
 
 function filterSuccessLaunch(data, val){
 
     var ly = [];
     var k = 0;
     var v = "";
     if(val == "trueId")
     {
         v = true;
     }
     else
     {
         v = false;
     }
     for(let i=0;i<data.length;i++)
     {
         if(data[i].launch_success == v)
         {
             ly[k++] = data[i];
         }
     }
     $("#ans").html("");
     for(let i=0;i<k;i++)
     {
         var img = ly[i].links.mission_patch;
         var name = ly[i].mission_name;
         var number = ly[i].flight_number;
         var launch_year = ly[i].launch_year;
         var mission_ids = ly[i].mission_id;
         var land_success = ly[i].rocket.first_stage.cores[0].land_success;
 
         var card = ' <div class="col-12 col-md-6 col-xl-3 boxed"><div class="bg-white p-3 rounded-2 boxed__card"><img src='+ img +' alt="image" class="w-100 boxed__card-img"><h3 class="text-primary mt-3">'+ name +' #'+ number +'</h3><h3 class="mt-2">Mission Ids:</h3><ul class="text-primary" id="mission_'+number+'"></ul> <h3 class="mt-2">Launch Year: <span class="fw-normal text-primary">'+ launch_year +'</span></h3><h3 class="mt-2">Successful Launch: <span class="fw-normal text-primary">'+ land_success +'</span></h3></div></div></div>';

         $("#ans").append(card);
         $("#mission_"+number).html(appendMissionId(mission_ids));
     }  
 }
 
 
 function filterSuccessLanding(data, val){
 
     var ly = [];
     var k = 0;
     var v = "";
     if(val == "successTrue")
     {
         v = true;
     }
     else
     {
         v = false;
     }
     for(let i=0;i<data.length;i++)
     {
         if(data[i].rocket.first_stage.cores[0].land_success == v)
         {
             ly[k++] = data[i];
         }
     }
     $("#ans").html("");
     for(let i=0;i<k;i++)
     {
         var img = ly[i].links.mission_patch;
         var name = ly[i].mission_name;
         var number = ly[i].flight_number;
         var launch_year = ly[i].launch_year;
         var mission_ids = ly[i].mission_id;
         var land_success = ly[i].rocket.first_stage.cores[0].land_success;
 
 
        var card = ' <div class="col-12 col-md-6 col-xl-3 boxed"><div class="bg-white p-3 rounded-2 boxed__card"><img src='+ img +' alt="image" class="w-100 boxed__card-img"><h3 class="text-primary mt-3">'+ name +' #'+ number +'</h3><h3 class="mt-2">Mission Ids:</h3><ul class="text-primary" id="mission_'+number+'"></ul> <h3 class="mt-2">Launch Year: <span class="fw-normal text-primary">'+ launch_year +'</span></h3><h3 class="mt-2">Successful Launch: <span class="fw-normal text-primary">'+ land_success +'</span></h3></div></div></div>';

        $("#ans").append(card);
        $("#mission_"+number).html(appendMissionId(mission_ids));
     }  
 }
 
 
 function appendMissionId(mission_ids){
     
     var li = "<li>";
     for(let j=0;j<mission_ids.length;j++)
     {
         console.log(mission_ids[j]);
         var d = mission_ids[j];
         li += d;
     }
     li += "</li>";
 
     return li;
 
 }
 
