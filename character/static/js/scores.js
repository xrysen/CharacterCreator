raceSelected = "Elf";
selectedClass = "Paladin";
subRaceSelected = 1;

const scoreCalcTemplate = () => {
  let race = "";
  if (subRaceSelected) {
    race = subRaceSelected;
  } else {
    race = raceSelected;
  }
  $(".main-container").append(
    `
      <h3>Roll Ability Scores for your ${race} ${selectedClass}</h3>
      <div class = "card-group" id = "stat-cards-1" style="margin-left: 5%; margin-right: 5%">
      </div>
      <div class = "card-group" id = "stat-cards-2" style="margin-left: 5%; margin-right: 5%">
      </div>
    `
  );

  statTable(1, "Strength", raceSelected, "race_str_bonus", "sub_race_str_bonus");
  statTable(1, "Dexterity", raceSelected, "race_dex_bonus", "sub_race_dex_bonus");
  statTable(1, "Constitution", raceSelected, "race_con_bonus", "sub_race_con_bonus");
  statTable(2, "Intelligence", raceSelected, "race_int_bonus", "sub_race_int_bonus");
  statTable(2, "Wisdom", raceSelected, "race_wis_bonus", "sub_race_wis_bonus");
  statTable(2, "Charisma", raceSelected, "race_cha_bonus", "sub_race_cha_bonus");
};

const statTable = (group, statName, race, statAbbr, subStatAbbr) => {
  const raceData = getRaceDataByName(race);
  raceData.then((res) => {
    let subRaceStat = 0;
    if (res[0].race_has_subrace) {
      subRaceStat = res[0].sub_races[subRaceSelected][subStatAbbr];
    } 
    $(`#stat-cards-${group}`).append(
      `
      <div class = "card">
      <div class = "card-body">
      <h5 class = "card-title">${statName}</h5>
      <table class = "table">
      <tbody>
      <tr>
      <td>Total Score: </td>
      <td> -- </td>
      </tr>
      <tr>
      <td>Modifier: </td>
      <td> -- </td>
      </tr>
      <tr>
      <td>Base Score: </td>
      <td> -- </td>
      </tr>
      <tr>
      <td>Racial Bonus: </td>
      <td> ${res[0][statAbbr] + subRaceStat} </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      `
    );
  });
};

scoreCalcTemplate();
