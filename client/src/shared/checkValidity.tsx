interface rule {
  required?: boolean;
  requiredList?: boolean;
  maxLength?: number;
  minLength?: number;
  maxPrice?: number;
  minPrice?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
}
export const checkValidity = (value: any, rule: rule): boolean => {
  let isValid = true;
  if (rule.required) isValid = value.trim() !== "" && isValid;
  if (rule.requiredList) isValid = value.length > 0 && isValid;
  if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid;
  if (rule.minLength) isValid = value.length >= rule.minLength && isValid;
  if (rule.maxPrice) isValid = +value <= rule.maxPrice && isValid;
  if (rule.minPrice) isValid = +value >= rule.minPrice && isValid;
  if (rule.isEmail) {
    isValid =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
      ) && isValid;
  }
  if (rule.isNumeric) isValid = /^\d+$/.test(value) && isValid;

  return isValid;
};
