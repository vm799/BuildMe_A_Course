
# Maestro Content Factory: UI Specification

## 1. Visual Identity & Dual-Mode Philosophy
The application operates on a "Dual-Reality" interface, allowing users to toggle between two distinct futures:

### **Mode A: Solarpunk (The Oasis)**
- **Concept**: Harmonious integration of technology and nature.
- **Color Palette**: 
  - `Forest (#0a4d28)`: Primary brand color for trust and growth.
  - `Solar Yellow (#fbbd08)`: Accents and active states.
  - `Linen (#f4efe6)`: Background and surface color for readability.
  - `Terracotta (#cc5500)`: Warning and interactive secondary actions.
- **Typography**: Space Grotesk (Display) for a modern, breathable feel.
- **Shapes**: Organic, rounded corners (up to `3xl`), blob-like backgrounds, and soft shadows.

### **Mode B: Cyberpunk (The Terminal)**
- **Concept**: High-tech, low-life, grid-based efficiency.
- **Color Palette**:
  - `Cyber Emerald (#10b981)`: Primary glow color for data and systems.
  - `Neon Magenta (#ff00ff)`: Critical alerts and "Maestro" interventions.
  - `Deep Black (#050505)`: Main background.
- **Typography**: Space Mono for that "command line" aesthetic.
- **Visual Effects**: Scanlines, CRT glow, grid patterns (`hud-grid`), and sharp borders with neon shadows.

## 2. Key Interface Components

### **Theme Slider (The Dimension Switch)**
- A stylized toggle switch that transitions the entire app's CSS variables.
- Interactive feedback: Switching modes triggers a 700ms transition with a slight scale effect.

### **LMS Dashboard**
- **Sidebar**: Vertical navigation with iconography representing "Seeds" (Modules).
- **Hero Card**: Displays current progress with a large illustrative icon (Potted Plant for Solarpunk, Neural Hub for Cyberpunk).
- **Resource Grid**: List-based view of downloadable assets (PDFs, Scripts, Diagrams).

### **Ingestion Pipeline**
- **Log Console**: A typewriter-effect console showing the agentic processes in real-time.
- **Progress Bar**: Animates based on simulated pipeline steps (Sanitization -> Mapping -> Generation).

## 3. Motion & Feedback
- **Transitions**: Every route change is wrapped in a fade-in.
- **Active State**: Pulsing rings around "Active Protocol" elements.
- **Hover**: 5% scale increase on interactive module cards.
