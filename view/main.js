console.log(window.location.href)

//Pro user function
let signUrl = 'https://projectpq.name.ng/pro'; //signInPage

//get variable to store the user.
let theUser;

if (!localStorage.getItem('projectpqprouser')) {
 // No user. Redirect to login
// myAlert('follow', 'Please login', () => window.location.href = signUrl)
}


//get user and write him on script 
//theUser = JSON.parse(localStorage.getItem('projectpqprouser')); //Store the user 
console.log(theUser)
console.log({
	tyyghj:578,
})


//let API_key = theUser.id || '56655';
let API_key =  '56655';

async function updateUser(user) {
 theUser = user;
 localStorage.setItem('projectpqprouser', JSON.stringify(user));
 
 // myAlert('confirmation', `You have successful recieved ${thePaper[0].code} ${thePaper[0].session}. \n And you have only ${theUser.tokens} tokens left! `)
}





//Night and day
let lightImg ="light.png";
let darkImg ="dark.png";
//Day and Night theme Function
function DayOrNigth() {
 if (document.body.classList.contains("dark")) {
  localStorage.setItem("theme", "dark");
  Id("theme_icon").src = darkImg;
  // Call the function to enable dark theme
  enableDarkTheme();
 } else {
  localStorage.setItem("theme", "light");
  Id("theme_icon").src = lightImg;
  enableLigtTheme();
 }
}

//Night and Day mode
const themeToggle = Id("themeToggle");

// Check for saved user preference for theme
if (localStorage.getItem("theme") === "dark") {
 document.body.classList.add("dark");
 themeToggle.checked = true;
}

// Event listener to change theme
themeToggle.addEventListener("change", () => {
 document.body.classList.toggle("dark");
 DayOrNigth();
});
DayOrNigth();

function enableDarkTheme() {
 // Create a style element
 const style = document.createElement('style');
 style.id = 'dark-theme-styles';
 
 // Define the CSS for dark theme
 style.textContent = `
        /* The Dark theme */
        :root {
            --transparentBlack: var(--transparentLightAsh);
            --themeSliderBg: var(--lightAsh);
            --instCl: var(--bodyBackground);
            --bodyTextColor: var(--white);
            --bodyBackground: var(--darkTheme);
            --explainBg: var(--bodyBackground);
            --explainColor: var(--bodyTextColor);
            --ansL: var(--greenBg);
            --ansD: var(--greenBg);
            --warningBg: var(--orangeBgD);
            --infoBg: var(--strongColor);
            --infoCl: var(--bodyTextColor);
            --preset-bg-color: var(--ash);
        }
    `;
 
 // Add the style to the document head
 document.head.appendChild(style);
 
 // Optional: Add dark theme class to body for easier targeting
 document.body.classList.add('dark-theme');
}

function enableLigtTheme() {
 // Create a style element
 const style = document.createElement('style');
 style.id = 'light-theme-styles';
 
 // Define the CSS for dark theme
 style.textContent = `
        /* The light theme */
           :root {
    --themeSliderBg: var(--lightBlue);
    --instCl: var(--bodyTextColor);
    --bodyTextColor: var(--readBlue);
    --bodyBackground: var(--white);
    --explainBg: var(--darkWhite);
    --explainColor: var(--darkReadBlue);
    --ansL: var(--white);
    --ansD: var(--greenCBg);
    --warningBg: var(--orangeBgL);
    --infoBg: lightSkyBlue;
    --infoCl: var(--dullBlue);
    
    --preset-bg-color: var(--transparentLightAsh);
    
   }

    `;
 
 // Add the style to the document head
 document.head.appendChild(style);
 
 // Optional: Add dark theme class to body for easier targeting
 document.body.classList.add('light-theme');
}





//custom functions
function Id(id) {
 return document.getElementById(id);
}



//Handle the Past Questions.
let L = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
let QuizAnswers = [];

let nonObjUserAnswers = [];
let nonObjQuestion = [];
let userAnswer = [];
let nonObjAnswer = [];
let allQuestions = []
let pureOBJ = true;

let thePaper;
let Topics = [];

//Custom functions
const DOM = {
 get(selector, storeAs = null) { //get one
  const element = document.querySelector(selector);
  if (storeAs) {
   this[storeAs] = element;
  }
  return element;
 },
 
 getAll(selector, storeAs = null) { //get multiple 
  const elements = document.querySelectorAll(selector);
  if (storeAs) {
   this[storeAs] = elements;
  }
  return elements;
 }
};
//style elements
function styleFunc(ele) { //Styling 
 return {
  set: function(pro, value) {
   ele.style[pro] = value;
   return this; // Return the object for chaining
  },
  addStyles: function(styles) {
   Object.assign(ele.style, styles);
   return this; // Return the object for chaining
  }
 };
}
//loading function
var loadingFunc = {
 loader: DOM.get("#Loading"),
 start: () => styleFunc(loadingFunc.loader).set('display', 'block'),
 end: () => styleFunc(loadingFunc.loader).set('display', 'none'),
}


/*

//Get the course and year from link
const urlParams = new URLSearchParams(window.location.search);
const PastCourse = urlParams.get('PastCourse');
let PastYea = urlParams.get('PastYear');
if (!PastCourse || !PastYea) {
 myAlert('follow', 'Please a course and session', () => window.location.href = '../')
}
console.log(`Displaying Course : ${PastCourse} for year : ${PastYea}`);

let PastYear = PastYea.split('/').join('_');

// Splits into ["2022", "2023"], then joins with "_"
*/



