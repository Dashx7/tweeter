export let performErrorReportingOperation = async <T>(operation: () => Promise<T>): Promise<T> => {
    try {
        return await operation();
    } catch (error) {
        throw new Error(`[Internal Server Error]: ${(error as Error)}`);
    }
}

export const BAD_REQUEST = "[Bad Request]: ";