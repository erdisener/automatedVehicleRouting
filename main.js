// web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAB_RziTrA7lPfAPOGNhNHJ9U0scOrsPTE",
  authDomain: "automatedvehicles-83143.firebaseapp.com",
  databaseURL: "https://automatedvehicles-83143.firebaseio.com",
  projectId: "automatedvehicles-83143",
  storageBucket: "automatedvehicles-83143.appspot.com",
  messagingSenderId: "531632852771",
  appId: "1:531632852771:web:cc2a003d0ffb7cd1594696",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Referance requests collection
var messagesRef = firebase.database().ref("requests");
messagesRef.on("value", gotData, errData);

function gotData(data) {
  console.log(data.val());
  var requests = data.val();
  var keys = Object.keys(requests);
  console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var customer_id = requests[k].customer_id;
    var park1_distance = requests[k].park1_distance;
    var park2_distance = requests[k].park2_distance;
    var park3_distance = requests[k].park3_distance;
    console.log(
      customer_id + ", ",
      "1" + ", ",
      park1_distance + ", ",
      "2" + ", ",
      park2_distance + ", ",
      "3" + ", ",
      park3_distance
    );
    //var li = createElement("li", customer_id);
    //li.parent("requestList");
  }
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

//var deleteDb = document.getElementById("btnClear").addEventListener("click");

//deleteDb.onload = function () {
//var eraseRef = firebase.database().ref("requests");
//eraseRef.remove();
//console.log("erdi");
//};

var result =
  // Listen for form save button
  document.getElementById("result").addEventListener("click", saveForm);

function saveForm(e) {
  e.preventDefault();
  var id = $("#customer_id").text();
  var km = $("#in_kilo").text();
  var demand = $("#duration_text").text();
  var demand_second = $("#duration_value").text();
  var origin = $("#from").text();
  var fromlatlng = $("#fromlatlng").text();
  var destination = $("#to").text();
  var tolatlng = $("#tolatlng").text();
  var earliest = getInputVal("earliest");
  var latest = getInputVal("latest");
  var carType = getInputVal("carType");
  var park1_dist = window.park1;
  var park2_dist = window.park2;
  var park3_dist = window.park3;

  // Reset orijin and destination text area after submit
  document.getElementById("distance_form").reset();

  // Save message
  saveMessage(
    id,
    km,
    demand,
    demand_second,
    origin,
    fromlatlng,
    destination,
    tolatlng,
    earliest,
    latest,
    carType,
    park1_dist,
    park2_dist,
    park3_dist
  );

  //Show alert
  document.querySelector(".alert").style.display = "block";

  //Hide alert after 3 sec.
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 2000);

  // Save message to firebase
  function saveMessage(
    id,
    km,
    demand,
    demand_second,
    origin,
    fromlatlng,
    destination,
    tolatlng,
    earliest,
    latest,
    carType,
    park1_dist,
    park2_dist,
    park3_dist
  ) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      customer_id: id,
      distance_km: km,
      demand_time_text: demand,
      demand_time_seconds: demand_second,
      origin: origin,
      origin_lat_lng: fromlatlng,
      destination: destination,
      destination_lat_lng: tolatlng,
      earliest_picking_time: earliest,
      latest_picking_time: latest,
      car_type: carType,
      park1_distance: park1_dist,
      park2_distance: park2_dist,
      park3_distance: park3_dist,
    });
  }
}

function getInputVal(id) {
  return document.getElementById(id).value;
}
