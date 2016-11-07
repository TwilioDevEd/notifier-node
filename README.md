<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Notifier and SMS Notifications with Twilio Notify

[![Build Status](https://travis-ci.org/TwilioDevEd/notifier-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/notifier-node)

Tag users and send group notifications with one request. Twilio alerts everyone
that matches the specified tags.

## Local Development

This project is build using [Express](http://expressjs.com/) web framework.

1. First clone this repository and `cd` into it.

   ```bash
   $ git clone git@github.com:TwilioDevEd/notifier-node.git
   $ cd notifier-node
   ```

1. Install dependencies.

   ```
   $ npm install
   ```

1. Copy the `.env.example` file to `.env`, and edit it including your credentials
   for the Twilio API (found at https://www.twilio.com/console).
   You will also need a [Twilio Number](https://www.twilio.com/console/phone-numbers/incoming).

   You can find your `TWILIO_NOTIFICATION_SERVICE_SID` in your Twilio console under
   [services](https://www.twilio.com/console/notify/services).

   Run `source .env` to export the environment variables.

1. Make sure the tests succeed.

   ```bash
   $ npm test
   ```

1. Start the server.

   ```bash
   $ npm start
   ```

1. Check it out at [http://localhost:3000](http://localhost:3000).

## How to Demo

#### For Help Instructions

1. Text your Twilio number "help me". e.g.

   ```
   Help me
   ```

1. Receive a message with instructions.

#### To Create a Subscription

1. Text your Twilio number the name of the tag that you want to subscribe to. e.g.

   ```
   Rogue One
   ```

   **Note**: The available movies are "Han Solo Spinoff", "Rogue One", and "Episode VII".

1. Receive a confirmation message.

#### To Delete a Subscription

1. Text your Twilio number with "unsub tag". e.g.

   ```
   unsub Rogue One
   ```

2. Receive a confirmation message.

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
