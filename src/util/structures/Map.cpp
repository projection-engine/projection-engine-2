#include "Map.h"

namespace PEngine {
    template<typename K, typename V>
    void Map<K, V>::set(K key, V value) {
        map[key] = value;
        size++;
    }

    template<typename K, typename V>
    void Map<K, V>::clear() {
        map.clear();
        size = 0;
    }

    template<typename K, typename V>
    void Map<K, V>::deleteKey(K key) {
        if (!has(key)) {
            return;
        }
        map.erase(key);
        size--;
    }

    template<typename K, typename V>
    V Map<K, V>::get(K key) {
        return map[key];
    }

    template<typename K, typename V>
    std::vector<K> Map<K, V>::getKeys() {
        std::vector<K> keys;
        for (const auto &pair: map) {
            keys.push_back(pair.first);
        }
        return keys;
    }

    template<typename K, typename V>
    std::vector<V> Map<K, V>::getValues() {
        return map.enum_values();
    }

    template<typename K, typename V>
    int Map<K, V>::getSize() {
        return size;
    }

    template<typename K, typename V>
    bool Map<K, V>::has(K key) {
        return map.count(key);
    }

    template<typename K, typename V>
    std::unordered_map<K, V> *Map<K, V>::getMap() {
        return &map;
    }
}