#include "glad/glad.h"
#include "Shader.h"
#include "../../../../util/StringUtils.h"
#include "../../../util/ShaderUtil.h"
#include "../../../definitions.h"

namespace PEngine {
    Shader *Shader::activeShader = nullptr;

    AbstractResource *Shader::init(std::string vertex, std::string fragment, bool isPartialShader) {
        program = glCreateProgram();
        vertex = GLSL_VERSION + ("\n" + ShaderUtil::RequestShader(fs, vertex, isPartialShader));
        fragment = GLSL_VERSION + ("\n" + ShaderUtil::RequestShader(fs, fragment, isPartialShader));
        vertexShader = compileShader(vertex, GL_VERTEX_SHADER);
        fragmentShader = compileShader(fragment, GL_FRAGMENT_SHADER);

        glAttachShader(program, vertexShader);
        glAttachShader(program, fragmentShader);
        glLinkProgram(program);
        glFlush();

        return this;
    }

    GLuint Shader::compileShader(std::string &code, int type) {
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

    void Shader::bind() {
        if (Shader::activeShader != this) {
            glUseProgram(program);
            Shader::activeShader = this;
        }
    }
}
