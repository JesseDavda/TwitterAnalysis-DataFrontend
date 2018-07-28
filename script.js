var dates = [], index, chart_dates = [], chart_tweets = [];

//Connect to the Socket.io port so we can receive the tweet data in realtime.
var socket = io('http://185.177.21.146:8082/');

//When the tweet data is received, carry out the following function
socket.on('tweet', function (data) {
  //Updating the values of the 4 cards (total tweets & average favorites, retweets and followers) in realtime.
  document.getElementById("total_tweets").innerHTML = "Total Tweets: " + data.total_tweets;
  document.getElementById("average_favorites").innerHTML = "Average favorites: " + data.average_favorites;
  document.getElementById("average_retweets").innerHTML = "Average Retweets: " + data.average_retweets;
  document.getElementById("average_followers").innerHTML = "Average Followers: " + data.average_followers;
  updateGraph(data);
  //Update the graph every 50 tweets. The 50 can be changed for quicker or slower update times.
  // if ((total_tweets % 50) == 0) {
  //   updateGraph(data);
  // }
});

//The function that is called every 50th tweet to update all the values in the graph
function updateGraph(data){
  data.day_data.forEach(i => {
    if(!chart_dates.includes(i.date)){
      chart_dates.push(i.date);
      chart_tweets.push(i.day_tweets);
    } else {
      index = Chart.data.labels.indexOf(i.date);
      if (chart_tweets[index] != i.day_tweets) {
        chart_tweets[index] = i.day_tweets;
      }
    }
  });

  Chart.data.labels = chart_dates;
  Chart.data.datasets[0].data = chart_tweets;
  Chart.update();
}

var ctx = document.getElementById("myChart").getContext('2d');
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


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
