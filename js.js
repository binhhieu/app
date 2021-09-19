(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output (biến để lưu trữ đầu ra HTML)
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers (biến để lưu trữ danh sách các câu trả lời có thể có)
        const answers = [];

        // and for each available answer...(và cho mỗi câu trả lời có sẵn ...)
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button(thêm nút nhấn vào HTML)
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output (thêm câu hỏi này và câu trả lời của nó vào đầu ra)
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    //( kết hợp danh sách đầu ra của chúng tôi thành một chuỗi HTML và đặt nó trên trang)
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz (thu thập các câu trả lời từ bài kiểm tra )
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers (theo dõi câu trả lời)
    let numCorrect = 0;

    // for each question...(cho mỗi câu hỏi.)
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // tìm câu trả lời đã chọn
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // nếu câu trả lời là đúng
      if(userAnswer === currentQuestion.correctAnswer){
        //thêm vào số câu trả lời đúng
        numCorrect++;

        // color the answers green (tô màu cho câu trả lời màu xanh lá )
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank (nếu câu trả lời sai hoặc trống)
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // hiển thị số câu trả lời đúng 
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block'; //hiện previou lên
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // biến
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Câu 1: How many ___________ took part in the 22 nd SEA Games?",
      answers: {
      a: "competitors ",
      b: "competitive",
      c: "competes",
      d: "competitions"
      },
      correctAnswer: "a"
    },
    {
    question: "Câu 2: Boys often enjoy doing things in a ___________ way.",
     answers: {
      a: "create",
      b: "creative ",
      c: "creativity",
      d: "creatively"
      },
      correctAnswer: "b"
    },
    {
      question: "Câu 3: The problem of ________ among young people is hard to solve.",
      answers: {
      a: "employment",
      b: "employee",
      c: "employers",
      d: "unemployment"
      },
      correctAnswer: "d"
    },
    {
       question: 'Câu 4: The children ___________ high grade at school.',
       answers: {
       a: 'achieve',
       b: 'achievement',
       c: 'achievable',
       d: 'achieving'
       },
       correctAnswer: 'a'
       },
       {
       question: 'Câu 5: She was the first in her family to enjoy the privilege of a university ________.',
       answers: {
       a: 'educated',
       b: 'educational ',
       c: 'educating',
       d: 'education'
       },
       correctAnswer: 'd'
      },
      {
      question: "Câu 6: Buckingham Palace is a major tourist ________ in London.",
      answers: {
      a: "attract",
      b: "attraction",
      c: "attractive",
      d: "attractiveness"
      },
        correctAnswer: "b"
      },
      {
        question: 'Câu 7: Some species of rare animals are in ________ of extinction.',
        answers: {
        a: 'danger',
        b: 'dangerous',
        c: 'dangerously',
        d: 'endanger'
        },
        correctAnswer: 'a'
        },
        {
        question: "Câu 8: Electronic music is a kind of music in which sounds are produced ________.",
        answers: {
        a: "electron",
        b: "electric",
        c: "electronic",
        d: "electronically"
        },
        correctAnswer: "d"
        },
        {
        question: "Câu 9: Are you sure that boys are more _______ than girls?",
        answers: {
        a: "act",
        b: "active",
        c: "action",
        d: "activity"
        },
        correctAnswer: "b"
        },
        {
        question: "Câu 10: Housework is ________ shared between them",
        answers: {
        a: "equally",
        b: "equal",
        c: "equality",
        d: "equalizing"
        },
        correctAnswer: "a"
        },
  ];

  // Kick things off
  buildQuiz();

  // Pagination(Phân trang)
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide(Hiển thị câu hỏi đầu)
  showSlide(currentSlide);

  // Event listeners( nghe sự kiện xảy ra)
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
