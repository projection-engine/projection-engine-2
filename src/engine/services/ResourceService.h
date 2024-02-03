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
        Map<StaticResource, AbstractResource *> staticResources;
        Map<std::string, AbstractResource *> dynamicResources;

        void registerResource(AbstractResource *resource, StaticResource id);

        void registerResource(AbstractResource *resource, const char *id);

    public:

        template<class T>
        AbstractResource *createResource(StaticResource id) {
            T *newResource = new T;
            newResource->setResourceSystem(this);
            registerResource(newResource, id);
            return newResource;
        }

        template<class T>
        AbstractResource *createResource(const char *id) {
            T *newResource = new T;
            newResource->setResourceSystem(this);
            registerResource(newResource, id);
            return newResource;
        }

        template<class T>
        T *getResource(const std::string &id) {
            return (T *) dynamicResources.get(id);
        }

        template<class T>
        T *getResource(StaticResource id) {
            return (T *) staticResources.get(id);
        }

        bool hasResource(const std::string &id);

        bool hasResource(StaticResource id);

        void deleteResource(const std::string &id);
    };

}

#endif
