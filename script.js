  document.addEventListener("DOMContentLoaded", function () {
    //28/10/2023 tháng nó bắt đầu từ 0
    var startDate = new Date(2023, 9, 28);
    var birthday_L = new Date(2001, 3, 2);
    var birthday_Y = new Date(2002, 4, 12);
    var isDays = false;

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
                document.getElementById(id).className = "birthday-wish"
                document.getElementById(id).innerHTML = "Happy birthday " + name + " 🎂🎂! ";
                break;
            } else {
                document.getElementById(id).className = "birthday-wish-end"
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

    document.getElementById("countdown").addEventListener("click", toggleCountdown);

    setInterval(updateCountdown, 1000);
    setInterval(checkBirthday, 1000);
    setInterval(setBirthDate, 1000);
});