/*
// Your quiz data
const quizData = [{
    "type": "quizInfo",
    "kind": "pureOBJ",
    "quiz_name": "TEST act",
    "course": "Chemistryu",
    "topics": ["Main", "fjfj"],
    "time": "59"
}, {
    "type": "heading",
    "content": "Section A"
}, {
    "type": "Instruction",
    "content": ["Anwser Alll"]
}, {
    "type": "Question",
    "name": "Q1",
    "topic": [],
    "Question": {
        "content": "Who is Believe Robert ?",
        "type": "subjective"
    },
    "Answer": {
        "type": "text",
        "content": "Good"
    },
    "Explanation": {
        "type": "string",
        "content": "Hello the \n**Botextld** \n_Itatextlic_ \n~~Striketextthrough~~ \n++Undetextrline++ \n==Hightextlight== \n## Heading ##\n\n\n## Heading ##\n\n- List item\n\n- List item\n\n1. Numbered item"
    },
    "Hint": {
        "type": "string",
        "content": "My id"
    }
}, {
    "type": "Question",
    "name": "Q3",
    "topic": ["General knowlegfd"],
    "Question": {
        "content": "Where is African?",
        "type": "multiple-choice",
        "options": [{
                "type": "image",
                "id": 1764621232442,
                "content": "data:image/png;base64,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"
            },
            {
                "type": "image",
                "id": 1764621240591,
                "content": "data:image/png;base64,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"
            }
        ],
        "optionType": "image"
    },
    "Answer": {
        "type": "image",
        "content": "data:image/png;base64,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"
    },
    "Explanation": {
        "type": "string",
        "content": "**Botextld** \nHb\nEschs"
    },
    "Hint": {
        "type": "string",
        "content": "jbjbj"
    }
}, {
    "type": "img",
    "content": "data:image/png;base64,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",
    "caption": "Use this to answer the question below."
}, {
    "type": "Question",
    "name": "Q5",
    "topic": [],
    "Question": {
        "content": "What is the sign above used for?",
        "type": "subjective"
    },
    "Answer": {
        "type": "text",
        "content": "Questions"
    },
    "Explanation": {
        "type": "string",
        "content": "**Botextld** \n\n_Itatextlic_ \n\n~~Striketextthrough~~ \n\n++Undetextrline++ \n\n==Hightextlight== \n\n1. Numbered item\n\n\n- List item\n\n\n## Heading ##\n\n## Heading ##"
    },
    "Hint": {
        "type": "string",
        "content": "think"
    }
}];

//Get the question past first
async function getPQ() {
	console.log(1)
    loadingFunc.start();
    try {
	console.log(2)
        // Use the quizData directly
        thePaper = quizData;
        
        //Display the past question
        await pqRender.start(thePaper);
	console.log(3s)
        
        //end loading 
        loadingFunc.end();
    } catch (e) {
        loadingFunc.end();
        if (e.message === 'Failed to failed') {
            myAlert('warning', 'Please check your internet connection and try again later.');
        } else {
            myAlert('warning', e.message);
        }
    }
}
  */

