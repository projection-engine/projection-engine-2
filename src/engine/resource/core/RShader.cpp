#include <glad/glad.h>
#include "RShader.h"
#include "../../../util/StringUtils.h"

namespace PEngine {
    RShader *RShader::activeShader = nullptr;

    void RShader::init(std::string vertexCode, std::string fragmentCode) {
        program = glCreateProgram();
        vertexCode = replaceImports(vertexCode);
        fragmentCode = replaceImports(fragmentCode);
        vertexShader = compileShader(vertexCode, GL_VERTEX_SHADER);
        fragmentShader = compileShader(fragmentCode, GL_FRAGMENT_SHADER);

        glAttachShader(program, vertexShader);
        glAttachShader(program, fragmentShader);
        glLinkProgram(program);
        glFlush();
    }

    GLuint RShader::compileShader(std::string &code, int type) {
        GLuint shader = glCreateShader(type);
        const char *codeConst = code.c_str();
        glShaderSource(shader, 1, &codeConst, nullptr);
        glCompileShader(shader);

        GLint isCompiled;
        glGetShaderiv(shader, GL_COMPILE_STATUS, &isCompiled);
        if (isCompiled != GL_TRUE) {
            GLsizei log_length = 0;
            GLchar message[1024];
            glGetShaderInfoLog(shader, 1024, &log_length, message);
            CONSOLE_ERROR("ERROR COMPILING SHADER: {0}", *message)
        }
        return shader;
    }

    std::string RShader::replaceImports(std::string &code) {
        //        StringUtils::replace(code, )
        //TODO - REPLACE STATIC THINGS HERE
        return GLSL_VERSION + code;
    }

    void RShader::bind() {
        if (RShader::activeShader != this) {
            glUseProgram(program);
            RShader::activeShader = this;
        }
    }
}
