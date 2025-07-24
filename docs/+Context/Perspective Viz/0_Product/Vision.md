<!-- phase:1 -->
## Vision
A shared, extensible visual language that turns any perspective into a living map of weighted reasons, evidence, and emotional context — an inspectable simulation of *why* a stance exists, *how* certain it is, and *what* would change it.

This roadmap stages capabilities across four phases (see [[Roadmap]]).

**Perspective ≜ “weighted, time-stamped reasons bound to an Agent.”**  
“Agent” can be a person, org, government, or bot. This simple universal primitive lets every debate—Instagram comments, SEC filings, or personal diary entries—fit the same canvas.
## Purpose

- Offload the cognitive bottleneck of juggling dozens of factors in our heads
    
- Externalize reasoning so collaboration scales beyond individual working memory
    
- Make invisible assumptions, trade‑offs, and contradictions instantly visible
    
- Give every voice a verifiable seat at the same canvas via open‑source governance
    
- Replace static opinion clashes with dynamic simulations that invite updates, not defensiveness
    
- Provide a provenance‑rich ledger of evolving beliefs for education, policy, and personal growth

### Why Open Source Matters

The canvas itself is neutral infrastructure.  
By default every public perspective is stored in a **fork‑able, MIT‑licensed JSON schema**.  

Anyone can:

- remix criteria or evidence under their own account
    
- issue a pull request to the root perspective
    
- subscribe to upstream changes and auto‑merge with conflict hints
    

Open perspectives create a transparent marketplace of world‑views instead of siloed takes.  

The governance rules that enable this live in [[Open Source Governance]]

### Nine Perspective Dimensions  
| #     | Canonical label       | Encapsulates …                             | Primary UI pattern(s)                                  | Typical phase-1 feature refs                        |
| ----- | --------------------- | ------------------------------------------ | ------------------------------------------------------ | --------------------------------------------------- |
| **1** | **Criteria Grid**     | choices × weighted reasons                 | Heat-map cells                                         | Choice-Criteria Heat-Map                            |
| **2** | **Evidence Layer**    | credibility & provenance                   | Source badge, texture                                  | Evidence Card, Credibility Meter                    |
| **3** | **Confidence Field**  | certainty / uncertainty                    | Card bar, fog alpha, halo                              | Confidence Halo, Uncertainty glare (P3)             |
| **4** | **Emotion Halo**      | affective context                          | Outer glow hue + pulse                                 | Emotion Halo (P1), Emotion Stream (P2)              |
| **5** | **Causality Overlay** | directional influence between criteria     | Arrow network                                          | Causality Overlay (P1)                              |
| **6** | **Timeline Thread**   | change history                             | Branch-merge timeline                                  | Snapshot tree, Kintsugi overlay                     |
| **7** | **Fork Lineage**      | alternative versions & merges              | Side ribbon, PR overlay                                | Fork ribbon, PR diff viewer                         |
| **8** | **Governance Badges** | license, contributor identity & reputation | License cluster, Reputation star                       | License badges, Reputation star                     |
| **9** | **Simulation Loop**   | contradiction → bridge → what-if outcomes  | Pulse, sliders, **Bridge Lens overlay**, outcome panel | Contradiction Pulse, Bridge Lens, Monte-Carlo panel |

> *Note:* **Bridge Lens** is one of the core UI patterns that lives **inside Dimension 9 – Simulation Loop**. Earlier drafts called the pattern itself “Dim 9”; the table above is the authoritative mapping.
## Early‑adopter narrative  
Product teams, debate clubs, and science‑methods courses use the tool as a 'critical‑thinking IDE' that records not just the code (final stance) but every commit and test.  
## [[Core Visualization Patterns]]
### Areas of Focus for Early Adoption

- Product teams stuck on feature prioritization
    
- University debate and design‑thinking courses
    
- Mediators handling polarized community issues
    
- Personal coaching where values must align with day‑to‑day actions

### Outcomes to Track

- Decision latency reduction
    
- Re‑litigation rate after new information arrives
    
- Empathy score: percentage of participants who can state opposing top reasons
    
- Percentage of contradictions resolved per session (contradiction pulse metric)
    
- Consensus corridor width over time
    
- Knowledge graph growth: new criteria nodes and evidence cards added per month
    

### Why It Changes Everything

- Transforms hidden cognitive processes into shared, inspectable objects
    
- Shrinks months of adversarial debate into minutes of visually guided co‑analysis
    
- Creates a tamper‑evident, ever‑evolving ledger of collective reasoning, fostering accountability without sacrificing anonymity
    
- Enables a pre‑AGI intelligence boom by letting narrow AI handle extraction and math while humans steer values and priorities
    
- Future‑proof: any new argument, data source, or moral lens is just another node, weight, or badge
    

