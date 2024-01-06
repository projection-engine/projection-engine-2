import VIEWS from "./VIEWS";
import LocalizationEN from "../../../../../enums/LocalizationEN";

export default Object.values(VIEWS).map(value => ({
    name: LocalizationEN[value],
    id: value
}))
