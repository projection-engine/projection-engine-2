#ifndef PROJECTION_SHADER_H
#define PROJECTION_SHADER_H
#include "AbstractResource.h"

namespace PEngine {

    class Shader : public AbstractResource {
    private:
        GLuint program;
        GLuint vertexShader;
        GLuint fragmentShader;
        static Shader *activeShader;

        GLuint compileShader(std::string &code, int type);
    public:

        explicit Shader() : AbstractResource(ResourceType::SHADER) {}

        void init(std::string vertex, std::string fragment, bool isPartialShader);

        void bind();
    };

}

#endif
