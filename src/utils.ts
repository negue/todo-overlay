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

        return {optionName, optionValue};
    }).reduce((targetObject, currentValue, currentIndex) => {
        targetObject[currentValue.optionName] = currentValue.optionValue;

        return targetObject;
    }, {} as QueryOptions /* targetObject */)
}

export function numberOrDefault(value: number|string, defaultNumber: number) {
  if (typeof value ===  'number') {
    return value;
  }

  if (typeof value === 'string') {
    return Number(value) ?? defaultNumber;
  }

  return defaultNumber;
}

export function fillDefaults(currentOptions: QueryOptions): QueryOptions {
    const sanitizedOptions: QueryOptions = {
       ...currentOptions,
       scrollingInterval: numberOrDefault(currentOptions.scrollingInterval, 5000),
        scrollingDuration: numberOrDefault(currentOptions.scrollingDuration, 2000)
    };


    return Object.assign({}, {
        command: 'todo'
    } as QueryOptions, sanitizedOptions);
}
