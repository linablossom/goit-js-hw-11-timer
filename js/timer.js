class CountdownTimer {
  constructor({ selector, targetDate }) {
    const timerEl = document.querySelector(selector);
    this.refs = {
      daysEl: timerEl.querySelector('[data-value="days"]'),
      hoursEl: timerEl.querySelector('[data-value="hours"]'),
      minsEl: timerEl.querySelector('[data-value="mins"]'),
      secsEl: timerEl.querySelector('[data-value="secs"]'),
    };
    this.targetDate = targetDate;
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate.getTime() - currentTime;
      const { days, hours, mins, secs } = getTimeComponents(deltaTime);
      this.updateTimer({ days, hours, mins, secs });
    }, 1000);
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.daysEl.textContent = days;
    this.refs.hoursEl.textContent = hours;
    this.refs.minsEl.textContent = mins;
    this.refs.secsEl.textContent = secs;
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2022"),
});

timer.start();
