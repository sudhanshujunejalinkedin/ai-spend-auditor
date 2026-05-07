# System Architecture

This document outlines the data flow and logic structure of the SpendsAudit AI engine.

## 1. System Data Flow
The following diagram shows how a user's raw input is processed through our logic layers to produce a defensible audit report.

```mermaid
graph TD
    %% Node Definitions
    A[User Input Form] --> B{Audit Engine}
    
    subgraph Analysis_Layer [Logic & Optimization]
    B --> C[Plan Mapping Logic]
    B --> D[Seat Efficiency Check]
    B --> E[Pricing Benchmark]
    end

    C & D & E --> F[Audit Results Page]
    
    subgraph Conversion_Layer [Business Logic]
    F --> G[Lead Capture]
    F --> H[Credex Integration]
    end

    %% Styling for GitHub
    style B fill:#3b82f6,stroke:#fff,stroke-width:2px,color:#fff
    style Analysis_Layer fill:#f4f4f5,stroke:#3f3f46,stroke-dasharray: 5 5
    style G fill:#22c55e,stroke:#fff,color:#fff
    style H fill:#3b82f6,stroke:#fff,color:#fff