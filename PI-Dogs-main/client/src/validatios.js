export const validateName = (str = "") => {
  if (str === "") return "input can not be empty";
  if (str.length < 3 || str.length > 50)
    return "The name must have more than 3 letters and less than 50";
  if (!str.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/))
    return "the name cannot have numbers or a special character ";

  return "";
};
export const validateMin = (min = "") => {
  if (min === "") return "input can not be empty";
  if (isNaN(min)) return "You must enter an integer";
  if (min <= 0 || min > 100) return "You must enter a number between 1 and 100";
  return "";
};

export const validateMax = (max = "", min = 100) => {
  if (max === "") return "input can not be empty";
  if (isNaN(max)) return "You must enter an integer";
  if (min <= 0 || max > 100) return "You must enter a number between 1 and 100";
  if (min > max) return "The maximum weight cannot be lower than the minimum weight.";
  return "";
};

export const validateTemps = (arr) => {
  if (arr.length === 0) return "you must  choose at least one temperament";
  return "";
};
