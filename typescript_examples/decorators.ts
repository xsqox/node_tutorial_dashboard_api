function Component(id: number) {
    console.log('init component');
    return (target: Function) => {
        console.log('run component');
        target.prototype.id = id;
    };
}

function Logger() {
    console.log('init logger');
    return (target: Function) => {
        console.log('run logger');
    };
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    console.log('propertyKey is', propertyKey); // method name
    console.log(propertyDescriptor.value); // method definition (function itself)
    const oldValue = propertyDescriptor.value;
    propertyDescriptor.value = function (...args: any[]) {
        console.log(args[0] * 10);
        oldValue.apply(target, args); // bind to target and execute
    };
}

function Prop(target: Object, propertyKey: string) {
    let value: number;

    const getter = () => {
        console.log('Get!');
        return value;
    };

    const setter = (newValue: number) => {
        console.log('Set!');
        value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
    });
}

function Param(target: Object, propertyKey: string, index: number) {
    console.log('from @param propertyKey', propertyKey);
    console.log('from @param index', index);
}

@Logger()
@Component(1)
export class User {
    @Prop id: number;

    @Method
    updateID(@Param newId: number) {
        this.id = newId;
        return this.id;
    }
}

const user = new User();
console.log(user.id);

user.updateID(2);
console.log(user.id); // 2 (old method called in decorator)
