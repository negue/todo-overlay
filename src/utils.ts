export interface QueryOptions {
    channelName: string;
    command: string;
    scrollingInterval: number;
    scrollingDuration: number;
}


export function queryStringToObject(queryString: string) {
    return queryString.replace('?', '').split('&').map(entry => {
        const [optionName, optionValue] = entry.split('=');

        return {optionName, optionValue};
    }).reduce((targetObject, currentValue, currentIndex) => {
        targetObject[currentValue.optionName] = currentValue.optionValue;

        return targetObject;
    }, {} /* targetObject */)
}

export function numberOrDefault(value: number|string, defaultNumber: number) {
  if (typeof value ===  'number') {
      return value;
  }

  return Number(value) ?? defaultNumber;
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
