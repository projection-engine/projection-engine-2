import {expect, test} from '@jest/globals';
import Serializable from "@engine-core/Serializable";
import {SerializableClass, SerializableValue} from "@engine-core/engine-d";
import RepositoryService from "@engine-core/RepositoryService";

class SimpleN {
    a = 1
}

class Simple extends Serializable {
    a = 1
    b = true
    c = {included: true}
    d = new Float32Array(4)
    e = "included"
    #c = "not included"
    nested: Simple
    nestedNotIncluded: SimpleN

    getC() {
        return this.#c
    }

    setC(v: string) {
        this.#c = v
    }
}


test('Should stringify', () => {
    const simple = new Simple();
    const clazz = JSON.parse(simple.stringify()) as SerializableClass
    expect(clazz.className).toBe(Simple.name)
});

test('Should parse', () => {
    const number = 100;
    const simple = new Simple();
    simple.a = 2
    simple.b = false
    simple.d[0] = number
    simple.c.included = false
    simple.nestedNotIncluded = new SimpleN()
    simple.setC("THIS HAS CHANGED")

    const loaded = new Simple()
    loaded.parse(simple.stringify())

    expect(loaded.a).toBe(simple.a)
    expect(loaded.b).toBe(simple.b)
    expect(loaded.getC()).toBe(new Simple().getC())
    expect(loaded.c.included).toBe(false)
    expect(loaded.d[0]).toBe(number)
    expect(loaded.d).toBeInstanceOf(Float32Array)
    expect(loaded.nested).toBe(undefined)
    expect(loaded.nestedNotIncluded).toBe(undefined)
});

test('Should stringify Serializable', () => {
    const simple = new Simple();
    simple.nested = new Simple()
    simple.nested.a = 100

    const parse = JSON.parse(simple.stringify()) as SerializableClass;
    const p = JSON.parse(parse.value) as {
        nested: { type: "object" | "serializable", value: string }
    } & SerializableValue
    expect(p.nested.type).toBe("serializable")
    expect(typeof p.nested.value).toBe("object")
    expect(p.nested.value).toHaveProperty("className")
});


test("Should parse serializable", () => {
    const simple = new Simple();
    simple.nested = new Simple()
    simple.nested.a = 100

    const p = new Simple()
    expect(() => {
        p.parse(simple.stringify())
    }).toThrow()

    RepositoryService.serializable(Simple)
    p.parse(simple.stringify())
    expect(p.nested).toBeInstanceOf(Simple)
    expect(p.nested.a).toBe(100)
});



