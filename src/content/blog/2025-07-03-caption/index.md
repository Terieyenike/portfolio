---
title: "How to Generate Accessible Image Captions Automatically Using Cloudinary AI"
description: "Caption Image is an app that automatically solves the problem of adding captions to your images on social media platforms like X and LinkedIn for accessibility using alt text."
pubDate: 2025-07-03
coverImage: photo-captioner.png 
tldr: "Caption Image is an app that automatically solves the problem of adding captions to your images on social media platforms like X and LinkedIn for accessibility using alt text."
slug: ai-image-captioner-cloudinary
tags: [javascript]
canonicalUrl: https://terieyenike.hashnode.dev/ai-for-photo-captions-with-cloudinary
---

Have you always found it challenging to add captions to your images on social media platforms like **X** and **LinkedIn** for accessibility using alt text?

Caption Image is an app that automatically solves this problem by analyzing your image and its details using Cloudinary AI to provide a perfect description automatically.

This guide will cover connecting the server code (API) to the client side to build a robust full-stack application for image captions.

![Caption Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1722194377373/e8d011bd-7517-4209-92e5-99b49b136fd2.png)

Want to give it a try? Check out the [Caption Image app](https://caption-image-gamma.vercel.app/).

## Before you begin

**Prerequisites**

* Basic understanding of React
    
* Node.js installed on your local machine
    
* Set up a Cloudinary [account](https://cloudinary.com/users/register_free)
    

## Creating the server

Run this command to create your project as follows:

```bash
mkdir caption-image-server
cd caption-image-server

npm init -y # initialize the folder
```

After this setup, install the following dependencies to be able to build the API:

```bash
npm install nodemon --save-dev
```

**Nodemon**: Runs your development server and monitors changes for any change in the code

```bash
npm install cors cloudinary dotenv express
```

* **cors**: it allows you to perform cross-domain requests in web applications
    
* **cloudinary**: cloud storage for image and video
    
* **dotenv**: load environment variables from a <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">.env</mark> file
    
* **express**: a node.js framework for building APIs
    

In the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">package.json</mark>, update the script objects with the following:

```json
{
  ...
  "scripts": {
    "start": "node index",
    "start:dev": "nodemon index"
  },
  ...
}
```

The <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">index</mark> represents the file used to create the backend code. Run this code to create the file:

```bash
touch index.js
```

## Environment variables

The environment variables keep our credentials secret and prevent them from being leaked when pushed to GitHub.

<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">.env</mark>

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Go to your Cloudinary dashboard, and you will have access to your values. Replace the placeholder text after the equal sign.

![Cloudinary Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1722198347861/41657017-3468-4f26-b4f8-0863ff6adfb8.jpeg)

Let's create the server. Copy-paste this code into your <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">index.js</mark> file:

```javascript
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Upload and generate image caption with Cloudinary AI",
  });
});

app.post("/api/v1/caption", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const result = await cloudinary.uploader.upload(imageUrl, {
      detection: "captioning",
    });

    res.status(200).json({
      success: true,
      caption: result.info.detection.captioning.data.caption,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to generate image caption",
      error: error.message,
    });
  }
});

const startServer = async () => {
  try {
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

startServer();
```

The code snippet shows the endpoints to the GET and POST HTTP methods. The POST method reads the image and crafts a caption. Check out [Cloudinary AI Content Analysis](https://cloudinary.com/documentation/cloudinary_ai_content_analysis_addon) to learn more about the practical use case of this technology.

**Start the development server**

In your terminal, use the command to run the server at `http://localhost:8080`.

```bash
npm run start:dev
```

## Creating the UI

Next.js is a popular framework among frontend developers because it helps create beautiful and user-friendly interfaces with reusable components.

**Installation**

As with any project, we need to create the boilerplate code that includes the files and folders with this command:

```bash
npx create-next-app@latest caption-image-client
```

During installation, some prompts will appear, allowing you to choose your preferences for the project.

Next, install these dependencies:

```bash
npm install react-toastify next-cloudinary cloudinary copy-to-clipboard
```

* **react-toastify**: for notification
    
* **next-cloudinary**: The Cloudinary package is developed for high-performance image and video delivery
    
* **copy-to-clipboard**: copy text to the clipboard
    

## Environment variables

In the same way, as with the backend code, we need to create the environment variables in the root directory with the following:

<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">.env</mark>

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name 
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

These variables will help [sign our requests](https://next.cloudinary.dev/clduploadwidget/signed-uploads#api-endpoint-to-sign-requests) because we will use Cloudinary signed uploads to send files to the cloud. The signed uploads add an extra security layer to file uploads instead of [unsigned uploads](https://support.cloudinary.com/hc/en-us/articles/360018796451-Unsigned-Uploads-Security-Considerations).

**Configuring Cloudinary**

Create a <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">lib</mark> folder in the root directory, and it, a file name <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">cloudinary.js</mark>

<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">lib/cloudinary.js</mark>

```javascript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

Next, in the App router, create a new API route with this file name, <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">api/sign-cloudinary-params/route.js</mark>:

<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">app/api/sign-cloudinary-params/route.js</mark>

```javascript
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return Response.json({ signature });
}
```

**Displaying the UI content**

Here, the home route will display the content users can interact with within the app.

<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">app/page.js</mark>

```javascript
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = async (result) => {
    setLoading(true);
    setImageUrl(result.info.secure_url);

    const response = await fetch(
      "http://localhost:8080/api/v1/caption",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: result.info.secure_url }),
      }
    );
    const data = await response.json();
    setCaption(data.caption);
    setLoading(false);
  };

  const handleCopyCaption = () => {
    copy(caption, {
      debug: true,
    });
    toast("✅ Copied");
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-8'>AI-Enhanced Photo Captioner</h1>
      <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        {imageUrl && (
          <div className='flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 bg-white rounded-lg'>
            <h2 className='text-xl font-semibold mb-2'>Uploaded Image:</h2>
            <img
              src={imageUrl}
              alt='Uploaded'
              className='w-full h-auto object-contain'
              style={{ maxHeight: "60vh" }}
            />
          </div>
        )}
        {caption && (
          <div className='flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 bg-white rounded-lg'>
            <h2 className='text-xl font-semibold mb-2'>Caption:</h2>
            <p className='select-none'>{caption}</p>
            <button
              className='px-4 py-2 bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none mt-5 cursor-pointer'
              onClick={handleCopyCaption}>
              Copy caption
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col items-center'>
        <CldUploadWidget
          signatureEndpoint='/api/sign-cloudinary-params'
          onSuccess={handleUploadSuccess}>
          {({ open }) => (
            <button
              onClick={() => open()}
              disabled={loading}
              className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400'>
              {loading ? "Loading..." : "Upload an Image"}
            </button>
          )}
        </CldUploadWidget>
      </div>
      <ToastContainer theme='dark' />
    </main>
  );
}
```

Now that we have the code for the home page clicking the "**Upload an Image**" button opens the Cloudinary widget interface that offers many options for uploading an image. Once you have selected an image, it processes the data with Cloudinary, generating both the picture and the caption side-by-side. Then, a notification pops up when you "**Copy caption**" to the clipboard for later use as an alternative text for your image.

## Tech stack

These are the following technologies that made it possible to build the AI-enhanced photo captioner:

* Next.js
    
* Cloudinary
    
* Vercel
    
* [Render](https://render.com/)
    
* Express
    

## Important links

**Caption Image**: [https://caption-image-gamma.vercel.app/](https://caption-image-gamma.vercel.app/)

**Server code**: [https://github.com/Terieyenike/caption-image-server](https://github.com/Terieyenike/caption-image-server)

**GitHub repo**: [https://github.com/Terieyenike/caption-image-client](https://github.com/Terieyenike/caption-image-client)

**API**: [https://caption-image-server.onrender.com/](https://caption-image-server.onrender.com/)

## Deployment

These two technologies managed the deployment of the app on the web.

* **Vercel**: helps deploy frontend web applications
    
* **Render**: hosting the server code (API) in the cloud
    

## Conclusion

Everything is made possible by using AI. It shows how efficiently AI is used to our advantage in creating for humans.

The AI-enhanced photo captioner is one example of the power of Cloudinary APIs and tools for building your next app. It removes the need to use other tools that provide similar services when bundling it all in Cloudinary.

Happy coding!
