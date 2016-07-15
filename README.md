<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Notifier and SMS Notifications with Twilio Notify

[![Build Status](https://travis-ci.org/TwilioDevEd/notifier-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/notifier-node)

Tag users and send group notifications with one request. Twilio alerts everyone
that matches the specified tags.

## Local Development

This project is build using [Express](http://expressjs.com/) web framework and depends on [MongoDB](https://www.mongodb.com).

1. First clone this repository and `cd` into it.

   ```bash
   $ git clone git@github.com:TwilioDevEd/notifier-node.git
   $ cd notifier-node
   ```

1. Copy the sample configuration file and edit it to match your configuration.

   ```bash
   $ cp .env.example .env
   ```

   You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
   [Twilio Account Settings](https://www.twilio.com/user/account/settings).
   You will also need a `TWILIO_NUMBER`, which you may find [here](https://www.twilio.com/user/account/phone-numbers/incoming).

   You can find your `TWILIO_NOTIFICATION_SERVICE_SID` in you console under
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

1. Text your Twilio number the name of the movie you to be subscribed. e.g.

   ```
   Rogue One
   ```

   **Note**: The available movies are "Han Solo Spinoff", "Rogue One", and "Episode VII".

1. Receive a confirmation message.

#### To Delete a Subscription

1. Text your Twilio number with "usub movie name". e.g.

   ```
   unsub Rogue One
   ```

2. Receive a confirmation message.

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
