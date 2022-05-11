let me: string = 'hello';

if (typeof me === 'string') {
    console.log(a);
}

type Coordinate = {
    lat: number,
    long: number,
}

type P = keyof Coordinate;

let res: P = 'long';

function check(a: string | null):void {
    a?.toLowerCase(); // optional chaining
}
