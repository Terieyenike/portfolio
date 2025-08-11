---
title: "Build a Serverless Distance Calculator on AWS (Amplify, Lambda, API Gateway & DynamoDB)"
description: "Learn how to build a serverless distance calculator web app on AWS using Amplify, Lambda, API Gateway, IAM, and DynamoDB. Step-by-step tutorial with code, deployment, and real-world geolocation example."
slug: "aws-serverless-distance-calculator"
tags: ["aws"]
pubDate: 2025-08-11
coverImage: ./aws.png
tldr: Build a serverless distance calculator on AWS in one project! Learn Amplify, Lambda, API Gateway, IAM & DynamoDB.
---

AWS is the world's leading cloud provider, and its cloud computing infrastructure has an [85% adoption rate in the enterprise segment](https://www.sortlist.co.uk/datahub/reports/aws-statistics/). With its multitude of services, you can combine all the pieces to create an application that you could use in the real world. 

This project will show you how to design and build a web application from scratch with five AWS services, Amplify, Lambda, IAM, API Gateway, and DynamoDB. The concept behind this app is to calculate the distance in kilometers between two points using the latitude and longitude of a location.

![final look of the distance calculator application](https://res.cloudinary.com/terieyenike/image/upload/v1754921833/aws%20calculator%20distance%20app/image8.jpg)

Let’s get started!

## Prerequisites

- Basic AWS knowledge 
- Python
- HTML, CSS, and JavaScript

## What is AWS Amplify?

AWS Amplify allows for the hosting and deployment of frontend applications which is crucial in the software development lifecycle of products. In this scenario, we will have to deploy our project to Amplify, similar to other deployment providers like Vercel, Netlify, Render, and so on.

## Setting up of Web App

To deploy our web app to Amplify, create a new folder called TwoPointOh and within the directory, add an <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">index.html</mark> file.

Copy and paste this code:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Two Point Oh!</title>
</head>

<body>
    Two Point Oh!
</body>
</html>
```

Now, let’s compress (zip) this file to deploy this app without git. Head over to your Amplify console and click on the __create new app__ button.

![create new app](https://res.cloudinary.com/terieyenike/image/upload/v1754921830/aws%20calculator%20distance%20app/image7.jpg)

Select the option “Deploy without Git” and click the Next button

![deploy app without git](https://res.cloudinary.com/terieyenike/image/upload/v1754921822/aws%20calculator%20distance%20app/image4.jpg)

Next, give your app a name and drag and drop the zipped <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">index.html</mark> file.

![drag and drop file](https://res.cloudinary.com/terieyenike/image/upload/v1754921861/aws%20calculator%20distance%20app/image17.jpg)

At the bottom of the page, click on the “Save and deploy” button to start the deployment process. After the process is complete, Amplify will generate a public URL.

## What is AWS Lambda?
The Lambda function will handle the math calculation for the distance effortlessly.

AWS Lambda function is a bit of code that runs serverlessly in response to some trigger. For example, if you upload a picture to an S3 Bucket, it could trigger a Lambda function to process a thumbnail of that picture. 

To put it in layman's terms, AWS Lambda is code that runs when you need it, meaning you don’t have to set up servers to run the code, it just happens automatically behind the scenes. 

Let’s write the Python code that uses the math library to do the calculations we need between our two points. In your AWS console, select the Lambda service and __create a function__.

![lambda function](https://res.cloudinary.com/terieyenike/image/upload/v1754921852/aws%20calculator%20distance%20app/image14.jpg)

To create the function, we need to give it a name and select __Python 3.13__ for the runtime which is the language the function will be written. After that, make sure to click on the Create function button as you can leave the other default option.

![create function](https://res.cloudinary.com/terieyenike/image/upload/v1754921886/aws%20calculator%20distance%20app/image25.jpg)

In the code tab, copy and paste this code into the text editor:

```python
# import the JSON utility package
import json
# import the Python math library
import math

# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime


# define the handler function that the Lambda service will use an entry point
def lambda_handler(event, context):

# get the latitude and longitude of the two points from the event
    lat1 = float(event['lat1'])
    lon1 = float(event['lon1'])
    lat2 = float(event['lat2'])
    lon2 = float(event['lon2'])

# convert the latitude and longitude to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

# calculate the distance in kilometers using the Haversine formula
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = 6371 * c  # Earth's radius in km

# return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Your result is ' + str(distance))
    }
