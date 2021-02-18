const { getRandomWordSync, getRandomWord } = require('word-maker');
var fs = require("fs"); // import the file to write to the root the result.txt
console.log('It works!');

// YOUR CODE HERE
// Sasinthiran -18/2/2021

(async () => {
  let finalString = "";
  
  // Asynchronous Call
  console.time("Asynchronous Call : 500");
  let arrayList = [];
  for (i = 1; i <= 100; i++) {
	//Pushing the result to an array   
    arrayList.push(getRandomResult(i));
	
  }
  
 // promise is used to get asynchronous state and result
  let rel = await Promise.all(arrayList);

  // Concatenates the string arguments to a variable
  finalString += rel.join("\n");
  console.timeEnd("Asynchronous Call : 500");

  // Generate result for the index value passed
  async function getRandomResult(index) {
    let result = "";
	
	if (index % 3 == 0) result += `Fizz`;
	if (index % 5 == 0) result += `Buzz`;
    
	
    if (result == "") {
      await getRandomWord({ withErrors: true, slow: true })
        .then(randomWord => {
          result = ``;
        })
        .catch(error => {
          result = `It shouldn't break anything!`;
        });
    }
    return result;
  }

  // Write the concatenates variable to file
  fs.writeFile("result.txt", finalString, err => {
    if (err) console.log(err);
    console.log("Successfully Written File.");
  });
})();
