import {ViewOrientation, ViewPlacement, ViewType} from "./ViewDefinitions";

export default class ViewTabDTO {
    #name: string = "View Tab"
    #bottom: ViewType[] = []
    #left: ViewType[] = []
    #center: ViewType = ViewType.EDITOR
    #right: ViewType[] = []
    #activeViewPlacement: ViewPlacement = ViewPlacement.CENTER
    #activeViewIndex: number = null

    constructor(name: string, bottom: ViewType[], left: ViewType[], center: ViewType, right: ViewType[]) {
        this.#name = name;
        if (bottom != null)
            this.#bottom = bottom;
        if (left != null)
            this.#left = left;
        if (center != null)
            this.#center = center;
        if (right != null)
            this.#right = right;
    }

    removeView(index: number, placement: ViewPlacement) {
        this.#activeViewPlacement = ViewPlacement.CENTER
        this.#activeViewIndex = null
        switch (placement) {
            case ViewPlacement.BOTTOM:
                this.#bottom.splice(index, 1)
                break
            case ViewPlacement.LEFT:
                this.#left.splice(index, 1)
                break
            case ViewPlacement.RIGHT:
                this.#right.splice(index, 1)
                break
        }
    }

    addView(type: ViewType, placement: ViewPlacement) {
        switch (placement) {
            case ViewPlacement.BOTTOM:
                this.#bottom.push(type)
                break
            case ViewPlacement.CENTER:
                this.#center = type
                break
            case ViewPlacement.LEFT:
                this.#left.push(type)
                break
            case ViewPlacement.RIGHT:
                this.#right.push(type)
                break
        }
    }

    setActiveView(index: number, placement: ViewPlacement): boolean {
        const result = this.#activeViewPlacement !== placement && this.#activeViewIndex !== index
        this.#activeViewPlacement = placement
        this.#activeViewIndex = index
        return result
    }

    getName(): string {
        return this.#name;
    }

    getBottom(): ViewType[] {
        return this.#bottom;
    }

    getLeft(): ViewType[] {
        return this.#left;
    }

    getCenter(): ViewType {
        return this.#center;
    }

    getRight(): ViewType[] {
        return this.#right;
    }

    getActiveViewPlacement(): ViewPlacement {
        return this.#activeViewPlacement;
    }

    getActiveViewIndex(): number {
        return this.#activeViewIndex;
    }

    replaceViewType(index: number, type: ViewType, placement: ViewPlacement) {
        switch (placement) {
            case ViewPlacement.BOTTOM:
                this.#bottom[index] = type
                break
            case ViewPlacement.CENTER:
                this.#center = type
                break
            case ViewPlacement.LEFT:
                this.#left[index] = type
                break
            case ViewPlacement.RIGHT:
                this.#right[index] = type
                break
        }
    }
}