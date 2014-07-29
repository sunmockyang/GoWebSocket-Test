var WSApp = (function(){
	var WSApp,
	websocket = null;
	
	function exports(server_url, element){
		return new WSApp(server_url, element);
	};
	
	// Constructor
	WSApp = function(server_url, element){
		this.serverURL = server_url;
		this.element = element;
		this.websocket = new WebSocket(this.serverURL);
		this.websocket.onmessage  = this.onReceive.bind(this);
		this.websocket.onopen = this.onOpen.bind(this);
	};

	WSApp.prototype.onOpen = function(event){
		console.log("WEBSOCKET IS NOW OPENED");
	}
	
	WSApp.prototype.sendMessage = function(message){
		console.log("Sending...", message);
		this.print("CLIENT", message);
		this.websocket.send(message);
	};

	WSApp.prototype.onReceive = function(message){
		console.log("Receiving...", message);
		this.print("SERVER", message.data);
	}

	WSApp.prototype.print = function(source, message) {
		var now = new Date(),
		hour = (now.getHours() < 10) ? "0" + now.getHours() : now.getHours();
		minute = (now.getMinutes() < 10) ? "0" + now.getMinutes() : now.getMinutes();
		second = (now.getSeconds() < 10) ? "0" + now.getSeconds() : now.getSeconds();

		this.element.innerHTML += "<span class='msgTime'>[" + hour + ":" + minute + ":" + second + "] <span>";
		this.element.innerHTML += "<span class='msgSource src" + source + "'>" + source + ": <span>";
		this.element.innerHTML += "<span class='msgData'>" + message + "<span>";
		this.element.innerHTML += "<br/>";

		var temp = this.element.getElementsByClassName("msgTime");
		temp[temp.length-1].style.color = "hsl(" + now.getTime()/50 % 360 + ",50%,70%)";
	};
	
	return exports;
}());

var verbs =
[   
    ["go to", "goes to", "going to", "went to", "gone to"],
    ["look at", "looks at", "looking at", "looked at", "looked at"],
    ["choose", "chooses", "choosing", "chose", "chosen"]
];
var tenses = 
[
    {name:"Present", singular:1, plural:0, format:"%subject %verb %complement"},
    {name:"Past", singular:3, plural:3, format:"%subject %verb %complement"},
    {name:"Present Continues", singular:2, plural:2, format:"%subject %be %verb %complement"}
];
var subjects =
[
    {name:"I", be:"am", singular:0},
    {name:"You", be:"are", singular:0},
    {name:"He", be:"is", singular:1}
];
var complementsForVerbs =
[
    ["cinema", "Egypt", "home", "concert"],
    ["for a map", "them", "the stars", "the lake"],
    ["a book for reading", "a dvd for tonight"]
]
Array.prototype.random = function(){return this[Math.floor(Math.random() * this.length)];};
    
function generate(){
    var index = Math.floor(verbs.length * Math.random());
    var tense = tenses.random();
    var subject = subjects.random();
    var verb = verbs[index];
    var complement = complementsForVerbs[index];
    var str = tense.format;
    str = str.replace("%subject", subject.name).replace("%be", subject.be);
    str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
    str = str.replace("%complement", complement.random());
    return str;
}