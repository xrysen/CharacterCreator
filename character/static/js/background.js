const getBackgroundData = () => {
  return fetch(BG_ENDPOINT, {
    mode: 'cors',
  }).then(res => res.json());
};

const backgroundData = getBackgroundData();

const removeBInfo = () => {
  $(".class-info").remove();
}

const showBackgroundInfo = (background) => {
  removeBInfo();
  $(".class-container").append(
    `
    <div class = "class-info">
      <h1 class = "race-header">${background.name}</h1>
      <p class = "race-description">
      ${background.description}
      <br /><br /><strong>Proficiencies:</strong> ${background.skills[0].skill_name}, ${background.skills[1].skill_name}
      </p>
      <h3>Personality Trait</h3>
      <select id = "personality-trait" style="width: 90%">
      <option value="">Choose Personality Trait</option>
      </select>
      <br />
      <button id = "trait-btn" class = "btn btn-primary" style="margin: 10px">Random</button>
      <h3>Ideals</h3>
      <select id = "ideals" style="width: 90%">
      <option value="">Select Ideal</option>
      </select>
      <button id = "ideal-btn" class = "btn btn-primary" style="margin: 10px">Random</button>
      <h3>Bonds</h3>
      <select id = "bonds" style="width: 90%">
      <option value="">Select Bond</option>
      </select>
      <button id = "bond-btn" class = "btn btn-primary" style="margin: 10px">Random</button>
      <h3>Flaws</h3>
      <select id = "flaws" style="width: 90%">
      <option value="">Select Flaw</option>
      </select>
      <button id = "flaw-btn" class = "btn btn-primary" style="margin: 10px">Random</button>
    </div>
    `
  )

  for (let i = 0; i <=7; i++) {
    $("#personality-trait").append(
      `<option id = "trait-${i + 1}" value="${background.background_traits[i].description}">${background.background_traits[i].description}</option>`
    );
  }

  for (let i = 0; i <=5; i++) {
    $("#ideals").append(
      `<option id = "ideal-${i + 1}" value="${background.background_ideals[i].name}"><strong>${background.background_ideals[i].name}.</strong> ${background.background_ideals[i].description}</option>`
    );
    $("#bonds").append(
      `<option id = "bond-${i + 1}" value="${background.background_bonds[i].description}">${background.background_bonds[i].description}</option>`
    );
    $("#flaws").append(
      `<option id = "flaw-${i + 1}" value="${background.background_flaws[i].description}">${background.background_flaws[i].description}</option>`
    )
  }

  $("#trait-btn").on("click", () => {
    $(`#trait-${rollDice(8)}`).attr("selected","selected");
    $('.class-container').append(`<br /><br />
    <button id = "nxt-btn" class = "btn btn-primary"> Next</button>`);
    character.personalityTrait = $("#personality-trait").val();
    $("#nxt-btn").on("click", () => {
      character.skills.push(background.skills[0].skill_name);
        character.skills.push(background.skills[1].skill_name);
      $(".main-container").remove();
      $("#bs").remove();
      generateCharacterSheet();
    })
  });

  $("#ideal-btn").on("click", () => {
    $(`#ideal-${rollDice(6)}`).attr("selected", "selected");
  })
  $("#bond-btn").on("click", () => {
    $(`#bond-${rollDice(6)}`).attr("selected", "selected");
  })
  $("#flaw-btn").on("click", () => {
    $(`#flaw-${rollDice(6)}`).attr("selected", "selected");
  })

}

const showBackgroundButtons = () => {
  $(".main-container").append('<div class = "class-container"></div>');
  $(".class-container").append(
    `<h3 class = 'h3 mob-3 font-weight-normal'>Choose a background for your ${character.subRace ? character.subRace : character.race} ${character.class}: </h3>`
  );
  backgroundData.then((res) => {
    for (const background of res) {
      $(".class-container").append(
        `
        <div class = "btn-group">
          <button class = "btn btn-primary" id = "bg-${background.id}">
          ${background.name}
          </button>
        </div>
          `
      );

      $(`#bg-${background.id}`).on("click", () => {
        showBackgroundInfo(background);
        character.background=background.name;
      })
    }
  })
}



//showBackgroundButtons();