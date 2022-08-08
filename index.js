$(function(){
	
	var words = new Array('', 'hello', 'taken', 'nice', 'game', 'little', 'born', 'toogle', 'together', 'midnight', 'ninja');
	index = Math.round(Math.random()*10000)%10; //gives random indices from 0 to 10

	console.log(words[index] + ', word at that index');//for tests only
	
	var alphabets = new Array(); //array that stores characters to be compared with the input characters, equals to characters from random word
	var alpha_index = 0;

	var input = new Array(); //creates array of a word that will be compared to alphabets
	var input_index = 0;

	var running = 0;
	var fail = 6;
	var advising = 0;

	const floatCircles = document.querySelector('.floatCircles') //div in html
	
	//function that displays a word in input, but with star char hiding the chosen word, red leds
	function chose(){
		var dispCircles = ""; // for LED circles in browser
		var choice ="";//for hidden random word characters
		var blank = 0; //determines a win

		//for alphabets, looping indices of the word chosen at random 
		for(i=0; i<words[index].length; i++){
			state = 0;
			for(j=0; j<=alpha_index; j++)
			if(words[index].charAt(i) == alphabets[j]) state =1;
			//tests
			// console.log(alpha_index + 'alpha_index'); //indices of alphabets in new array shows 0s, follows the word length and appear twice
			// console.log(alphabets); //still empty array, following the lenght of random word length
			// console.log(words[index].charAt(i)); //shows characters of random word
			// console.log(alphabets[j]);//this is undefined, at first, letter becomes characters that matched correctly with input

			//alphabets state	
			if(state) {
				//for every input that matches the characters of the random word, remains/replaces the "*" or led state is 1
				choice+=words[index].charAt(i)+" ";
				dispCircles+=`<div class="circle" style="background-color: limegreen;">${words[index].charAt(i)+" "}</div> `;	
			}
			else{
				choice+="* "; //current state, no word character will be shown

				circles = `<div class="circle" style="background-color: red;">${words[index].charAt(i)}</div>`;
				//${words[index].charAt(i)}
				dispCircles+=circles
				//not a win yet
				blank =1;
			}
		}
		document.alphform.word.value = choice; //adds the characters to input in browser 
		floatCircles.innerHTML = dispCircles;//ads LEDs to browser

		if(!blank){
			clearInterval(counts);//stop time count
			document.alphform.trials.value = " You WIN";

			//displaying bubbles on winning
			const divbubbles = document.querySelector('.bubbles');
			bubbles = `
			<img src="/bubble.png">
			<img src="/bubble.png">
			<img src="/bubble.png">
			<img src="/bubble.png">
			<img src="/bubble.png">
			<img src="/bubble.png">
			<img src="/bubble.png">
			<img src="/bubble.png">`;
		divbubbles.innerHTML = bubbles;

		running = 0; //state 0, not running, word guessed
		}
	}

	//clicking start button
	$('.start').click(
		function startgame(){
		chose(); //displays the hidden word characters in input box that is chosen at random
		newRandomWord() //when start is clicked again
		time(); // ticking time function
		
	})
//retry button function
	$('.retry').click(()=>{
		retry();
	}
	)

	//if start button is clicked again
	function newRandomWord(){
		if(!running){
			running = 1; //game started
			fail = 6; //attempts  starts at 6
			document.lifeform.life.value = fail; //displays attempts in attempts in div in browser
			document.alphform.trials.value = "";//default value displayed
			document.alphform.word.value = "";//default value
			chose(); //displays the hidden word characters in input box that is chosen at random
		}
		else{
			helpmsg('Word playing, time is ticking!');//if clicked again, this message is shown, nothing changes
		}
	}

	//function for reloading the page not working properly
	const retry = ()=>{
			window.location.reload();
			chose;
			time();
		}
		
	//clicking go button to submit keyboard inputs
	$('#go').click((e)=>{
		e.preventDefault();//preventing browser from reloading in every letter submission
		findLetter();//function for letter inputs
		// LEDletters(); //function for greenleds letter input
	})

	//function to get input from keyboard and compare the letters
	function findLetter(letter){
		letter = $('#keyboard').val(); //getting keyboard input
		if(!running){
			helpmsg("click Start to begin")
		}
		else{
			state = 0;
			for(i=0; i<=input_index; i++){
				if(input[i] == letter) state=1;//new state, for input characters inserted in an array, input_index=> index that counts arrays that carry input characters, input => the array that stores input characters, [i] characters typed at those indices
			}

			//if that is not the case, input doesn't match correct characters
			if(!state){
				document.alphform.trials.value += letter + "," + " " //displays typed letters correct or not correct
				input_index++;//deosn't seem to have efffect on code
				input[input_index] = letter;///place input character into array

				for(i=0; i<words[index].length; i++)//loop through word characters
				if(words[index].charAt(i) == letter) state = 1;//same state as correct input, alphabets in new array stored*

				if(state){
				alpha_index++; //ensures letter replaces the star characters and remains, alphabets in a virtual array that equals to characters of random word
				alphabets[alpha_index] = letter;//alphabets saved in array, alphabets equal to input
				}
				else 
				fail--;//reduce attempts
				
				document.lifeform.life.value=fail; //updates the attempts in the div

				//showing hangman parts for every time an attempt is reduced
				if(fail == 5){
					document.getElementById('5').style.display = 'block';
				}
				if(fail == 4){
					document.getElementById('4').style.display = 'block';
				}
				if(fail == 3){
					document.getElementById('3').style.display = 'block';
				}
				if(fail == 2){
					document.getElementById('2').style.display = 'block';
				}
				if(fail == 1){
					document.getElementById('1').style.display = 'block';
				}

				if(fail == 0){ //when attempts reach 0
					document.getElementById('0').style.display = 'block'; //hangman last part
						document.alphform.trials.value = "You lose";
						document.alphform.word.value = words[index];//displaying the word
						running = 0; //state not running
						clearInterval(counts);
					}
					else chose();///maintain the star characters, as hiding characters || supposed to call a new random word
				}
				else{
				helpmsg(`letter ${letter} is already used`); //if input neither matches state 1 nor anything alse false under repeated letter
			}
		}
	}

	//function for displaying guide messages in a short period and then dissappear
	const helpmsg = (msg)=>{
		if(!advising){
			advising = -1;
			messageSaved = document.alphform.trials.value; //msg that will be displayed
			document.alphform.trials.value = msg; //which is equal to argument of advise function that will be passed
			window.setTimeout("document.alphform.trials.value = messageSaved; advising=0;", 1000);
		}
	}

	//timer function
	const time = ()=>{
		let timeCount = new Date(60000); //where to start counting from (time 60 sec)
		const digits = {//format display according to text value in browser
			minute: '2-digit',
			second: '2-digit',
		};

		const tick = function (){
			timeCount -= 1000 // counting downwards
			const timeFormat = Intl.DateTimeFormat('en-US',digits).format(timeCount);
			
			if(tick){
				running = 1;
				document.timeform.time.value = timeFormat;
			}
		
			if(timeCount === 0){ //when counts reaches 0
				clearInterval(counts); //stops time count at 0s
				document.alphform.trials.value = "You lose";
				running = 0; //not running , lose state
				document.alphform.word.value = words[index];//displaying the word
			}
		};
		tick();//recursion
		counts = setInterval(tick, 1000); //after a single sec, countdown is made
		return counts;//over and over till 0 is reached
	};

//end	
})