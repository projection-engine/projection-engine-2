export default class SelectorUtil {
    static getIcon(type) {
        switch (type) {
            case "image":
                return "image"
            case "material":
                return "fiber_manual_record"
            case "mesh":
                return "category"

            case "ui":
                return "view_quilt"
            case "terrain":
                return "landscape"

            case "code":
                return "code"
            case "parent":
                return "account_tree"
        }
    }
}
