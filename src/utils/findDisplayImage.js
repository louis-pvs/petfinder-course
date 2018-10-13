/**
 *
 * @param {{photos: {photo: [{}]}}} media - collection of photos response from API request
 * @returns {string} image src
 */
function findDisplayImage(media) {
  if (!media || !media.photos || !media.photos.photo) return null;
  const { photo } = media.photos;
  const rightImage = photo.filter(options => options["@size"] === "pn");
  if (rightImage) return rightImage[0].value;
}

export { findDisplayImage };
