raceSelected = "Dwarf";
selectedClass = "Paladin";
subRaceSelected = "Mountain Dwarf";

let lastRoll = [];

let baseStats = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0
};

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

  statTable(
    1,
    "Strength",
    raceSelected,
    "race_str_bonus",
    "sub_race_str_bonus"
  );
  statTable(
    1,
    "Dexterity",
    raceSelected,
    "race_dex_bonus",
    "sub_race_dex_bonus"
  );
  statTable(
    1,
    "Constitution",
    raceSelected,
    "race_con_bonus",
    "sub_race_con_bonus"
  );
  statTable(
    2,
    "Intelligence",
    raceSelected,
    "race_int_bonus",
    "sub_race_int_bonus"
  );
  statTable(2, "Wisdom", raceSelected, "race_wis_bonus", "sub_race_wis_bonus");
  statTable(
    2,
    "Charisma",
    raceSelected,
    "race_cha_bonus",
    "sub_race_cha_bonus"
  );
};

const statTable = (group, statName, race, statAbbr, subStatAbbr) => {
  let totalScore = 0;
  let baseStat = statAbbr.slice(5,8);
  const raceData = getRaceDataByName(race);
  raceData.then((res) => {
    let subRaceStat = 0;
    if (res[0].race_has_subrace) {
      for (let i = 0; i < res[0].sub_races.length; i++) {
        if (res[0].sub_races[i].sub_race_name === subRaceSelected) {
          subRaceStat = res[0].sub_races[i][subStatAbbr];
        }
      }
    }
    totalScore = res[0][statAbbr] + subRaceStat;
    $(`#stat-cards-${group}`).append(
      `
      <div class = "card">
        <div class = "card-body">
          <h5 class = "card-title">${statName}</h5>
          <table class = "table">
          <tbody>
            <tr>
              <td>Total Score: </td>
              <td> ${totalScore} </td>
            </tr>
            <tr>
              <td>Modifier: </td>
              <td> -- </td>
            </tr>
            <tr>
              <td>Base Score: </td>
              <td> ${baseStats[baseStat] ? baseStats[baseStat] : "--"} </td>
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

const rollBlock = () => {
  $(".main-container").append(
    `
    <div class = "dice-group-container">
      <div class = "dice-group" id = "dice-group-1">
        <p id = "dice-group-p-1">--</p>
        <button class = "btn btn-primary" id="dice-btn-1">Roll</button>
      </div>
      <div class = "dice-group" id = "dice-group-2">
        <p id = "dice-group-p-2">--</p>
        <button class = "btn btn-primary" id="dice-btn-2">Roll</button>
      </div>
      <div class = "dice-group" id = "dice-group-3">
        <p id = "dice-group-p-3">--</p>
        <button class = "btn btn-primary" id="dice-btn-3">Roll</button>
      </div>
      <div class = "dice-group" id = "dice-group-4">
        <p id = "dice-group-p-4">--</p>
        <button class = "btn btn-primary" id="dice-btn-4">Roll</button>
      </div>
      <div class = "dice-group" id = "dice-group-5">
        <p id = "dice-group-p-5">--</p>
        <button class = "btn btn-primary" id="dice-btn-5">Roll</button>
      </div>
      <div class = "dice-group"id = "dice-group-6">
        <p id = "dice-group-p-6">--</p>
        <button class = "btn btn-primary" id="dice-btn-6">Roll</button>
      </div>
    </div>
    `
  );
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const statRoll = () => {
  let total = 0;
  lastRoll = [];
  lastRoll.push(rollDice());
  lastRoll.push(rollDice());
  lastRoll.push(rollDice());
  lastRoll.push(rollDice());
  lastRoll = lastRoll.sort().reverse();
  for (let i = 0; i < lastRoll.length - 1; i++) {
    total += lastRoll[i];
  }
  console.log(lastRoll);
  console.log(total);
  return total;
};

scoreCalcTemplate();
rollBlock();

const addSelectListeners = (id) => {
  $(`#stat-select-${id}`).on("change", function() {
    for (let i = 1; i <=6; i++) {
      console.log($(`#stat-select-${id}`).val());
      if (!$(`#stat-select-${i}`).val()) {
        return;
      }
    }
    $(".main-container").append(`<button class = "btn btn-primary" style="margin-top: 20px">Apply</button>`);
  });
}

for (let i = 1; i <= 6; i++) {
  $(`#dice-btn-${i}`).on("click", () => {
    $(`#dice-group-p-${i}`).html(
      `<strong>${statRoll()}</strong> <br />${lastRoll.slice(
        0,
        3
      )} <strike>${lastRoll.slice(3)}</strike>`
    );
    $(`#dice-btn-${i}`).remove();
    $(`#dice-group-${i}`).append(
      `
      <select id = "stat-select-${i}">
        <option value="">--</option>
        <option value = "str">STR</option>
        <option value = "dex">DEX</option>
        <option value = "con">CON</option>
        <option value = "int">INT</option>
        <option value = "wis">WIS</option>
        <option value = "cha">CHA</option>
      </select>
      `
    );
    addSelectListeners(i);
  });
}
