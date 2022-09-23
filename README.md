## v5.7.0-alpha
### Big changes
- Context menus/hotkeys were reworked and have more functionalities
- 3D cursor was removed, and now you will have a better integration with screen space actions
- Gizmos are now faster and more reliable
- UI creator improved, a new isolated context is now created and updated in real time
- Home window was rewritten to be more in line with the rest of the UI
- Simple materials: Single shader instance that has basic configuration for a PBR material
- glTF materials now integrate with simple material
- Home window now tracks open projects
- SSGI now integrates with PBR pipeline of materials (Before was just an addition to the final color)
- SSR now will only apply to deferred materials due to reconstructed normals result on broken reflections for most angles
- New shading models were added:
  - Position
  - Reconstructed normals
  - Linear depth
  - SSGI normals
  - SSGI
  - g-buffer AO
  - g-buffer ambient sampler (probes)
- Console now can show objects by selecting log on it
- Console will now be active even when not playing
- Editor errors now are better structured and will integrate with console view
- Big UI performance improvements
- Hierarchy mapping is now controlled globally instead of a per-view basis
- Sprites no longer show distortion when viewed up close
- Gizmo grid movement reworked

### Smaller changes
- Camera settings is now located under "view" dropdown on viewport
- Multiple bug-fixes related to the transformation workers
- Selector now has infinite scroll integrated
- Unitary transformation by holding ctrl key while using gizmo

```
commit 5497eaa73fdf553fce5d8f439c911330a6c3f128
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Fri Sep 23 11:04:05 2022 -0300
```

- Fixes to absoluteTranslation
- Changed camera settings
- Removing 3D cursor
- Added fallback material when dropping mesh/scene
- Improvements to screen space coordinates conversion
- Option to move selected entities to camera
- Implementing QueryAPI across editor
- Snap to grid now applies to all selected entities
- Fixed snap to grid not working as intended
- Added shortcut for grid movement (scale, translation gizmos) by holding ctrl
- Version update

```
commit 007e4ffc1967af88a7be30bc61ea8f0f87f71019
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Thu Sep 22 18:43:42 2022 -0300
```

- Reworked content browser context menu
- More hotkeys for content browser
- Added alert when deleting files

```
commit bd73b9f37aae472580471d3e7bfe87c38765f513
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Thu Sep 22 16:35:35 2022 -0300
```

- Fixed context menu on content browser not being updated with directory change
- Fixed home context menu not working as intended

```
commit 441ab97add47d7d6b9eb38e140ee7f36e78c0c58
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Thu Sep 22 10:14:54 2022 -0300
```

- Fixed gizmo transformation problem
- Fixed scale gizmo not taking entity rotation into consideration
- Context menu visual rework
- Hierarchy/viewport context menu merged
- More options to hierarchy/viewport context menu and hotkeys
- Improvements to hot keys event tracking
- Gizmo grid movement rewritten to be more stable

```
commit a0df57b403f21fa1e6a59827c724f58b9c4c9566
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Wed Sep 21 15:56:39 2022 -0300
```

- Fixed hierarchy scroll not showing new nodes
- Fixed some bugs with glTF loader

```
commit 10a1d0b45310ab455ccdf8f4b48c786029169357
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Wed Sep 21 15:04:26 2022 -0300
```

- Reworked GLTF material importer to integrate with simple material
- Included more material attributes inside glTF imported material
- Reworked hierarchy view to hide overflow on X axis
- Added tooltip to hierarchy node (name)
- Reworked linking structure for entities and integrated it with transformation workers
- Fixed single mesh import on Loader (import error)
- Removed setter for shared buffers on Movable instance
- Fixed drag drop of scene causing primitives not update with transformation

```
commit d6bd8c7c7924242442256404d662d8e2deabcbe6
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Wed Sep 21 10:56:32 2022 -0300
```

- Shading model added to settings serialization
- Added more shading models
- Reworked SSGI contribution to be physically based
- Fixed gizmo tooltip not rendering
- Fixed inspector file change
- Changed SSGI to consume pre post-processing frame
- Fixed simple material not applying due to compilation issue
- Fixed simple material sampler type inputs
- Reworked modal structure to only render content if open
- Changed Selector component to implement infinite scroll to prevent performance drops
- Fixed big performance dips when selecting items
- Reworked color picker to have canvas only do processing after open

```
commit 091286cc842e8afef213657f8ba484c4dcce0878
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Tue Sep 20 15:45:09 2022 -0300
```

- Simple material structure initialization
  - Integration with content browser
  - Custom form on the inspector
- Enhanced fallback material to support simple material as a basis

```
commit 483b78ff45d4ebdb78c339e27a53cb6471557b0b
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Tue Sep 20 12:03:05 2022 -0300
```

- Fixed view tab switching error
- Optimization to hierarchy structure
- Fixed component filter for hierarchy
- Fixed view tabs double click causing current tab to be undefined
- Fixed view tab removal causing current tab to be undefined
- Reworked visuals for hierarchy, now an icon for each component will appear alongside the name
- Implemented "hot-reload" of UI layouts
- Viewport tab is now integrated with settings (serializable per tab)
- Reworked initial view layouts
- Reworked UI component to integrate with UILayout files instead of cloning them

```
commit e30fb404621ec7330bba52b3270779d356069493
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Mon Sep 19 18:11:14 2022 -0300
```

- File watcher backend
- NodeFS file watcher

```
commit 9036b3af0a1c10218e020849dbc6d4468687cf8c
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Mon Sep 19 15:00:52 2022 -0300
```

- Tracker for open projects
- Improvements to the backend

```
commit 01a1d43d7c91b65591c1cb01efb25a1e0b04e3dd
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Mon Sep 19 09:05:21 2022 -0300
```

- Fixed hierarchy component filter
- Reworked shading models
- Optimization to deferred renderer
- Improvements to scene depth shading model
- Fixed viewport left view
- Improvements to error logger
- Improvements to console view

```
commit 671b3f6983b3bd174bd6429c04797a8cc30ccecd
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Sun Sep 18 14:27:15 2022 -0300
```

- Object preview on console
- Fixed inspector bug with localization
- Fixed inspector form not updating correctly

```
commit 7140fb014ad927a37a43f92a11136403fc765553
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Sun Sep 18 13:52:37 2022 -0300
```

- Rewritten main window
- Including releases list
- Changed window initial sizes
- including marked.js

```
commit 1cd39dd2bd80b43a92a02712acd0e6c4881974d5
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Sun Sep 18 13:50:46 2022 -0300
```

- Rewritten main window
- Including releases list
- Changed window initial sizes
- including marked.js

commit 4719452dfc6c5e844458afc247a3508ca4489530
Author: facobackup <gustavomicaelbarbosa@gmail.com>
Date:   Sun Sep 18 10:58:24 2022 -0300

- Reworked shading options
- Fixed orthographic projection not zooming in
- Fixed not being able to remove components
- Fixed 3D cursor not changing position when moving it
- Fixed inspector not loading content browser files as JSON
- Fixed hierarchy node selection box
- Fixed tooltip without delay
- Fixed hierarchy not updating hotkeys target
- Fixed grid not rendering with orthographic projection
- Changed templates for components and ui layouts
