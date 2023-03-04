export const validateName = (str) => {
  if (str === "") return "input can not be empty";
  if (str.length < 3 || str.length > 50)
    return "The name must have more than 3 letters and less than 50";
  if (!str.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/))
    return "the name cannot have numbers or a special character ";

  return "";
};
export const validateMin = (min) => {
  if (min === "") return "input can not be empty";
  if (isNaN(min)) return "You must enter an number";
  if (min <= 0 || min > 100) return "You must enter a number between 1 and 100";
  return "";
};

export const validateMax = (max, min = 100, inputName) => {
  if (max === "") return "input can not be empty";
  if (isNaN(max)) return "You must enter an number";
  if (min <= 0 || max > 100) return "You must enter a number between 1 and 100";
  if (min >= max) return `The maximum ${inputName} cannot be lower than the minimum ${inputName}.`;
  return "";
};

/* const [error, setError] = useState({
  name: "",
  minW: "",
  maxW: "",
  minH: "",
  maxH: "",
  minLs: "",
  maxLs: "",
  image: "",
  temperament: "you must  choose at least one temperament",
}); */

export const filterArray = (arr, value) => {
  let result = arr.filter((elem) => elem !== value);
  if (arr.length > 0) return result;
  return "you must  choose at least one temperament";
};

export const formatString = (str) => {
  if (str.length <= 4) return str;
  return [str.substring(0, 3), str.substring(3)];
};

export const validateValues = (arr, input) => {
  let result;
  arr.forEach((elem) => {
    result = input[elem].info === "" ? true : false;
  });
  return result;
};
