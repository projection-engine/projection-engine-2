
#ifndef CATALYST_SELECTIONSTORE_H
#define CATALYST_SELECTIONSTORE_H

#include "SelectionState.h"
#include "../../../core/store/IStore.h"

namespace PEngine {
    class SelectionStore : public IStore<SelectionStore, SelectionState> {

    };
}


#endif
