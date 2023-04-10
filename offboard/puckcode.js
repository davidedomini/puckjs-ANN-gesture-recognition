acc_values = [];
var i = 0;
const stride = 1;

function read_acc(){
  var v = Puck.accel().acc;
  acc_values.push(v);
  i++;
}

function slidingWindow(stride){
  for(var j = 0; j < stride; j++){
    acc_values.shift();
  }
}

function toCsv(){
  return acc_values
    .reduce((accumulator, currentValue) => { 
      accumulator.push(currentValue.x);
      accumulator.push(currentValue.y);
      accumulator.push(currentValue.z);
      return accumulator; 
    }, [])
    .map(e => e.toString())
    .join(', ');
}

function dumpData(){
  if(acc_values.length == 20){
    var csv_data = toCsv();
    console.log('{"data": "' + csv_data + '"}');
  } else {
    console.log(null);
  }
}

setInterval(function() {
  if(i < 20){
    read_acc();
  } else {
    slidingWindow(stride);
    i = acc_values.length;
  }
}, 80);
