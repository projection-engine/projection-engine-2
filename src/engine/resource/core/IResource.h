#ifndef PROJECTION_IRESOURCE_H
#define PROJECTION_IRESOURCE_H

#include <string>
#include "../ResourceType.h"
#include "../../../util/debug/ILoggable.h"

namespace PEngine {
    class ResourceService;

    class IResource : public ILoggable {
    protected:
        ResourceType type;
        ResourceService *resourcesSystem = nullptr;
    public:
        explicit IResource(ResourceType type);

        virtual ~IResource();

        ResourceType getType() const;

        void setResourceSystem(ResourceService *resourcesSystem);
    };

}
#endif
