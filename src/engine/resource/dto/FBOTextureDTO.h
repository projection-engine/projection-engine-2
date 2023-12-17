#ifndef PROJECTION_FBOTEXTUREDTO_H
#define PROJECTION_FBOTEXTUREDTO_H

namespace PEngine {
    struct FBOTextureDTO {
        int w;
        int h;
        int attachment;
        int precision;
        int format;
        int type;
        bool linear;
        bool repeat;
    };
}
#endif
