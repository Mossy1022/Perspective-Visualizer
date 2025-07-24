<!-- phase:1 -->
**Scoring formula**
`credibility = source_weight × provenance_multiplier × recency_decay`

|Factor|Options|Weight / Multiplier|
|---|---|---|
|source_weight|peer‑review 1.0, gov‑stat 0.9, expert‑blog 0.7, anecdote 0.3, unknown 0.1||
|provenance_multiplier|original 1.0, 2nd‑hand 0.8, 3+ chain 0.6||
|recency_decay|`max(0.4, 1.0 – years_old × 0.05)`||

Scores render as:

- >  0.75 green
    
- 0.4 – 0.75 amber
    
- < 0.4 red
    

Rubric ships as `credibility_rubric.json` and can be forked per domain library.