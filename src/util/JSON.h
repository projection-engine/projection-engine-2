#ifndef PROJECTION_JSON_H
#define PROJECTION_JSON_H

#include <utility>
#include <string>

#include "nlohmann/json.hpp"

namespace PEngine {
    class JSON {
    private:
        nlohmann::json data;

        explicit JSON(nlohmann::json d) {
            this->data = std::move(d);
        }

    public:
        template<typename T>
        T get(const std::string &key, T fallback) {
            if (!has(key)) {
                return fallback;
            }
            return data[key];
        }

        template<typename T>
        void set(const std::string &key, T &value) {
            if (value == nullptr) {
                return;
            }
            data[key] = value;
        }

        bool has(const std::string &key) {
            auto it = data.find(key);
            return it != data.end();
        }

        void erase(const std::string &key) {
            if (has(key)) {
                data.erase(key);
            }
        }

        std::string stringify() {
            return data.dump();
        }

        static JSON *parse(const std::string &data) {
            return new JSON(nlohmann::json::parse(data));
        }
    };
}
#endif
