// private is available only within class where it's defined, not instances
// protected is available also in extending classes, not instances

class Coord {
    lat: number;
    long: number;

    protected test() {
        return this.lat > this.long;
    }

    computeDistance(newLat: number, newLong: number): number {
        return 0;
    }

    constructor(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
    }
}

const point = new Coord(20, 30);

class MapLocation extends Coord {
    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(name:string) {
        this._name = name;
    }

    override computeDistance(newLat: number, newLong: number): number {
        return 0;
    }

    constructor(lat: number, long: number, name: string) {
        super(lat, long);
        this._name = name;
    }
}

const loc = new MapLocation(10, 20, 'city');

interface LoggerService {
    log: (s: string) => void;
}

class Logger implements LoggerService {
    public log(s: string) {
        console.log(s);
    }

    // modifiers exist only during compilation
    private error(err: string) {
        console.log(err);
    }
}

const l = new Logger();
l.log('hello');

// classes with generics
class MyClass<T> {
    a: T
}

const inst = new MyClass<string>();

// Abstract classes
// cannot create an instance
// blueprint of a class
abstract class Base {
    print(s: string){ // already implemented
        console.log(s);
    }

    abstract error(s:string): void // has to be implemented
}

class BaseExtended extends Base {
    error(s:string) {
        console.log(s);
    }
}

const instance = new BaseExtended();
instance.print('hello');
