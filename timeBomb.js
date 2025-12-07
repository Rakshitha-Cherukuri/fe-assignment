function countDown(n) {
  let timerId = setInterval(() => {
    if (n == 0) {
      console.log("Countdown completed! Boom..!");
      clearInterval(timerId);
      return;
    }
    console.log(n);
    n = n - 1;
  }, 1000);
}
countDown(0);