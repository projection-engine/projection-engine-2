#ifndef PROJECTION_UBO_H
#define PROJECTION_UBO_H

#include "AbstractResource.h"
#include "../dto/UBODataDTO.h"
#include <vector>
#include <unordered_map>

namespace PEngine {

    class UBO : public AbstractResource {
    private:
        std::unordered_map<std::string, long> items;
        unsigned int buffer;
        int blockPoint;
        const char *blockName;
        static int blockPointIncrement;
    public:
        explicit UBO() : AbstractResource(ResourceType::UBO) {}

        void init(const char *blockName, UBODataDTO data[]);

        void bindWithShader();

        void bind();

        void unbind();

        void updateData(const std::string& name, std::vector<float> data);

        void updateBuffer(std::vector<float> data);

    private:
        static int calculate(UBODataDTO data[]);

    };

}

#endif
