$(function() {

	// Display a bit on the LED display
	function setBit(bit, on) {
		if (on) {
			$("#bit" + bit).css("background-color", "Red");		
		} else {
			$("#bit" + bit).css("background-color", "LimeGreen");		
		}
	}

	// Display a byte on the LED display
	function displayCharForInitialStart(ch) {
		console.log("Key: " + String.fromCharCode(ch) + "[" + ch + "]");
		setBit(9, (ch | 1) > 0)
		setBit(8, (ch | 1) > 0)
		setBit(7, (ch | 1) > 0)
		setBit(6, (ch | 1) > 0)
		setBit(5, (ch | 1) > 0)
		setBit(4, (ch | 1) > 0)
		setBit(3, (ch | 1) > 0)
		setBit(2, (ch | 1) > 0)
		setBit(1, (ch | 1) > 0)
		setBit(0, (ch | 1) > 0)
	}

	// Clears the display back to grey
	function clearDisplay() {
		$(".bitbtn").css("background-color", "LightGray");	
	}
	

	//function to fetch random word from api on pressing the input bar and trigger start of the game
	$('.start').click(
		function fetchWord(){	
		const api = 'https://random-word-api.herokuapp.com/word' //api that fetches random words
		//promises for determining the fetch process
		fetch(api) 
		.then(res => res.json()) //data in json format
		.then(data=>{console.log(data, data.map(word => word.length))}) //displaying word and its length in console
		.then(function dispWord(){
			var wordChosen = document.querySelector('.word');
			
		})
		}
	)


	// Animate the string into the LED display
	$("#go").click(function() {

		var pos = 0;
		var msg = $("#keyboard").val();
		clearDisplay();
		if (msg.length == 0) return;
		var interval = setInterval(function() {
			var ch = msg.charCodeAt(pos);
			if (pos++ >= msg.length) {
				clearInterval(interval);
				clearDisplay();
			} else {
				displayChar(ch)	
			}
		}, 1000)

		return false;
	});

})