//Get the question past first
async function getPQ() {
 
 loadingFunc.start();
 try {
  if (!localStorage.getItem('thePaper')) {
   //No Course saved. Redirect to select course.
   return myAlert('follow', 'Please select a course and any session', () => window.location.href = "../");
  }
    let response = await fetch('./view.json');
    thePaper = await response.json();
    //thePaper = thePaper.pq;
  //extra the past question
  //thePaper = JSON.parse(localStorage.getItem('thePaper')); //Store the user 
  //Display the past question
  await pqRender.start(thePaper);
  //update the user object.
  //  updateUser(data.user);
  //end loading 
  loadingFunc.end();
 } catch (e) {
  loadingFunc.end();
  if (e.message === 'Failed to failed') {
   myAlert('warning', 'Please check your internet connection and try again later.');
  } else {
   myAlert('warning', e.message);
  }
 }
 // let topicFilterAry = topicFilter()
 //pqRender.start(topicFilterAry)
};
// Function to render markdown-like text
function renderMarkdown(text) {
    if (!text) return '';
    
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        .replace(/\+\+(.*?)\+\+/g, '<u>$1</u>')
        .replace(/==(.*?)==/g, '<mark>$1</mark>')
        .replace(/## (.*?) ##/g, '<h3>$1</h3>')
        .replace(/\n/g, '<br>');
}

const pqRender = {
 start: async (array) => {
  /*Handles the response*/
  //reseting
  DOM.get('#Page').innerHTML = '<header id="header"></header>';
  QuizAnswers = [];
  nonObjUserAnswers = [];
  userAnswer = [];
  nonObjAnswer = [];
  allQuestions = [];
  nonObjQuestion = [];
  
  //go through the each item
  await array.forEach((item) => {
   switch (item.type) {
    case 'pageInfo': // Title
     pqRender.title(item);
     break;
    case 'Question': // Questions 
     pqRender.question(item);
     allQuestions.push(item);
     
     break;
    case 'Instruction': //Exam instruction(s)
     pqRender.instruction(item);
     break;
    case 'img': // images
     pqRender.img(item);
     break;
    case 'media': // Media 
     pqRender.media(item);
     break;
    case 'heading': // heading 
     pqRender.heading(item);
     break;
    case 'myAds': // my custom ads
     pqRender.ads(item);
     break;
    default: // the default act
   }
  });
  
  //Check if Equations are showing 
  pqRender.equation();
  //answer Button alive
  pqRender.showAns();
  //animation for overlay images 
  theAnim();
 },
 
 quiz: (array) => {
  /*Handles the response*/
  //reseting
  DOM.get('#Page').innerHTML = '<header id="header"></header>';
  QuizAnswers = [];
  nonObjUserAnswers = [];
  userAnswer = [];
  nonObjAnswer = [];
  
  
  //go through the each item
  array.forEach((item) => {
   switch (item.type) {
    case 'pageInfo': // Title
     pqRender.title(item);
     break;
    case 'Question': // Questions 
     pqRender.question(item);
     break;
    case 'Instruction': //Exam instruction(s)
     pqRender.instruction(item);
     break;
    case 'myAds': // my custom ads
     pqRender.ads(item);
     break;
    default: // the default act
   }
  });
  
  //Check if Equations are showing 
  pqRender.equation();
  //answer Button alive
  pqRender.showAns();
  //animation for overlay images 
  theAnim();
 },
 
 //Make equations work
 equation: () => {
  if (window.MathJax) {
   MathJax.typesetPromise().catch(err => console.log(
    'MathJax error:', err));
  }
 },
 //Exam title 
 title: function(line) {
  styleFunc(DOM.get('#quizBtn')).set('display', 'block')
  
  /*
  if (line.kind === 'pureOBJ') {
   //show start Quiz button
   styleFunc(DOM.get('#quizBtn')).set('display', 'block')
  }
  */
  //get the topics array
  Topics = line.Topics;
  //Create the exam title 
  let Title = `<h2 id='courseTitle'>${line.quiz_name})</h2>`;
  let Container = document.createElement('div');
  Container.id = 'paperTitle';
  //add the exam title to the DOM
  Container.innerHTML = Title;
  DOM.get('#header').appendChild(Container);
 },
 //Exam Questions 
 // Inside pqRender object, update the question function:

question: function(line) {
    //Question container 
    let question = document.createElement('div');
    question.className = 'question';
    
    //Question head and body
    question.innerHTML = `<h3 class='Question_Title'>${line.name}</h3>
                <p class="question_Text">
                ${line.Question.content}
                </p>`;
    
    //Quiz head and body
    let quizQuestion = document.createElement('div');
    quizQuestion.className = 'quizQuestion';
    quizQuestion.innerHTML =
        `<p>  <b class='Question_Title'> ${line.name} </b> : ${line.Question.content}</p>`;
    
    //Handle different question types
    if (line.Question.type === 'OBJ' || line.Question.type === 'multiple-choice') {
        //Options container 
        let options = document.createElement('div');
        options.className = 'options';
        let quizOptions = document.createElement('div');
        quizOptions.className = 'quizOptions';
        
        //Arrangements of options
        for (let i = 0; i < line.Question.options.length; i++) {
            /*Question Options*/
            let oneOption = document.createElement('span');
            
            // Check if option is text or image
            if (line.Question.optionType === 'image' && line.Question.options[i].type === "img") {
                oneOption.innerHTML = `${L[i]}. <img class = 'imgAns thumbnail' src ='${line.Question.options[i].content}' alt ='Option ${L[i]}'/>`;
            } else if (line.Question.options[i].type === "image") {
                oneOption.innerHTML = `${L[i]}. <img class = 'imgAns thumbnail' src ='${line.Question.options[i].content}' alt ='Option ${L[i]}'/>`;
            } else {
                oneOption.innerText = `${L[i]}. ${line.Question.options[i].content || line.Question.options[i]}`;
            }
            
            options.appendChild(oneOption);
            
            /*Quiz Options*/
            // Create the radio input element
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = line.name;
            radioInput.id = `${line.name}_${i}`;
            
            // Set value based on option type
            if (line.Question.optionType === 'image' && line.Question.options[i].type === "img") {
                radioInput.value = line.Question.options[i].content;
            } else if (line.Question.options[i].type === "image") {
                radioInput.value = line.Question.options[i].content;
            } else {
                radioInput.value = line.Question.options[i].content || line.Question.options[i];
            }
            
            // Create the label element
            const label = document.createElement('label');
            label.htmlFor = radioInput.id;
            
            // Handle image or text in label
            if (line.Question.optionType === 'image' && line.Question.options[i].type === "img") {
                label.innerHTML = `<img class = 'imgAns thumbnail' src ='${line.Question.options[i].content}' alt ='Option ${L[i]}'/>`;
            } else if (line.Question.options[i].type === "image") {
                label.innerHTML = `<img class = 'imgAns thumbnail' src ='${line.Question.options[i].content}' alt ='Option ${L[i]}'/>`;
            } else {
                label.innerHTML = line.Question.options[i].content || line.Question.options[i];
            }
            
            // container for a quiz option
            let quizOptionContainer = document.createElement('div');
            quizOptionContainer.className = 'anOption';
            
            // Append all elements to the quizOptions container
            quizOptionContainer.appendChild(radioInput);
            quizOptionContainer.appendChild(label);
            
            //added to quiz options
            quizOptions.appendChild(quizOptionContainer);
            
            //Mark answer 
            if (line.Question.optionType === 'image' && line.Question.options[i].type === "img") {
                if (line.Question.options[i].content === line.Answer.content) {
                    radioInput.className = 'correctAnswerOpt';
                    quizOptionContainer.className = 'correctAnswer anOption';
                }
            } else if (line.Question.options[i].type === "image") {
                if (line.Question.options[i].content === line.Answer.content) {
                    radioInput.className = 'correctAnswerOpt';
                    quizOptionContainer.className = 'correctAnswer anOption';
                }
            } else {
                if ((line.Question.options[i].content || line.Question.options[i]) === line.Answer.content) {
                    radioInput.className = 'correctAnswerOpt';
                    quizOptionContainer.className = 'correctAnswer anOption';
                }
            }
        }
        
        //Add options to the questions/quizs container
        question.appendChild(options);
        quizQuestion.appendChild(quizOptions);
    } 
    else if (line.Question.type === 'subjective') {
        pureOBJ = false;
        nonObjAnswer.push(line.Answer.content);
        nonObjQuestion.push(line.Question.content);
        
        //not an obj question.
        quizQuestion.className = 'quizQuestion nOBJ_Question';
        
        // Create the subjective input element
        const nOBJ_input = document.createElement('textarea');
        nOBJ_input.className = 'nOBJ_input';
        nOBJ_input.placeholder = 'Input answer';
        
        quizQuestion.appendChild(nOBJ_input);
    }
    
    /* The show answer button*/
    let ansBtn = document.createElement('button');
    ansBtn.className = 'ansBtn';
    ansBtn.innerText = '✅ Show Answer';
    
    /*Hidden Answer*/
    let ANSH = document.createElement('div');
    ANSH.className = 'answer';
    ANSH.style.display = 'none';
    
    //Answer is just a text or image
    let ans;
    if (line.Answer.type === 'image') {
        ans = `<img class = 'imgAns thumbnail' src='${line.Answer.content}' alt='Answer'/>`;
    } else {
        ans = line.Answer.content;
    }
    
    QuizAnswers.push(ans);
    
    let explainBtn = document.createElement('button');
    explainBtn.className = 'explainBtn';
    explainBtn.innerText = 'Explanation';
    explainBtn.setAttribute('data-explanation', JSON.stringify(line.Explanation));
    
    // Add to ANSH
    ANSH.innerHTML = ans;
    ANSH.appendChild(explainBtn);
    
    const container = document.createElement('div');
    container.appendChild(ANSH);
    container.appendChild(ansBtn);
    
    question.appendChild(container);
    quizQuestion.appendChild(container.cloneNode(true));
    
    // Event delegation for both containers
    [question, quizQuestion].forEach(parent => {
        parent.addEventListener('click', async (e) => {
            if (e.target.classList.contains('explainBtn')) {
                const explanationData = e.target.getAttribute('data-explanation');
                await localStorage.setItem('explanation', explanationData);
                window.location.href = './explanation';
                
                if (window.MathJax) {
                    MathJax.typesetPromise().catch(err => console.log('MathJax error:', err));
                }
            }
        });
    });
    
    /* Add the Quiz and question elements to the Question paper*/
    DOM.get('#Page').appendChild(question);
    DOM.get('#Page').appendChild(quizQuestion);
},
 //Show Answers
 showAns: function() {
  let ansBtns = DOM.getAll('.ansBtn');
  let answers = DOM.getAll('.answer');
  let Qtns = DOM.getAll('.question');
  
  //Give all the buttons Life.
  for (let i = 0; i < ansBtns.length; i++) {
   ansBtns[i].onclick = () => {
    let ansView = answers[i].style.display;
    //Check if answer is already hidden
    if (ansView === 'grid') {
     answers[i].style.display = 'none';
     ansBtns[i].innerText = '✅ Show Answer';
     //scrollTo(ansBtns[i]);
    } else {
     setTimeout(() => {
      // scrollTo(answers[i]);
     }, 100);
     answers[i].style.display = 'grid';
     ansBtns[i].innerText = '❌ Hide Answer';
    };
   }
  }
 },
 //Display Instructions
instruction: function(line) {
    //create instructions container 
    let InstructionContainer = document.createElement('div');
    InstructionContainer.className = 'instruction';
    
    // Basic markdown rendering function
    function renderMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            .replace(/\+\+(.*?)\+\+/g, '<u>$1</u>')
            .replace(/==(.*?)==/g, '<mark>$1</mark>')
            .replace(/\n/g, '<br>');
    }
    
    //Extract instruction/instructions
    let instructions = line.content;
    
    // check if more than one instructions
    let InstType = typeof instructions;
    
    if (Array.isArray(instructions)) {
        //multiple instructions
        InstructionContainer.innerHTML = `<h3> 📌Instructions:</h3>`;
        let instructionsC = document.createElement('ol');
        instructionsC.className = 'listOfInstruction';
        
        //Add all instructions 
        instructions.forEach((instruction) => {
            let anyInstruction = document.createElement('li');
            anyInstruction.innerHTML = renderMarkdown(instruction);
            instructionsC.appendChild(anyInstruction);
        });
        
        //Add instructions to instruction container 
        InstructionContainer.appendChild(instructionsC);
    } else {
        //one instruction
        InstructionContainer.innerHTML = 
            `📌 <strong>Instruction:</strong> ${renderMarkdown(instructions)}`;
    }
    
    //Add instruction container to visible DOM
    DOM.get('#header').appendChild(InstructionContainer);
},
 // Display image
 img: function(line) {
    //Create image container, img element and the caption container.
    let imageContainer = document.createElement('div');
    let image = document.createElement('img');
    let imageCaption = document.createElement('div');
    
    //add the caption and give class name 
    imageCaption.innerHTML = line.caption || 'Use the Image to answer Questions';
    imageCaption.className = 'imageCaption';
    
    //add the image 
    image.alt = line.alt || 'Fig X';
    image.className = 'Figure thumbnail';
    image.src = line.content;
    
    //Add to the image container 
    imageContainer.className = 'imageContainer';
    imageContainer.appendChild(image);
    imageContainer.appendChild(imageCaption);
    
    //Add to the DOM 
    DOM.get('#Page').appendChild(imageContainer);
},
 //Display media
 media: function(line) {
  
 },
 //Display a heading
 heading: function(line) {
  //Create heading container, h2, text under heading
  let heading = document.createElement('header');
  let headingContainer = document.createElement('h2');
  let subHeadingContainer = document.createElement('span');
  //The main heading
  heading.className = 'heading';
  headingContainer.className = 'innerheading';
  headingContainer.innerHTML = line.heading || line.content;
  heading.appendChild(headingContainer);
  //if there is subheading
  if (line.Subheading) {
   subHeadingContainer.className = 'innerSubheading';
   subHeadingContainer.innerHTML = line.Subheading;
   heading.appendChild(subHeadingContainer);
   
  }
  DOM.get('#Page').appendChild(heading);
 },
};

