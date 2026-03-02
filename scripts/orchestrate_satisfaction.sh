#!/bin/bash
SESSION="satisfy-11-to-50"
NUM_AGENTS=4
START_ISSUE=11

echo "Spawning session $SESSION with $NUM_AGENTS Claude Code agents..."
ntm --robot-spawn=$SESSION --spawn-cc=$NUM_AGENTS --spawn-wait

for i in $(seq 1 $NUM_AGENTS); do
  start_idx=$(( START_ISSUE + (i-1)*10 ))
  end_idx=$(( start_idx + 9 ))
  
  PROMPT="You are exclusively assigned to analyze issues $start_idx through $end_idx from /Users/steve/duyhunghd6/gmind/docs/researches/spikes/spike-issue-satisfaction-matrix.md. Read the full problem description in the Issue column for your assigned rows. Cross-reference these problems with the content contained in the PRDs and Spikes matching the column headers in the docs/ directories. Evaluate if the issue is solved or mitigated. If it is, edit your specific 10 rows in spike-issue-satisfaction-matrix.md to add a V in the corresponding column's cell. Use a precise replace_file_content or multi_replace_file_content operation. Once your 10 rows are populated, return a success status."
  
  echo "Sending prompt to pane $i for issues $start_idx to $end_idx..."
  ntm --robot-send=$SESSION --panes=$i --msg="$PROMPT"
done

echo "Waiting for agents to become idle..."
ntm --robot-wait=$SESSION --wait-until=idle

echo "All agents completed their workflow."
ntm --robot-status
