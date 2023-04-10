// Without sliding window

console.log("START");

var i = 0;
setInterval(function() {
  if(i < 20){
    var v = Puck.accel().acc;
    Infxl.insert(i, v.x, v.y, v.z);
    i++;
  } else {
    i = 0;
    var classification = Infxl.model();
    console.log("result: " + classification);
  }
}, 80);

// ------------------------------------------------------------

// With sliding window

console.log("START");
acc_values = [];
var i = 0;
const stride = 1;

function read_acc(){
  var v = Puck.accel().acc;
  acc_values.push(v);
  i++;
}

function classify(){
  var j = 0;
  acc_values.forEach(v => Infxl.insert(j++, v.x, v.y, v.z));
  return Infxl.model();
}

function slidingWindow(stride){
  for(var j = 0; j < stride; j++){
    acc_values.shift();
  }
}

setInterval(function() {
  if(i < 20){
    read_acc();
  } else {
    var classification = classify();
    console.log("Result: " + classification);
    slidingWindow(stride);
    i = acc_values.length;
    console.log("New acc_values len: " + i);
  }
}, 80);
