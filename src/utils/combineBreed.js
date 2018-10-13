/**
 *
 * @param {{breed: String | [String]}} breeds - collection of breeds to be combine
 * @returns {String} cobined breeds string
 */
function combineBreed(breeds) {
  if (!breeds || !breeds.breed) return null;
  const { breed } = breeds;
  if (Array.isArray(breed)) return breed.join(", ");
  return breed;
}

export { combineBreed };
