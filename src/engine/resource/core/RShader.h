#ifndef CATALYST_RSHADER_H
#define CATALYST_RSHADER_H
#include "../../../core/Definitions.h"
#include "IResource.h"

namespace PEngine {

    class RShader : public IResource {
    private:
        GLuint program;
        GLuint vertexShader;
        GLuint fragmentShader;
        static RShader *activeShader;

        GLuint compileShader(std::string &code, int type);

        static std::string replaceImports(std::string &code);
    public:

        explicit RShader() : IResource(ResourceType::SHADER) {}

        void init(std::string vertexCode, std::string fragmentCode);

        void bind();
    };

}

#endif
