#ifndef CATALYST_ETREENODE_H
#define CATALYST_ETREENODE_H

#include "IElement.h"
#include "AbstractSimpleElement.h"

namespace PEngine {

    class ETreeNode : public AbstractSimpleElement {
    private:
        bool leaf = false;
        ImGuiTreeNodeFlags flags = ImGuiTreeNodeFlags_OpenOnArrow | ImGuiTreeNodeFlags_OpenOnDoubleClick | ImGuiTreeNodeFlags_SpanAvailWidth;
        bool selected = false;
    public:

        IElement *copy() override;

        void render() override;

        void loadFlags() override;

        bool isLeaf() const;

        void setIsLeaf(bool isLeaf);

        void setSelected(bool isSelected);

        bool isSelected() const;
    };

}

#endif
