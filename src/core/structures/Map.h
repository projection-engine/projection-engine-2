#pragma once

#ifndef CATALYST_ENGINE_MAP_H
#define CATALYST_ENGINE_MAP_H

#include <vector>
#include "unordered_map"

namespace PEngine {
    template<typename K, typename V>
    class Map {
    private:
        std::unordered_map<K, V> map;
        size_t size = 0;
    public:
        std::unordered_map<K, V> *getMap();

        void clear();

        void deleteKey(K key);

        void set(K key, V value);

        V get(K key);

        std::vector<K> getKeys();

        std::vector<V> getValues();

        int getSize();

        bool has(K key);
    };
}

#endif