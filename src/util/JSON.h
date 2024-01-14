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
        void set(const std::string &key, T value) {
            if (value == nullptr) {
                return;
            }
            data[key] = value;
        }

        bool has(const std::string &key) {
            if (data.find(key) != data.end()) {
                return !data[key].is_null();
            }
            return false;
        }

        void erase(const std::string &key) {
            if (has(key)) {
                data.erase(key);
            }
        }

        std::string stringify() {
            try {
                return data.dump(-1, ' ', false, nlohmann::json::error_handler_t::replace);
            } catch (nlohmann::json::exception &exception) {
                return "";
            }
        }

        nlohmann::json &getData() {
            return data;
        }

        bool isArray() {
            return data.is_array();
        }

        static JSON parse(const std::string &data) {
            try {
                return JSON(nlohmann::json::parse(data));
            } catch (const nlohmann::json::exception &e) {
                return JSON{};
            }
        }

        static JSON parse(const std::wstring &data) {
            try {
                return JSON(nlohmann::json::parse(data));
            } catch (const nlohmann::json::exception &e) {
                return JSON{};
            }
        }

        explicit JSON() = default;

        template<typename T>
        void pushItem(T value) {
            data.push_back(value);
        }
    };
}
#endif
