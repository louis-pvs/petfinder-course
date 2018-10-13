/**
 *
 * @param {{media}} data - media response from API request
 * @return {string} image src
 */
function findImage({ media }) {
  if (!media || !media.photos || !media.photos.photo) return null;
  const { photo } = media.photos;
  const rightImage = photo.filter(options => options["@size"] === "pn");
  if (rightImage) return rightImage[0].value;
}

export { findImage };
