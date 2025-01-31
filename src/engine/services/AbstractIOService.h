#ifndef PROJECTION_ABSTRACTIOSERVICE_H
#define PROJECTION_ABSTRACTIOSERVICE_H
#define MOUSE_LEFT 0
#define MOUSE_MIDDLE 1
#define MOUSE_RIGHT 2

namespace PEngine {
    template<typename K, typename V>
    class Map;


    class AbstractIOService {
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
