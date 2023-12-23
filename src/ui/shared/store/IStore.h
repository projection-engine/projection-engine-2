#ifndef PROJECTION_ISTORE_H
#define PROJECTION_ISTORE_H


#include "../../../util/event/EventController.h"
#include "../../../util/UUID.h"

namespace PEngine {

    template<class STORE, class DATA>
    class IStore {
    private:
        static std::string storeId;
        static STORE instance;
        DATA *data = new DATA;
    public:
        static DATA *getData() {
            return instance.data;
        }

        static std::string getStoreId() {
            if(storeId.empty()){
                storeId = UUID::v4();
            }
            return storeId;
        }

        static void updateData(DATA *temp) {
            if (temp != instance.data) {
                delete instance.data;
            }
            instance.data = temp;
            EventController::get()->triggerEvent(getStoreId());
        }

        static void clear() {
            instance.data = new DATA;
        }
    };

    template<class STORE, class DATA>
    STORE IStore<STORE, DATA>::instance;

    template<class STORE, class DATA>
    std::string IStore<STORE, DATA>::storeId;
}


#endif
