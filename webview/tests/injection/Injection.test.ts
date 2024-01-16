import {expect, test} from '@jest/globals';
import {InjectVar} from "@lib/Injection";
import MyOtherClass from "./MyOtherClass";
import {MyInjectable} from "./MyInjectable";
import MyOtherInjectable from "./MyOtherInjectable";


test('Should be the same instance', () => {
    const instanceA = InjectVar(MyInjectable)
    expect(instanceA).toBe(MyOtherClass.myField)
});

test('Should not inject not @Injectable', () => {
    const instanceA = InjectVar(MyOtherClass)
    expect(instanceA).toBeNull()
});

test('Should be lazily obtained', () => {
    const instanceA = InjectVar(MyOtherInjectable)
    expect(instanceA).toBeInstanceOf(MyOtherInjectable)
    expect(MyInjectable.lazy).toBeInstanceOf(MyOtherInjectable)
    expect(MyInjectable.lazy).toBe(instanceA)
});