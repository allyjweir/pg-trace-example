export const getEnv = (key: string, defaultValue: any = undefined): any => {
    if (key in process.env) {
        const value = process.env[key];
        if (value === undefined) {
            throw new Error(`Undefined variable ${key}`);
        }
        if (value.match(/^true$/i)) {
            return true;
        }
        if (value.match(/^false$/i)) {
            return false;
        }
        if (value.match(/^\d+$/)) {
            return parseInt(value, 10);
        }
        return value.replace(/\\n/g, '\n');
    }

    if (defaultValue === undefined) {
        throw new Error(`Undefined variable ${key}`);
    }

    return defaultValue;
};