function showAllAns() {
 let ansBtns = DOM.getAll('.ansBtn');
 let answers = DOM.getAll('.answer');
 
 //Give all the buttons Life.
 for (let i = 0; i < ansBtns.length; i++) {
  answers[i].style.display = 'grid';
  ansBtns[i].innerText = '❌ Hide Answer';
  scrollTo(DOM.get('#header'));
 }
 
}

let url = `https://procourses-v3yo.onrender.com/procourses/${API_key}`;
//getPQ(`${url}/paper/${PastCourse}/${PastYear}`)
getPQ('./view.json');


function randomItems(original, amount, shuffle) {
 // Make a copy of the original array to avoid modifying it
 const newArray = [...original];
 if (shuffle) {
  // Fisher-Yates shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
 }
 // Return the first 'numberOfItems' elements
 return newArray.slice(0, amount);
}; //select elements


//For the GES quiz
function enableGESQuiz(amount) {
 loadingFunc.start();
 //get all the questions
 let theQuestions = thePaper.slice(2); //Remove head
 theQuestions = randomItems(theQuestions, amount); //select elements
 
 let gesExam = [thePaper[0],
  thePaper[1],
  ...theQuestions
 ];
 //gesExam
 pqRender.start(gesExam);
 loadingFunc.end();
}


/*---------------Quiz Handler ----------*/
//get the questions, options, Quiz questions 
let normalQuestions = document.querySelectorAll('.question');
let quizQuestions = document.querySelectorAll('.quizQuestion');
let options = document.querySelectorAll('.anOption');


