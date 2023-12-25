#pragma once
#ifndef PROJECTION_ENGINE_ICOMPONENT_H
#define PROJECTION_ENGINE_ICOMPONENT_H

#include <string>
#include "pugixml.hpp"
#include "imgui.h"
#include "../../../util/structures/List.h"
#include "../../../util/event/IListener.h"

namespace PEngine {
    class Document;

    class IElement : public IListener {
    private:
        bool initialized = false;
        IElement *parent = nullptr;
        PEngine::List<IElement> children;
    protected:
        std::string id;
    public:
        void setId(const std::string &id);

    protected:
        Document *document = nullptr;
        bool active = true;

        IElement *getElementById(std::string id);

    public:
        ~IElement();

        virtual void loadFlags();

        virtual void onInitialize();

        bool isActive() const;

        void setActive(bool active);

        virtual void render();

        virtual void collectAttributes(pugi::xml_node node);

        virtual IElement *copy();

        PEngine::List<IElement> *getChildren();

        void renderChildren();

        void initialize(Document *document, IElement *parent, const char *pId);

        IElement *getChildElementById(std::string id);

        Document *getDocument();

        std::string getId();

        IElement *getParent();
    };
}
#endif

