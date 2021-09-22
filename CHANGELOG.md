# Changelog

## v0.0.1 thru v0.0.10

- Lots of things happened.

  

## v0.0.11

- Fixed school routing issue
- Fixed issue with csv upload requiring unrequired fields
- Added user role to header under the user's name, to match the design
- Updated success action for activating/deactivating a site or account, making it more user friendly
- Added a direct email link to the contact & suggest improvement pages until we can work out a way to send it from the app
- Fixed a bug where adding a site errors out
- Turned off the ability to edit the "Demo Site" site



## v0.0.12

- Fixed a bug where sending empty strings in a csv upload threw errors
- Changed “Request an account” behavior to not show the form after a successful request 
-  Installed & configured things so I can deploy the site to production


## v0.0.13
- Botched deploy 😬

## v0.0.14

- Added geocoding to update map when address is typed in
  - ![yay](https://media.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy.gif)	
- Fixed "Cancel button does nothing in Edit Sites, if you didn’t hit Save Info button"
- Fixed "Uploading sites… message doesn’t disappear after getting errors"
- Added CAPTCHA to request account page  
  - ![](https://user-images.githubusercontent.com/45003409/111834816-84efa000-88ca-11eb-8a27-e450afa0d55c.gif)
- Fixed "Upload a list of accounts shows Uploaded 2 accounts! message despite getting errors in response"
- Fixed "Each string is repeated many times in .csv preview"

## v0.0.15
- Deployed debug code to help Seattle Children's

## v0.0.16
- Handling duplicate site errors
- Fixed the issue where Seattle Children's couldn't upload csv files.

## v0.0.17
- Added disable site confirmation
- Fixed "Upload a list of accounts shows Uploaded 2 accounts! message despite getting errors in response"
- Fixed "Validate that uploaded csv has at least one row"
- Converted table to new component, fixes
- Added "District" field to forms & table

## v0.0.18
- Updated FAQ
- Fixed captcha telling people they're not real

## v1.0.0  🥳
- Updated to version 1, because why not?
- Added batch activating/deactivating accounts and sites
- Prevent non-program admin users from logging in.

## v1.0.1
- Fixed site upload confirmation issue
- Added the "Edit site" button that I accidentally removed in the last release

## v1.0.2
- Multi-program login!

## v1.0.3
- Start a program page implemented

## v1.0.4
- Disable email field on edit account form
- Fix map overlapping footer on smaller screens

## v1.0.5
- Add 'Date Added' column
- Update account requests to work with other programs
- Upload Confirmation
- Program Admin Tab
- Updated "Account Status" field
- Added re-send account email feature

## v1.0.6
- Reverted styling on account activation buttons

## v1.0.7
- Fixed "scrollbar not working on list upload for account"
- Bumped pagination size from 10 to 50
- Replaced 'Testers' with 'Test Operators'

## v1.0.8
- Fixed "resend email action not working"

## v1.0.9
- Fixed broken links in FAQ
- Implemented docs site

## v1.0.11
- Fix nginx config

## v1.0.12
- Page sorting

## v1.0.13
- Batch actions!

## v1.0.14
- Add count of selected table rows
- Fix broken request site route