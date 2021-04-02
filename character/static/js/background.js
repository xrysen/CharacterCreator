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
      </p>
      <h3>Personality Trait</h3>
      <select id = "personality-trait">
      <option value="">Choose Personality Trait</option>
      </select>
      <h3>Ideals</h3>
      <select id = "ideals">
      </select>
      <h3>Bonds</h3>
      <select id = "bonds">
      </select>
      <h3>Flaws</h3>
      <select id = "flaws">
      </select>
    </div>
    `
  )

  for (let i = 0; i <=7; i++) {
    $("#personality-trait").append(
      `<option value="${background.background_traits[i].description}">${background.background_traits[i].description}</option>`
    );
  }

  for (let i = 0; i <=5; i++) {
    $("#ideals").append(
      `<option value="${background.background_ideals[i].name}"><strong>${background.background_ideals[i].name}.</strong> ${background.background_ideals[i].description}</option>`
    );
    $("#bonds").append(
      `<option value="${background.background_bonds[i].description}">${background.background_bonds[i].description}</option>`
    );
    $("#flaws").append(
      `<option value="${background.background_flaws[i].description}">${background.background_flaws[i].description}</option>`
    )
  }
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
      })
    }
  })
}

showBackgroundButtons();