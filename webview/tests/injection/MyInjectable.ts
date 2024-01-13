import {Injectable, LazyInject} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import MyOtherInjectable from "./MyOtherInjectable";

Object.assign(global, {window: global.window ?? {}})

@Injectable
export class MyInjectable extends IInjectable {

    @LazyInject(MyOtherInjectable)
    static lazy: MyOtherInjectable

    constructor() {
        super();
    }
}
