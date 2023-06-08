const readline = require('readline');

// In-memory storage for SAT results
const satResults = {
  John: {
    name: 'Piyush',
    address: '123 ',
    city: 'Nagpur',
    country: 'India',
    pincode: '100',
    score: 85,
    passed: 'Pass'
  },
  Emma: {
    name: 'Rahul',
    address: '456',
    city: 'LA',
    country: 'USA',
    pincode: '900',
    score: 62,
    passed: 'Pass'
  },
  Mike: {
    name: 'Anurag',
    address: '789',
    city: 'Delhi',
    country: 'India',
    pincode: '600',
    score: 42,
    passed: 'Fail'
  }
};

// Helper function to calculate pass/fail
function calculatePass(score) {
  return score > 30 ? 'Pass' : 'Fail';
}

// Helper function to display all data in JSON format
function displayData() {
  console.log(JSON.stringify(satResults, null, 2));
}

// Helper function to get the rank based on SAT score
function getRank(name) {
  const scores = Object.values(satResults).map(result => result.score);
  scores.sort((a, b) => b - a);

  const rank = scores.indexOf(satResults[name].score) + 1;
  console.log(`${name} has a rank of ${rank}`);
}

// Helper function to update SAT score
function updateScore(name, newScore) {
  if (satResults[name]) {
    satResults[name].score = newScore;
    satResults[name].passed = calculatePass(newScore);
    console.log(`SAT score for ${name} has been updated to ${newScore}`);
  } else {
    console.log(`No record found for ${name}`);
  }
}

// Helper function to delete a record
function deleteRecord(name) {
  if (satResults[name]) {
    delete satResults[name];
    console.log(`Record for ${name} has been deleted`);
  } else {
    console.log(`No record found for ${name}`);
  }
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display menu options
function displayMenu() {
  console.log('\n===== SAT Results Management =====');
  console.log('1. Insert data');
  console.log('2. View all data');
  console.log('3. Get rank');
  console.log('4. Update score');
  console.log('5. Delete one record');
  console.log('0. Exit');
}

// Handle user input
function handleInput(option) {
  switch (option) {
    case '1':
      rl.question('Name: ', name => {
        rl.question('Address: ', address => {
          rl.question('City: ', city => {
            rl.question('Country: ', country => {
              rl.question('Pincode: ', pincode => {
                rl.question('SAT score: ', score => {
                  const passed = calculatePass(score);
                  satResults[name] = { name, address, city, country, pincode, score, passed };
                  console.log(`Data for ${name} has been inserted`);
                  displayMenu();
                  rl.question('Select an option: ', handleInput);
                });
              });
            });
          });
        });
      });
      break;
    case '2':
      displayData();
      displayMenu();
      rl.question('Select an option: ', handleInput);
      break;
    case '3':
      rl.question('Name: ', name => {
        getRank(name);
        displayMenu();
        rl.question('Select an option: ', handleInput);
      });
      break;
    case '4':
      rl.question('Name: ', name => {
        rl.question('New SAT score: ', newScore => {
          updateScore(name, newScore);
          displayMenu();
          rl.question('Select an option: ', handleInput);
        });
      });
      break;
    case '5':
      rl.question('Name: ', name => {
        deleteRecord(name);
        displayMenu();
        rl.question('Select an option: ', handleInput);
      });
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      displayMenu();
      rl.question('Select an option: ', handleInput);
      break;
  }
}

// Start the application
displayMenu();
rl.question('Select an option: ', handleInput);
