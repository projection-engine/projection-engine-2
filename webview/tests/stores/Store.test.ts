import {expect, test} from '@jest/globals';
import AbstractStore from "@lib/stores/AbstractStore";
import IStateDTO from "@lib/stores/state/IStateDTO";

class StoreState extends IStateDTO {
    valueA = 1
    valueB = 1
}

class Store extends AbstractStore<StoreState> {
    constructor() {
        super(new StoreState());
    }
}

test('Should unsubscribe', () => {
    const store = new Store()
    let called = 0
    const unsub = store.subscribe(() => {
        called++
    })
    unsub()
    store.updateStore({valueA: 2})

    expect(called).toBe(1)
    expect(store.getData().valueA).toBe(2)
});

test('Should trigger subscriber', () => {
    const store = new Store()
    let called = 0
    const unsub = store.subscribe(() => {
        called++
    }, ["valueA"])

    store.updateStore({valueA: 2})

    expect(called).toBe(2)
    expect(store.getData().valueA).toBe(2)
    unsub()
});

test('Should not trigger subscriber', () => {
    const store = new Store()
    let called = 0
    const unsub = store.subscribe(() => {
        called++
    }, ["valueB"])

    store.updateStore({valueA: 2})

    expect(called).toBe(1)
    expect(store.getData().valueA).toBe(2)
    unsub()
});

test('Should trigger global subscriber', () => {
    const store = new Store()
    let called = 0
    const unsub = store.subscribe(() => {
        called++
    })

    store.updateStore({valueA: 2})
    store.updateStore({valueB: 2})

    expect(called).toBe(3)
    expect(store.getData()).toBeInstanceOf(StoreState)
    expect(store.getData().valueA).toBe(2)
    expect(store.getData().valueB).toBe(2)
    unsub()
});

