import {
  parseParams,
  sortParamsToStr,
  searchParamsToStr,
} from '../../utils';

describe('Utils', () => {
  const testParams = {
    per_page: 50,
    page: 3,
    created: "2019-12-12",
    language: 'JavaScript',
  };

  it('should return default params object', () => {
    const defaultParams = parseParams();

    expect(typeof defaultParams === 'object').toBe(true);
    expect(defaultParams.searchParams).toHaveProperty('language');
    expect(defaultParams.searchParams).toHaveProperty('created');
    expect(defaultParams.searchParams.language.value).toBe('');

    expect(defaultParams.sortParams).toHaveProperty('page');
    expect(defaultParams.sortParams).toHaveProperty('per_page');
    expect(defaultParams.sortParams).toHaveProperty('sort');
    expect(defaultParams.sortParams).toHaveProperty('order');
    expect(defaultParams.sortParams.page).toEqual(1);
    expect(defaultParams.sortParams.per_page).toEqual(10);
    expect(defaultParams.sortParams.sort).toEqual('stars');
    expect(defaultParams.sortParams.order).toEqual('desc');
  });

  it('should return parsed params object', () => {
    const defaultParams = parseParams(testParams);

    expect(typeof defaultParams === 'object').toBe(true);
    expect(defaultParams.searchParams).toHaveProperty('language');
    expect(defaultParams.searchParams).toHaveProperty('created');
    expect(defaultParams.searchParams.language.value).toBe(testParams.language);
    expect(defaultParams.searchParams.created.value).toBe(testParams.created);

    expect(defaultParams.sortParams).toHaveProperty('page');
    expect(defaultParams.sortParams).toHaveProperty('per_page');
    expect(defaultParams.sortParams.page).toEqual(testParams.page);
    expect(defaultParams.sortParams.per_page).toEqual(testParams.per_page);
  });

  it('should return sort params string', () => {
    const defaultParams = parseParams(testParams);
    const str = sortParamsToStr(defaultParams.sortParams);
    const { page, per_page } = defaultParams.sortParams;
    expect(typeof str).toEqual('string');
    expect(str).toEqual(`page=${page}&per_page=${per_page}&sort=stars&order=desc&`);
  });

  it('should return search params string', () => {
    const defaultParams = parseParams(testParams);
    const str = searchParamsToStr(defaultParams.searchParams);
    const { language, created } = defaultParams.searchParams;
    expect(typeof str).toEqual('string');
    expect(decodeURIComponent(str)).toEqual(`created:>${created.value} language:${language.value}`);
  });
});
