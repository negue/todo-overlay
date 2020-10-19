export interface QueryOptions {
  channelName: string;
  command: string;
  scrollingInterval: number;
  scrollingDuration: number;
  layout: string;
}

export function queryStringToQueryOptions(queryString: string): QueryOptions {
  return queryString.replace('?', '').split('&').map(entry => {
    const [optionName, optionValue] = entry.split('=');

    return { optionName, optionValue };
  }).reduce((targetObject, currentValue, currentIndex) => {
    targetObject[currentValue.optionName] = currentValue.optionValue;

    return targetObject;
  }, {} as QueryOptions /* targetObject */)
}

export function numberOrDefault(value: number | string, defaultNumber: number) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return Number(value) ?? defaultNumber;
  }

  return defaultNumber;
}

export function fillDefaults(currentOptions: QueryOptions): QueryOptions {
  const sanitizedOptions: QueryOptions = {
    scrollingInterval: numberOrDefault(currentOptions.scrollingInterval, 5000),
    scrollingDuration: numberOrDefault(currentOptions.scrollingDuration, 2000),
    layout: 'full',
    ...currentOptions
  };


  return Object.assign({}, {
    command: 'todo'
  } as QueryOptions, sanitizedOptions);
}

export function timeDifference(differenceInSeconds: number) {
  const hour = Math.floor((differenceInSeconds / 3600) % 24);
  const min = Math.floor((differenceInSeconds / 60) % 60); // maybe?
  const sec = Math.floor(differenceInSeconds % 60); // the rest of the seconds

  const stringValues = [];

  if (hour) {
    stringValues.push(`${hour}h`);
  }

  if (min) {
    stringValues.push(`${min}m`);
  }

  stringValues.push(`${sec || '0'}s`);


  const result = {
    hour, min, sec,
    string: stringValues.join(':')
  };

  console.info(result);

  return result;
}
