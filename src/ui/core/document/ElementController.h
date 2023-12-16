#ifndef CATALYST_ELEMENTCONTROLLER_H
#define CATALYST_ELEMENTCONTROLLER_H

#include <string>
#include "../../../core/debug/ILoggable.h"

namespace PEngine {
    class IElement;

    template<typename K, typename V>
    class Map;

    class ElementController : public ILoggable {
    private:

        List<IElement> elements;

        IElement *searchFor(ListItem<IElement> *item, const std::string &id);

        IElement *getElementByIdInternal(std::string &id, ListItem<IElement> *root);

        IElement *addElementInternal(IElement *element, IElement *parent);

        IElement *createElement(const char *tag);

    public:

        explicit ElementController();

        static Map<std::string, IElement *> registeredElements;

        IElement *add(IElement *element, IElement *parent);

        IElement *getElementById(std::string id);

        IElement *getElementById(std::string id, IElement *root);

        List<IElement> &getElements();

        IElement *addElement(const char *tag);

        IElement *addElement(IElement *element, IElement *parent);

        IElement *addElement(const char *tag, IElement *parent);
    };
}

#endif