//Request and Exit Quiz Buttons
let quizBtn = getElement('#quizBtn');
let exitQuizBtn = getElement('#exitQuizBtn');


//functions


// Main function to initialize the quiz settings
function reqQuizSetting(questionConfig, timeConfig) {
 // Initialize elements
 const timeSlider = document.getElementById('timeSlider');
 const timeInput = document.getElementById('timeInput');
 const timePresetsContainer = document.getElementById('timePresets');
 const timeMinMarker = document.getElementById('timeMinMarker');
 const timeMaxMarker = document.getElementById('timeMaxMarker');
 
 const questionsSlider = document.getElementById('questionsSlider');
 const questionsInput = document.getElementById('questionsInput');
 const questionsPresetsContainer = document.getElementById('questionsPresets');
 const questionsMinMarker = document.getElementById('questionsMinMarker');
 const questionsMaxMarker = document.getElementById('questionsMaxMarker');
 
 const shuffleCheckbox = document.getElementById('shuffleQuestions');
 const strictMode = document.getElementById('strictMode');
 const startButton = document.getElementById('startQuizBtn');
 const cancelButton = document.getElementById('cancelQuizSettings');
 
 // Set up time configuration
 timeSlider.min = timeConfig.min;
 timeSlider.max = timeConfig.max;
 timeSlider.value = timeConfig.default;
 
 timeInput.min = timeConfig.min;
 timeInput.max = timeConfig.max;
 timeInput.value = timeConfig.default;
 
 timeMinMarker.textContent = `${timeConfig.min} min`;
 timeMaxMarker.textContent = `${timeConfig.max} mins`;
 
 // Generate time preset buttons
 generatePresetButtons(timePresetsContainer, timeConfig, 'time', timeConfig.default);
 
 // Set up questions configuration
 questionsSlider.min = questionConfig.min;
 questionsSlider.max = questionConfig.max;
 questionsSlider.value = questionConfig.default;
 
 questionsInput.min = questionConfig.min;
 questionsInput.max = questionConfig.max;
 questionsInput.value = questionConfig.default;
 
 questionsMinMarker.textContent = questionConfig.min;
 questionsMaxMarker.textContent = questionConfig.max;
 
 // Generate questions preset buttons
 generatePresetButtons(questionsPresetsContainer, questionConfig, 'questions', questionConfig.default);
 
 // Timer state update function
 function updateTimerState(value) {
  const time = parseInt(value, 10);
  
  // Update slider and input field values
  timeSlider.value = time;
  timeInput.value = time;
  
  // Update active state for preset buttons
  updateActivePresetButtons(timePresetsContainer, time);
  
  // Update slider track background
  updateSliderTrack(timeSlider, time, timeConfig.min, timeConfig.max);
 }
 
 // Questions state update function
 function updateQuestionsState(value) {
  const questions = parseInt(value, 10);
  
  // Update slider and input field values
  questionsSlider.value = questions;
  questionsInput.value = questions;
  
  // Update active state for preset buttons
  updateActivePresetButtons(questionsPresetsContainer, questions);
  
  // Update slider track background
  updateSliderTrack(questionsSlider, questions, questionConfig.min, questionConfig.max);
 }
 
 // Function to update the slider track color dynamically
 function updateSliderTrack(slider, value, min, max) {
  const percentage = ((value - min) / (max - min)) * 100;
  const color = `linear-gradient(to right, var(--blue) ${percentage}%, var(--transparentBlack) ${percentage}%)`;
  slider.style.background = color;
 }
 
 // Function to generate preset buttons
 function generatePresetButtons(container, config, type, defaultValue) {
  container.innerHTML = '';
  
  // Calculate number of preset buttons based on interval
  let numPresets = Math.floor((config.max - config.min) / config.interval) + 1;
  let previousValue = 4000;
  
  for (let i = 0; i < numPresets; i++) {
   let value = config.min + (i * config.interval);
   value = Math.round(value / 10) * 10;
   if (value < 1) {
    value = 1;
   }
   if (value <= config.max) {
    //No repeating 
    if (previousValue !== value) {
     const button = document.createElement('button');
     button.className = type === 'time' ? 'preset-btn' : 'questions-preset-btn';
     button.dataset[type] = value;
     button.textContent = type === 'time' ? `${value} mins` : value;
     
     // Mark the default value as active
     if (value === defaultValue) {
      button.classList.add('active');
      
     }
     
     container.appendChild(button);
     previousValue = value;
     
    }
   }
   
  }
 }
 
 // Function to update active state of preset buttons
 function updateActivePresetButtons(container, value) {
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
   const buttonValue = parseInt(button.textContent, 10);
   button.classList.toggle('active', buttonValue === value);
  });
 }
 
 // --- Event Listeners ---
 
 // Timer event listeners
 timeSlider.addEventListener('input', (e) => {
  updateTimerState(e.target.value);
 });
 
 timeInput.addEventListener('input', (e) => {
  let value = parseInt(e.target.value, 10);
  if (isNaN(value) || value < timeConfig.min) {
   value = timeConfig.min;
  }
  if (value > timeConfig.max) {
   value = timeConfig.max;
  }
  updateTimerState(value);
 });
 
 // Questions event listeners
 questionsSlider.addEventListener('input', (e) => {
  updateQuestionsState(e.target.value);
 });
 
 questionsInput.addEventListener('input', (e) => {
  let value = parseInt(e.target.value, 10);
  if (isNaN(value) || value < questionConfig.min) {
   value = questionConfig.min;
  }
  if (value > questionConfig.max) {
   value = questionConfig.max;
  }
  updateQuestionsState(value);
 });
 
 // Preset button event listeners (delegated)
 document.addEventListener('click', (e) => {
  if (e.target.matches('.preset-btn')) {
   updateTimerState(e.target.dataset.time);
  } else if (e.target.matches('.questions-preset-btn')) {
   updateQuestionsState(e.target.dataset.questions);
  }
 });
 
 // Control button event listeners
 startButton.onclick = () => {
  const time = Number(timeSlider.value);
  const questions = Number(questionsSlider.value);
  const shuffle = shuffleCheckbox.checked;
  const strict = strictMode.checked;
  myAlert('follow', `Starting quiz with ${questions} questions, ${time} minute timer, and shuffle ${shuffle ? 'enabled' : 'disabled'} in ${strict ? ' strict' : 'open book'} mode!`);
  
  // Your quiz start logic goes here
  startQuiz({ questions, time, shuffle, strict })
 };
 
 cancelButton.onclick = () => {
  styleFunc(DOM.get('#setTimeConBf')).set('display', 'none')
  myAlert('info','Settings selection cancelled');
  // Logic to close the component or modal
 };
 
 // Initial state setup
 updateTimerState(timeConfig.default);
 updateQuestionsState(questionConfig.default);
}


