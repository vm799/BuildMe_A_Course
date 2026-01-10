
# Maestro Content Factory: Technical Specification

## 1. Architecture Overview
- **Frontend**: React 19 (ESM) with Tailwind CSS.
- **Routing**: React Router (HashRouter) for client-side navigation.
- **State Management**: React Context API for Global Theme and Course Data.
- **Intelligence Layer**: Google Gemini API (Gemini 3 Flash).

## 2. Agentic Pipeline Logic
The "Maestro" Engine uses a multi-stage generation process:

1. **Ingestion**: Raw text or metadata is passed to the `generateModuleCurriculum` service.
2. **Structuring**: Gemini 3 Flash is prompted with a specific `responseSchema` to ensure 100% JSON consistency.
3. **Guardrails**: All generated content is passed through a "Review Agent" (Simulated/Real-time) to cross-reference against OWASP Top 10 for LLMs.
4. **Refinement**: The final output includes:
   - Weekly titles and descriptions.
   - Learning objectives.
   - Resource metadata (IDs for simulated downloads).

## 3. Gemini API Implementation
- **Model**: `gemini-3-flash-preview`
- **Temperature**: 0.7 for curriculum creativity.
- **System Instruction**: Explicitly prevents "point-and-click" exploit generation, focusing on conceptual security defense.

## 4. Mock Database (Simulated)
While the PRD mentions Supabase, this V2 prototype uses a `CourseProvider` to manage application state in-memory, ensuring a "fully wired" experience without requiring external DB setup.

## 5. Security Protocol
- **PII Filtering**: Simple regex-based sanitization before LLM processing.
- **Content Scaffolding**: Ensuring foundational modules are "locked" until prerequisite content is generated/completed.
