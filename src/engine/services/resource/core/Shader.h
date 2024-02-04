#ifndef PROJECTION_SHADER_H
#define PROJECTION_SHADER_H

#include "glad/glad.h"
#include "AbstractResource.h"

namespace PEngine {

    class Shader : public AbstractResource {
    private:
        GLuint program = 0;
        GLuint vertexShader = 0;
        GLuint fragmentShader = 0;
        static Shader *activeShader;

        GLuint compileShader(const char *code, bool isVertex);

        void checkCompileErrors(GLuint shader, std::string type);

    public:

        std::unordered_map<std::string, GLuint> uniforms;

        explicit Shader() : AbstractResource(ResourceType::SHADER) {}

        AbstractResource *init(std::string vertex, std::string fragment, bool isPartialShader);

        GLuint &getProgram();

        void bind();

    };

}

#endif
