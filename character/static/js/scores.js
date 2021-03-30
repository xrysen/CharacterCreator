raceSelected = "Human";
selectedClass = "Fighter";
subRaceSelected = "";
let subRaceStat = 0;
let mainRaceStat = 0;

let character = {
  name: "Hardwon Surefoot",
  race: "Human",
  subRace: "",
  class: "Fighter",
  background: "",
  alignment: "",
  playerName: "",
  experiencePoints: 0,
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
  strMod: 0,
  dexMod: 0,
  conMod: 0,
  intMod: 0,
  wisMod: 0,
  chaMod: 0,
  skills: ["Athletics", "Perception"],
  savingThrows: ["Strength", "Constitution"],
  proficiency: 2
}

let lastRoll = [];

let baseStats = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};

let totalRolls = {
  total1: 0,
  total2: 0,
  total3: 0,
  total4: 0,
  total5: 0,
  total6: 0,
};

let statTotals = {
  strTotal: 0,
  dexTotal: 0,
  conTotal: 0,
  intTotal: 0,
  wisTotal: 0,
  chaTota: 0,
};

let statModifiers = {
  strMod: 0,
  dexMod: 0,
  conMod: 0,
  intMod: 0,
  wisMod: 0,
  chaMod: 0,
};

const showSign = (num) => {
  if (num >= 0) {
    return "+" + num;
  }
}

const scoreCalcTemplate = () => {
  $(".main-container").append(
    `
      <h3>Roll Ability Scores for your ${character.subRace ? character.subRace : character.race} ${character.class}</h3>
      <div class = "card-group" id = "stat-cards-1" style="margin-left: 5%; margin-right: 5%">
      </div>
      <div class = "card-group" id = "stat-cards-2" style="margin-left: 5%; margin-right: 5%">
      </div>
    `
  );

  statTable(
    1,
    "Strength",
    character.race,
    "race_str_bonus",
    "sub_race_str_bonus"
  );
  statTable(
    1,
    "Dexterity",
    character.race,
    "race_dex_bonus",
    "sub_race_dex_bonus"
  );
  statTable(
    1,
    "Constitution",
    character.race,
    "race_con_bonus",
    "sub_race_con_bonus"
  );
  statTable(
    2,
    "Intelligence",
    character.race,
    "race_int_bonus",
    "sub_race_int_bonus"
  );
  statTable(2, "Wisdom", character.race, "race_wis_bonus", "sub_race_wis_bonus");
  statTable(
    2,
    "Charisma",
    character.race,
    "race_cha_bonus",
    "sub_race_cha_bonus"
  );
};

const statTable = (group, statName, race, statAbbr, subStatAbbr) => {
  let totalScore = 0;
  let baseStat = statAbbr.slice(5, 8);
  const raceData = getRaceDataByName(race);
  raceData.then((res) => {
    if (res[0].race_has_subrace) {
      for (let i = 0; i < res[0].sub_races.length; i++) {
        if (res[0].sub_races[i].sub_race_name === subRaceSelected) {
          subRaceStat = res[0].sub_races[i][subStatAbbr];
        }
      }
    }
    mainRaceStat = res[0][statAbbr];
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
              <td id = "${baseStat}-total"> ${totalScore} </td>
            </tr>
            <tr>
              <td>Modifier: </td>
              <td id = "${baseStat}-mod"> -- </td>
            </tr>
            <tr>
              <td>Base Score: </td>
              <td id = "${baseStat}"> ${
        baseStats[baseStat] ? baseStats[baseStat] : "--"
      } </td>
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
  for (let i = 1; i <= 6; i++) {
    $(`#dice-btn-${i}`).on("click", () => {
      $(`#dice-group-p-${i}`).html(
        `<strong>${statRoll(`total${i}`)}</strong> <br />${lastRoll.slice(
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
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const statRoll = (id) => {
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
  totalRolls[id] = total;
  console.log(totalRolls);
  return total;
};

scoreCalcTemplate();
rollBlock();

const calculateModifier = (score) => {
  switch (score) {
    case 1:
      return "-5";
      break;
    case 2:
    case 3:
      return "-4";
      break;
    case 4:
    case 5:
      return "-3";
      break;
    case 6:
    case 7:
      return "-2";
      break;
    case 8:
    case 9:
      return "-1";
      break;
    case 10:
    case 11:
      return "0";
      break;
    case 12:
    case 13:
      return "+1";
      break;
    case 14:
    case 15:
      return "+2";
      break;
    case 16:
    case 17:
      return "+3";
      break;
    case 18:
    case 19:
      return "+4";
      break;
    case 20:
    case 21:
      return "+5";
      break;
    case 22:
    case 23:
      return "+6";
      break;
    case 24:
    case 25:
      return "+7";
      break;
    case 26:
    case 27:
      return "+8";
      break;
    case 28:
    case 29:
      return "+9";
      break;
    case 30:
      return "+10";
      break;
  }
};

const addSelectListeners = (id) => {
  $(`#stat-select-${id}`).on("change", function () {
    for (let i = 1; i <= 6; i++) {
      console.log($(`#stat-select-${id}`).val());
      if (!$(`#stat-select-${i}`).val()) {
        return;
      }
    }
    $(".main-container").append(
      `<button class = "btn btn-primary" id = "apply-score" style="margin-top: 20px">Apply</button>`
    );
    $("#apply-score").on("click", () => {
      console.log("Applying scores");
      for (let i = 1; i <= 6; i++) {
        selectedStat = $(`#stat-select-${i}`).val();
        currentTotal = $(`#${selectedStat}-total`).text();
        baseStats[selectedStat] = totalRolls[`total${i}`];
        statTotals[`${selectedStat}Total`] =
          Number(currentTotal) + baseStats[selectedStat];
        $(`#${selectedStat}`).text(totalRolls[`total${i}`]);
        $(`#${selectedStat}-total`).text(
          totalRolls[`total${i}`] + Number(currentTotal)
        );
        currentTotal = Number($(`#${selectedStat}-total`).text());
        $(`#${selectedStat}-mod`).text(calculateModifier(currentTotal));
        statModifiers[`${selectedStat}Mod`] = calculateModifier(currentTotal);
      }
      $("#apply-score").remove();
      $(".main-container").append(
        `<button class = "btn btn-primary" id = "generate-sheet" style = "margin-top: 20px;">Generate Character Sheet</button>`
      );
      $(".main-container").remove();
      $("#bs").remove(); // Removes bootstrap for character sheet
      generateCharacterSheet();
    });
  });
};
