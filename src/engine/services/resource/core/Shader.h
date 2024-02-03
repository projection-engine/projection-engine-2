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

        std::unordered_map<std::string, GLuint> uniforms;

        explicit Shader() : AbstractResource(ResourceType::SHADER) {}

        AbstractResource *init(std::string vertex, std::string fragment, bool isPartialShader);

        GLuint &getProgram();

        void bind();
    };

}

#endif
