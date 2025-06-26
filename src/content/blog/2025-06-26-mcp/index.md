---
title: "How to Scrape Any Website Using Bright Data MCP Server and AI Agents"
description: "Learn how to scrape websites like Nike.com using Bright Data's MCP Server and AI agents. This guide shows how to build a real-time web scraper with LangChain, Claude, FastAPI, and Next.js. No scraping blocks, no complex infrastructure."
slug: "bright-data-mcp"
tags: ["mcp", "case study"]
pubDate: 2025-06-26
coverImage: ./mcp.png
tldr: Built a real-time sneaker scraper using Bright Data’s MCP Server, LangChain, Claude, and FastAPI. This tool bypasses scraping blocks and extracts live Nike product data like price, availability, and links. Code is open-source.
---

I came across the Bright Data MCP (model context protocol) server from [Noah Kalson](https://www.linkedin.com/in/noahkalson/) and decided to try my hands on this incredible tool.

[Bright Data MCP server](https://github.com/brightdata/brightdata-mcp) is a unified, AI-ready access layer that provides seamless, scalable, and unblockable access to any public websites enabling LLMs, agents and apps to access, discover and extract web data in real-time.

The common problem I found worthy of solving was to scrape a public website like [Nike.com](https://nike.com) particularly sneakers for men and have it readily available for users to view showcasing details like the product item, price, availability, and product link.

![nike product website data](https://res.cloudinary.com/terieyenike/image/upload/v1750845646/nike_product_data_website_ehjwf2.png)

So I built this all in one tool that allows for the extraction of its data without any restriction because with Bright Data MCP, your applications can effortlessly retrieve both static and dynamic content from across the web, eliminating the need to build or maintain complex data scraping and unlocking infrastructure.

For technologies used in the project, I used:

- **LangChain**: allows for the connection to multiple servers or LLM providers at the same time.

- **LangGraph**: connects to all the request points or nodes together.

- **next.js**: A React framework for building scalable and user friendly UI interface

- **Python**: for the backend using FastAPI.

- **Claude** (Anthropic API): to orchestrate multiple operation.

Here's a walkthrough of the final product [in this demo](https://www.youtube.com/watch?v=MyqapmW76N4&pp=ygUYc2NyYXBpbmcgYnJpZ2h0IGRhdGEgbWNw).

The code is public for viewing, check [this repo](https://github.com/Terieyenike/bright_data).

Let me know what you think by giving [this app](https://bright-two.vercel.app/) a try and searching for your favorite Nike sneaker.
