#ifndef CATALYST_IIOCONTROLLER_H
#define CATALYST_IIOCONTROLLER_H

namespace PEngine {
    template<typename K, typename V>
    class Map;


    class IIOController {
    public:
        virtual bool isMousePosValid();

        virtual float getMouseX();

        virtual float getMouseY();

        virtual float getMouseDeltaX();

        virtual float getMouseDeltaY();

        virtual bool isMouseButtonDown(int index);

        virtual float getMouseButtonDuration(int index);

        virtual float getMouseWheelAcceleration();

        virtual Map<int, bool> *getPressedKeys();

        virtual bool isCTRL();

        virtual bool isShift();

        virtual bool isAlt();

        virtual bool isSuper();
    };
}
#endif
