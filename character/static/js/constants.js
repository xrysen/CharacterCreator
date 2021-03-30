const RACE_ENDPOINT = "http://localhost:8000/character/race";
const CLASS_ENDPOINT = "http://localhost:8000/character/class";

let character = {
  name: "",
  race: "",
  subRace: "",
  class: "",
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
  skills: [],
  savingThrows: [],
  proficiency: 2
}