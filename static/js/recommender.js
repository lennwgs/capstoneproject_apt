$(function(){
  console.log("testing");
  var most_important = 0;
  var most_important_val= 0;
  var med_important= 0;
  var med_important_val= 0;
  var least_important= 0;
  var least_important_val= 0;

  //$('#formRecommender').submit(function(){
    var res = '{{result|tojson}}';
    //var res = {{result}};

    console.log(JSON.stringify(res))
    return false;
  //});// end of form
  //debugger;

});
