#ifndef PROJECTION_HIERARCHYSERVICE_H
#define PROJECTION_HIERARCHYSERVICE_H

#include "AbstractService.h"

namespace PEngine {

    class HierarchyService : public AbstractService {
        static void HandleEvent(WebViewPayload &payload);

    public:
        void BindEvents(PEngine::WebViewWindow *pWindow) override;

    };

}

#endif
