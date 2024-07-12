export const getCurrentDateTime = () => {
  const date = new Date();

  // Get the date parts
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Get the time parts
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to be two digits
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  // Format the date and time
  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutesFormatted} ${ampm}`;

  return { formattedDate, formattedTime };
};
