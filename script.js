var socket = io('http://185.177.21.146:8082/');
  socket.on('tweet', function (data) {
    console.log(data);
    document.getElementById("total_tweets").innerHTML = "Total Tweets: " + data.total_tweets;
    // socket.emit('my other event', { my: 'data' });
  });


var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["21/07/18", "22/07/18", "23/07/18", "24/07/18", "25/07/18", "26/07/18"],
        datasets: [{
            label: 'Number of Tweets',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(155, 88, 182, 0.4)'
            ],
            borderColor: [
                "rgba(155, 88, 182, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }
