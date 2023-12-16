#pragma once
#ifndef CATALYST_ENGINE_DOCUMENT_H
#define CATALYST_ENGINE_DOCUMENT_H

#include "ElementController.h"
#include "pugixml.hpp"
#include "ViewController.h"
#include "imgui.h"
#include "../../../core/debug/ILoggable.h"
#include <string>

namespace PEngine {
    template<typename K, typename V>
    class Map;

    class IElement;

    class IView;

    class Engine;

    class Document : public ILoggable {
    private:
        ElementController elementController;
        ViewController viewController;
        Engine *engine = nullptr;

        IElement *addElementInternal(IElement *element, IElement *parentEl, const char *id);

        void loadElements(pugi::xml_node root, IElement *parent);

        void loadView(std::string &src, IView *parent);

        IView *addViewInternal(const char *tag, IElement *parent, bool recursive);

        void initializeElement(IElement *element);

    public:

        IElement *addElement(const char *tag, const char *id, IElement *parent);

        IElement *addElement(const char *tag, IElement *parent);

        IElement *addElement(IElement *element, IElement *parent);

        IElement *addElement(const char *tag);

        IElement *getElementById(std::string id, IElement *root);

        IElement *getElementById(std::string id);

        List<IView> &getViews();

        List<IElement> &getElements();

        /**
         * Register view instance
         * @param tag
         * @param instance
         */
        static void registerView(const char *tag, IView *instance);

        IView *addView(const char *tag, IElement *parent);

        IView *addView(const char *tag);

        Engine *getEngine() const;

        void setEngine(Engine *eg);
    };
}

#endif
