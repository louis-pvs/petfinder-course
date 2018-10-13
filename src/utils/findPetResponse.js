/**
 * @param {{pets: {pet: {} | []}}} data - result from pet.find API
 * @returns {Array} pets - extract out pets data from API
 */
function findPetResponse(data) {
  if (!data.petfinder || !data.petfinder) return null;
  const { pet, pets } = data.petfinder;
  if (pet) return [pet];
  else if (!!pets && !!pets.pet) return pets.pet;
}

export { findPetResponse };
