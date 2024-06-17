export function removeNumbersFromString(inputString: string) {
  return inputString.replace(/[0-9]/g, "");
}

export function removeSpacesFromString(inputString: string) {
  return inputString.replace(/\s/g, "");
}
