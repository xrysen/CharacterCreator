
const showDetails = (className) => {
  const classInfo = getClassByName(className);
  let raceChosen = "";
  if (!subRaceSelected) 
    raceChosen = raceSelected
  else
    raceChosen = subRaceSelected
  $(".main-container").append(
    `
    <div class = "skills-container">
      <h3>Choose Proficiecies for your ${raceChosen} ${selectedClass}</h3>
    </div>
    `
  )

  classInfo.then((result) => console.log(result));
}