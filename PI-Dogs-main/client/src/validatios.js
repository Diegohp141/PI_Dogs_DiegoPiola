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
  if (isNaN(min)) return "You must enter an number";
  if (min <= 0 || min > 100) return "You must enter a number between 1 and 100";
  return "";
};

export const validateMax = (max = "", min = 100, inputName) => {
  if (max === "") return "input can not be empty";
  if (isNaN(max)) return "You must enter an number";
  if (min <= 0 || max > 100) return "You must enter a number between 1 and 100";
  if (min >= max) return `The maximum ${inputName} cannot be lower than the minimum ${inputName}.`;
  return "";
};

/* export const validateAllErrors = (error) => {
  //let result = false;
  for (const key in error) {
    if (true) {
      const element = error[key];
      console.log(element);
    }
  }
};
 */
