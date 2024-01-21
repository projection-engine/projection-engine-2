import {ViewOrientation, ViewPlacement, ViewType} from "./ViewDefinitions";
import Serializable from "@engine-core/services/serialization/Serializable";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class ViewTabDTO extends Serializable{
    _name: string = "View Tab"
    _bottom: ViewType[] = []
    _left: ViewType[] = []
    _center: ViewType = ViewType.EDITOR
    _right: ViewType[] = []
    _activeViewPlacement: ViewPlacement = ViewPlacement.CENTER
    _activeViewIndex: number = null

    constructor(name?: string, bottom?: ViewType[], left?: ViewType[], center?: ViewType, right?: ViewType[]) {
        super()
        this._name = name;
        if (bottom != null)
            this._bottom = bottom;
        if (left != null)
            this._left = left;
        if (center != null)
            this._center = center;
        if (right != null)
            this._right = right;
    }

    removeView(index: number, placement: ViewPlacement) {
        this._activeViewPlacement = ViewPlacement.CENTER
        this._activeViewIndex = null
        switch (placement) {
            case ViewPlacement.BOTTOM:
                this._bottom.splice(index, 1)
                break
            case ViewPlacement.LEFT:
                this._left.splice(index, 1)
                break
            case ViewPlacement.RIGHT:
                this._right.splice(index, 1)
                break
        }
    }

    addView(type: ViewType, placement: ViewPlacement) {
        switch (placement) {
            case ViewPlacement.BOTTOM:
                this._bottom.push(type)
                break
            case ViewPlacement.CENTER:
                this._center = type
                break
            case ViewPlacement.LEFT:
                this._left.push(type)
                break
            case ViewPlacement.RIGHT:
                this._right.push(type)
                break
        }
    }

    setActiveView(index: number, placement: ViewPlacement): boolean {
        const result = this._activeViewPlacement !== placement && this._activeViewIndex !== index
        this._activeViewPlacement = placement
        this._activeViewIndex = index
        return result
    }

    getName(): string {
        return this._name;
    }

    getBottom(): ViewType[] {
        return this._bottom;
    }

    getLeft(): ViewType[] {
        return this._left;
    }

    getCenter(): ViewType {
        return this._center;
    }

    getRight(): ViewType[] {
        return this._right;
    }

    getActiveViewPlacement(): ViewPlacement {
        return this._activeViewPlacement;
    }

    getActiveViewIndex(): number {
        return this._activeViewIndex;
    }

    replaceViewType(index: number, type: ViewType, placement: ViewPlacement) {
        switch (placement) {
            case ViewPlacement.BOTTOM:
                this._bottom[index] = type
                break
            case ViewPlacement.CENTER:
                this._center = type
                break
            case ViewPlacement.LEFT:
                this._left[index] = type
                break
            case ViewPlacement.RIGHT:
                this._right[index] = type
                break
        }
    }
}
RepositoryService.serializable(ViewTabDTO)
