document.addEventListener("DOMContentLoaded", function() {
  // Ngày bắt đầu (tháng được đánh số từ 0 đến 11)
  var startDate = new Date(2023, 9, 28); // Tháng 9 là tháng 10
  
  // Ngày sinh của mỗi người
  var birhdate_1 = new Date(2001, 2, 2);
  var birhdate_2 = new Date(2002, 3, 12);
  
  // Hàm cập nhật số ngày
  function updateCountdown() {
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
    var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Sử dụng Math.floor thay vì Math.ceil để lấy nguyên
    document.getElementById('countdown').textContent = daysDiff + ' days';
  }
  
  // Hàm tính tuổi
  function calculateAge(birthdate) {
    var today = new Date();
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
  }
  
  // Cập nhật số ngày mỗi giây
  setInterval(updateCountdown, 1000);
  
  // Cập nhật tuổi ban đầu
  document.getElementById('L').textContent = calculateAge(birhdate_1);
  document.getElementById('Y').textContent = calculateAge(birhdate_2);
});
