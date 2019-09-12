# Lab: A Static Frontend for TaskMaster

## Overview

JSON is cool and all, but humans struggle with understanding it. Let’s admit our human failings by creating a web frontend with React to view this data in a more user-friendly way. 🤖

## Resources

-   [The AWS Java SDK](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/welcome.html)
-   [Configure S3 for Static Sites](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html)

## Setup

Create a new repo  `taskmaster-frontend`  to hold your React app. Use  `create-react-app`  to generate a React app there.

For any necessary backend changes, continue working in your  `taskmaster`  repo, deployed via Elastic Beanstalk.

## Feature Tasks

-   A user should be able to visit the homepage of your React app and see the list of all tasks available in the database.
-   React should be well-factored into at least 2 components.
-   The homepage should have reasonable styling and layout. (Nothing too fancy, but it shouldn’t make the user cringe.)
-   A user should be able to find that homepage on the Internet, deployed as a static site using S3.

> Written with [StackEdit](https://stackedit.io/).