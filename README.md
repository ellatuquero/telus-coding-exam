## Telus Coding Exam
This repository contains a Node.js application written in TypeScript.

## Prerequisites
Make sure you have `Node.js` & `NPM` installed on your system.

## Getting Started
1. Clone the repository:
> git clone https://github.com/ellatuquero/telus-coding-exam.git
2. Navigate to the project directory:
> cd telus-coding-exam
3. Install dependencies using Yarn:
> npm install

## Import Coding Exam.postman_collection (sent on email)
1. Access Import Options:
* In the Postman app, look for the "Import" button in the top left corner. It usually looks like an arrow pointing upwards.
2. Choose Import Source:
* Click on "Import," and a dialog box will appear. Postman allows you to import collections from various sources, including a file, a URL, or from the Postman API. Choose the appropriate option based on where your collection is located.
* If your collection is in a file, select the "File" tab, and click on "Choose Files" to locate and select your Postman Collection JSON file on your computer.
* If your collection is hosted online, select the "Link" tab, and paste the URL of the Postman Collection JSON file.
* If your collection is stored in the Postman cloud, you can select the appropriate option and provide the necessary credentials or API key.
3. Review and Confirm:
* After selecting the source and providing the required information, click on the "Import" button. Postman will process the import and add the collection to your workspace.
4. Verify Imported Collection:
* Once the import is complete, you should see the imported collection listed in your Postman workspace. You can click on the collection to explore its requests, folders, and other details.


Once the import is complete, you should see the imported collection listed in your Postman workspace. You can click on the collection to explore its requests, folders, and other details.
That's it! You have successfully imported a Postman collection into your Postman workspace. Now you can use the imported requests and folders to interact with APIs and perform various tasks within Postman.

## API's Available
> POST    /v1/ims/subscriber/add
> GET     /v1/ims/subscriber
> GET     /v1/ims/subscriber/:phoneNumber
> UPDATE  /v1/ims/subscriber/:phoneNumber
> DELETE  /v1/ims/subscriber/:phoneNumber


#### Developer(s):
- Ella Tuquero