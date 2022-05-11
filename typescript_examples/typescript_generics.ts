function log(obj: string): string {
    console.log(obj);
    return obj;
}

function log2(obj: number): number {
    console.log(obj);
    return obj;
}

function genericLog<T>(obj: T): T {
    console.log(obj);
    return obj;
}

genericLog<string>('hello');
genericLog<number>(5);

interface HasLength {
    length: number;
}

function doubleGenericLog<T extends HasLength, K>(obj: T, arr: K[]): K[] {
    console.log(obj.length);
    return arr;
}

doubleGenericLog<string, number>('hello', [1, 2, 3]);

interface IUser {
    name: string,
    age?: number,
    bid: <T>(sum: T) => boolean
}

function bid<T>(sum: T): boolean {
    return true;
}
