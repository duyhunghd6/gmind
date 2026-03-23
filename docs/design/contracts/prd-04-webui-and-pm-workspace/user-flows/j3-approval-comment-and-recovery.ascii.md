# Journey 3 — Approval gate review, required-comment validation, and recovery

```text
[J3-A] Task Detail                       ──[open approval gate]──►                  [J3-B] Approval Gates Queue
+====================================+                                              +====================================+
| Task Detail                        |                                              | Approval Gates Queue               |
| Header: bd-x1y2 Done               |                                              | Queue list: 4 pending items        |
| RTE context visible                |                                              | Aggregate panel + context          |
| [Open Approval] [Back]             |                                              | [Approve] [Reject]                 |
| Activity log and owner chips       |                                              | Manual override action shown       |
+====================================+                                              +====================================+
                                                                                                 │
                                                                                                 │ ──[press Approve]──►
                                                                                                 ▼
                                                                                   [J3-C] Approval Comment Required
                                                                                   +====================================+
                                                                                   | Approval Comment Required          |
                                                                                   | Aggregate evidence pinned          |
                                                                                   | Comment: [                    ]    |
                                                                                   | [Submit approval] [Cancel]         |
                                                                                   | Policy hint under textarea         |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 │ ──[submit empty comment]──►
                                                                                                 ▼
                                                                                   [J3-D] Validation Error
                                                                                   +====================================+
                                                                                   | Validation Error                   |
                                                                                   | Message: Comment required          |
                                                                                   | Focus returned to textarea         |
                                                                                   | [Fix comment] [Cancel]             |
                                                                                   | Minimum-comment hint shown         |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 │ ──[Fix comment]──►
                                                                                                 ▼
                                                                                   [J3-C] Approval Comment Required
                                                                                   +====================================+
                                                                                   | Approval Comment Required          |
                                                                                   | Textarea ready for corrected input |
                                                                                   | Evidence and policy still visible  |
                                                                                   | User can resubmit safely           |
                                                                                   +====================================+

[J3-C] Approval Comment Required         ──[Cancel]──►                             [J3-B] Approval Gates Queue
+====================================+                                              +====================================+
| Approval Comment Required          |                                              | Approval Gates Queue               |
| Reviewer backs out before submit   |                                              | Same pending item remains selected |
| Text is discarded or preserved     |                                              | Queue and context remain visible   |
| Focus returns to queue             |                                              | [Approve] [Reject] available       |
+====================================+                                              +====================================+

[J3-C] Approval Comment Required         ──[submit valid comment]──►               [J3-E] Approval Success
+====================================+                                              +====================================+
| Approval Comment Required          |                                              | Approval Success                   |
| Comment includes gate rationale    |                                              | Toast: Gate approved               |
| Submit button enabled              |                                              | Queue count 4 -> 3                 |
| Policy requirement satisfied       |                                              | [Open task] [Stay in queue]        |
+====================================+                                              | Audit log entry visible            |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 ├──[Stay in queue]──► [J3-F] Terminal: Queue Continued
                                                                                                 │                    +====================================+
                                                                                                 │                    | Terminal: Queue Continued          |
                                                                                                 │                    | Reviewer remains in queue          |
                                                                                                 │                    | Next approval item ready           |
                                                                                                 │                    | Journey ends without exit          |
                                                                                                 │                    +====================================+
                                                                                                 │
                                                                                                 └──[Open task]──► [J3-G] Task Detail Refreshed
                                                                                                                      +====================================+
                                                                                                                      | Task Detail Refreshed              |
                                                                                                                      | Activity: approval comment         |
                                                                                                                      | Status badge: Complete             |
                                                                                                                      | [Back to Approval]                 |
                                                                                                                      | Approval timestamp shown           |
                                                                                                                      +====================================+
                                                                                                                                   │
                                                                                                                                   │ ──[Back to Approval]──►
                                                                                                                                   ▼
                                                                                                                      [J3-B] Approval Gates Queue
                                                                                                                      +====================================+
                                                                                                                      | Approval Gates Queue               |
                                                                                                                      | Reviewer can inspect next item     |
                                                                                                                      | Queue continuity preserved         |
                                                                                                                      | Context and evidence restored      |
                                                                                                                      +====================================+

[J3-B] Approval Gates Queue              ──[evidence fetch fails]──►              [J3-H] Approval Error State
+====================================+                                              +====================================+
| Approval Gates Queue               |                                              | Approval Error State               |
| Reviewer selected a pending item   |                                              | CI/CD or GitHub unavailable        |
| Evidence request is in progress    |                                              | [Manual Override] [Retry]          |
| Queue remains visible              |                                              | [Open task] [Back to queue]        |
+====================================+                                              | Contact support path listed        |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 ├──[Retry]──► [J3-B] Approval Gates Queue
                                                                                                 │
                                                                                                 ├──[Back to queue]──► [J3-B] Approval Gates Queue
                                                                                                 │
                                                                                                 ├──[Open task]──► [J3-A] Task Detail
                                                                                                 │
                                                                                                 └──[Manual Override]──► [J3-I] Terminal: Manual Override Logged
                                                                                                                      +====================================+
                                                                                                                      | Terminal: Manual Override Logged   |
                                                                                                                      | Override reason captured           |
                                                                                                                      | Audit trail updated                |
                                                                                                                      | Escalation complete                |
                                                                                                                      +====================================+
```