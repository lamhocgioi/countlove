document.addEventListener("DOMContentLoaded", function () {
  //28/10/2023 tháng nó bắt đầu từ 0
  var startDate = new Date(2023, 9, 28);
  var birthday_L = new Date(2001, 3, 2);
  var birthday_Y = new Date(2002, 4, 12);
  var isDays = false;
  var isBirthdayAlertDisplayed = false;
  var isCongratulateAlertDisplayed = false;

  var birthdaysQueue = [
    { date: birthday_Y, id: "birth_date", name: "Yên" },
    { date: birthday_L, id: "birth_date", name: "Lam" }
  ];

  function updateCountdown() {
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate - startDate);
    var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    var countdownElement = document.getElementById('countdown');

    if (isDays) {
      var yearDiff = Math.floor(daysDiff / 365);
      var remainingDays = daysDiff % 365;
      var monthsDiff = Math.floor(remainingDays / 30);
      var remainingDaysInMonth = remainingDays % 30;
      var output = '';

      if (yearDiff > 0) output += yearDiff + ' years ';
      if (monthsDiff > 0) output += monthsDiff + ' months ';
      if (remainingDaysInMonth > 0) output += remainingDaysInMonth + ' days';
      if (output == '') output = '0 days';

      countdownElement.textContent = output.trim();
    } else {
      countdownElement.textContent = daysDiff + ' days';
    }

    if (!isCongratulateAlertDisplayed) {
      if (daysDiff % 100 == 0) {
        document.getElementById('congratulate').className = "congratulate";
        document.getElementById('congratulate').innerHTML = "Happy " + daysDiff + " days! 🎉🎉🎉🎉";
        Swal.fire({
          title: 'Happy ' + daysDiff + ' days! 🎉🎉🎉🎉',
          text: 'Wishing you all the best on your special day!'
        });
        isCongratulateAlertDisplayed = true;
      } else {
        document.getElementById('congratulate').className = "congratulate-end";
        document.getElementById('congratulate').innerHTML = "";
      }
    }
  }

  function calculateAge(birthdate) {
    var today = new Date();
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = (today.getMonth() + 1) - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) age--;
    return age;
  }

  function checkBirthday() {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    var currentDate = today.getDate();

    for (var i = 0; i < birthdaysQueue.length; i++) {
      var birthday = birthdaysQueue[i].date;
      var id = birthdaysQueue[i].id;
      var name = birthdaysQueue[i].name;

      if (birthday.getMonth() === currentMonth && birthday.getDate() === currentDate) {
        if (!isBirthdayAlertDisplayed) {
          // toastr.success('Happy Birthday ' + name + '! 🎉🎂', 'Birthday Alert');

          Swal.fire({
            title: 'Happy Birthday ' + name + '! 🎉🎂',
            text: 'Wishing you all the best on your special day!'
            // icon: 'success'
            // confirmButtonText: 'OK'
          });
          tippy('#' + id, {
            content: 'Happy Birthday ' + name + '! 🎉🎂',
            trigger: 'click',
            theme: 'light'
          });
          isBirthdayAlertDisplayed = true;
        }

        document.getElementById(id).className = "birthday-wish";
        document.getElementById(id).innerHTML = "Happy birthday " + name + " 🎂🎂! ";
        // birthdaysQueue.splice(i, 1);
        break;
      } else {
        document.getElementById(id).className = "birthday-wish-end";
        document.getElementById(id).innerHTML = "";
      }
    }
  }

  function setBirthDate() {
    document.getElementById('Y').textContent = calculateAge(birthday_Y);
    document.getElementById('L').textContent = calculateAge(birthday_L);
  }

  function toggleCountdown() {
    isDays = !isDays;
  }

  function changeImageOverL() {
    document.getElementById("avatarL").src = "image/L2.jpg";
  }

  function changeImageOutL() {
    document.getElementById("avatarL").src = "image/L.jpeg";
  }

  function changeImageOverY() {
    document.getElementById("avatarY").src = "image/Y2.JPG";
  }

  function changeImageOutY() {
    document.getElementById("avatarY").src = "image/Y.png";
  }

  document.getElementById("countdown").addEventListener("click", toggleCountdown);
  document.getElementById("avatarL").addEventListener("mouseover", changeImageOverL);
  document.getElementById("avatarL").addEventListener("mouseout", changeImageOutL);
  document.getElementById("avatarY").addEventListener("mouseover", changeImageOverY);
  document.getElementById("avatarY").addEventListener("mouseout", changeImageOutY);

  setInterval(updateCountdown, 1000);
  setInterval(checkBirthday, 1000);
  setInterval(setBirthDate, 1000);
});
