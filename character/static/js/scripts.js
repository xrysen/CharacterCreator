$(document).ready(() => {
  let raceInfo = [];

  const getClassData = () => {
    return fetch(CLASS_ENDPOINT, {
      mode: "cors",
    }).then((res) => res.json());
  };

  const getRaceData = () => {
    return fetch(RACE_ENDPOINT, {
      mode: "cors",
    }).then((res) => res.json());
  };

  const classData = getClassData();
  const raceData = getRaceData();

  const removeRaceInfo = () => {
    $(".race-info").remove();
  }

  const showRaceInfo = (race) => {
    removeRaceInfo();
    $(".race-container").append(
      `
      <div class = "race-info">
        <h1 class = "race-header">${race.race_name}</h1>
        <img src = "${race.race_img}" height = 300>
        <p class = "race-description">
          ${race.race_description}
        </p>
        <p class = "race-description" id = "stat-bonus">
        </p>
      </div>
      `
    )

    if(race.race_str_bonus) {
      $("#stat-bonus").append(`<span class = "race-stat">Strength: +${race.race_str_bonus}</span>`);
    }

    if(race.race_con_bonus) {
      $("#stat-bonus").append(`<span class = "race-stat">Constitution: +${race.race_con_bonus}</span>`);
    }

    if(race.race_dex_bonus) {
      $("#stat-bonus").append(`<span class = "race-stat">Dexterity: +${race.race_dex_bonus}</span>`);
    }

    if(race.race_int_bonus) {
      $("#stat-bonus").append(`<span class = "race-stat">Intelligence: +${race.race_int_bonus}</span>`);
    }

    if(race.race_wis_bonus) {
      $("#stat-bonus").append(`<span class = "race-stat">Wisdom: +${race.race_wis_bonus}</span>`);
    }

    if(race.race_cha_bonus) {
      $("#stat-bonus").append(`<span class = "race-stat">Charisma: +${race.race_cha_bonus}</span>`);
    }
  }

  const showRaceButtons = () => {
    $(".main-container").append('<div class = "race-container"></div>');
    $(".race-container").append(
      '<h3 class = "h3 mb-3 font-weight-normal">Choose Race: </h3>'
    );
    raceData.then((races) => {
      for (const race of races) {
        raceInfo.push(race);
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

          $(`#race-${race.id}`).on("click", () => {
            showRaceInfo(race);
          });
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
          $(`#race-${race.id}`).on("click", () => {
            showRaceInfo(race);
          });
        }
      }
    }); 
  };

  showRaceButtons();
});
