
import IInjectable from "@lib/IInjectable";

interface ExtendedWindow extends Window {
    __instances: Map<typeof IInjectable, IInjectable>
}

function Inject(Clazz: typeof IInjectable) {
    return (target: IInjectable, propertyKey: string) => {
        const P = window as unknown as ExtendedWindow
        Injectable(Clazz)
        target[propertyKey] = P.__instances.get(Clazz)
    }
}

function Injectable(Clazz: typeof IInjectable) {
    const P = window as unknown as ExtendedWindow
    if (P.__instances && P.__instances.has(Clazz)) {
        return;
    }
    // @ts-ignore
    const instance = new Clazz();
    if (P.__instances == null) {
        P.__instances = new Map()
    }
    P.__instances.set(Clazz, instance);
}

function InjectVar(Clazz: typeof IInjectable): IInjectable {
    const P = window as unknown as ExtendedWindow
    Injectable(Clazz)
    return P.__instances.get(Clazz)
}


export {Injectable, Inject, InjectVar}

