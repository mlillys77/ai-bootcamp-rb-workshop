---
name: component-checklist
description: Checklist to apply whenever creating or reviewing a React component in this project.
---
# Component checklist

Before declaring any component done, verify:

1. Props are used consistently; no unused props.
2. Loading and error states exist for any async data.
3. Accessible: labels on inputs, `aria-label`/roles where relevant, keyboard navigation works.
4. At least one test exists and passes.
5. No inline styles; styling goes through `src/styles.css` classes.

Report the checklist status explicitly at the end of the task, item by item.
