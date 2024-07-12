export const youtubeTranscript = (transcript: string) => {
  const lowercase = transcript.toLowerCase();

  if (lowercase.includes("search")) {
    const searchText = transcript
      .toLowerCase()
      .substring(transcript.indexOf("search") + "search".length)
      .trim();

    const linkUrl = `https://www.youtube.com/results?search_query=${searchText}`;

    return window.open(linkUrl, "_blank");
  }
  window.open("https://www.youtube.com/", "_blank");
};
