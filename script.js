(function() {
  'use strict';

  // Constants
  const START_DATE = new Date(2023, 9, 28); // 28/10/2023 (Tháng trong JS là 0-11, nên 9 là tháng 10)
  const BIRTHDAY_L = new Date(2001, 9, 30);
  const BIRTHDAY_Y = new Date(2002, 4, 12);
  const MS_PER_DAY = 1000 * 3600 * 24;
  const UPDATE_INTERVAL = 1000;

  // State variables
  let isDays = false;
  let isBirthdayAlertDisplayed = false;
  let isCongratulateAlertDisplayed = false;
  let lastCheckDate = null; // Track last check to avoid redundant alerts

  // Cache DOM elements
  const elements = {};

  function cacheElements() {
    elements.countdown = document.getElementById('countdown');
    elements.congratulate = document.getElementById('congratulate');
    elements.birthDate = document.getElementById('birth_date');
    elements.imageTop = document.getElementById('image-top');
    elements.ageY = document.getElementById('Y');
    elements.ageL = document.getElementById('L');
    elements.avatarL = document.getElementById('avatarL');
    elements.avatarY = document.getElementById('avatarY');
  }

  // Birthday configurations
  const birthdaysQueue = [
    { date: BIRTHDAY_Y, name: "Yên" },
    { date: BIRTHDAY_L, name: "Lam" }
  ];

  /**
   * Calculate days difference between two dates
   */
  function calculateDaysDiff(date1, date2) {
    // Reset time_zone để tính cho chuẩn
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  }

  /**
   * Calculate age from birthdate
   */
  function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Format days into years, months, and days (ĐÃ SỬA)
   * Tính toán chênh lệch Lịch (calendar) chứ không phải chia số ngày
   */
  function formatDaysDetailed(currentDate) {
    let startDate = START_DATE;

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    // Xử lý "mượn" ngày (nếu ngày bị âm)
    if (days < 0) {
      months--;
      // Lấy số ngày của tháng TRƯỚC của currentDate
      const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      days += daysInLastMonth;
    }

    // Xử lý "mượn" tháng (nếu tháng bị âm)
    if (months < 0) {
      years--;
      months += 12;
    }

    // Xây dựng chuỗi output
    const parts = [];
    if (years > 0) {
      parts.push(years + (years === 1 ? ' year' : ' years'));
    }
    if (months > 0) {
      parts.push(months + (months === 1 ? ' month' : ' months'));
    }
    if (days > 0) {
      parts.push(days + (days === 1 ? ' day' : ' days'));
    }
    
    // Trường hợp 0 ngày (hoặc vừa đúng 1 năm, 2 năm...)
    if (parts.length === 0) {
        // Nếu chênh lệch đúng 0 ngày
        if (years === 0 && months === 0 && days === 0) {
            return '0 days';
        }
        // Nếu chênh lệch là 1 năm chẵn (1 year 0 month 0 day) thì logic trên đã handle
        // Trường hợp này gần như không xảy ra, nhưng để cho chắc
        return 'Today!';
    }

    return parts.join(' ');
  }

  /**
   * Update countdown display (ĐÃ SỬA)
   */
  function updateCountdown() {
    const currentDate = new Date();
    // Vẫn tính tổng số ngày để check 100-day-milestone
    const daysDiff = calculateDaysDiff(START_DATE, currentDate);

    // Update countdown text
    elements.countdown.textContent = isDays
      ? formatDaysDetailed(currentDate) // <-- Sửa ở đây: truyền currentDate
      : daysDiff + ' days';

    // Check for milestone celebrations (every 100 days)
    // Dùng lastCheckDate để đảm bảo nó chỉ check 1 lần trong ngày
    const todayStr = currentDate.toDateString(); 
    if (lastCheckDate !== todayStr) {
        // Reset cờ mỗi khi sang ngày mới
        isCongratulateAlertDisplayed = false;
        lastCheckDate = todayStr;
    }

    if (!isCongratulateAlertDisplayed && daysDiff % 100 === 0 && daysDiff > 0) {
      showCongratulation(daysDiff);
      isCongratulateAlertDisplayed = true; // Đặt cờ ở đây
    } 
    // Không cần else if nữa, vì cờ isCongratulateAlertDisplayed sẽ reset khi sang ngày mới
    // Nhưng vẫn cần logic để ẩn
    else if (daysDiff % 100 !== 0 && isCongratulateAlertDisplayed) {
         // Nếu ngày không còn là mốc 100 nữa VÀ cờ vẫn bật (hiếm, nhưng để chắc)
         elements.congratulate.className = "congratulate-end";
         elements.congratulate.innerHTML = "";
         isCongratulateAlertDisplayed = false;
    } else if (daysDiff % 100 !== 0 && !isCongratulateAlertDisplayed) {
        // Ngày bình thường, đảm bảo là nó tắt
         elements.congratulate.className = "congratulate-end";
         elements.congratulate.innerHTML = "";
    }
  }

  /**
   * Show congratulation message for milestone
   */
  function showCongratulation(daysDiff) {
    elements.congratulate.className = "congratulate";
    elements.congratulate.innerHTML = "Happy " + daysDiff + " days! 🎉🎉🎉🎉";

    Swal.fire({
      title: 'Happy ' + daysDiff + ' days! 🎉🎉🎉🎉',
      text: 'Wishing you all the best on your special day!'
    });
  }

  /**
   * Check if today matches birthday
   */
  function checkBirthday() {
    const today = new Date();
    const todayStr = today.getMonth() + '-' + today.getDate();

    // Reset alert flag on new day
    if (lastCheckDate !== todayStr) {
      isBirthdayAlertDisplayed = false;
      lastCheckDate = todayStr; // Dùng chung lastCheckDate với hàm updateCountdown
    }

    let isBirthdayFound = false;

    for (let i = 0; i < birthdaysQueue.length; i++) {
      const birthday = birthdaysQueue[i].date;
      const name = birthdaysQueue[i].name;

      // Check if birthday matches today
      if (birthday.getMonth() === today.getMonth() &&
        birthday.getDate() === today.getDate()) {

        // Show alert once per day
        if (!isBirthdayAlertDisplayed) {
          Swal.fire({
            title: 'Happy Birthday ' + name + '! 🎉🎂',
            text: 'Wishing you all the best on your special day!'
          });

          isBirthdayAlertDisplayed = true;
        }

        // Update UI
        elements.birthDate.className = "birthday-wish";
        elements.birthDate.innerHTML = "Happy birthday " + name + " 🎂🎂! ";
        elements.imageTop.src = "https://media0.giphy.com/media/5tiJtxFgWhp6lYYIr0/giphy.webp";

        isBirthdayFound = true;
        break;
      }
    }

    // Reset UI if no birthday today
    if (!isBirthdayFound) {
      elements.birthDate.className = "birthday-wish-end";
      elements.birthDate.innerHTML = "";
      elements.imageTop.src = "https://media1.giphy.com/media/2vkUyaJW3gVQtSfs2I/giphy.webp";
    }
  }

  /**
   * Update displayed ages
   */
  function setBirthDate() {
    elements.ageY.textContent = calculateAge(BIRTHDAY_Y);
    elements.ageL.textContent = calculateAge(BIRTHDAY_L);
  }

  /**
   * Toggle countdown display mode
   */
  function toggleCountdown() {
    isDays = !isDays;
    updateCountdown(); // Immediate update
  }

  /**
   * Setup image hover effect
   */
  function setupImageHover(avatarElement, defaultSrc, hoverSrc) {
    avatarElement.addEventListener('mouseover', function() {
      this.src = hoverSrc;
    });

    avatarElement.addEventListener('mouseout', function() {
      this.src = defaultSrc;
    });
  }

  /**
   * Main update function - combines all updates
   */
  function updateAll() {
    const currentDate = new Date();
    const todayStr = currentDate.toDateString();
    
    // Chỉ check khi sang ngày mới để tối ưu
    if (lastCheckDate !== todayStr) {
        lastCheckDate = todayStr;
        isBirthdayAlertDisplayed = false; // Reset cờ sinh nhật
        isCongratulateAlertDisplayed = false; // Reset cờ chúc mừng
        
        // Các hàm này chỉ cần chạy 1 lần/ngày
        checkBirthday();
        setBirthDate(); 
    }
    
    // Hàm này phải chạy liên tục
    updateCountdown();
  }
  
  /**
   * Main update function - combines all updates (Cách cũ, chạy liên tục)
   * Tao comment lại hàm updateAll ở trên và dùng lại hàm cũ của mày
   * vì hàm checkBirthday của mày có set/reset UI (cái ảnh/chữ)
   * nên nó phải chạy liên tục, chứ không phải 1 lần/ngày
   */
   /*
   function updateAll() {
     updateCountdown();
     checkBirthday();
     setBirthDate();
   }
   */
   // À mà, tao nghĩ lại, hàm setBirthDate (tính tuổi) đúng là chỉ cần 1 lần/ngày.
   // Hàm checkBirthday cũng chỉ cần 1 lần/ngày.
   // Chỉ có updateCountdown là cần mỗi giây.
   // Tách ra thì tối ưu hơn.
   
   /**
   * Hàm chỉ chạy 1 lần/ngày
   */
   function dailyUpdate() {
        const today = new Date();
        const todayStr = today.toDateString();
        
        if (lastCheckDate !== todayStr) {
            lastCheckDate = todayStr;
            isBirthdayAlertDisplayed = false;
            isCongratulateAlertDisplayed = false;
            
            checkBirthday();
            setBirthDate();
        }
   }


  /**
   * Initialize application
   */
  function init() {
    // Cache all DOM elements
    cacheElements();

    // Setup event listeners
    elements.countdown.addEventListener('click', toggleCountdown);
    setupImageHover(elements.avatarL, 'image/L.jpeg', 'image/L2.jpg');
    setupImageHover(elements.avatarY, 'image/Y.png', 'image/Y2.jpg');

    // Initial update
    const now = new Date();
    lastCheckDate = now.toDateString(); // Khởi tạo lastCheckDate
    isBirthdayAlertDisplayed = false;
    isCongratulateAlertDisplayed = false;
    
    checkBirthday(); // Chạy lần đầu
    setBirthDate(); // Chạy lần đầu
    updateCountdown(); // Chạy lần đầu

    // Interval cho đồng hồ đếm (mỗi giây)
    setInterval(updateCountdown, UPDATE_INTERVAL);
    
    // Interval cho các hàm check 1 lần/ngày (check mỗi phút 1 lần là đủ)
    setInterval(dailyUpdate, 60000); // 60 * 1000 ms = 1 phút
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();