```

The code snippet showcases a function called <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">def lambda_handler(event, context)</mark> which the lambda service uses as an entry point to pull out the different parameters that get sent to the function when it is invoked.

![deploy the lambda function](https://res.cloudinary.com/terieyenike/image/upload/v1754921842/aws%20calculator%20distance%20app/image11.jpg)

With the code in place, deploy the code by clicking the __Deploy__ button. After this is complete, switch to the __Test__ tab where the user will pass in four numbers of the location both their latitude and longitude values. 

![test event](https://res.cloudinary.com/terieyenike/image/upload/v1754921816/aws%20calculator%20distance%20app/image2.jpg)

Paste this JSON code below in the __Event JSON__ section to represent the four different values that normally will come in from the user interface. Or better still use your values.

```json
{
  "lat1": "47.5975024",
  "lon1": "-122.3492781",
  "lat2": "40.7579787",
  "lon2": "-73.9900326"
}
```

Now click on the __Save__ button and after that the Test button to configure a test. Run this test to ensure things are calculated properly.

The executed code should look like this with the response of the status code and the body, the result of the distance.

![lambda response for the calculation](https://res.cloudinary.com/terieyenike/image/upload/v1754921879/aws%20calculator%20distance%20app/image23.jpg)

To invoke the math functionality, we need a public endpoint or URL that can be called to trigger that function to run which will make use of API Gateway. The core service in AWS that you can use to build, deploy, and manage APIs.

## API Gateway

On your API Gateway console, create a new API and select the __REST API__ option. Click on Build.

![create REST API](https://res.cloudinary.com/terieyenike/image/upload/v1754921889/aws%20calculator%20distance%20app/image26.jpg)

Next, create a method.

![API Gateway](https://res.cloudinary.com/terieyenike/image/upload/v1754921876/aws%20calculator%20distance%20app/image22.jpg)

With the new page opened after clicking the Create method, select the method type from the dropdown and choose __POST__ (as we will be passing data from the user). The integration type should be __Lambda function__ and beside your region, type in the name or alias of the lambda function you created earlier as shown:

![create method](https://res.cloudinary.com/terieyenike/image/upload/v1754921836/aws%20calculator%20distance%20app/image9.jpg)

Scroll and click the __Create method__ button.

Before deploying the API, we need to enable CORS. Click on the __/__ path and the __Enable CORS__ button.

![enable CORS](https://res.cloudinary.com/terieyenike/image/upload/v1754921858/aws%20calculator%20distance%20app/image16.jpg)

The function of enabling CORS (cross-origin resource sharing) is to give the web application on one origin or domain the right to access resources on another origin or domain. Since Amplify will be running on one domain and our Lambda function on another to access the API Gateway, the resource is required for this step. So in essence, we need to work across those domains or origins.

Under the __Access-Control-Allow-Methods__ section, select the POST method and save it.

![CORS settings](https://res.cloudinary.com/terieyenike/image/upload/v1754921824/aws%20calculator%20distance%20app/image5.jpg)

Let’s deploy the API. When you click on the Deploy API button, a pop-up appears, and on the Stage option dropdown, select New Stage and give it a Stage name. Make sure to click on Deploy so it generates the invoke URL.

![deploy API pop-up](https://res.cloudinary.com/terieyenike/image/upload/v1754921855/aws%20calculator%20distance%20app/image15.jpg)

Copy the URL as we will be needing it later in our HTML page. The invoke URL should look something like this:

```bash
https://410ddoituf.execute-api.eu-west-1.amazonaws.com/dev
```

The last step of this setup is to validate the API by testing it. On the resources tab, select the POST method and __Test__ tab while entering your four values of the latitude and longitude.

![api gateway test](https://res.cloudinary.com/terieyenike/image/upload/v1754921873/aws%20calculator%20distance%20app/image21.jpg)

Scroll the page to click on the __Test__ button and you will see the result of your response.

![response body from the api test](https://res.cloudinary.com/terieyenike/image/upload/v1754921840/aws%20calculator%20distance%20app/image10.jpg)

## AWS DynamoDB, its Identity and Access Management (IAM)
Most real-world applications these days have databases and incorporating a database to persist and store the math result and return it to the user is crucial for dynamic apps. Also, we will learn how to permit Lambda to write to the database.

DynamoDB is a key-value NoSQL database that is generally light-weight than relational databases where you have to set up the schema ahead of time and the relationships.

Back in your console, navigate to DynamoDB and create a new table as shown with the table name and the partition key, as ID by selecting the __Tables__ tab or clicking the __Create table__ button.

![DynamoDB table details](https://res.cloudinary.com/terieyenike/image/upload/v1754921867/aws%20calculator%20distance%20app/image19.jpg)

Within the Additional Info section copy the ARN (amazon resource name) which identifies the table within AWS. 

![amazon resource name info](https://res.cloudinary.com/terieyenike/image/upload/v1754921846/aws%20calculator%20distance%20app/image12.jpg)

Next, navigate back to the Lambda function to update the code to be able to save values into DynamoDB. Before doing that, let’s configure the permission by clicking on the __Role name__.

![configuration and permissions](https://res.cloudinary.com/terieyenike/image/upload/v1754921849/aws%20calculator%20distance%20app/image13.jpg)

It opens in a new tab. Click __Add permissions__ and from the dropdown select __Create inline policy__.

![IAM](https://res.cloudinary.com/terieyenike/image/upload/v1754921819/aws%20calculator%20distance%20app/image3.jpg)

Copy and paste this permission statements code in the JSON editor:

```json
{
"Version": "2012-10-17",
"Statement": [
    {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": [
            "dynamodb:PutItem",
            "dynamodb:DeleteItem",
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:Query",
            "dynamodb:UpdateItem"
        ],
        "Resource": "YOUR-TABLE-ARN" # replace with the ARN of the table you created earlier
    }
    ]
}
```

![IAM rules](https://res.cloudinary.com/terieyenike/image/upload/v1754921814/aws%20calculator%20distance%20app/image1.jpg)

Now, paste your copied ARN you copied previously. Click on Next to give it a policy name and create the policy.

![review and create](https://res.cloudinary.com/terieyenike/image/upload/v1754921870/aws%20calculator%20distance%20app/image20.jpg)

To check the data is saved to DynamoDB, under the code tab of the Lambda function, paste this updated code:

```python
# import the JSON utility package
import json
# import the Python math library
import math

# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table(‘YOUR DYNAMODB DATABASE NAME’)
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# define the handler function that the Lambda service will use an entry point
def lambda_handler(event, context):

# get the latitude and longitude of the two points from the event
    lat1 = float(event['lat1'])
    lon1 = float(event['lon1'])
    lat2 = float(event['lat2'])
    lon2 = float(event['lon2'])

# convert the latitude and longitude to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

# calculate the distance in kilometers using the Haversine formula
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = 6371 * c  # Earth's radius in km

# write result and time to the DynamoDB table using the object we instantiated and save response in a variable
    response = table.put_item(
        Item={
            'ID': str(distance),
            'LatestGreetingTime':now
            })

# return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Your result is ' + str(distance))
    }
```

This code block will write the distance and the time of the calculation in DynamoDB. Replace the value of the name of your database within the parenthesis:

<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">table = dynamodb.Table('TwoPointOhDB')</mark>

The same process of deploying and testing is necessary to ensure it sends the correct data to DynamoDB.

![deploy lambda function](https://res.cloudinary.com/terieyenike/image/upload/v1754922021/aws%20calculator%20distance%20app/image27.jpg)

![lambda function test](https://res.cloudinary.com/terieyenike/image/upload/v1754921864/aws%20calculator%20distance%20app/image18.jpg)

In your console, go back to DynamoDB to check if the distance and time were saved in the database by clicking on the __Explore table items__.

![DynamoDB explore table items](https://res.cloudinary.com/terieyenike/image/upload/v1754922024/aws%20calculator%20distance%20app/image28.jpg)

![stored items in the database](https://res.cloudinary.com/terieyenike/image/upload/v1754921882/aws%20calculator%20distance%20app/image24.jpg)

It worked! The data saved successfully in the DynamoDB table.

## Connect Amplify and the API Gateway

The only thing left to have a proper working app is a connector between Amplify and API Gateway. In your <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">index.html</mark>, copy-paste this new updated piece of code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two Point Oh!</title>
    <style>
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background-color: #FFFFFF;
            color: #000000;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        header {
            text-align: center;
            padding: 20px;
            background-color: #0056D2;
            color: #FFFFFF;
        }

        header h1 {
            margin: 0;
            font-size: 2rem;
        }

        header p {
            margin-top: 10px;
            font-size: 1rem;
        }

        main {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .form-container {
            max-width: 500px;
            width: 100%;
            background-color: #F8F9FA;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .form-container label {
            display: block;
            margin-top: 10px;
            font-size: 1rem;
            color: #333333;
        }

        .form-container input {
            width: calc(100% - 20px);
            padding: 10px;
            margin-top: 5px;
            font-size: 1rem;
            border: 1px solid #CCCCCC;
            border-radius: 4px;
            color: #333333;
            background-color: #FFFFFF;
        }

        .form-container button {
            width: 100%;
            margin-top: 20px;
            padding: 10px;
            font-size: 1rem;
            background-color: #0056D2;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .form-container button:hover {
            background-color: #003C99;
        }

        #result {
            margin-top: 20px;
            font-size: 1.2rem;
            color: #0056D2;
        }

        footer {
            text-align: center;
            padding: 10px;
            background-color: #0056D2;
            color: #FFFFFF;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 1.5rem;
            }

            header p {
                font-size: 0.9rem;
            }

            .form-container {
                padding: 15px;
            }

            .form-container button {
                font-size: 0.9rem;
            }

            footer {
                font-size: 0.8rem;
            }
        }
    </style>
    <script>
        const callAPI = (lat1, lon1, lat2, lon2) => {
            if (!lat1 || !lon1 || !lat2 || !lon2) {
                document.getElementById('result').innerText = "Please fill in all fields.";
                return;
            }

            const headers = new Headers({ "Content-Type": "application/json" });
            const body = JSON.stringify({ lat1, lon1, lat2, lon2 });

            fetch("YOUR API GATEWAY ENDPOINT", {
                method: 'POST',
                headers,
                body,
            })
                .then(response => response.text())
                .then(result => {
                    const parsedResult = JSON.parse(result).body;
                    document.getElementById('result').innerText = `Distance: ${parsedResult} km`;
                })
                .catch(error => {
                    document.getElementById('result').innerText = "Error calculating distance. Please try again.";
                    console.error(error);
                });
        };
    </script>
</head>
<body>
    <header>
        <h1>Two Point Oh!</h1>
        <p>Calculate the distance between two points using their latitude and longitude.</p>
    </header>
    <main>
        <div class="form-container">
            <label for="lat1">Latitude 1:</label>
            <input type="text" id="lat1" placeholder="Enter Latitude 1">

            <label for="lon1">Longitude 1:</label>
            <input type="text" id="lon1" placeholder="Enter Longitude 1">

            <label for="lat2">Latitude 2:</label>
            <input type="text" id="lat2" placeholder="Enter Latitude 2">

            <label for="lon2">Longitude 2:</label>
            <input type="text" id="lon2" placeholder="Enter Longitude 2">

            <button type="button" onclick="callAPI(
                document.getElementById('lat1').value,
                document.getElementById('lon1').value,
                document.getElementById('lat2').value,
                document.getElementById('lon2').value
            )">Calculate</button>
            <div id="result"></div>
        </div>
    </main>
    <footer>
        &copy; 2024 Two Point Oh! All rights reserved.
    </footer>
</body>
</html>
```

The following occurs in this block of code:

- There is a form to accept the user input and a button __calculate__ that when the user clicks it, the four values are interpreted with the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">callAPI</mark> method
- The <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">callAPI</mark> method will take the latitude and longitude numbers as parameters and send your request using your API Gateway endpoint which should be replaced in the parenthesis of the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">fetch</mark> method

With this complete, zip the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">index.html</mark> again and head to your Amplify console to drag and drop the updated file to redeploy the existing app by clicking on the __Deploy updates__ button.

![deploy updates](https://res.cloudinary.com/terieyenike/image/upload/v1754921827/aws%20calculator%20distance%20app/image6.jpg)

For the complete source code, check out the [GitHub repository](https://github.com/Terieyenike/aws-web-app).

## Wrapping Up
In conclusion, AWS is a complete suite for delivering outstanding applications that make a difference in how you approach development. Using the combination of all these AWS services in one project, you are guaranteed continuous integration and continuous delivery or deployment without downtime when it matters most because of its infrastructure and cloud computing capabilities. 

Whatever you do as a developer or an enterprise solution, AWS scales and manages your work efficiently from initialization to deployment without the hassle of managing your infrastructure. 
