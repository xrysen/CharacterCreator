$(document).ready(() => {
  console.log("Connected");

  const hideAll = () => {
    for (let i = 0; i < 12; i++) {
      $(`#r-header-${i}`).css("display", "none");
      $(`#rdescription-${i}`).css("display", "none");
      $(`#srdescription-${i}`).css("display", "none");
      $(`#next-btn`).remove();
    }
  }

  hideAll();

  for (let i = 0; i < 12; i++) {
    $(`#race-${i}`).on("click", ()=> {
      hideAll();
      $(`#r-header-${i}`).css("display", "block");
      $(`#rdescription-${i}`).css("display", "block");
      if (i !== 2 && i !== 3 && i !== 4 && i !== 6 ) {
        $(`.main-container`).append(
          `<button class = "btn btn-primary" id = "next-btn">Next</button>`
        );
      }
    })
  }

  for (let i = 0; i < 12; i++) {
    $(`#subrace-${i}`).on("click", ()=> {
      $(`#srdescription-${i}`).css("display","block");
      $(`.main-container`).append(
        `<button class = "btn btn-primary" id = "next-btn">Next</button>`
      );
    })
  }


});
