
export let b = 1;




function a() {
  console.log(this)
  this.newVar = "hello"
}

a();

console.log(newVar)

let tem = function () {
  console.log(this)
}

tem();

let c = {
  name: "C object",
  log: function () {
    var self = this;
    swlf.name = "updated C object"
    console.log(self)

    var setName = function (newName) {
      self.name = newName;
    }
    setName("updated again");
    console.log(self)
  }
}


c.log()


