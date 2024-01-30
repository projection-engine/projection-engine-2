#ifndef PROJECTION_ABSTRACTENTITY_H
#define PROJECTION_ABSTRACTENTITY_H

#include <string>
#include "entt/entity/entity.hpp"
#include "../../util/UUID.h"

namespace PEngine {
    class AbstractEntity {
    private:
        std::string name;
        std::string uuid;
        entt::entity entity;
    public:
        explicit AbstractEntity(entt::entity entity, std::string uuid);

        const std::string &getName() const;

        void setName(std::string name);

        const std::string &getUUID() const;

        entt::entity getEntity();
    };
}

#endif
