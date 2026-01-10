
export const courseData = {
  "courseTitle": "AI Security Operations (SecOps)",
  "frameworks": ["MAESTRO", "QSAF", "OWASP Agentic Top 10", "AICM"],
  "weeks": [
    {
      "weekNumber": 1,
      "title": "Agent Identity & Discovery",
      "description": "Foundational identity protocols for autonomous agents, moving beyond legacy service accounts to DID and VC frameworks.",
      "assets": {
        "infographic": {
          "title": "Anatomy of an Agent ID",
          "format": "Visual Flowchart (DID/VC/ANS)",
          "path": "/public/images/week1-schema.png",
          "description": "A deep dive into the evolution from static service accounts to decentralized identifiers (DIDs) and verifiable credentials (VCs)."
        },
        "slides": {
          "title": "Zero-Trust Identity Deck",
          "format": "Technical Presentation",
          "path": "/public/decks/week1-deck.pdf",
          "description": "12-slide technical breakdown of the 'Blueprint for Trust' framework and SSI principles for agents."
        },
        "quiz": {
          "title": "Identity Fundamentals Lab",
          "format": "Interactive AI Assessment",
          "url": "https://notebooklm.google.com/notebook/a123-identity-crisis",
          "description": "Core assessment on discovery protocols, trust establishment, and identity verification using NotebookLM."
        },
        "video": {
          "title": "AI's Identity Crisis Briefing",
          "format": "Technical Walkthrough",
          "path": "/public/videos/week1-video.mp4",
          "description": "A high-level briefing on why traditional IAM fails in the face of dynamic, autonomous, and ephemeral multi-agent systems."
        }
      }
    },
    {
      "weekNumber": 2,
      "title": "Threat Modeling & Vulnerability",
      "description": "Layered threat modeling with MAESTRO and a deep dive into OWASP Agentic Top 10 risks.",
      "assets": {
        "infographic": {
          "title": "MAESTRO 7-Layer Model",
          "format": "Concentric Ring Diagram",
          "path": "",
          "description": "Visualizing the protective shells of the MAESTRO framework."
        },
        "slides": {
          "title": "OWASP Agentic Top 10 Guide",
          "format": "Vulnerability Guide",
          "path": "",
          "description": "Detailed breakdown of the most critical risks facing agentic systems."
        },
        "quiz": {
          "title": "Threat Hunter Challenge",
          "format": "Tactical Case Studies",
          "url": "",
          "description": "Tactical detection challenge based on real-world multi-agent hijacking scenarios."
        },
        "video": {
          "title": "Hijacking the Agent Planner",
          "format": "Red vs. Blue Script",
          "path": "",
          "description": "Demonstrating how planning-layer vulnerabilities lead to goal manipulation."
        }
      }
    },
    {
      "weekNumber": 3,
      "title": "Runtime Controls & Drift",
      "description": "Implementing QSAF Domain 10 controls and monitoring for cognitive degradation.",
      "assets": {
        "infographic": {
          "title": "Cognitive Degradation Timeline",
          "format": "Dashboard Health Indicator",
          "path": "",
          "description": "Visualizing system collapse due to model drift."
        },
        "slides": {
          "title": "QSAF Domain 10 Controls",
          "format": "Architectural Deep Dive",
          "path": "",
          "description": "Implementing real-time runtime monitoring and automated guardrails."
        },
        "quiz": {
          "title": "Cognitive Drift Mastery",
          "format": "Logic Analysis",
          "url": "",
          "description": "Testing detection of subtle model performance shifts during high-throughput tasks."
        },
        "video": {
          "title": "Logic Starvation Briefing",
          "format": "Explainer Script",
          "path": "",
          "description": "Why agents 'starve' for logic during intense adversarial interference."
        }
      }
    },
    {
      "weekNumber": 4,
      "title": "Enterprise SecOps Mastery",
      "description": "Navigating global compliance with CSA AICM and mastering enterprise platforms.",
      "assets": {
        "infographic": {
          "title": "Enterprise Platform Matrix",
          "format": "Comparison Matrix",
          "path": "",
          "description": "Infrastructure security feature comparison between major cloud providers."
        },
        "slides": {
          "title": "CSA AI Controls Matrix (AICM)",
          "format": "Compliance Framework",
          "path": "",
          "description": "Guide for mapping agent workflows to global security compliance standards."
        },
        "quiz": {
          "title": "Final Certification Exam",
          "format": "Comprehensive Certification",
          "url": "",
          "description": "Final certification exam validating your mastery of the AI SecOps pipeline."
        },
        "video": {
          "title": "Global SecOps Mastery",
          "format": "Practitioner Guide",
          "path": "",
          "description": "Observations from the field on managing production-scale agent security."
        }
      }
    }
  ]
};
