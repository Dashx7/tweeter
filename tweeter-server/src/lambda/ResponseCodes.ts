export const BAD_REQUEST = '[Bad Request]: ';
export let ErrorReport = async <T>(operation: () => Promise<T>): Promise<T> => {
    try {
        return await operation();
    } catch (e) {
        console.error(e);
        throw new Error(`[Internal Server Error]: ${(e as Error).message}`);
    }
}