async function reqQuiz() {
 await pqRender.start(thePaper);
 
 // Configuration objects
 let question = {
  min: 1,
  max: document.querySelectorAll('.question').length,
  default: 10,
  interval: 5
 };
 let time = {
  min: 1,
  max: 60 * 4,
  default: 60,
  interval: 4
 };
 reqQuizSetting(question, time);
 console.log(question)
 //permission to start the timer
 getElement('#setTimeConBf').style.display = 'block';
}
quizBtn.onclick = reqQuiz;

function exitQuiz() {
 normalQuestions = document.querySelectorAll('.question');
 quizQuestions = document.querySelectorAll('.quizQuestion');
 options = document.querySelectorAll('.anOption');
 
 
 clearInterval(timerInterval); // Clear any existing timer
 //Make the interface to normal studying
 getElement('#quizBtn').style.display = 'block';
 getElement('#submitBtn').style.display = 'none';
 getElement('#exitQuizBtn').style.display = 'none';
 getElement('#countdown').style.display = 'none';
 
 pqRender.start(thePaper);
 scrollTo(DOM.get('#header'));
 
 /*
 normalQuestions = document.querySelectorAll('.question');
 quizQuestions = document.querySelectorAll('.quizQuestion');
 options = document.querySelectorAll('.anOption');
 
 //remove correct and incorrect indicator 
 options.forEach((option) => option.style = 'background-color : transparent');
 //Display the normal questions
 normalQuestions.forEach((normalQuestion) => normalQuestion
  .style.display = 'block');
 //Hide the quiz questions
 quizQuestions.forEach((quizQuestion) => quizQuestion.style
  .display = 'none');
  */
}
exitQuizBtn.onclick = exitQuiz;



const countdownDisplay = getElement('#countdown');
const startBtn = getElement('#startBtn');
let timeLeft; // 6 minutes in seconds
let timerInterval;

async function startQuiz(quizPrefers) {
 console.log('User set', quizPrefers)
 let quizPQ = allQuestions;
 
 quizPQ = randomItems(quizPQ, quizPrefers.questions, quizPrefers.shuffle);
 
 await pqRender.start([thePaper[0],
  thePaper[1],
  ...quizPQ
 ]);
 
 //strict - open book mode
 const ansBtns = DOM.getAll('.ansBtn');
 if (quizPrefers.strict) {
  ansBtns.forEach((ansBtn) => {
   styleFunc(ansBtn).set('display', 'none')
  });
 } else {
  ansBtns.forEach((ansBtn) => {
   styleFunc(ansBtn).set('display', 'block')
  });
  
 }
 //Get settings first. Time, Questions, shuffle------
 let min = quizPrefers.time;
 
 
 
 
 
 // Render quiz
 getElement('#quizBtn').style.display = 'none';
 getElement('#submitBtn').style.display = 'block';
 getElement('#exitQuizBtn').style.display = 'block';
 
 normalQuestions = document.querySelectorAll('.question');
 quizQuestions = document.querySelectorAll('.quizQuestion');
 options = document.querySelectorAll('.anOption');
 
 
 options.forEach((option) => {
  let inputs = option.querySelectorAll('input');
  inputs.forEach((input) => input.checked = false);
  option.style = 'background-color : transparent'
 });
 
 normalQuestions.forEach((normalQuestion) => normalQuestion
  .style.display = 'none');
 
 quizQuestions.forEach((quizQuestion) => quizQuestion.style
  .display = 'block');
 
 
 
 //starting timer 
 
 //Display Count Down
 getElement('#countdown').style.display = 'grid';
 
 //convert to seconds
 timeLeft = min * 60;
 
 function updateCountDown() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Add leading zeros if needed
  const display = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  countdownDisplay.style.backgroundColor = `#00FF6B`;
  countdownDisplay.textContent = display;
 }
 
 function startTimer() {
  updateCountDown();
  
  clearInterval(timerInterval); // Clear any existing timer
  
  timerInterval = setInterval(() => {
   timeLeft--;
   updateCountDown();
   let criticalMoment = min * 60 / 5;
   
   if (timeLeft < criticalMoment) {
    //critical moment
    countdownDisplay.style.backgroundColor = `red`;
   } else {}
   if (timeLeft <= 0) {
    //End of timer 
    clearInterval(timerInterval);
    countdownDisplay.textContent = "00:00";
    //submit Paper. says pens up!
    alert('Pens Up!');
    submitFunc();
   }
  }, 1000);
 }
 startTimer();
 
 //All codes ran
 getElement('#setTimeConBf').style.display = 'none';
 scrollTo(DOM.get('#header'));
 
}

//End Quiz
getElement('#submitBtn').onclick = () => {
 submitFunc()
};
/* Moved results to a seperate Page 
getElement('#closeResult').onclick = () => {
 scrollTo(DOM.get('#header'));
 getElement('#ResultDiv').style = 'display: none';
 
};
*/


