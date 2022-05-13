import 'reflect-metadata';

function Injectable(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata(key, 1, target);
        const meta = Reflect.getMetadata('a', target);
        console.log('meta data for', target, meta);
    }
}

function Inject(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata(key, 1, target);
        const meta = Reflect.getMetadata('a', target);
        console.log('meta data for', target, meta);
    }
}

function Prop(target: Object, name: string) {
    Reflect.defineMetadata('prop', 'hello', target);
    const meta = Reflect.getMetadata('prop', target);
    console.log('meta data for', target, meta);
}

@Injectable('C')
export class C {
    @Prop id: number;
}

// @Injectable('D')
// export class D {
//     constructor(@Inject('C') c: C) {
//
//     }
// }
