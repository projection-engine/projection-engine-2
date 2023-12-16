#include "SelectionState.h"

#include <utility>

namespace PEngine {
    std::string SelectionState::getSelectedEntity() const {
        return selectedEntity;
    }

    void SelectionState::setSelectedEntity(std::string s) {
        SelectionState::selectedEntity = std::move(s);
    }
}