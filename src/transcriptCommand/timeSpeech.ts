import { getCurrentDateTime } from "@/utils/getCurrentTImeNdate";
import response from "@/utils/responseVoice";

export const TimeSpeec = () => {
  const { formattedDate, formattedTime } = getCurrentDateTime();
  response(`The current time is ${formattedTime} ,${formattedDate}`, () => "");
};
