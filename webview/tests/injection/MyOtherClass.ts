import {Inject} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import {MyInjectable} from "./MyInjectable";

Object.assign(global, {window: global.window ?? {}})

export default class MyOtherClass extends IInjectable {

    @Inject(MyInjectable)
    static myField: MyInjectable
}
