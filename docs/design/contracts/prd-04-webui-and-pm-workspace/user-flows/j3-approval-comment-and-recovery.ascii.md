# Journey 3 - Approval gate review, required-comment validation, and recovery

```text
+========================+       +========================+
| Task Detail            |       | Approval Gates Queue   |
| Back to Tasks          |       | Breadcrumb Approval    |
| bd-x1y2 needs approval |       | Pending approvals list |
| Activity shows gate    |       | Aggregate evidence     |
| Open approval          |       | Approve Reject Back    |
+========================+       +========================+
Task Detail ──[open approval]──► Approval Gates Queue

+========================+       +========================+
| Approval Gates Queue   |       | Task Detail            |
| Breadcrumb Approval    |       | Back to Tasks          |
| Pending approvals list |       | bd-x1y2 needs approval |
| Aggregate evidence     |       | Activity shows gate    |
| Approve Reject Back    |       | Open approval          |
+========================+       +========================+
Approval Gates Queue ──[back]──► Task Detail

+========================+       +========================+
| Approval Gates Queue   |       | Approval Comment Reqd  |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Pending approvals list |       | Approval comment       |
| Aggregate evidence     |       | Textarea required      |
| Approve Reject Back    |       | Submit Cancel          |
+========================+       +========================+
Approval Gates Queue ──[click approve]──► Approval Comment Reqd

+========================+       +========================+
| Approval Comment Reqd  |       | Validation Error       |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Approval comment       |       | Comment required       |
| Textarea required      |       | Field highlighted      |
| Submit Cancel          |       | Fix comment Retry      |
+========================+       +========================+
Approval Comment Reqd ──[submit empty comment]──► Validation Error

+========================+       +========================+
| Validation Error       |       | Approval Comment Reqd  |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Comment required       |       | Approval comment       |
| Field highlighted      |       | Textarea required      |
| Fix comment Retry      |       | Submit Cancel          |
+========================+       +========================+
Validation Error ──[fix comment]──► Approval Comment Reqd

+========================+       +========================+
| Approval Comment Reqd  |       | Approval Gates Queue   |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Approval comment       |       | Pending approvals list |
| Textarea required      |       | Aggregate evidence     |
| Submit Cancel          |       | Approve Reject Back    |
+========================+       +========================+
Approval Comment Reqd ──[cancel]──► Approval Gates Queue

+========================+       +========================+
| Approval Comment Reqd  |       | Approval Comment Draft |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Approval comment       |       | Comment filled         |
| Textarea required      |       | Ready to approve       |
| Submit Cancel          |       | Submit Return          |
+========================+       +========================+
Approval Comment Reqd ──[type comment]──► Approval Comment Draft

+========================+       +========================+
| Approval Comment Draft |       | Approval Success       |
| Breadcrumb Approval    |       | Approval saved         |
| Comment filled         |       | Queue count reduced    |
| Ready to approve       |       | Merge requested        |
| Submit Return          |       | Open task Queue        |
+========================+       +========================+
Approval Comment Draft ──[submit approval]──► Approval Success

+========================+       +========================+
| Approval Comment Draft |       | Approval Comment Reqd  |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Comment filled         |       | Approval comment       |
| Ready to approve       |       | Textarea required      |
| Submit Return          |       | Submit Cancel          |
+========================+       +========================+
Approval Comment Draft ──[return]──► Approval Comment Reqd

+========================+       +========================+
| Approval Success       |       | Task Detail Refreshed  |
| Approval saved         |       | Back to Tasks          |
| Queue count reduced    |       | bd-x1y2 approved       |
| Merge requested        |       | Activity updated       |
| Open task Queue        |       | Open approvals         |
+========================+       +========================+
Approval Success ──[open task]──► Task Detail Refreshed

+========================+       +========================+
| Task Detail Refreshed  |       | Approval Gates Queue   |
| Back to Tasks          |       | Breadcrumb Approval    |
| bd-x1y2 approved       |       | Pending approvals list |
| Activity updated       |       | Aggregate evidence     |
| Open approvals         |       | Approve Reject Back    |
+========================+       +========================+
Task Detail Refreshed ──[open approvals]──► Approval Gates Queue

+========================+       +========================+
| Task Detail Refreshed  |       | Approval Complete      |
| Back to Tasks          |       | Review session closed  |
| bd-x1y2 approved       |       | Audit trail preserved  |
| Activity updated       |       | Next approver notified |
| Open approvals         |       | End state recorded     |
+========================+       +========================+
Task Detail Refreshed ──[close review]──► Approval Complete

+========================+       +========================+
| Approval Gates Queue   |       | Approval Error State   |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Pending approvals list |       | Approval failed        |
| Aggregate evidence     |       | CI service unavailable |
| Approve Reject Back    |       | Retry Override Help    |
+========================+       +========================+
Approval Gates Queue ──[service failure]──► Approval Error State

+========================+       +========================+
| Approval Error State   |       | Approval Gates Queue   |
| Breadcrumb Approval    |       | Breadcrumb Approval    |
| Approval failed        |       | Pending approvals list |
| CI service unavailable |       | Aggregate evidence     |
| Retry Override Help    |       | Approve Reject Back    |
+========================+       +========================+
Approval Error State ──[retry]──► Approval Gates Queue

+========================+       +========================+
| Approval Error State   |       | Override Logged        |
| Breadcrumb Approval    |       | Manual override saved  |
| Approval failed        |       | Admin audit entry      |
| CI service unavailable |       | Queue item resolved    |
| Retry Override Help    |       | Back to queue Open task|
+========================+       +========================+
Approval Error State ──[override]──► Override Logged

+========================+       +========================+
| Override Logged        |       | Approval Gates Queue   |
| Manual override saved  |       | Breadcrumb Approval    |
| Admin audit entry      |       | Pending approvals list |
| Queue item resolved    |       | Aggregate evidence     |
| Back to queue Open task|       | Approve Reject Back    |
+========================+       +========================+
Override Logged ──[back]──► Approval Gates Queue

+========================+       +========================+
| Approval Error State   |       | Support Requested      |
| Breadcrumb Approval    |       | Support ticket created |
| Approval failed        |       | Ticket SUP-204         |
| CI service unavailable |       | Approval paused        |
| Retry Override Help    |       | Back to queue Open task|
+========================+       +========================+
Approval Error State ──[request support]──► Support Requested

+========================+       +========================+
| Support Requested      |       | Approval Gates Queue   |
| Support ticket created |       | Breadcrumb Approval    |
| Ticket SUP-204         |       | Pending approvals list |
| Approval paused        |       | Aggregate evidence     |
| Back to queue Open task|       | Approve Reject Back    |
+========================+       +========================+
Support Requested ──[back]──► Approval Gates Queue
```