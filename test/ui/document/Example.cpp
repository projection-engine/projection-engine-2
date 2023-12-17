#include "Example.h"

PEngine::IElement *PEngine::Example::copy() {
    return new Example;
}
