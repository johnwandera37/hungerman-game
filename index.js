$(function(){

	///fetching a random word from api
	//can try using api for your random word, sometimes mapping the word can be such a drag!!
	// 		var api = 'https://random-word-api.herokuapp.com/word' //api that fetches random words
	// 		fetch(api) 
	// 		.then(res => res.json()) //data in json format
	// 		.then(word=>{
	// 			console.log(word + ', random word picked by api'),
	// 			console.log(word.map(wordlength => wordlength.length + ', length of the word')),//lenght of word
	// 			console.log(word.map(word=> word[2] + ', word at specified index')), //character at specified index
	// 			console.log(word.map(word=>word.length-1 + ', last index of the word')) //last character of the random word	
	// 	})

	
	var words = new Array('','hello', 'taken', 'nice', 'game', 'little', 'born', 'toogle', 'together', 'midnight', 'ninja');
	index = Math.round(Math.random()*10000)%10; //gives random indices from 0 to 10
	//tests
	// console.log(index + ', index at random');
	console.log(words[index] + ', word at that index');
	// console.log(words[index].length + ', length of random word');
	// console.log(words[index].length-1 + ', last index of the word');

	
	var alphabets = new Array(); //creates word in new form in the input box
	var alpha_index = 0;

	var input = new Array(); //creates array of a word that will be compared to alphabets
	var input_index = 0;

	var running = 0;
	var fail = 6;
	var advising = 0;

	const floatCircles = document.querySelector('.floatCircles') // a div in html
	var  ledcolors = new Array();//array to store dive classes for green LED
	var ledcolors_index = 0;
	
	//function that displays a word in input, but with star char hiding the chosen word
	function chose(){
		var dispCircles = ""; // for LED circles in browser
		var choice ="";//jfor hidden random word characters
		var blank = 0; //determines a win
		for(i=0; i<words[index].length; i++){	//looping indices of the word chosen at random 
			state = 0; //current state
			for(j=0; j<=alpha_index; j++)
			if(words[index].charAt(i) == alphabets[j]) state =1;
			//tests
			// console.log(alpha_index); //indices of alphabets in new array shows 0s, follows the word length and appear twice
			// console.log(alphabets); //still empty, following the lenght of random word length
			// console.log(words[index].charAt(i)); //shows characters of random word
			// console.log(alphabets[j]);//this is undefined

			if(state) {
				choice+=words[index].charAt(i)+" ";
				dispCircles=words[index].charAt(i);	
			}
			else{
				choice+="* "; //current state, no word character will be shown

				//displaying LED circle
				dispCircles+="_ "
				circles = `<div class="circle" style="background-color: red;"></div>`;
				dispCircles+=circles
				
				blank =1;//change of state showing that a WIN cannot be shown in this state
			}
		}

		document.alphform.word.value = choice; //now adds the char to input in browser 
		floatCircles.innerHTML = dispCircles;

		if(!blank){
			clearInterval(counts);//stop time count
			document.alphform.trials.value = " You WIN"; //when blank is at state 0
			running = 0; //shows that word is fully guessed, changes to state 0, not running	
		}
	}

	//clicking start button
	$('.start').click(()=>{
		chose(); //this displays the hidden word characters in input box that is chosen at random
		newRandomWord();//when start is clicked again
		time();//starts time on clicking start
		
	})	

	//if start button is clicked again
	function newRandomWord(){
		if(!running){
			running = 1; //game started
			fail = 6; //attempts  starts at 6
			document.lifeform.life.value = fail; //displays attempts in attempts in div in browser
			document.alphform.trials.value = "";//this will be empty since game will be starting
			document.alphform.word.value = "";//word will be displayed from chose function, this will be empty

			chose(); //this displays the hidden word characters in input box that is chosen at random
			
		}
		else{
			helpmsg('Word playing, time is ticking!');//if clicked again, this message is shown, nothing changes
		}
	}

	//clicking go button to submit keyboard inputs
	$('#go').click((e)=>{
		e.preventDefault();//preventing browser from reloading in every letter submission
		findLetter();
	})

	//function to get input from keyboard and compare the letters
	function findLetter(letter){
		letter = $('#keyboard').val(); //getting keyboard input
		if(!running){
			helpmsg("click Start to begin")
		}
		else{
			state = 0;//current state
			for(i=0; i<=input_index; i++){
				if(input[i] == letter) state=1;//new state, for correct/inputed characters characters being equal to input and inserted in an array
				//tests
				// console.log(input_index);// indices of characters inserted in an array like counting the array of characters, luks weird though the way they repeat themselves*
				// console.log(input)//the arrray that carries input characters
				// console.log(input[i])//characters from array, first typed is undefined probably at index 0, not shown, shown only when second character is typed as it goes on, last typed will not be shown
			}

			// for(j=0; j<=ledcolors_index; j++){
			// 	if(ledcolors[j] == letter) state=1;
			// 	console.log(ledcolors)//test if rray is storing letters, yes
	 		// }

			//if that is not the case, input doesn't match correct characters
			if(!state){
				document.alphform.trials.value += letter + "," + " " //displays typed letters correct or not correct
				input_index++;//deosn't seem to have efffect on code
				input[input_index] = letter;///place input character into array

				// ledcolors_index++;
				// ledcolors[ledcolors_index] = letters;//**places div into array for LEDs
				// console.log(ledcolors);

				//var ledgreen = `<div class="circle" style="background-color: green;">${words[index].charAt(i)}</div>`;

				for(i=0; i<words[index].length; i++)//loop through word characters
				if(words[index].charAt(i) == letter) state=1; //same state as correct input, alphabets in new array

				//looping leds class
					
					// // floatCircles.innerHTML = ledgreen;
					// for(j=0; j<words[index].length; j++)//loop through word characters
					// if(words[index].charAt(i) == ledgreen) {state=1;
					// letter = ledgreen;
					// }


					if(state){

						alpha_index++; //ensures letter replaces the star characters and remains, alphabets in a virtual array that equals to characters of random word
						// ledcolors_index++;
						// ledgreen++;
						// floatCircles.innerHTML = ledgreen;
						// alphabets[alpha_index] = ledgreen;
						// alphabets[ledcolors_index] = letter
						alphabets[alpha_index] = letter;//alphabets saved in array, alphabets equal to input
						
					}
					else 
					fail--;//reduce attempts
					
					document.lifeform.life.value=fail; //updates the attempts in the div
					if(fail == 0){ //when attempts reach 0
						
						document.alphform.trials.value = "You lose";
						document.alphform.word.value = words[index];//displaying the word
						running = 0; //state not running
						clearInterval(counts);
					}
					else chose();///maintain the star characters, as hiding characters || supposed to call an new random word
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
		let timeCount = new Date(60000); //where to start counting from (time)
		const digits = {//format display according to text value in browser
			minute: '2-digit',
			second: '2-digit',
		};

		const tick = function (){ //working of the function
			timeCount -= 1000 // counting downwards
			console.log(timeCount);//correct values
			const timeFormat = Intl.DateTimeFormat('en-US',digits).format(timeCount);
			console.log(timeFormat);//correct time format
			document.timeform.time.value = timeFormat;
			if(tick) running =1;
			if(timeCount === 0){ //when counts reaches 0
				
				clearInterval(counts); //stops time count at 0s
				document.alphform.trials.value = "You lose";
				running = 0; //not running , lose state
				document.alphform.word.value = words[index];//displaying the word
			}
		};
		tick();//recursion
		counts = setInterval(tick, 1000); //after a single sec, countdown is made
		return counts;
	};
	
	
})
