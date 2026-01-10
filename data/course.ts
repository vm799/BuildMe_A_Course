
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
          "title": "The Anatomy of a Week 1 AI Agent ID",
          "format": "Visual Flowchart (DID/VC/ANS)",
          "path": "/assets/week1-id-anatomy.png",
          "description": "Mapping the lifecycle of a secure agent credential from generation to peer discovery."
        },
        "slides": {
          "title": "Zero-Trust Identity for Multi-Agent Systems",
          "format": "Technical Presentation (10-12 Slides)",
          "path": "/assets/week1-deck.pdf",
          "description": "Deep dive into decentralized identifiers and the Trust Flow mechanism."
        },
        "quiz": {
          "title": "Fundamentals of Agent Identity & Discovery",
          "format": "Interactive AI Assessment",
          "url": "https://notebooklm.google.com/notebook/0fae9644-e89f-4843-9b23-8a978ea76ddb?artifactId=90834ae5-29bf-4f55-9a32-50b4fcfa22c0",
          "description": "Core assessment on discovery protocols and identity verification using NotebookLM."
        },
        "video": {
          "title": "The Identity Mismatch: Why Service Accounts Fail",
          "format": "Technical Script Walkthrough",
          "path": "/assets/week1-intro.mp4",
          "description": "Analyzing why static roles lead to over-privileging in autonomous agent swarms."
        }
      }
    },
    {
      "weekNumber": 2,
      "title": "Threat Modeling & Vulnerability",
      "description": "Layered threat modeling with MAESTRO and a deep dive into OWASP Agentic Top 10 risks.",
      "assets": {
        "infographic": {
          "title": "The Week 2 MAESTRO 7-Layer Threat Model",
          "format": "Concentric Ring Reference Diagram",
          "path": "/assets/week2-maestro.png",
          "description": "Visualizing the protective shells of the MAESTRO framework."
        },
        "slides": {
          "title": "Deep Dive into the OWASP Agentic Top 10",
          "format": "Vulnerability & Mitigation Guide",
          "path": "/assets/week2-deck.pdf",
          "description": "Detailed breakdown of the most critical risks facing agentic systems."
        },
        "quiz": {
          "title": "Threat Hunter Scenario Challenge",
          "format": "5 Tactical Case Study Prompts",
          "url": "https://notebooklm.google.com/",
          "description": "Tactical detection challenge based on real-world multi-agent hijacking scenarios."
        },
        "video": {
          "title": "Red vs. Blue: Hijacking the Agent Planner",
          "format": "Walkthrough Script",
          "path": "/assets/week2-redblue.mp4",
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
          "title": "The Week 3 Timeline of Cognitive Degradation",
          "format": "Dashboard-style Health Indicator",
          "path": "/assets/week3-drift.png",
          "description": "Visualizing system collapse due to model drift."
        },
        "slides": {
          "title": "Implementing QSAF Domain 10 Runtime Controls",
          "format": "Architectural Deep Dive (BC-001–007)",
          "path": "/assets/week3-deck.pdf",
          "description": "Implementing real-time runtime monitoring and automated guardrails."
        },
        "quiz": {
          "title": "Mastering Cognitive Drift & Systemic Collapse",
          "format": "10 Logic-based Analysis Questions",
          "url": "https://notebooklm.google.com/",
          "description": "Testing detection of subtle model performance shifts during high-throughput tasks."
        },
        "video": {
          "title": "The Silent Killer: Logic Starvation in Real-Time",
          "format": "Analogy-driven Explainer Script",
          "path": "/assets/week3-logic.mp4",
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
          "title": "Enterprise Agent Platforms: Microsoft vs. AWS",
          "format": "Side-by-Side Comparison Matrix",
          "path": "/assets/week4-matrix.png",
          "description": "Infrastructure security feature comparison between major cloud providers."
        },
        "slides": {
          "title": "Navigating the CSA AI Controls Matrix (AICM)",
          "format": "5-Pillar Compliance Framework",
          "path": "/assets/week4-deck.pdf",
          "description": "Guide for mapping agent workflows to global security compliance standards."
        },
        "quiz": {
          "title": "Final Certification: Enterprise SecOps Mastery",
          "format": "Comprehensive Exam (20 Questions)",
          "url": "https://notebooklm.google.com/",
          "description": "Final certification exam validating your mastery of the AI SecOps pipeline."
        },
        "video": {
          "title": "Implementing Global AI SecOps: A Day in the Life",
          "format": "Practitioner's Practical Guide",
          "path": "/assets/week4-life.mp4",
          "description": "Observations from the field on managing production-scale agent security."
        }
      }
    }
  ]
};
