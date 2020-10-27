/**
 * return total chapter and current selected chapter
 * @param {chapters list array} chapterList
 * @param {current selected chapter} currentSlug
 * @return {total chapter count,
 * current slected chapter,
 * next chapter link,
 * previous chapter link} object {total, current, nextSlug, prevSlug}
 */
export const getChaptersIndex = (chapterList, currentSlug) => {
  const total = chapterList.length;
  //current chapter index
  const current = chapterList.findIndex(chapter => {
    console.log(chapter.slug)
    return chapter.slug === currentSlug;
  });
  const nextChapterIndex = current + 1;
  const prevChapterIndex = current - 1;

  return {
    total,
    current: current + 1,
    nextSlug: chapterList[nextChapterIndex]
      ? chapterList[nextChapterIndex].slug
      : '',
    prevSlug: chapterList[prevChapterIndex]
      ? chapterList[prevChapterIndex].slug
      : '',
  };
};
