#pragma once
#ifndef PROJECTION_ETEXT_H
#define PROJECTION_ETEXT_H

#include <string>
#include "AbstractSimpleElement.h"

namespace PEngine {
    class EText : public AbstractSimpleElement  {
    public:
        void render() override;

        void collectAttributes(pugi::xml_node node) override;

        IElement *copy() override;
    };
}

#endif