//get the user's answers/submit
async function submitFunc() {
 /*
 Get all the answers .
 Get all the user answer.
 Check correct and give score.
 */
 loadingFunc.start()
 
 clearInterval(timerInterval); // Clear any existing timer
 let nOBJresultSheet;
 
 
 if (!pureOBJ) {
  
  //Get subjective answers
  nonObjUserAnswers = []; //user answers array 
  //Get new subjective answers
  const userInputs = DOM.getAll('.nOBJ_input');
  userInputs.forEach((nObjUserAns) => {
   nonObjUserAnswers.push(nObjUserAns.value);
  })
  let nObjSheet = [];
  
  if (nonObjUserAnswers.length == nonObjAnswer.length) {
   for (let i = 0; i < nonObjUserAnswers.length; i++) {
    let objans = nonObjUserAnswers[i];
    if (!objans) objans = 'No answer'
    const nObj_item = {
     nonObjQuestion: nonObjQuestion[i],
     userAnswer: objans,
     correctAns: nonObjAnswer[i]
    };
    nObjSheet.push(nObj_item) //Ready the inputs and answers.
   }
   console.log()
   if (nObjSheet.length > 0) nOBJresultSheet = await nOBJmaker(nObjSheet);
   
  }
 }
 
 
 async function nOBJmaker(nOBJ) {
  const url = 'https://subjectivemaker.onrender.com';
  
  try {
   const response = await fetch(url, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     exampaper: nOBJ
    })
   });
   
   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }
   
   const result = await response.json();
   return result;
   
  } catch (error) {
   myAlert('warning', 'Error marking Subjective answers.');
  }
 }
 
 //return nOBJ.map(() => Math.round(Math.random()));
 
 // Score is zero by default 
 let score = 0;
 
 let quizOptions = DOM.getAll('.quizOptions');
 //get the selected answer 
 for (let i = 0; i < quizOptions.length; i++) {
  //selected option 
  let ans = quizOptions[i].querySelector('input:checked');
  let correctAns = await quizOptions[i].querySelector('.correctAnswerOpt');
  
  //the text
  let label;
  
  if (ans) {
   userAnswer[i] = ans;
   label = ans.parentElement;
   if (userAnswer[i] !== correctAns) {
    label.style = 'background : red';
   }
  } else {
   userAnswer[i] = 'null';
  }
  
  //check if correct 
  if (userAnswer[i] === correctAns) {
   score++;
  }
 };
 let highestScore = quizOptions.length;
 
 if (nOBJresultSheet) {
  let nOBJinputElements = DOM.getAll('.nOBJ_input')
  for (let i = 0; i < nOBJresultSheet.length; i++) {
   styleFunc(nOBJinputElements[i]).set('color', 'var(--white)')
   
   if (nOBJresultSheet[i]) {
    score++;
    styleFunc(nOBJinputElements[i]).set('background', 'var(--cAns)')
   } else {
    styleFunc(nOBJinputElements[i]).set('background', 'var(--red)')
   }
   highestScore++;
  }
 }
 
 //Not OBJ.
 /*
 DOM.getAll('.nOBJ_input', 'nOBJ_input');
 DOM.getAll('.nOBJ_crtAns', 'nOBJ_crtAnsS');
 DOM.getAll('.nOBJ_Question', 'nOBJ_Questions');
 */
 
 /*
 //Check if answer is correct 
 for (let i = 0; i < quizQuestions.length; i++) {
   if (userAnswer[i] === QuizAnswers[i]) {
     score++;
   } else {}
 }
 */
 
 //Results 
 let results = [highestScore, score];
 localStorage.setItem('results', JSON.stringify(results))
 console.log(results)
 
 myAlert('info', `You scored ${score} out of ${highestScore}`)
 //highlight correct answers 
 let options = DOM.getAll('.correctAnswer');
 options.forEach((option) => styleFunc(option).set('background-color', 'var(--cAns)'));
 
 //show all correct answers 
 showAllAns();
 
 loadingFunc.end()
 
 // window.location.href = './result';
 //displayResult(quizOptions, score);
}


//Topic filter 
function topicFilter() {
 const Topics = thePaper[0].topics;
 let topicFilterArray = [];
 
 for (let i = 0; i < Topics.length; i++) {
  //Add the heading
  topicFilterArray.push({
   type: 'heading',
   heading: Topics[i]
  })
  
  for (let j = 0; j < thePaper.length; j++) {
   const topic = Topics[i];
   const qTopic = thePaper[j].topic;
   if (qTopic) {
    for (let k = 0; k < qTopic.length; k++) {
     if (topic === qTopic[k]) {
      topicFilterArray.push(thePaper[j])
     }
    }
    
   }
   
  }
  
 }
 return topicFilterArray;
 
 
}


//Animations
function theAnim() {
 //Variables
 const thumbnails = document.querySelectorAll(`.thumbnail`);
 const popupOverlay = getElement('#popupOverlay');
 const popupImage = getElement('#popupImage');
 const closeBtn = getElement('#closeBtn');
 const loadingSpinner = getElement('#loadingSpinner');
 
 
 // Add click event to each thumbnail with animation
 thumbnails.forEach(thumbnail => {
  thumbnail.onclick = () => {
   popupImage.src = thumbnail.src;
   popupImage.alt = thumbnail.alt;
   
   // Show loading spinner
   loadingSpinner.style.display = 'block';
   
   // Display the popup overlay with animation
   popupOverlay.style.display = 'flex';
   setTimeout(() => {
    popupOverlay.classList.add('active');
    
   }, 10);
   
   // Set the popup image source
   popupImage.onload = () => {
    loadingSpinner.style.display = 'none';
   };
   
   // Prevent scrolling on the body when popup is open
   document.body.style.overflow = 'hidden';
  }
 });
 
 // Close popup with animation
 function closePopup() {
  popupOverlay.classList.remove('active');
  setTimeout(() => {
    popupOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
   },
   300);
 }
 
 // Close popup when close button is clicked
 closeBtn.addEventListener('click',
  function() {
   closePopup();
  });
 
 // Close popup when clicking outside the image
 popupOverlay.addEventListener('click',
  (e) => {
   if (e.target === popupOverlay) {
    closePopup();
   }
  });
 
 // Close popup when pressing Escape key
 document.addEventListener('keydown',
  function(e) {
   if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
    closePopup();
   }
  });
}

//Explaintion
//Our control handles
const explanationContainer = getElement('#explanationContainer');
const xExplainBtn = getElement('#xExplain');
const explainDiv = getElement('#explanationContent');


