import {ComponentType} from "../../../services/engine-definitions";
import CameraForm from "../forms/CameraForm";
import AtmosphereForm from "../forms/AtmosphereForm";
import CullingForm from "../forms/CullingForm";
import ColliderForm from "../forms/ColliderForm";
import DecalForm from "../forms/DecalForm";
import LightForm from "../forms/LightForm";
import LightProbeForm from "../forms/LightProbeForm";
import MeshForm from "../forms/MeshForm";
import TerrainForm from "../forms/TerrainForm";
import SpriteForm from "../forms/SpriteForm";
import MovementForm from "../forms/MovementForm";

export default {
    [ComponentType.MOVEMENT]: MovementForm,
    [ComponentType.ATMOSPHERE]: AtmosphereForm,
    [ComponentType.CAMERA]: CameraForm,
    [ComponentType.CULLING]: CullingForm,
    [ComponentType.COLLIDER]: ColliderForm,
    [ComponentType.DECAL]: DecalForm,
    [ComponentType.LIGHT]: LightForm,
    [ComponentType.LIGHT_PROBE]: LightProbeForm,
    [ComponentType.MESH]: MeshForm,
    [ComponentType.TERRAIN]: TerrainForm,
    [ComponentType.SPRITE]: SpriteForm,
}
