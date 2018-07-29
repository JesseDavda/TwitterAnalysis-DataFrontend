var index, chart_dates = [], chart_tweets = [], starting_run = true;

//Connect to the Socket.io port so we can receive the tweet data in realtime.
var socket = io('http://185.177.21.146:8082/');

//When the tweet data is received, carry out the following function
socket.on('New Tweet', function (data) {
  //Updating the values of the 4 cards (total tweets & average favorites, retweets and followers) in realtime.
  document.getElementById("total_tweets").innerHTML = "Total Tweets: " + data.total_tweets;
  document.getElementById("average_favorites").innerHTML = "Average favorites: " + data.average_favorites;
  document.getElementById("average_retweets").innerHTML = "Average Retweets: " + data.average_retweets;
  document.getElementById("average_followers").innerHTML = "Average Followers: " + data.average_followers;

  //Update the graph on first run and every 1 tweets. The 1 can be changed for quicker or slower update times.
  if ((data.total_tweets % 1) == 0) {
    updateGraph(data);
  }
});

socket.on('Starting Values', function(data){
  document.getElementById("total_tweets").innerHTML = "Total Tweets: " + data.total_tweets;
  document.getElementById("average_favorites").innerHTML = "Average favorites: " + data.average_favorites;
  document.getElementById("average_retweets").innerHTML = "Average Retweets: " + data.average_retweets;
  document.getElementById("average_followers").innerHTML = "Average Followers: " + data.average_followers;

  data.day_data.forEach(i => {
      chart_dates.push(i.date);
      chart_tweets.push(i.day_tweets);
  });

  Chart.data.labels = chart_dates;
  Chart.data.datasets[0].data = chart_tweets;
  Chart.update();
});

//The function that is called every 50th tweet to update all the values in the graph
function updateGraph(data){
  var data = data.day_data;
  if(!chart_dates.includes(data.date)){
    chart_dates.push(data.date);
    chart_tweets.push(data.day_tweets);
  } else {
    index = Chart.data.labels.indexOf(data.date);
    if (chart_tweets[index] != data.day_tweets) {
      chart_tweets[index] = data.day_tweets;
    }
  }

  Chart.data.labels = chart_dates;
  Chart.data.datasets[0].data = chart_tweets;
  Chart.update();
}

//Creating the graph using Chart.js
var ctx = document.getElementById("realtime_chart").getContext('2d');
var Chart = new Chart(ctx, {
    type: 'line',
    data: {
        // labels: [dates],
        datasets: [{
            label: 'Number of Tweets',
            // data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(155, 88, 182, 0.4)'
            ],
            borderColor: [
                "rgba(155, 88, 182, 1)"
            ],
            borderWidth: 1,
            lineTension: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
    }
});

// var hellochart = document.getElementById("past_chart").getContext('2d');
// var Chart2 = new Chart(hellochart, {
//     type: 'line',
//     data: {
//         // labels: [dates],
//         datasets: [{
//             label: 'Number of Tweets',
//             // data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(155, 88, 182, 0.4)'
//             ],
//             borderColor: [
//                 "rgba(155, 88, 182, 1)"
//             ],
//             borderWidth: 1,
//             lineTension: 0
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         },
//     }
// });


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