### Road‑mapping Conventions
 
 All capabilities are staged across **four numbered phases**; **Phase 1 = MVP**.  
 Every doc now tags a field or UI pattern with `<!-- phase:X -->` when it ships later.

Use these pieces as the narrative foundation for pitch decks, landing pages, and early demos.

See Also:

0_Product
- [[AI Will Do Our Thinking Fear]]
- [[Defense Against Manipulation]]
- [[The Great Awakening]]
- [[Competitive Lanscape]]
- [[Executive Summary]]
- [[Glossary]]
- [[Impact and Benefits]]
- [[Requirements (MVP)]]
- [[Roadmap]]
1_Design
- [[Accessibility Spec]]
- [[Design]]
- [[Integrated Reasoning Studio]]
- [[Core Visualization Patterns]]
- [[Theming_Guide]]
- [[Tokens]]
- [[Visual Mappings]]
- [[Causality Overlay]]
- [[Ontology and Definition Lens]]
2_Architecture
- [[00_Logical_Arch]]
- [[Data Model V1]]
- [[Dataset Tracking Policy]]
- [[Extension_API]]
- [[Frontend_Component_Atlas]]
- [[Grafana and Prometheus]]
- [[Persistence]]
- [[Sync_Protocol]]
- [[IA diagram]]
3_Security
 - [[Hashing and Chain-of-Custody Explained]]
 - [[Key_Management]]
 - [[Privacy & Data-Lifecycle]]
 - [[+Context/Perspective Viz/3_Security/Privacy_Compliance]]
 - [[Threat Model]]
4_Governance
- [[License Flow]]
- [[Open Source Governance]]
- [[Roles and Permissions]]
5_DevOps
 - [[ci_matrix]]
 - [[Container_Security_Baseline]]
 - [[Disaster_Recovery]]
 - [[Event_Taxonomy]]
 - [[Observability and Dev Ops]]
 - [[Release_Process]]
 - [[Scaling_Playbook]]
 - [[INSTALL]]
6_Quality
- [[Limitations and Future Extensions]]
- [[Test_Strategy]]
7_API
- [[perspective_v1]]
- [[Monte_Carlo]]
- [[Perspective API v1]]
8_Datasets
- [[Intent Parser Dataset Guide]]
- [[Credibility Rubric]]
9_Community
- [[Backlog]]
- [[+Context/Perspective Viz/9_Community/Coding_Standards]]
- [[Contributing]]
- [[CLA]]
- [[Public‑facing README]]



```smart-chatgpt
chat-active:: 1752498884 https://chatgpt.com/c/687502c2-7770-800c-abe2-bb292412544d
chat-active:: 1752498832 https://chatgpt.com/c/6875028d-0df4-800c-84e9-50375897f026
chat-active:: 1752498794 https://chatgpt.com/c/68750267-b78c-800c-93dc-5c2f9949176f
chat-active:: 1752498772 https://chatgpt.com/c/68750250-dc64-800c-9fca-95701535f2a9
chat-active:: 1752498746 https://chatgpt.com/c/68750237-19c8-800c-8356-087bf11b101c
chat-active:: 1752498718 https://chatgpt.com/c/6875021b-097c-800c-b032-b435192c9ac7
chat-active:: 1752498693 https://chatgpt.com/c/68750202-eb54-800c-ae0b-5eb1e94367d4
chat-active:: 1752498667 https://chatgpt.com/c/687501e8-3b1c-800c-9e37-620d50e066bf
chat-active:: 1752498636 https://chatgpt.com/c/687501c8-ce8c-800c-bc40-bd69662ba12c
chat-active:: 1752498601 https://chatgpt.com/c/687501a6-3bc4-800c-8825-0c4e9f2134a5
chat-active:: 1752498562 https://chatgpt.com/c/68750180-5970-800c-9108-914d4c9a52f2
chat-active:: 1752498519 https://chatgpt.com/c/68750155-59a4-800c-9920-90697392ebe3
chat-active:: 1752414614 https://chatgpt.com/c/6873b994-65b8-800c-a7a3-822a07f6f181
chat-done:: 1752409226 https://chatgpt.com/c/6873a487-fc68-800c-b3bc-6adb7b57e572
chat-active:: 1752391678 https://chatgpt.com/c/68735ffc-3e04-800c-ad2d-61e9d5665328
chat-done:: 1752390244 https://chatgpt.com/c/68735a60-e3a8-800c-9967-d511e109cedc
chat-done:: 1752122139 https://chatgpt.com/c/686f4318-8a0c-800c-93d6-1909a364bc24
chat-done:: 1752121895 https://chatgpt.com/c/686f4224-d428-800c-8036-5a8ef4c05969
```
