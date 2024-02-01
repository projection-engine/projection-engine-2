#include "ComponentFactory.h"
#include "components/AbstractComponent.h"
#include "components/MovementComponent.h"

namespace PEngine {
    AbstractComponent *ComponentFactory::getComponentInstance(ComponentsEnum component) {
        if(components.count(component)){
            return components[component]();
        }
        return nullptr;
    }

    ComponentFactory::ComponentFactory() {
        components[MOVEMENT] = [](){ return new MovementComponent; };
    }
}