#ifndef PROJECTION_ENGINEEVENTS_H
#define PROJECTION_ENGINEEVENTS_H

#include <string>

namespace PEngine {

    struct EngineEvents {
        static std::string CREATE_ENTITY;
        static std::string DELETE_ENTITY;
        static std::string GET_HIERARCHY;
        static std::string SELECT_ENTITIES;
        static std::string GET_SELECTED_ENTITIES;
        static std::string LOCK_ENTITY;
        static std::string GET_LOCKED_ENTITY;
        static std::string TOGGLE_ACTIVE;
        static std::string RENAME_ENTITY;
        static std::string MAKE_PARENT;
        static std::string UPDATE_ENGINE_STATE;
        static std::string UPDATE_ENTITY;
        static std::string UPDATE_COMPONENT;
        static std::string GET_ENTITY_COMPONENTS;
        static std::string GET_ENTITY;
        static std::string ADD_COMPONENT;
        static std::string GET_ENGINE_STATE;
    };

}

#endif
