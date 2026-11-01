# User story template

**As a** [role], **I need** [capability], **so that** [benefit].

## Acceptance criteria

```gherkin
Given [initial state]
When [action]
Then [expected result]
```

## Example: read an account

**As a** customer service representative, **I need** to read an account by ID, **so that** I can help a customer with accurate information.

```gherkin
Given an account exists
When I request GET /accounts/{id}
Then the response contains that account with status 200
```
