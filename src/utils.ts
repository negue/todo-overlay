export interface QueryOptions {
    channelName: string;
    command: string;
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

export function fillDefaults(currentOptions: QueryOptions): QueryOptions {
    return Object.assign({}, {
        command: 'todo'
    } as QueryOptions, currentOptions);
}
