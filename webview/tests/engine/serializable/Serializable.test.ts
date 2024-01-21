import {expect, test} from '@jest/globals';
import Serializable from "@engine-core/services/serialization/Serializable";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

class SimpleN {
    a = 1
}

class Simple extends Serializable {
    NAME: string
    a = 1
    b = true
    c = {included: true}
    d = new Float32Array(4)
    e = "included"
    #c = "not included"
    nested: Simple
    nestedNotIncluded: SimpleN
    record: Record<string, Simple> = {}
    list: Simple[] = []

    constructor(NAME: string="SIMPLE") {
        super();
        this.NAME = NAME
    }
    getC() {
        return this.#c
    }

    setC(v: string) {
        this.#c = v
    }
}


test('Should prepare ID', () => {
    const simple = new Simple();

    expect(simple.getFixedID()).toBe(Serializable.ID_PLACEHOLDER + simple.getId() + Serializable.ID_PLACEHOLDER)
});

test('Should serialize', () => {
    const simple = new Simple();
    simple.nested = new Simple()
    const {root, dependencies} = simple.serialize();

    const rootId = simple.getId();
    expect(root).toBe(rootId)
    expect(dependencies).toHaveProperty(rootId)
    expect(dependencies[rootId].className).toBe(simple.constructor.name)
    expect(dependencies[rootId].id).toBe(rootId)
    expect(JSON.parse(dependencies[rootId].value).nested).toBe(simple.nested.getFixedID())

    const nestedId = simple.nested.getId();
    expect(dependencies).toHaveProperty(nestedId)
    expect(dependencies[nestedId].className).toBe(simple.constructor.name)
    expect(dependencies[nestedId].id).toBe(nestedId)
});

test('Should parse', () => {
    const number = 100;
    const simple = new Simple();
    simple.a = 2
    simple.b = false
    simple.d[0] = number
    simple.c.included = false
    simple.nestedNotIncluded = new SimpleN()
    simple.nested = new Simple()
    simple.setC("THIS HAS CHANGED")

    const loaded = new Simple()
    RepositoryService.serializable(Simple)
    loaded.parse(simple.serialize())

    expect(loaded.a).toBe(simple.a)
    expect(loaded.b).toBe(simple.b)
    expect(loaded.getC()).toBe(new Simple().getC())
    expect(loaded.c.included).toBe(false)
    expect(loaded.d[0]).toBe(number)
    expect(loaded.d).toBeInstanceOf(Float32Array)
    expect(loaded.nested).toBeDefined()

    expect(loaded.nested.getId()).toBe(simple.nested.getId())
    expect(loaded.nestedNotIncluded).toBe(undefined)
});

test("Should serialize nested", () => {
    const KEY = "EXAMPLE";
    const simple = new Simple();
    simple.nested = new Simple("NESTED")
    simple.record[KEY] = new Simple("RECORD")
    simple.list.push(new Simple("LIST"))

    const dump = simple.serialize()
    expect(dump.dependencies).toHaveProperty(simple.nested.getId())
    expect(dump.dependencies).toHaveProperty(simple.list[0].getId())
    expect(dump.dependencies).toHaveProperty(simple.record[KEY].getId())
})

test('Should parse nested', () => {
    const KEY = "EXAMPLE";
    const simple = new Simple();
    simple.nested = new Simple()
    simple.nested.nested = new Simple()
    simple.record[KEY] = new Simple()
    simple.list.push(new Simple())

    const loaded = new Simple()

    RepositoryService.serializable(Simple)
    loaded.parse(simple.serialize())

    expect(loaded.nested).toBeDefined()
    expect(loaded.nested.getId()).toBe(simple.nested.getId())
    expect(loaded.nested.nested.getId()).toBe(simple.nested.nested.getId())
    expect(loaded.nestedNotIncluded).toBe(undefined)

    expect(loaded.record).toHaveProperty(KEY)
    expect(loaded.record[KEY]).toBeInstanceOf(Simple)
    expect(loaded.record[KEY].getId()).toBe(simple.record[KEY].getId())

    expect(loaded.list.length).toBe(1)
    expect(loaded.list[0]).toBeInstanceOf(Simple)
    expect(loaded.list[0].getId()).toBe(simple.list[0].getId())
});

class CyclicA extends Serializable {
    cycleB
}

class CyclicB extends Serializable {
    cycleA
}
test("Should dump cycle", () => {
    const c = new CyclicA();
    c.cycleB = new CyclicB()
    c.cycleB.cycleA = c

    expect(() => c.serialize()).not.toThrow()
    const {dependencies} = c.serialize()
    expect(JSON.parse(dependencies[c.cycleB.getId()].value).cycleA).toBe(Serializable.ID_PLACEHOLDER + c.getId() + Serializable.ID_PLACEHOLDER)
    expect(JSON.parse(dependencies[c.getId()].value).cycleB).toBe(Serializable.ID_PLACEHOLDER + c.cycleB.getId() + Serializable.ID_PLACEHOLDER)
})
