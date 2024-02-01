#ifndef PROJECTION_COMPONENTFACTORY_H
#define PROJECTION_COMPONENTFACTORY_H

#include <unordered_map>
#include <functional>
#include "ComponentsEnum.h"

namespace PEngine {
    class AbstractComponent;

    class ComponentFactory {
         std::unordered_map<ComponentsEnum, std::function<AbstractComponent *()>> components;
    public:
         AbstractComponent *getComponentInstance(ComponentsEnum component);

         explicit ComponentFactory();
    };

}

#endif
