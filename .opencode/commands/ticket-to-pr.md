---
description: Take a Track & Release ticket through plan -> implement -> test -> review -> draft PR
---
Execute this workflow for ticket $ARGUMENTS:

1. FETCH: Get the ticket via the trackrelease tools. If the trackrelease MCP server
   is unavailable or disabled, read tickets/$ARGUMENTS.md instead. Restate the goal,
   constraints, and acceptance criteria in your own words before doing anything else.
2. PLAN: Write an implementation plan as a checklist. If the ticket is ambiguous or
   contradictory, STOP and flag it instead of guessing.
3. BRANCH: Create branch feature/$ARGUMENTS from the current branch.
4. IMPLEMENT: Make the changes. Respect every rule in AGENTS.md.
5. TEST: Delegate to @test-author to add or extend tests covering the change, then
   run the full test suite. If @test-author does not exist, write the tests yourself.
6. REVIEW: Delegate to @reviewer (read-only) to review the full diff against the
   acceptance criteria. If it raises blocking issues, fix them and re-review
   (maximum 2 cycles, then surface the disagreement to me).
7. GATE - STOP: Present a summary: what changed, test results, review verdict,
   remaining risks. WAIT for my explicit approval before continuing. Do not proceed
   without it.
8. SHIP: On approval - commit with a conventional message referencing the ticket,
   push the branch, and open a DRAFT pull request whose description maps each
   acceptance criterion to the evidence that it is met.
9. CLOSE LOOP: Comment on the Track & Release ticket with the PR link. Ask before
   performing this write.
