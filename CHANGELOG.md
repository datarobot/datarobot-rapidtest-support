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

- Fixed a bug where sending empty strings in a csv upload threw errors - https://datarobot.atlassian.net/browse/RSS-15
- Changed “Request an account” behavior to not show the form after a successful request - https://datarobot.atlassian.net/browse/RSS-14
-  Installed & configured things so I can deploy the site to production


## v0.0.13
- Botched deploy 😬

## v0.0.14

- Added geocoding to update map when address is typed in
  - ![yay](https://media.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy.gif)	
- Fixed "Cancel button does nothing in Edit Sites, if you didn’t hit Save Info button" - [RSS-24](https://datarobot.atlassian.net/browse/RSS-24)
- Fixed "Uploading sites… message doesn’t disappear after getting errors" - [RSS-23](https://datarobot.atlassian.net/browse/RSS-23)
- Added CAPTCHA to request account page - [RSS-20](https://datarobot.atlassian.net/browse/RSS-20)  
  - ![](https://user-images.githubusercontent.com/45003409/111834816-84efa000-88ca-11eb-8a27-e450afa0d55c.gif)
- Fixed "Upload a list of accounts shows Uploaded 2 accounts! message despite getting errors in response" - [RSS-26](https://datarobot.atlassian.net/browse/RSS-26)
- Fixed "Each string is repeated many times in .csv preview" - [RSS-25](https://datarobot.atlassian.net/browse/RSS-25)

## v0.0.15
- Deployed debug code to help Seattle Children's

## v0.0.16
- Handling duplicate site errors - [RSS-31](https://datarobot.atlassian.net/browse/RSS-31)
- Fixed the issue where Seattle Children's couldn't upload csv files.

## v0.0.17
- Added disable site confirmation - [RSS-1](https://datarobot.atlassian.net/browse/RSS-1)
- Fixed "Upload a list of accounts shows Uploaded 2 accounts! message despite getting errors in response" - [RSS-26](https://datarobot.atlassian.net/browse/RSS-26)
- Fixed "Validate that uploaded csv has at least one row" - [RSS-37](https://datarobot.atlassian.net/browse/RSS-37)
- Converted table to new component, fixes [RSS-22](https://datarobot.atlassian.net/browse/RSS-22)
- Added "District" field to forms & table - [RSS-18](https://datarobot.atlassian.net/browse/RSS-18)

## v0.0.18
- Updated FAQ - [RSS-35](https://datarobot.atlassian.net/browse/RSS-35)
- Fixed captcha telling people they're not real - [RSS-40](https://datarobot.atlassian.net/browse/RSS-40)

## v1.0.0  🥳
- Updated to version 1, because why not?
- Added batch activating/deactivating accounts and sites [RSS-17](https://datarobot.atlassian.net/browse/RSS-17)
- Prevent non-program admin users from logging in.

## v1.0.1
- Fixed site upload confirmation issue - [RSS-50](https://datarobot.atlassian.net/browse/RSS-50)
- Added the "Edit site" button that I accidentally removed in the last release - [RSS-51](https://datarobot.atlassian.net/browse/RSS-51)

## v1.0.2
- Multi-program login! [RSS-44](https://datarobot.atlassian.net/browse/RSS-44)

## v1.0.3
- Start a program page implemented [RSS-2](https://datarobot.atlassian.net/browse/RSS-2)

## v1.0.4
- Disable email field on edit account form - [RSS-54](https://datarobot.atlassian.net/browse/RSS-54)
- Fix map overlapping footer on smaller screens - [RSS-53](https://datarobot.atlassian.net/browse/RSS-53)

## v1.0.5
- Add 'Date Added' column - [RSS-55](https://datarobot.atlassian.net/browse/RSS-55)
- Update account requests to work with other programs - [RSS-56](https://datarobot.atlassian.net/browse/RSS-56)
- Upload Confirmation - [RSS-10](https://datarobot.atlassian.net/browse/RSS-10)
- Program Admin Tab - [RSS-58](https://datarobot.atlassian.net/browse/RSS-58)
- Updated "Account Status" field - [RSS-60](https://datarobot.atlassian.net/browse/RSS-60)
- Added re-send account email feature - [RSS-61](https://datarobot.atlassian.net/browse/RSS-61)

## v1.0.6
- Reverted styling on account activation buttons

## v1.0.7
- Fixed "scrollbar not working on list upload for account" - [RSS-65](https://datarobot.atlassian.net/browse/RSS-65)
- Bumped pagination size from 10 to 50 - [RSS-64](https://datarobot.atlassian.net/browse/RSS-64)
- Replaced 'Testers' with 'Test Operators' - [RSS-67](https://datarobot.atlassian.net/browse/RSS-67)

## v1.0.8
- Fixed "resend email action not working" - [RSS-76](https://datarobot.atlassian.net/browse/RSS-76)

## v1.0.9
- Fixed broken links in FAQ - [RSS-81](https://datarobot.atlassian.net/browse/RSS-81)
- Implemented docs site

## v1.0.11
- Fix nginx config

## v1.0.12
- https://github.com/datarobot/doc-brown/pull/62

## v1.0.13
- Batch actions! [RSS-78](https://datarobot.atlassian.net/browse/RSS-78)