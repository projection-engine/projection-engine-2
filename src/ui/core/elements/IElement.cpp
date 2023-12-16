#include "IElement.h"

#include <utility>
#include "../document/Document.h"

namespace PEngine {
    PEngine::List<IElement> *IElement::getChildren() {
        return &children;
    }

    std::string IElement::getId() {
        return id;
    }

    void IElement::renderChildren() {
        children.iterate();
        while (children.hasNext()) {
            IElement *next = children.next();
            if (next->isActive()) {
                next->render();
            }
        }
    }

    void IElement::render() {
        renderChildren();
    }

    Document *IElement::getDocument() {
        return document;
    }

    IElement *IElement::copy() {
        CONSOLE_ERROR("No implementation for method 'copy' found")
        return nullptr;
    }

    void IElement::collectAttributes(pugi::xml_node node) {

    }

    IElement *IElement::getElementById(std::string id) {
        return document->getElementById(std::move(id));
    }

    IElement *IElement::getChildElementById(std::string id) {
        return document->getElementById(std::move(id), this);
    }

    bool IElement::isActive() const {
        return active;
    }

    void IElement::setActive(bool a) {
        IElement::active = a;
    }

    void IElement::onInitialize() {

    }

    IElement::~IElement() {
        children.clear();
    }

    void IElement::loadFlags() {

    }

    IElement *IElement::getParent() {
        return parent;
    }

    void IElement::initialize(Document *pDocument, Engine *pEngine, IElement *pParent, const char *pId) {
        if (initialized) {
            return;
        }
        engine = pEngine;
        document = pDocument;
        parent = pParent;
        if (pId != nullptr) {
            id = pId;
        }
        initialized = true;
    }

    void IElement::setId(const std::string &id) {
        IElement::id = id;
    }

    Engine *IElement::getEngine() {
        return engine;
    }
}