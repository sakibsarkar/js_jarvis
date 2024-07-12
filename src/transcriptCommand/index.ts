/* eslint-disable @typescript-eslint/no-explicit-any */
import { responseSpeech } from "@/utils/responseSpeech";
import response from "@/utils/responseVoice";
import { dailyMeetLink } from "./dailyMeetLink";
import { weatherReport } from "./fetchWeather";
import { allAboutHer } from "./her";
import { youtubeTranscript } from "./openYoutube";
import { TimeSpeec } from "./timeSpeech";

export const scriptRunner = (transcript: string) => {
  const lowerCase = transcript.toLowerCase();

  const responseArr = Object.values(responseSpeech);
  const responseArrLowerCase = responseArr.map((res) => res.toLowerCase());

  if (!lowerCase) {
    return;
  }
  if (lowerCase.includes("beautiful")) {
    return allAboutHer();
  }

  if (responseArrLowerCase.includes(lowerCase)) {
    return;
  }

  if (lowerCase.includes("weather")) {
    return response(
      "Fetching weather report",
      async () => await weatherReport()
    );
  }
  if (lowerCase.includes("sad")) {
    return response(
      "playing akhon ami onek valo tomay chara thakte pari based on your mood",
      () => window.open("https://www.youtube.com/watch?v=UeGjKYARiCA", "_blank")
    );
  }

  if (lowerCase.includes("open youtube")) {
    return response(responseSpeech.youtube, () =>
      youtubeTranscript(transcript)
    );
  }
  if (lowerCase.includes("meet link") || lowerCase.includes("meeting")) {
    return response(responseSpeech.meetLink, () => dailyMeetLink());
  }

  if (lowerCase.includes("what time")) {
    return TimeSpeec();
  }
  if (lowerCase.includes("how are you")) {
    return response(responseSpeech.welcome, () => "");
  }

  response(responseSpeech.error, () => "ff");
};
