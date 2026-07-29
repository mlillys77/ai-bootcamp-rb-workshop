# TICKET-00 — Make the dashboard better

Users are complaining. Make the dashboard better.

---
GOAL: Users see a friendly message instead of an empty table when 

their filter matches nothing. 

 

CONTEXT: src/App.jsx renders TeamTable; selecting a status with no 

matches currently shows table headers over an empty body. Users 

report the dashboard "looks broken." 

 

CONSTRAINTS: 

- Do not change the filtering logic or the API. 

- Keep the chart visible; hide only the empty table headers. 

- Message text: "No items match this filter." plus a hint to 

  reset to "all". 

 

ACCEPTANCE CRITERIA: 

- [ ] Empty result set shows the message; non-empty shows the 

      table exactly as before. 

- [ ] A component test covers both states. 

- [ ] All existing tests still pass. 

 

VERIFY WITH: npm test 
