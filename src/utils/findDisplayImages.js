/**
 *
 * @param {{photos: {photo: [{}]}}} media - collection of photos response from API request
 * @returns {string} image src
 */
function findDisplayImages(media) {
  if (!media || !media.photos || !media.photos.photo) return null;
  const { photo } = media.photos;
  return photo.filter(options => options["@size"] === "pn");
}

export { findDisplayImages };
