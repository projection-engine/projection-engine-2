#ifndef PROJECTION_EMENUBAR_H
#define PROJECTION_EMENUBAR_H

#include "IElement.h"

namespace PEngine {

    class EMenuBar : public IElement  {
    private:
        bool mainMenu = true;
    public:

        void render() override;

        void collectAttributes(pugi::xml_node node) override;

        IElement * copy() override;
    };

}

#endif
