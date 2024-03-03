document.addEventListener("DOMContentLoaded", function () {
  // Ngày bắt đầu (tháng được đánh số từ 0 đến 11) ngày 28/10/2023
  var startDate = new Date(2023, 9, 28);

  // Ngày sinh của mỗi người
  var birthday_L = new Date(2001, 3, 2);
  var birthday_Y = new Date(2002, 4, 12);

  var isDays = true; // Biến để theo dõi trạng thái hiện tại (số ngày hoặc số tháng)

  // Hàm cập nhật số ngày
  function updateCountdown() {
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
    var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Sử dụng Math.floor thay vì Math.ceil để lấy nguyên
    // document.getElementById('countdown').textContent = daysDiff + ' days';
    var countdownElement = document.getElementById('countdown');
    if (isDays) {
      var yearDiff = Math.floor(daysDiff / 365);
      var monthsDiff;
      var days;
      // kiểm tra xem có dư tháng không
      // if (yearDiff > 0) {
      //   var checkMonth = daysDiff % 365;
      //   if (checkMonth > 0) {
      //     monthsDiff = Math.floor(daysDiff / 30);
      //     days = daysDiff % 30;
      //     if (days > 0) {
      //       countdownElement.textContent = yearDiff + ' years ' + monthsDiff + ' months ' + days + ' days';
      //     } else {
      //       countdownElement.textContent = yearDiff + ' years ' + monthsDiff + ' months ';
      //     }
      //   } else {
      //     countdownElement.textContent = yearDiff + ' years '
      //   }
      // } else {
        monthsDiff = Math.floor(daysDiff / 30);
        days = daysDiff % 30;
        if (days > 0) {
          countdownElement.textContent = monthsDiff + ' months ' + days + ' days';
        } else {
          countdownElement.textContent = monthsDiff + ' months ';
        }
      // }
    } else {
      countdownElement.textContent = daysDiff + ' days';
    }
  }

  // Hàm tính tuổi
  function calculateAge(birthdate) {
    var today = new Date();
    var age = today.getFullYear() - birthdate.getFullYear();
    // Tháng nó bắt đầu từ số 0 ạ (0,1,2,3,4,5,6,7,8,9,10,11) nên phải + 1 mới đúng
    var m = (today.getMonth() + 1) - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }

  function checkBirthday(birthday, id, name) {
    var today = new Date();
    // Tháng nó bắt đầu từ số 0 ạ (0,1,2,3,4,5,6,7,8,9,10,11) nên phải + 1 mới đúng
    if ((today.getMonth() + 1) == birthday.getMonth() && today.getDate() == birthday.getDate()) {
      document.getElementById(id).className = "birthday-wish"
      document.getElementById(id).innerHTML = "Happy birthday " + name + " 🎂🎂! ";
    } else {
      document.getElementById(id).className = "birthday-wish-end"
      document.getElementById(id).innerHTML = "";
    }
  }

  function setBirthDate(birthday_L, birthday_Y) {
    document.getElementById('Y').textContent = calculateAge(birthday_Y);
    document.getElementById('L').textContent = calculateAge(birthday_L);
  }

  function toggleCountdown() {
    if (isDays) {
      isDays = false;
    } else {
      isDays = true;
    }
  }

  document.getElementById("countdown").addEventListener("click", function () {
    toggleCountdown();
  });

  // Cập nhật mỗi giây
  setInterval(updateCountdown, 1000);

  setInterval(function () {
    checkBirthday(birthday_Y, "birth_date", "Yên");
  }, 1000);

  setInterval(function () {
    checkBirthday(birthday_L, "birth_date", "Lam");
  }, 1000);

  setInterval(function () {
    setBirthDate(birthday_L, birthday_Y);
  }, 1000);

});
