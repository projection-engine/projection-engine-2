#ifndef PROJECTION_SERIALIZABLEREPOSITORY_H
#define PROJECTION_SERIALIZABLEREPOSITORY_H

#include <unordered_map>
#include <string>
#include "AbstractSerializable.h"
#include "nlohmann/json.hpp"

namespace PEngine {

    class SerializableRepository {
        static std::unordered_map<std::string, AbstractSerializable>  serializableTypes;
        static std::unordered_map<std::string, AbstractSerializable>  instanced;
    public:
        static nlohmann::json Dump();

        static void Restore(const std::string &data);

        template<class T>
        static void Injectable(){
            instanced.emplace(typeid(T).name(), T());
        }

        template<class T>
        static void Serializable(){
            serializableTypes.emplace(typeid(T).name(), T());
        }

        template<class T>
        static AbstractSerializable &Inject(){
            const char *id = typeid(T).name();
            if(instanced.count(id)){
                return instanced.at(id);
            }
            throw std::invalid_argument("Injectable class not found");
        }

        static AbstractSerializable GetInstanceFor(const std::string &id) {
            if(instanced.count(id)){
                return ((AbstractSerializable) instanced.at(id)).getNew();
            }
            throw std::invalid_argument("Serializable class not found");
        }
    };

}

#endif
