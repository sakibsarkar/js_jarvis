export function kelvinToCelsius(kelvin: number) {
  const number = Number(kelvin);
  return parseInt((number - 273.15).toString());
}
