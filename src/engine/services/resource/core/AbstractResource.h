#ifndef PROJECTION_ABSTRACTRESOURCE_H
#define PROJECTION_ABSTRACTRESOURCE_H

#include <string>
#include "../../../enum/ResourceType.h"
#include "../../../../util/debug/ILoggable.h"

namespace PEngine {
    class ResourceService;

    class AbstractFSService;

    class AbstractResource : public ILoggable{
    protected:
        ResourceType type;
        ResourceService *resourcesSystem = nullptr;
        AbstractFSService *fs = nullptr;
    public:
        explicit AbstractResource(ResourceType type);

        virtual ~AbstractResource();

        ResourceType getType() const;

        void setResourceSystem(ResourceService *resourcesSystem);
    };

}
#endif
