import {PropertySettings, PropertyType} from "../inspector-definition";

type DisabledIf = GenericNonVoidFunctionWithP<MutableObject, boolean>
export default class AbstractFormType {
    #properties: AbstractFormType[] = [];
    label: string;
    type: PropertyType;
    objectKey?: string;
    settings?: MutableObject;
    disabledIf?: DisabledIf;

    addProperty(label: string | null, type: PropertyType, objectKey?: string, settings?: PropertySettings, disabledIf?: DisabledIf) {
        const instance = new AbstractFormType;
        instance.settings = settings;
        instance.objectKey = objectKey;
        instance.type = type;
        instance.label = label;
        instance.disabledIf = disabledIf;
        this.#properties.push(instance);
        return instance;
    }

    initialize() {

    }

    group(label: string, children: GenericVoidFunctionWithP<AbstractFormType>, disabledIf?: DisabledIf): AbstractFormType {
        const instance = this.addProperty(label, PropertyType.GROUP, null, null, disabledIf);
        children(instance);
        return instance;
    }

    number(label: string, key: string, max?: number, min?: number, increment?: number, isAngle?: boolean, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.NUMBER, key, {
            max,
            min,
            increment: increment ? increment : .001,
            isAngle
        }, disabledIf);
    }

    array(labels: string[], key: string, increment: number, max?: number, min?: number, isAngle?: boolean, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(null, PropertyType.ARRAY, key, {
            labels,
            max,
            min,
            increment: increment ? increment : .001,
            isAngle
        }, disabledIf);
    }

    string(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.STRING, key,null, disabledIf);
    }

    options(key: string, options?: {
        label: string,
        value: any
    }[], disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(null, PropertyType.OPTIONS, key, {options}, disabledIf);
    }

    color(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.COLOR, key, null, disabledIf);
    }

    boolean(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.BOOLEAN, key, null, disabledIf);
    }

    imageTexture(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.IMAGE, key, null, disabledIf);
    }

    materialInstance(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.MATERIAL, key, null, disabledIf);

    }

    terrainInstance(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.TERRAIN, key, null, disabledIf);
    }

    meshInstance(label: string, key: string, disabledIf?: DisabledIf): AbstractFormType {
        return this.addProperty(label, PropertyType.MESH, key, null, disabledIf);
    }

    listProperties() {
        return this.#properties;
    }
}
