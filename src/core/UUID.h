#pragma once
#ifndef PROJECTION_UUID_H
#define PROJECTION_UUID_H

#include <random>
#include <sstream>

namespace PEngine {
   class UUID{
   private:
       static std::random_device              rd;
       static std::mt19937                    gen;
       static std::uniform_int_distribution<> dis;
       static std::uniform_int_distribution<> dis2;
   public:
       static std::string v4();
   };
}

#endif //PROJECTION_UUID_H
