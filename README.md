- [feeels](#feeels)

  - [Roadmap](#roadmap)
    - [account](#account)
    - [entry management](#entry-management)
    - [emotion selection](#emotion-selection)
    - [UI](#ui)
    - [backend](#backend)
    - [bugs](#bugs)

# feeels

For checking in with yourself.

Built using React, D3.js, Next, Chakra-UI, and MongoDB, with serverless auth supported by Passport. Hosted on Now.

## Roadmap

### account

- [ ] Email for profile updates

### entry management

- [ ] beeswarm overflow (too many bees!)
- [ ] User can choose visibility of entries (when social functionality is in place)

### emotion selection

### UI

- [ ] sunburst colors better represent emotions

### backend

- [ ] shrink user object:
  - [ ] store color as FE look-up, not in DB
  - [ ] store emotion array as enum

### bugs

- [ ] handle failure to log out (and ensure all error cases are handled)
- [ ] year date wrong in emotion list detail
- [ ] loading UI for login/signup has disappeared
