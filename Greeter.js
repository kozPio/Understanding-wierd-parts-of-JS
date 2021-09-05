;(function(global, $) {


  var Greeter = function(firstName, lastName, language){
    return new Greeter.init(firstName, lastName, language);
  };

  var supportedLanguages = ["en", "es"];

  var greetings = {
    en: "Hello",
    es: "Hola"
  };


  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  var loggMessages = {
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

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!'
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName()
    },

    greet(formal) {
      var msg;
      if(formal) {
        msg= this.formalGreeting();
      }else {
        msg= this.greeting()
      }

      if(console){
        console.log(msg);
      }

      return this;
    },

    log: function() {
      if(console){
        console.log(loggMessages[this.language] + ": " + this.fullName());


        return this
      }
    },


    setLang: function(lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    HtmlGreeting: function(selector, formal) {
      if(!$) {
        throw "no jquery"
      }
      if(!selector) {
        throw "Missing a selector"
      }

      var msg;
      if(formal){
        msg = this.formalGreeting();
      }else {
        msg = this.greeting();
      }
      
      $(selector).html(msg);

      return this;
    }
    
  };

  Greeter.init = function(firstName, lastName, language){

    var self = this
    self.firstName = firstName || "John"; 
    self.lastName = lastName || "Doe";
    self.language = language || "en"


    self.validate();
  }

  Greeter.init.prototype = Greeter.prototype;

  global.Greeter = global.G$ = Greeter;

}(window, $))





