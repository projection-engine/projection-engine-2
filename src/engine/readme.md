## Engine

Manages all the engine related stuff:
- Rendering 
- Tools for the editor
- Resources
- Entities/Components/Systems

### Facade
- Engine
  - Exposes access to all systems

### Systems
- **ResourceSystem**: 
  - all engine resources
  - static/dynamic
  - accessing and modifying resources
- **WorldSystem**: 
  - entt registry
  - accessing and modifying entities
- **RuntimeSystem**:
  - managing systems
  - runtime execution