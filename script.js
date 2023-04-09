// Create the map object
<script src="js/leaflet.js"></script>



var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);


const countryISOCode = 'AFG'; // Replace with desired country's ISO code
const endpoint = `http://api.unhcr.org/rsq/v1/populations?country_of_asylum=${countryISOCode}&population_type=refugees`;

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const totalRefugees = data.results[0].value;
    console.log(`Total refugees in ${countryISOCode}: ${totalRefugees}`);
  })
  .catch(error => console.error(error));

  const country = {
    code: "HRV",
    name: "Croatia",
    region: "Europe"
  };
  
  // Display the country name and region
  const countryNameElement = document.getElementById("country-name");
  const countryRegionElement = document.getElementById("country-region");
  
  countryNameElement.textContent = country.name;
  countryRegionElement.textContent = country.region;
  
  // Make a request to the UNHCR API for data on refugees in this country
  //const endpoint = `http://api.unhcr.org/rsq/v1/populations?country_of_asylum=${country.code}&population_type=refugees`;
  
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      // Display the total number of refugees in the country
      const totalRefugees = data.reduce((acc, cur) => acc + cur.value, 0);
      const totalRefugeesElement = document.getElementById("total-refugees");
      totalRefugeesElement.textContent = totalRefugees.toLocaleString();
    })
    .catch(error => console.error(error));

    const a = document.getElementById('myChart').getContext('2d');
const chart = new Chart(a, {
   type: 'line',
   data: {
       labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
       datasets: [{
           label: 'Refugees under UNHCR’s mandate',
           data: ['10,497,017', '11698233', '14,384,289', '16,110,276', '17,184,286', '19,940,566', '20,359,553', '20,414,669', '20,661,846', '21,327,285'],
           backgroundColor: 'rgba(255, 99, 132, 0.2)',
           borderColor: 'rgba(255, 99, 132, 1)',
           borderWidth: 1
       }]
   },
   options: {
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
   }
});

var dropdown = document.getElementById("myDropdown");


function toggleDropdown() {
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}


document.getElementById("myButton").addEventListener("click", toggleDropdown);

    
    
// Get the canvas element
var canvas = document.getElementById("myCanvas");

// Get the context of the canvas
var ctx = canvas.getContext("2d");

// Set the number of refugees for each country
var refugees = {
  "Afghanistan": 500000,
  "Syria": 300000,
  "Somalia": 200000
};

// Set the position of each country on the canvas
var countries = {
  "Afghanistan": [100, 100],
  "Syria": [200, 200],
  "Somalia": [300, 300]
};

// Draw the dots for each country
for (var c in countries) {
  var position = countries[c];
  var numRefugees = refugees[c];

  // Draw a circle for the country
  ctx.beginPath();
  ctx.arc(position[0], position[1], 10, 0, Math.PI*2);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath();

  // Add a hover event listener to show the number of refugees
  canvas.addEventListener("mousemove", function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    if (x > position[0]-10 && x < position[0]+10 && y > position[1]-10 && y < position[1]+10) {
      alert(country + ": " + numRefugees + " refugees");
    }
  });

  var select = document.querySelector('select');


select.addEventListener('change', function() {
  var option = this.options[this.selectedIndex];
  var link = option.getAttribute('data-link');
  window.location.href = link;
});

  
}

// Set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = document.getElementById("wordcloud").offsetWidth - margin.left - margin.right,
  height = document.getElementById("wordcloud").offsetHeight - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#wordcloud")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Load data from a file
d3.csv("data.csv", function(data) {

  // Initialize the word cloud layout
  var layout = d3.layout.cloud()
    .size([width, height])
    .words(data.map(function(d) { return {text: d.word, size: d.frequency}; }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

  // Draw the word cloud
  layout.start();

  // Function to draw the word cloud
  function draw(words) {
    svg.selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("fill", function(d, i) { return "hsl(" + Math.random() * 360 + ",100%,50%)"; })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });

    // Interactivity
    svg.selectAll("text")
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "white");
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", function(d, i) { return "hsl(" + Math.random() * 360 + ",100%,50%)"; });
      });
  }

});


var data = [
  {text: "apple", size: 32},
  {text: "banana", size: 10},
  {text: "orange", size: 24},
  {text: "pear", size: 18},
  {text: "grape", size: 16}
];


// Create the word cloud layout
var layout = d3.layout.cloud()
  .size([500, 500])
  .words(data)
  .padding(5)
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .fontSize(function(d) { return d.size; })
  .on("end", draw);


// Render the word cloud
layout.start();


function draw(words) {
  d3.select("#word-cloud")
    .append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", "black")
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}

<!-- Add an element where the website text will be displayed -->
<p id="displayText">Default text</p>

<script>
// Get the dropdown menu element
const dropdown = document.getElementById("myDropdown");

// Add an event listener to listen for changes to the dropdown menu
dropdown.addEventListener("change", function() {
  // Get the selected option value
  const selectedOption = dropdown.value;
  
  // Update the website text based on the selected option
  switch(selectedOption) {
    case "option1":
      document.getElementById("displayText").textContent = "You selected option 1";
      break;
    case "option2":
      document.getElementById("displayText").textContent = "You selected option 2";
      break;
    case "option3":
      document.getElementById("displayText").textContent = "You selected option 3";
      break;
    default:
      document.getElementById("displayText").textContent = "Default text";
      break;
  }
});
</script>

