import {expect, test} from '@jest/globals';
import Serializable from "@engine-core/services/serialization/Serializable";
import {SerializationPackage} from "@engine-core/engine-d";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import Repository from "@engine-core/services/serialization/Repository";


class Simple extends Serializable {
    a = 1
    inst: RepositoryR

    constructor(instance: RepositoryR = null, a = 1) {
        super()
        this.a = a
        this.inst = instance
    }
}

class OtherRepository extends Serializable {
    circular: RepositoryR
}

class RepositoryR extends Serializable {
    list: Simple[] = []
    otherRepository: OtherRepository
}

RepositoryService.serializable(Simple)
RepositoryService.injectable(RepositoryR)
RepositoryService.injectable(OtherRepository)

test('Should dump data', () => {
    const repository = RepositoryService.inject(RepositoryR);
    repository.list.push(new Simple(repository))
    repository.list.push(new Simple(repository, 100))
    repository.list.push(new Simple(repository, 300))
    const ids = repository.list.map(v => v.getId())

    const dump = JSON.parse(RepositoryService.dump()) as SerializationPackage;
    const ID = RepositoryService.get().getId();

    expect(dump).toBeDefined()
    expect(dump.root).toBe(ID)
    expect(dump.dependencies[ID].className).toBe(Repository.name)
    expect(dump.dependencies[repository.getId()].className).toBe(RepositoryR.name)
    ids.forEach(id => {
        expect(dump.dependencies).toHaveProperty(id)
    })
});

test('Should restore circular dependency', () => {
    const repository = RepositoryService.inject(RepositoryR);
    const other = RepositoryService.inject(OtherRepository)
    repository.otherRepository = other
    repository.otherRepository.circular = repository

    repository.list.length = 0
    repository.list.push(new Simple(repository))
    repository.list.push(new Simple(repository, 100))
    repository.list.push(new Simple(repository, 300))

    const dump = RepositoryService.dump();
    repository.otherRepository = null
    repository.list.length = 0

    RepositoryService.restore(dump)

    expect(repository.otherRepository).toBe(other)
    expect(repository.otherRepository).not.toBeNull()
    expect(repository.otherRepository?.circular).toBe(repository)
    expect(repository.list.length).toBe(3)
    expect(repository.list[0]).toBeInstanceOf(Simple)
    expect(repository.list[0].inst).toBe(repository)
});

test('Should restore data', () => {
    const repository = RepositoryService.inject(RepositoryR);

    repository.list.length = 0
    repository.list.push(new Simple(repository))
    repository.list.push(new Simple(repository, 100))
    repository.list.push(new Simple(repository, 300))

    const dump = RepositoryService.dump();
    repository.list.length = 0
    RepositoryService.restore(dump)

    expect(repository.list.length).toBe(3)

    repository.list.forEach(e => {
        expect(e).toBeInstanceOf(Simple)
    })
    expect(repository.list.filter(e => e.inst != null).length).toBe(3)
});
