a-->b
b-->c
c-->d
d-->e
e=>f
f=>g

# Journey 3 — Approval gate review, required-comment validation, and recovery

task_detail----->approval_queue
approval_queue----->approval_comment_required
approval_comment_required=====>validation_error
validation_error----->approval_comment_required
approval_comment_required----->approval_success
approval_error_state----->approval_queue

```text
+==============================+       +==============================+
| Task Detail                  | open  | Approval Gates Queue         |
| Header: bd-x1y2 Done         |------>| Queue list: 4 pending items  |
| RTE context visible          |       | Aggregate panel + context    |
| [Open Approval] [Back]       |       | [Approve] [Reject]           |
| Activity log + owner chips   |       | Manual override shown        |
+==============================+       +==============================+
task_detail --> approval_queue
open approval gate

+==============================+       +==============================+
| Approval Gates Queue         | back  | Task Detail                  |
| Queue list: 4 pending items  |<------| Header: bd-x1y2 Done         |
| Aggregate panel + context    |       | RTE context visible          |
| [Approve] [Reject]           |       | [Open Approval] [Back]       |
| Manual override shown        |       | Activity log + owner chips   |
+==============================+       +==============================+
approval_queue => task_detail
Back to task

+==============================+       +==============================+
| Approval Gates Queue         | press | Approval Comment Required    |
| Evidence stream reviewed     |------>| Evidence pinned              |
| Queue item remains selected  |       | Comment: [             ]     |
| [Approve] [Reject]           |       | [Submit] [Cancel]            |
| Manual override still shown  |       | Merge preview still visible  |
+==============================+       +==============================+
approval_queue --> approval_comment_required
press Approve

+==============================+       +==============================+
| Approval Comment Required    | back  | Approval Gates Queue         |
| Evidence pinned              |<------| Queue list still selected    |
| Comment: [             ]     |       | Aggregate panel + context    |
| [Submit] [Cancel]            |       | [Approve] [Reject]           |
| Merge preview still visible  |       | Manual override shown        |
+==============================+       +==============================+
approval_comment_required --> approval_queue
Cancel

+==============================+       +==============================+
| Approval Comment Required    | save  | Validation Error             |
| Empty textarea submitted     |------>| Message: Comment required    |
| Evidence stays in context    |       | Focus returned to textarea   |
| [Submit] [Cancel]            |       | [Fix comment] [Cancel]       |
| Merge preview still visible  |       | Evidence stays in context    |
+==============================+       +==============================+
approval_comment_required => validation_error
submit empty comment

+==============================+       +==============================+
| Validation Error             | fix   | Approval Comment Required    |
| Message: Comment required    |------>| Comment: Ready to merge      |
| Focus returned to textarea   |       | Evidence + PRD links checked |
| [Fix comment] [Cancel]       |       | [Submit] [Cancel]            |
| Evidence stays in context    |       | Merge preview still visible  |
+==============================+       +==============================+
validation_error --> approval_comment_required
Fix comment

+==============================+       +==============================+
| Validation Error             | back  | Approval Gates Queue         |
| Message: Comment required    |------>| Queue item remains selected  |
| Focus returned to textarea   |       | Aggregate panel + context    |
| [Fix comment] [Cancel]       |       | [Approve] [Reject]           |
| Evidence stays in context    |       | Manual override shown        |
+==============================+       +==============================+
validation_error --> approval_queue
Cancel

+==============================+       +==============================+
| Approval Comment Required    | save  | Approval Success             |
| Comment: Ready to merge      |------>| Toast: Gate approved         |
| Evidence + PRD links checked |       | Queue count 4 -> 3           |
| [Submit]                     |       | [Open task] [Stay in queue]  |
| Merge preview still visible  |       | Merge and close confirmed    |
+==============================+       +==============================+
approval_comment_required --> approval_success
submit valid comment

+==============================+       +==============================+
| Approval Success             | queue | Approval Gates Queue         |
| Queue item completed         |------>| Remaining queue still shown  |
| Merge/close action finished  |       | Aggregate panel + context    |
| [Open task] [Stay in queue]  |       | [Approve] [Reject]           |
| Toast still visible briefly  |       | Pending items now total 3    |
+==============================+       +==============================+
approval_success => approval_queue
Stay in queue

+==============================+       +==============================+
| Approval Success             | open  | Task Detail Refreshed        |
| Queue item completed         |------>| Activity: approval comment   |
| Merge/close action finished  |       | Status badge: Complete       |
| [Open task] [Stay in queue]  |       | Linked evidence preserved    |
| Toast still visible briefly  |       | [Back to Approval]           |
+==============================+       +==============================+
approval_success --> task_detail_refreshed
Open task

+==============================+       +==============================+
| Task Detail Refreshed        | back  | Approval Gates Queue         |
| Activity: approval comment   |<------| Queue list: 3 pending items  |
| Status badge: Complete       |       | Aggregate panel + context    |
| Linked evidence preserved    |       | [Approve] [Reject]           |
| [Back to Approval]           |       | Manual override shown        |
+==============================+       +==============================+
task_detail_refreshed --> approval_queue
Back to Approval

+==============================+       +==============================+
| Approval Gates Queue         | fail  | Approval Error State         |
| Queue item selected          |------>| CI/CD or GitHub unavailable  |
| Aggregate panel timed out    |       | [Retry] [Open task]          |
| [Approve] disabled           |       | [Manual Override] [Support]  |
| Queue count still visible    |       | Queue context preserved      |
+==============================+       +==============================+
approval_queue => approval_error_state
evidence fetch fails

+==============================+       +==============================+
| Approval Error State         | retry | Approval Gates Queue         |
| Reviewer chooses retry path  |------>| Evidence stream restored     |
| Queue context preserved      |       | Queue item remains selected  |
| [Retry] [Open task]          |       | [Approve] [Reject]           |
| [Manual Override] [Support]  |       | Manual override shown        |
+==============================+       +==============================+
approval_error_state --> approval_queue
Retry

+==============================+       +==============================+
| Approval Error State         | open  | Task Detail                  |
| Reviewer chooses fallback    |------>| Safe fallback to task view   |
| Queue context preserved      |       | User can leave review flow   |
| [Retry] [Open task]          |       | [Open Approval] [Back]       |
| [Manual Override] [Support]  |       | Activity log + owner chips   |
+==============================+       +==============================+
approval_error_state --> task_detail
Open task

+==============================+       +==============================+
| Approval Error State         | admin | Terminal: Override Logged    |
| Admin permission confirmed   |------>| Override reason captured     |
| Evidence service unavailable |       | Audit trail updated          |
| [Manual Override]            |       | Return to queue later        |
| Queue context preserved      |       | Admin actor recorded         |
+==============================+       +==============================+
approval_error_state => override_logged
Manual Override

+==============================+       +==============================+
| Approval Error State         | help  | Terminal: Support Requested  |
| Automated evidence blocked   |------>| Incident handed to admin     |
| Reviewer cannot continue     |       | Review paused safely         |
| [Support]                    |       | Return via queue later       |
| Queue context preserved      |       | Evidence outage recorded     |
+==============================+       +==============================+
approval_error_state --> support_requested
Contact support
```