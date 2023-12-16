#ifndef CATALYST_HIERARCHYLIST_H
#define CATALYST_HIERARCHYLIST_H


#include "../../../../core/elements/IElement.h"
#include "../../../../../engine/Engine.h"

namespace PEngine {
    class ETreeNode;

    class ETree;

    class HierarchyList : public IElement {
    private:
        ETree *tree;
        IElement *addEmpty;
        std::string previouslySelected;
    public:

        void onInitialize() override;

        void onEvent(IEventPayload *payload) override;

    };

}

#endif
