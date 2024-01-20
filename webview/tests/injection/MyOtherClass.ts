import {Inject} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import {MyInjectable} from "./MyInjectable";

export default class MyOtherClass extends IInjectable {

    @Inject(MyInjectable)
    static myField: MyInjectable
}