//Functions
function showExplanation() {
 explanationContainer.style = 'display: grid';
 document.body.style.overflow = 'hidden';
 
}

function XExplanation() {
 document.body.style.overflow = 'auto';
 explanationContainer.style = 'display: none';
 explainDiv.innerHTML = ' ';
}

//Handling the Explanation types
function explanationIsString(TheExp) {
 explainDiv.innerHTML = TheExp;
}

function explanationIsImg(TheExp) {
 explainDiv.style = 'display: grid';
 let TheExpImg = document.createElement('img');
 TheExpImg.className = 'explainImg';
 TheExpImg.src = TheExp;
 explainDiv.appendChild(TheExpImg);
}

function explanationIsImgs(TheExp) {
 TheExp.forEach((img) => explanationIsImg(img));
}

function explanationIsVideo(TheExp) {
 // Create the video element
 const video = document.createElement('video');
 video.controls = true;
 video.className = 'explainVid';
 
 // Create the source element
 const source = document.createElement('source');
 source.src = TheExp;
 source.type = 'video/mp4';
 
 // Append the source to the video
 video.appendChild(source);
 
 // Append the video to the document body (or any other element)
 explainDiv.appendChild(video);
}

function explanationIsYoutubeVid(TheExp) {
 
 // Create iframe
 const iframe = document.createElement('iframe');
 iframe.src = `https://www.youtube.com/embed/${TheExp}`;
 iframe.frameBorder = '0';
 iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
 iframe.allowFullscreen = true;
 iframe.className = 'explainVid';
 // Append elements
 explainDiv.appendChild(iframe);
}

function explainFunc(content, type) {
    loadingFunc.start();
    explainDiv.innerHTML = ' ';
    
    switch (type) {
        case 'string':
            // Render markdown for string content
            explainDiv.innerHTML = renderMarkdown(content);
            break;
        case 'img':
            explanationIsImg(content);
            break;
        case 'imgs':
            explanationIsImgs(content);
            break;
        case 'video':
            explanationIsVideo(content);
            break;
        case 'youtubeVideo':
            explanationIsYoutubeVid(content);
            break;
        default:
            console.log('unknown Explanation format');
            explainDiv.innerHTML = renderMarkdown(content);
    }
    
    //Display the explanation.
    showExplanation();
    theAnim();
    loadingFunc.end();
}


xExplainBtn.onclick = XExplanation;
xExplainBtn.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAFhSURBVGiB7ZgxTgMxEEW/d88A8QEQEuISHIL1HSi4Bg09DTdIBeIA3IKOPqJIT8AeGppEm+V7PQ5gzSsjzR//zaz914BhGIZhGDwCdBK8yOXRdfVeYXEjwYsM6NkaRwkP6OH851bhckXV5iLBy9YPy1XvgPRTXUep75gYbajAqGbwkanljEi6pRvPZK+WRGqU6fGYWnTpmGloZy2ghhktzezmmmY0tX7tKWr/u7Nnu2QhNUb04C9prU2j+FDLWVjNnU/ldGYWWNMEoGQEmH84akUd1byUa0Yzr6kHP9aMdug8TILdbVohOXOh8R9gozVGEy97E9tvEwdiExGlidDYRIxv4sOqiU/dJi4f/vp1EJW1ZFg8lzaaYkpDhuM7RoO8MnUXuQvIZa+W666Yes7I++acblzAqOYmnTC1lBH3uH5BjKcAkFK6r3UTD3ybEXkCAMSPM/fw9lqrl2EYhmE0xxdPjuZmUX53AAAAAABJRU5ErkJggg==';

//my custom selector
//scrolling function 
function scrollTo(targetElement) {
 targetElement.scrollIntoView({
  behavior: 'smooth',
  block: 'center'
 });
}

function getElements(ele) { return document.querySelectorAll(ele) };

function getElement(ele) { return document.querySelector(ele) };

function myAlert(kind, message, okFunction = null) {
 const overlay = document.getElementById('alertOverlay');
 const header = document.getElementById('alertHeader');
 const icon = document.getElementById('alertIcon');
 const title = document.getElementById('alertTitle');
 const body = document.getElementById('alertMessage');
 const footer = document.getElementById('alertFooter');
 
 // Clear previous buttons
 footer.innerHTML = '';
 
 // Set message
 body.textContent = message;
 
 // Configure based on kind
 switch (kind) {
  case 'info':
   header.className = 'alertHeader info';
   icon.textContent = 'ℹ️';
   title.textContent = 'Information';
   addButton('OK', 'infoButton', () => hideAlert());
   break;
   
  case 'warning':
   header.className = 'alertHeader warning';
   icon.textContent = '⚠️';
   title.textContent = 'Warning';
   addButton('OK', 'warningButton', () => hideAlert());
   break;
   
  case 'follow':
   header.className = 'alertHeader confirmation';
   icon.textContent = 'ℹ️';
   title.textContent = 'Note';
   addButton('OK', 'infoButton', () => {
    if (okFunction) okFunction();
    hideAlert();
   });
   break;
   
  case 'confirmation':
   header.className = 'alertHeader confirmation';
   icon.textContent = '❓';
   title.textContent = 'Confirm';
   addButton('Cancel', 'cancelButton', () => hideAlert());
   
   addButton('OK', 'confirmButton', () => {
    if (okFunction) okFunction();
    hideAlert();
   });
   break;
   
  default:
   header.className = 'alertHeader info';
   icon.textContent = 'ℹ️';
   title.textContent = 'Alert';
   addButton('OK', 'infoButton', () => hideAlert());
 }
 
 // Show the alert
 overlay.style.display = 'flex';
 
 function addButton(text, className, onClick) {
  const button = document.createElement('button');
  button.className = `alertButton ${className}`;
  button.textContent = text;
  button.addEventListener('click', onClick);
  footer.appendChild(button);
 }
 
 function hideAlert() {
  overlay.style.display = 'none';
 }
}
setTimeout(() => {
 myAlert(
  "confirmation",
  "Do you have past questions? (Soft/hardcopies) . Please send it to us💚🎓.",
  () => {
   window.open(`https://wa.me/9117624342`, "_blank");
  }
 );
}, 60000);