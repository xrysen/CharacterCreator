
  let raceInfo = [];
  let raceSelected = "";
  let subRaceSelected = 0;

  const getRaceData = () => {
    return fetch(RACE_ENDPOINT, {
      mode: "cors",
    }).then((res) => res.json());
  };

  const getRaceDataByName = (raceName) => {
    return fetch(`${RACE_ENDPOINT}?race_name=${raceName}`, {
      mode: "cors",
    }).then((res) => res.json());
  };

  const raceData = getRaceData();

  const removeRaceInfo = () => {
    $(".race-info").remove();
  };

  const emptyMainContainer = () => {
    $(".race-container").remove();
  }

  const showRaceInfo = (race) => {
    removeRaceInfo();
    $(".race-container").append(
      `
      <div class = "race-info">
        <h1 class = "race-header">${race.race_name}</h1>
        <img src = "${race.race_img}" height = 300 style = "float: right;">
        <p class = "race-description">
          ${race.race_description}
        </p>
        <p class = "race-description" id = "stat-bonus">
        </p>
      </div>
      `
    );

    if (race.race_str_bonus) {
      $("#stat-bonus").append(
        `<span class = "race-stat">Strength: +${race.race_str_bonus}</span>`
      );
    }

    if (race.race_con_bonus) {
      $("#stat-bonus").append(
        `<span class = "race-stat">Constitution: +${race.race_con_bonus}</span>`
      );
    }

    if (race.race_dex_bonus) {
      $("#stat-bonus").append(
        `<span class = "race-stat">Dexterity: +${race.race_dex_bonus}</span>`
      );
    }

    if (race.race_int_bonus) {
      $("#stat-bonus").append(
        `<span class = "race-stat">Intelligence: +${race.race_int_bonus}</span>`
      );
    }

    if (race.race_wis_bonus) {
      $("#stat-bonus").append(
        `<span class = "race-stat">Wisdom: +${race.race_wis_bonus}</span>`
      );
    }

    if (race.race_cha_bonus) {
      $("#stat-bonus").append(
        `<span class = "race-stat">Charisma: +${race.race_cha_bonus}</span>`
      );
    }
    
  };

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
            <div class = "btn-group" id = "race-buttons-${race.id}">
              <button class = "btn btn-primary dropdown-toggle type="button" id = "race-${race.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${race.race_name}
              </button>
               <div id = "drop-down-${race.id}" class = "dropdown-menu" aria-labelledby = ${race.race_name}>
              </div>
            </div>
            `
          );

          for (const subRace of race.sub_races) {
            $(`#drop-down-${race.id}`).append(
              `
              <a class = "dropdown-item subrace-dropdown" id = "subrace-${subRace.id}">${subRace.sub_race_name}</a>
              `
            );
            $(`#subrace-${subRace.id}`).on("click", () => {
              subRaceSelected = subRace.sub_race_name;
              $(`.race-info`).append(
                `
                <p class = "race-description" id = "subrace-description">
                <strong>${subRace.sub_race_name}:</strong> <br />
                ${subRace.sub_race_description}
                </p>
                `
              );
              if (subRace.sub_race_str_bonus) {
                $("#subrace-description").append(
                  `<br /><br /><span class = "race-stat">Strength: +${subRace.sub_race_str_bonus}</span>`
                );
              }

              if (subRace.sub_race_con_bonus) {
                $("#subrace-description").append(
                  `<br /><br /><span class = "race-stat">Constitution: +${subRace.sub_race_con_bonus}</span>`
                );
              }

              if (subRace.sub_race_dex_bonus) {
                $("#subrace-description").append(
                  `<br /><br /><span class = "race-stat">Dexterity: +${subRace.sub_race_dex_bonus}</span>`
                );
              }

              if (subRace.sub_race_int_bonus) {
                $("#subrace-description").append(
                  `<br /><br /><span class = "race-stat">Intelligence: +${subRace.sub_race_int_bonus}</span>`
                );
              }

              if (subRace.sub_race_wis_bonus) {
                $("#subrace-description").append(
                  `<br /><br /><span class = "race-stat">Wisdom: +${subRace.sub_race_wis_bonus}</span>`
                );
              }

              if (subRace.sub_race_cha_bonus) {
                $("#subrace-description").append(
                  `<br /><br /><span class = "race-stat">Charisma: +${subRace.sub_race_cha_bonus}</span>`
                );
              }

              $(".race-info").append(`<button class = "btn btn-primary btn-lg" id = "next-button">Next</button>`);
              $("#next-button").on("click", () => {
                emptyMainContainer();
                showClassButtons();
              });
            });
          }

          $(`#race-${race.id}`).on("click", () => {
            raceSelected = race.race_name;
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
            raceSelected = race.race_name;
            showRaceInfo(race);
            $(".race-info").append(`<button class = "btn btn-primary btn-lg" id = "next-button">Next</button>`);
            $("#next-button").on("click", () => {
              emptyMainContainer();
              showClassButtons();
            });
          });
        }
      }
    });
  };

  //showRaceButtons();
