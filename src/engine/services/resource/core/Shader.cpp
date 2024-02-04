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
        vertexShader = compileShader(vertex.c_str(), true);
        fragmentShader = compileShader(fragment.c_str(), false);

        glAttachShader(program, vertexShader);
        glAttachShader(program, fragmentShader);
        glLinkProgram(program);
        glFlush();

        return this;
    }

    GLuint Shader::compileShader(const char *code, bool isVertex) {
        GLuint shader = glCreateShader(isVertex ? GL_VERTEX_SHADER : GL_FRAGMENT_SHADER);
        glShaderSource(shader, 1, &code, nullptr);
        glCompileShader(shader);

        checkCompileErrors(shader, isVertex ? "VERTEX" : "FRAGMENT");
        return shader;
    }

    void Shader::checkCompileErrors(GLuint shader, std::string type) {
        GLint success;
        GLchar infoLog[1024];
        if (type != "PROGRAM") {
            glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
            if (!success) {
                glGetShaderInfoLog(shader, 1024, nullptr, infoLog);
                CONSOLE_ERROR("ERROR COMPILING SHADER: {0} \n {1}", type, infoLog)
            }
        } else {
            glGetProgramiv(shader, GL_LINK_STATUS, &success);
            if (!success) {
                glGetProgramInfoLog(shader, 1024, nullptr, infoLog);
                CONSOLE_ERROR("ERROR COMPILING SHADER: {0} \n {1}", type, infoLog)
            }
        }
    }

    void Shader::bind() {
        if (Shader::activeShader != this) {
            glUseProgram(program);
            Shader::activeShader = this;
        }
    }

    GLuint &Shader::getProgram() {
        return program;
    }
}
