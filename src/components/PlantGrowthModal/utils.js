import plantsList from '../Plants/index';
/*
Check if plant has already been generated
  //if yes --> get the generated plant id from local-storage
  //if not --> generate plant id and store it in local-storage

  Generation of random plant

  //get random plant from list of water, electric, grass, ice, fire
    //get random body, eyes, hair, backLeaves, frontLeaves, patterns part from selected plant type
    
    store object example:
    {
      type: "",
      plantId: [0-4],
      bodyId: [0-4],
      eyesId: [0-7],
      hair: [0-4],
      backLeaves: [0-3],
      frontLeaves: [],
      patterns: [],
      seed: []
    }

Known peculiar behavior: generates and stores plantIds on first page render in local storage 
*/
export const getPlantId = () => {
  // get the generated plant id from local-storage if available otherwise generate
  const ids =
    typeof localStorage !== 'undefined' && localStorage.getItem('plant');
  console.log(ids);
  if (ids) return JSON.parse(ids);

  const plantId = Math.floor(Math.random() * plantsList.length);
  const randomPlant = plantsList[plantId];
  const bodyId = Math.floor(Math.random() * randomPlant.body.length);
  const eyesId = Math.floor(Math.random() * randomPlant.eyes.length);
  const hairId = Math.floor(Math.random() * randomPlant.hair.length);
  const headId = Math.floor(Math.random() * randomPlant.head.length);
  const backLeavesId = Math.floor(
    Math.random() * randomPlant.backLeaves.length,
  );
  const frontLeavesId = Math.floor(
    Math.random() * randomPlant.frontLeaves.length,
  );
  const patternsId = Math.floor(Math.random() * randomPlant.patterns.length);
  const seedId = Math.floor(Math.random() * randomPlant.seed.length);

  const plantObj = {
    type: randomPlant.type,
    plantId,
    bodyId,
    eyesId,
    hairId,
    headId,
    backLeavesId,
    frontLeavesId,
    patternsId,
    seedId,
  };

  //storage generated plant id for future reference
  typeof localStorage != 'undefined' &&
    localStorage.setItem('plant', JSON.stringify(plantObj));
  return plantObj;
};
