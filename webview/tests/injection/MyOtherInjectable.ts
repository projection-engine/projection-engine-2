import {Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";

Object.assign(global, {window: global.window ?? {}})

@Injectable
export default class MyOtherInjectable extends IInjectable{

}