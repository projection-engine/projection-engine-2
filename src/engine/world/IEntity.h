#ifndef PROJECTION_IENTITY_H
#define PROJECTION_IENTITY_H

#include <string>
#include "entt/entity/entity.hpp"
#include "../../core/UUID.h"

namespace PEngine {
    class IEntity {
    private:
        std::string name;
        std::string uuid;
        entt::entity entity;
    public:
        explicit IEntity(entt::entity entity, std::string uuid);

        const std::string &getName() const;

        void setName(std::string name);

        const std::string &getUUID() const;

        entt::entity getEntity();
    };
}

#endif
