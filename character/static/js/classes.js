let classInfo = [];
let selectSkills = [];
let selectedClass = "";

const getClassData = () => {
  return fetch(CLASS_ENDPOINT, {
    mode: "cors",
  }).then((res) => res.json());
};

const getClassByName = (className) => {
  return fetch(`${CLASS_ENDPOINT}?class_name=${className}`, {
    mode: "cors",
  }).then((res) => res.json(res));
}

const classData = getClassData();

const removeCInfo = () => {
  $(".class-info").remove();
};

const emptyClassContainer = () => {
  $(".class-container").remove();
}

const showCinfo = (playerClass) => {
  removeCInfo();
  $(".class-container").append(
    `
    <div class = "class-info">
      <h1 class = "race-header">${playerClass.class_name}</h1>
      <img src = "${playerClass.class_image}" height = 300 style = "float: right;">
      <p class = "race-description">
        ${playerClass.class_description}
        <br /><br />
        <strong>Hit Points</strong>
        <br/>
        <strong>Hit Dice: </strong>1d${playerClass.class_hit_die} per ${playerClass.class_name} level
        <br />
        <strong>Hit Points at 1st Level:</strong> ${playerClass.class_first_hp} + Constitution Modifier
        <br />
        <strong>Hit Points at Higher Levels: </strong> 1d${playerClass.class_later_hp} (or ${playerClass.class_later_hp_avg}) + your Constitution modifier per ${playerClass.class_name} level after 1st
        <br /><br />
          <strong>Proficiencies</strong>
          <br />
          <strong>Armor:</strong> ${playerClass.class_armor}
          <br />
          <strong>Weapons: </strong>${playerClass.class_weapons}
          <br />
          <strong>Saving Throws: </strong>${playerClass.class_save_throw1}, ${playerClass.class_save_throw2} 
          <br />
          <strong>Skills: </strong>Pick ${playerClass.class_num_skills} of <span id = "skills"></span>
          <br />
        </p>
    </div>
    `
  );

  
  
  for (const skill of playerClass.class_skills) {
    if (
      playerClass.class_skills.indexOf(skill) !==
      playerClass.class_skills.length - 1
      )
      $("#skills").append(` <a href = "${skill.skill_url}" target="new">${skill.skill_name}</a>, `);
      else $("#skills").append(`and <a href = "${skill.skill_url}" target="new">${skill.skill_name}.</a>`);
    }
    
    
    for (i = 1; i <= playerClass.class_num_skills; i++) {
      $(".class-info").append(
        `
        <select name="skills" id = "choose-skills-${i}">
        <option value="" disabled selected>- Select Skill -</option>
        </select>
        `
        );
        for (const skill of playerClass.class_skills) {
          $(`#choose-skills-${i}`).append(
            `<option value="${skill.skill_name}">${skill.skill_name}</option>`
            );
          }
        }
        
        $(".class-info").append(
          `<br /><br /><button class = "btn btn-primary btn-lg" id = "next-button">Next</button><br />`
        );

  $("#next-button").on('click', () => {
    selectedClass = playerClass.class_name;
    emptyClassContainer();
  })
};

const showClassButtons = () => {
  $(".main-container").append('<div class = "class-container"></div>');
  if (!subRaceSelected) {
    $(".class-container").append(
      `<h3 class = 'h3 mob-3 font-weight-normal'>Choose a Class for your ${raceSelected}: </h3>`
    );
  } else {
    $(".class-container").append(
      `<h3 class = 'h3 mob-3 font-weight-normal'>Choose a Class for your ${subRaceSelected}: </h3>`
    );
  }
  classData.then((classes) => {
    for (const playerClass of classes) {
      classInfo.push(playerClass);
      $(".class-container").append(
        `
        <div class = "btn-group">
          <button class = "btn btn-primary" id = "class-${playerClass.id}">
            ${playerClass.class_name}
          </button>
        </div>
        `
      );

      $(`#class-${playerClass.id}`).on("click", () => {
        showCinfo(playerClass);
      });
    }
  });
};

//showClassButtons();
