$(document).ready(() => {
  let race_choice = 0;
  let sub_race_choice = 0;
  let progress = "";
  let classes = [];

  const getClassData = () => {
    return fetch("http://localhost:8000/character/class", {
      mode: "cors",
    }).then((res) => res.json());
  };

  const getRaceData = () => {
    return fetch("http://localhost:8000/character/race", {
      mode: "cors",
    }).then((res) => res.json());
  };

  const classData = getClassData();
  const raceData = getRaceData();

  const showRaceButtons = () => {
    $(".main-container").append('<div class = "race-container"></div>');
    $(".race-container").append(
      '<h3 class = "h3 mb-3 font-weight-normal">Choose Race: </h3>'
    );
    raceData.then((races) => {
      for (const race of races) {
        if (race.race_has_subrace) {
          $(".race-container").append(
            `
            <div class = "btn-group" id = "race-buttons">
              <button class = "btn btn-primary dropdown-toggle type="button" id = "race-${race.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${race.race_name}
              </button>
            </div>
            `
          );
        } else {
          $(".race-container").append(
            `
            <div class = "btn-group">
              <button class = "btn btn-primary" id = "race-${race.id}">
                ${race.race_name}
              </button>
            </div>
            `
          );
        }
      }
    });
  };
  showRaceButtons();

  const hideAll = () => {
    for (let i = 0; i < 12; i++) {
      $(`#r-header-${i}`).css("display", "none");
      $(`#rdescription-${i}`).css("display", "none");
      $(`#srdescription-${i}`).css("display", "none");
      $(`#next-btn`).remove();
    }
  };

  const emptyMainContainer = () => {
    $(".race-container").remove();
  };

  const next = (progress) => {
    switch (progress) {
      case "class":
        emptyMainContainer();
        chooseClass(race_choice, sub_race_choice);
    }
  };

  const chooseRace = () => {
    for (let i = 0; i < 12; i++) {
      $(`#race-${i}`).on("click", () => {
        hideAll();
        race_choice = i;
        $(`#r-header-${i}`).css("display", "block");
        $(`#rdescription-${i}`).css("display", "block");
        if (i !== 2 && i !== 3 && i !== 4 && i !== 6) {
          $(`.race-container`).append(
            `<button class = "btn btn-primary" id = "next-btn" style="margin-bottom: 20px;">Next</button>`
          );

          $("#next-btn").on("click", () => {
            next("class");
          });
        }
      });
    }

    for (let i = 0; i < 12; i++) {
      $(`#subrace-${i}`).on("click", () => {
        sub_race_choice = i;
        $(`#srdescription-${i}`).css("display", "block");
        $(`.race-container`).append(
          `<button class = "btn btn-primary" id = "next-btn" style="margin-bottom: 20px;">Next</button>`
        );
        $("#next-btn").on("click", () => {
          next("class");
        });
      });
    }
  };

  const chooseClass = (race, subRace) => {};

  hideAll();
  chooseRace();
});
