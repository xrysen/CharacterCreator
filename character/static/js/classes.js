let classInfo = [];

const getClassData = () => {
  return fetch(CLASS_ENDPOINT, {
    mode: "cors",
  }).then((res) => res.json());
};

const classData = getClassData();

const removeCInfo = () => {
  $(".class-info").remove();
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
      </p>
    </div>
    `
  )
}

const showClassButtons = () => {
  $(".main-container").append('<div class = "class-container"></div>');
  $(".class-container").append(
    "<h3 class = 'h3 mob-3 font-weight-normal'>Choose Class: </h3>"
  );
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
      })
    }
  });
};

//showClassButtons();