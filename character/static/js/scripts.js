$(document).ready(() => {
  let race_choice = 0;
  let sub_race_choice = 0;
  let progress = "";

  console.log("Connected");

  const hideAll = () => {
    for (let i = 0; i < 12; i++) {
      $(`#r-header-${i}`).css("display", "none");
      $(`#rdescription-${i}`).css("display", "none");
      $(`#srdescription-${i}`).css("display", "none");
      $(`#next-btn`).remove();
    }
  }

  const emptyMainContainer = () => {
    $(".race-container").remove();
  }

  const next = (progress) => {
    switch (progress) {
      case "class":
        emptyMainContainer();
    }
  }

  const chooseRace = () => {
    for (let i = 0; i < 12; i++) {
      $(`#race-${i}`).on("click", ()=> {
        hideAll();
        race_choice = i;
        $(`#r-header-${i}`).css("display", "block");
        $(`#rdescription-${i}`).css("display", "block");
        if (i !== 2 && i !== 3 && i !== 4 && i !== 6 ) {
          $(`.race-container`).append(
            `<button class = "btn btn-primary" id = "next-btn" style="margin-bottom: 20px;">Next</button>`
          );

          $("#next-btn").on("click", ()=> {
            next("class");
          });
        }
      })
    }
  
    for (let i = 0; i < 12; i++) {
      $(`#subrace-${i}`).on("click", ()=> {
        sub_race_choice = i;
        $(`#srdescription-${i}`).css("display","block");
        $(`.race-container`).append(
          `<button class = "btn btn-primary" id = "next-btn" style="margin-bottom: 20px;">Next</button>`
        );
        $("#next-btn").on("click", ()=> {
            next("class");
          });
      })
    }
  }

  const chooseClass = (race) => {

  }

  hideAll();
  chooseRace();


});
