/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://community-open-weather-map.p.rapidapi.com/weather?zip=';
const apiKey = '0e5a48fea2mshf0778f0385021bcp129542jsn6bb6cbfbc305';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Async Function to GET Web API data */
const getWeather = async (zip) => {

  const response = await fetch(baseUrl + zip, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': apiKey
    },
  });

  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log(error);
  }
};

/* Async Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
      console.log('error', error);
    }
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  const code = document.getElementById('zip').value;
  getWeather(code)
  .then(weather => {
    postData('/add', {
      temperature: weather.main.temp,
      date: newDate,
      user_response: document.getElementById('feelings').value
    })
    updateUI();
  });
}

/* UPDATE UI DEMO */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Date: ${allData.slice(-1)[0].date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.slice(-1)[0].temperature}`;
    document.getElementById('content').innerHTML = `Feeling: ${allData.slice(-1)[0].user_response}`;
  }
  catch(error){
    console.log('error ', error);
  }
}