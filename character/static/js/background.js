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
    </div>
    `
  )
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