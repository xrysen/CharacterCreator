$(document).ready(() => {
  console.log("Connected");

  for (let i = 0; i < 12; i++) {
    $(`#${i}`).css("display", "none");
  }

});
