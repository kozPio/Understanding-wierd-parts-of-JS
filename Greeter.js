(function(global, $) {


  var Greeter = function(firstName, lastName, language){
    return new Greeter.init(firstName, lastName, language);
  };

  var supportedLanguages = ["en", "es"];

  var greeting = {
    en: "Hello",
    es: "Hola"
  };


  var formalGreeting = {
    en: "Greetings",
    es: "Saludos"
  };

  var loggMessage = {
    en: "Logged in",
    es: "incion session"
  }

  Greeter.prototype = {

    fullName: function() {
      return this.firstName + " " + this.lastName
    },

    validate: function() {
      if(supportedLanguages.indexOf(this.language) === -1) {
        throw ("  Invalid language")
      }
    },


    
  };

  Greeter.init = function(firstName, lastName, language){

    var self = this
    self.firstName = firstName || "John"; 
    self.lastName = lastName || "Doe";
    self.language = language || "en"
  }

  Greeter.init.prototype = Greeter.prototype;

  global.Greeter = global.G$ = Greeter;

}(window, $))





