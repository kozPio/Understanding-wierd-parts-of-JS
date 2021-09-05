 var g = G$("John" , "Doe");
 

 g.greet().setLang('es').greet(1);


 $("#login").click(function() {
   var loginGrter = G$("John" , "Doe");

   $("#logindiv").hide();

   loginGrter.setLang($('#lang').val()).HtmlGreeting('#greeting', true).log();
 })