$(document).ready(() => {
  console.log("Connected");

  const hideAll = () => {
    for (let i = 0; i < 12; i++) {
      $(`#rdescription-${i}`).css("display", "none");
      $(`#srdescription-${i}`).css("display", "none");
    }
  }

  hideAll();

  for (let i = 0; i < 12; i++) {
    $(`#race-${i}`).on("click", ()=> {
      hideAll();
      $(`#rdescription-${i}`).css("display", "block");
    })
  }

  for (let i = 0; i < 12; i++) {
    $(`#subrace-${i}`).on("click", ()=> {
      $(`#srdescription-${i}`).css("display","block");
    })
  }


});
