#ifndef CATALYST_HIERARCHYVIEW_H
#define CATALYST_HIERARCHYVIEW_H


#include "../../../../core/views/IView.h"

namespace PEngine {
    class EMenuItem;

    class EButton;

    class ETree;

    class EText;

    class ESection;

    class HierarchyView : public IView {
    protected:
        EMenuItem *selectInvert = nullptr;
        EMenuItem *selectHierarchy = nullptr;
        EMenuItem *selectAll = nullptr;
        EButton *deleteButton = nullptr;
        IElement *hierarchyList = nullptr;
        IElement *hierarchyContainer = nullptr;
    public:

        void onInitialize() override;

        IElement *copy() override;

    };

}

#endif
