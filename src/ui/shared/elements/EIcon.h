#pragma once
#ifndef PROJECTION_EICON_H
#define PROJECTION_EICON_H

#include <string>
#include "IElement.h"

namespace PEngine {
    class EIcon : public IElement {
        std::string text;
    public:
        void setText(std::string textV);
        void render() override;
        void collectAttributes(pugi::xml_node node) override;
        IElement * copy() override;
    };
}

#endif