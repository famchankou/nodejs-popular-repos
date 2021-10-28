import {
  format,
  subYears,
  parse,
  isValid,
} from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';
const DEFAULT_START_DATE = format(subYears(new Date(), 20), DATE_FORMAT);

const getParamsConfig = () => ({
  searchParams: {
    created: {
      value: DEFAULT_START_DATE,
      equality: ':>',
      validate(value) {
        const parsedDate = parse(value, DATE_FORMAT, new Date());
        return isValid(parsedDate) ? value : DEFAULT_START_DATE;
      },
    },
    language: {
      value: '',
      equality: ':',
      validate(value) {
        return value;
      },
    },
  },
  sortParams: {
    page: 1,
    per_page: 10,
    sort: 'stars',
    order: 'desc',
  },
})

/**
 * Builds sort/search params config
 * @param {*} params 
 * @returns 
 */
export const parseParams = (params = {}) => {
  return Object.keys(params)
    .reduce((validatedParams, paramName) => {
      const { sortParams, searchParams } = validatedParams;
      const value = params[paramName];
      
      if (paramName in searchParams && value != null) {
        searchParams[paramName].value = searchParams[paramName].validate(value);
      }

      if (paramName in sortParams && value) {
        sortParams[paramName] = value;
      }
      
      return validatedParams;
    }, getParamsConfig());
}

/**
 * Converts sort config to params string
 * @param {*} params 
 * @returns 
 */
export const sortParamsToStr = (params = {}) => {
  return Object.keys(params).reduce((str, key) => str.concat(`${key}=${params[key]}`, '&'), '');
}

/**
 * Converts search string to params string
 * @param {*} params 
 * @returns 
 */
export const searchParamsToStr = (params = {}) => {
  const searchStr = Object.keys(params).reduce((str, key) => {
    const paramOptions = params[key];
    if (paramOptions.value) {
      return str.concat(`${key}${paramOptions.equality}${paramOptions.value}`, ' ');
    }
    return str;
  }, '');
  
  return encodeURIComponent(searchStr.trim());
}

export const stringify = (value) => {
  return JSON.stringify(value, null, 2);
}