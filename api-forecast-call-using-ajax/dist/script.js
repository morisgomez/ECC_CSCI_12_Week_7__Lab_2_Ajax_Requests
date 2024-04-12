//step 2. create a handler for the click search button event:
function requestForecast() //will create request for data.
{
   let zipcode = document.getElementById("zip").value; //store user input value from text box.
  
//step 3. create new Ajax request:
   let xhr = new XMLHttpRequest(); //creates new Ajax request & stores it in xhr.
 
//step 4. add event listener to ajax request:
   xhr.addEventListener("load", responseReceivedHandler); //if request loads successeful, call funtion. 
   xhr.responseType = "json"; //response needs to be in json format.
  
//step 5. send request to server:
   xhr.open("GET", "https://wp.zybooks.com/weather.php?zip=" + zipcode);
   //"https://wp.zybooks.com/weather.php?zip=90044" add user input to end of server request.
   xhr.send();
} //end getForecast() function.

//step 6. create handler for "load" response from server:
function responseReceivedHandler() 
{ //this = object created by event "load"
  //kinda like the response.
   if (this.status !== 200) // if response status is not successful but still made connection w/ server.
   {
      alert("Error making HTTP request");  
   }
  
  let html = ""; //empty string.
  if(this.response.success) //response accesses json. so checking if the data's success key = true.
  {
    html = html + "<h3>forecast for next 5 days</h3>";
    html = html + "<ol>";
    
    for (let day of this.response.forecast) //this.response.forecast accesses array in reponse via json.
    {
      html = html + "<li>" + day.desc + ":" + " high of: " + day.high + ", low of: " + day.low + "</li>";
      //day stores each index and desc, high, low are values of key for each index.
    }
    html = html + "</ol>";
  } 
  else 
  {
   html = "<h3>Error: " + this.response.error + "</h3>`"; //error is a key inside json data from succesful response.
}
  document.getElementById("forecast").innerHTML = html;
} //end responseReceivedHandler() function.

//step 1. create an eventListener for search button:
document.getElementById("search").addEventListener("click", requestForecast);


/* for succesful response via json:
{
   "success": true,
   "forecast": [
   index 0 { "high": 90, "low": 72, "desc": "sunny" },
   index 1 { "high": 92, "low": 73, "desc": "mostly sunny" },
   index 2 { "high": 87, "low": 64, "desc": "rain" },
   index 3 { "high": 88, "low": 65, "desc": "cloudy" },
   index 4 { "high": 90, "low": 68, "desc": "partly cloudy" }
   ]
}
*/
/* for not succesful response via json:
{
   "success": false,
   "error": "ZIP code not found"
}
*/