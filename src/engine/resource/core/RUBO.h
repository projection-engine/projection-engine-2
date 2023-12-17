#ifndef PROJECTION_RUBO_H
#define PROJECTION_RUBO_H

#include "IResource.h"
#include "../dto/UBODataDTO.h"
#include <vector>
#include <unordered_map>

namespace PEngine {

    class RUBO : public IResource {
    private:
        std::unordered_map<std::string, long> items;
        unsigned int buffer;
        int blockPoint;
        const char *blockName;
        static int blockPointIncrement;
    public:
        explicit RUBO() : IResource(ResourceType::UBO) {}

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
