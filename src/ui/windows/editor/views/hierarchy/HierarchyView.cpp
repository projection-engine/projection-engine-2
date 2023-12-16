#include "HierarchyView.h"
#include "../../../../core/document/Document.h"
#include "../../../../core/elements/EButton.h"
#include "../../../../core/elements/EMenuItem.h"
#include "HierarchyList.h"

namespace PEngine {
    void HierarchyView::onInitialize() {
        CONSOLE_LOG("Initializing hierarchy")
        deleteButton = (EButton *) getElementById("hierarchyDeleteButton");
        selectAll = (EMenuItem *) getElementById("hierarchySelectAll");
        selectHierarchy = (EMenuItem *) getElementById("hierarchySelectHierarchy");
        selectInvert = (EMenuItem *) getElementById("hierarchySelectInvert");
        hierarchyContainer = getElementById("hierarchyContainer");
        hierarchyList = document->addElement(new HierarchyList, hierarchyContainer);
    }

    IElement *HierarchyView::copy() {
        return new HierarchyView;
    }

}