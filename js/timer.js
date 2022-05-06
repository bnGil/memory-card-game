const timer = document.getElementById("stopwatch");
export let timerInterval;

export function startTimer() {
  // First we start by clearing the existing timer, in case of a restart
  clearInterval(timerInterval);
  // Then we clear the variables
  let second = 0,
    minute = 0,
    hour = 0;

  // Next we set a interval every 1000 ms
  timerInterval = setInterval(function () {
    // We set the timer text to include a two digit representation
    timer.innerHTML =
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);

    // Next, we add a new second since one second is passed
    second++;

    // We check if the second equals 60 "one minute"
    if (second == 60) {
      // If so, we add a minute and reset our seconds to 0
      minute++;
      second = 0;
    }

    // If we hit 60 minutes "one hour" we reset the minutes and plus an hour
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}
