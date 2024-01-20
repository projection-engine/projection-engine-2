import {expect, test} from '@jest/globals';
import Serializable from "@engine-core/Serializable";
import {SerializableClass, SerializableValue} from "@engine-core/engine-d";
import RepositoryService from "@engine-core/RepositoryService";


class Simple extends Serializable {
    a = 1
    inst: Repository

    constructor(instance: Repository = null, a = 1) {
        super()
        this.a = a
        this.inst = instance
    }

}

class OtherRepository extends Serializable {
}

class Repository extends Serializable {
    list: Simple[] = []
    otherRepository: OtherRepository
}

RepositoryService.serializable(Simple)
RepositoryService.injectable(Repository)
RepositoryService.injectable(OtherRepository)

test('Should dump data', () => {
    const repository = RepositoryService.inject(Repository);
    repository.otherRepository = new OtherRepository
    repository.list.push(new Simple(repository))
    repository.list.push(new Simple(repository, 100))
    repository.list.push(new Simple(repository, 300))


    const dump = RepositoryService.dump();
    expect(dump).toBeDefined()
    const data = JSON.parse(dump) as Record<string, string>
    expect(Object.keys(data).length).toBe(2)
    const value = JSON.parse(Object.values(data)[0]) as SerializableClass
    expect(value.className).toBe(Repository.name)
    expect(JSON.parse(value.value)).toHaveProperty("list")
    expect(repository.otherRepository).toBeDefined()
});

test('Should restore data', () => {
    const repository = RepositoryService.inject(Repository);
    repository.list.length = 0
    repository.list.push(new Simple(repository))
    repository.list.push(new Simple(repository, 100))
    repository.list.push(new Simple(repository, 300))
    const dump = RepositoryService.dump();

    expect(repository.list.length).toBe(3)
    repository.list.length = 0
    RepositoryService.restore(dump)
    expect(repository.list.length).toBe(3)
    console.log(repository.list)
    repository.list.forEach(e => {
        expect(e).toBeInstanceOf(Simple)
    })
    expect(repository.list.filter(e => e.inst != null).length).toBe(0)
});
