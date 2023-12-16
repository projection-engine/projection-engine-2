#ifndef CATALYST_IRESOURCE_H
#define CATALYST_IRESOURCE_H

#include <string>
#include "../ResourceType.h"
#include "../../../core/debug/ILoggable.h"

namespace PEngine {
    class ResourcesSystem;

    class IResource : public ILoggable {
    protected:
        ResourceType type;
        ResourcesSystem *resourcesSystem = nullptr;
    public:
        explicit IResource(ResourceType type);

        virtual ~IResource();

        ResourceType getType() const;

        void setResourceSystem(ResourcesSystem *resourcesSystem);
    };

}
#endif
