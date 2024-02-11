interface HierarchyEntityDTO {
    name: string,
    entityID: number,
    children: HierarchyEntityDTO[]
    components: number[]
    isActive: boolean
}

export {HierarchyEntityDTO};
