#ifndef PROJECTION_RESOURCESERVICE_H
#define PROJECTION_RESOURCESERVICE_H

#include "../enum/StaticResource.h"
#include "resource/core/AbstractResource.h"
#include "../../util/structures/Map.h"
#include "../../util/debug/ILoggable.h"
#include "AbstractCoreService.h"

namespace PEngine {

    class ResourceService : public AbstractCoreService {
    private:
        std::unordered_map<StaticResource, AbstractResource *> staticResources;
        std::unordered_map<std::string, AbstractResource *> dynamicResources;

        void registerResource(AbstractResource *resource, StaticResource id) {
            staticResources[id] = resource;
        }

        void registerResource(AbstractResource *resource, const char *id);

    public:
        template<class T>
        T *createResource(StaticResource id) {
            T *newResource = new T;
            newResource->setResourceSystem(this);
            registerResource(newResource, id);
            return newResource;
        }

        template<class T>
        T *createResource(const char *id) {
            T *newResource = new T;
            newResource->setResourceSystem(this);
            registerResource(newResource, id);
            return newResource;
        }

        template<class T>
        T *getResource(const std::string &id) {
            return (T *) dynamicResources[id];
        }

        template<class T>
        T *getResource(StaticResource id) {
            return (T *) staticResources[id];
        }

        bool hasResource(const std::string &id);

        bool hasResource(StaticResource id);

        void deleteResource(const std::string &id);

        void deleteResource(StaticResource id);

        void initialize();
    };

}

#endif
