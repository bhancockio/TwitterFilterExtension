setInterval(() => {
  console.log("Filtering");
  let potentialTweetAttributes = document.querySelectorAll("[aria-label]");

  for (let i = 0; i < potentialTweetAttributes.length; i++) {
    const potentialTweetAttribute = potentialTweetAttributes[i];
    const label = potentialTweetAttribute.ariaLabel;
    if (label.includes("replies") || label.includes("likes")) {
      try {
        let [commentsEle, retweetsEle, likesEle, viewsEle] =
          potentialTweetAttribute.childNodes;
        const tweetBody =
          potentialTweetAttribute.parentNode.parentNode.parentNode;
        // const tweetAuthor = tweetBody.childNodes[0].textContent;
        const tweetContainer =
          tweetBody.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.parentNode.parentNode;

        // tweetContainer.style.display = "none";

        const commentsCount = getFormattedNumber(commentsEle.textContent);
        const retweetsCount = getFormattedNumber(retweetsEle.textContent);
        const likesCount = getFormattedNumber(likesEle.textContent);
        const viewsCount = getFormattedNumber(viewsEle.textContent);

        const showTweet = showTweetsBasedOnEngagement(
          commentsCount,
          retweetsCount,
          likesCount,
          viewsCount
        );

        tweetContainer.style.display = showTweet ? "" : "block";
      } catch (err) {
        console.error("Invalid tweet found");
        console.error(err);
      }
    }
  }
}, 2000);

const getFormattedNumber = (textNumber) => {
  if (textNumber == "") {
    return 0;
  }

  if (textNumber.includes("K")) {
    const num = textNumber.replaceAll("K", "");
    return parseFloat(num) * 1000;
  }

  if (textNumber.includes("M")) {
    const num = textNumber.replaceAll("M", "");
    return parseFloat(num) * 1000000;
  }

  return parseFloat(textNumber);
};

const showTweetsBasedOnEngagement = (
  commentsCount,
  retweetsCount,
  likesCount,
  viewsCount
) => {
  if (likesCount / viewsCount > 0.0125) {
    return true;
  }
  if (commentsCount > 5 || retweetsCount > 2) {
    return true;
  }

  return false;
};
