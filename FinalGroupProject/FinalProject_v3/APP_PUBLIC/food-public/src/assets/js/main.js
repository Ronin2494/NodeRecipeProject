$(document).ready( function() {

  var x = sessionStorage.getItem("usertoken");
  if (x == null || x == undefined){
    $("#btnupdate").hide();
    $("#btndelete").hide();
    $("#btnaddnewfood").hide();
  }
  else{
    $("#login").hide();
    $("#logout").show();
    
  }

  $("#logout").click(function() {
    sessionStorage.removeItem("usertoken");
    window.location.href = "/";
  });

  $(".navli").click(function() {
  var x = sessionStorage.getItem("usertoken");
  if (x == null || x == undefined){
    $("#btnupdate").hide();
    $("#btndelete").hide();
    $("#btnaddnewfood").hide();
  }
  });
  });