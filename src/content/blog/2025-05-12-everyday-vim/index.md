---
title: "Level Up Your Vim Game: Daily Practices for Developers"
description: "Boost your productivity with daily Vim practices. Learn essential motions, search tricks, and editing commands to master Vim like a pro."
slug: "vim-daily-practice"
tags: ["Vim"]
pubDate: 2025-05-12
coverImage: ./vim_skills.jpg
tldr: This article dives deeper into mastering Vim by focusing on advanced motions, search techniques, and powerful editing commands. Learn to move quickly using character motions like f{char}, t{char}, and their backward equivalents F{char} and T{char}. Enhance your text manipulation skills with search (/, ?) and edit (c, d) combos. Explore practical commands to join lines (J), change case (g~, gU, gu), wrap text neatly (gq, gw), and repeat edits efficiently using the . command. Perfect for developers looking to turn everyday Vim use into a powerful editing workflow.
---

Most developers know Vim but few master it in depth. What if that daily practice could turn your muscle memory into superpowers?

As I have covered in this <a href='https://www.iamteri.tech/vim-boost-productivity/' rel="noopener noreferrer">article about mastering Vim and boosting your productivity</a>, we will go deeper into how to perform searches in Vim, using other editing commands, master the visual mode, which helps with selecting multiple chunks of text, and much more. 

Let's get started!

## Character Motions in Vim

To move between specific characters, using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">f{char}</mark> will move forward onto the next occurrence of <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">{char}</mark>. When paired with <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">c</mark> or <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">d</mark> allows for the changing or deletion of text. A typical example is using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">cfNn&lt;ESC&gt;</mark> to change a variable, "favouriteColor" to "color".

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1746533951/character_motion_kq9nse.mp4" type="video/mp4">
</video>

To repeat something similar backwards, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">F{char}</mark>. Position the cursor after the word "__Color__", then use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">dFN</mark> to delete the word.

Another important character motion to consider, is the use of <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">t{char}</mark> which moves the cursor until the next occurrence of <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">{char}</mark>. Let's try it out with <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">ct"</mark>.

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1746535277/character_motion_nlweri.mp4"type="video/mp4">
</video>

Also similarly to <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">F</mark>, <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">T{char}</mark> will move backwards with the cursor positioned rightly.

## Search Smarter in Vim: Find What You Need Fast

In Vim, searching is one of the most important features which enables you to quickly jump to the specified text without interrupting your work. Searching uses the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">/</mark> key followed by the text you want to find.
<!-- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px"> -->
If your search term has more than a single match, you can use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">n</mark> to go to the next search result. Likewise the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">N</mark> key helps you find the previous match.

P.S.: Hit the enter key after using the search query, __/&lt;word&gt;&lt;ENTER&gt;__.

<video width="640" height="360" controls>
  <source src="https://res.cloudinary.com/terieyenike/video/upload/v1747001482/searching_in_vim_with_lhk4ly.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Another way of searching is using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">?</mark> followed by some text to search backwards from your cursor position. From the previous exercise, try searching to find a word with the search query __?&lt;word&gt;&lt;ENTER&gt;__.

To delete an entire chunk of text, searching in Vim is not limited to finding things, you can use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">c</mark> or <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">d</mark> to <a href="https://www.iamteri.tech/vim-boost-productivity/#deleting-and-changing-text-in-vim">change or delete text</a>.

<video width="640" height="360" controls>
  <source src="https://res.cloudinary.com/terieyenike/video/upload/v1747003655/search_-_change_or_delete_qtukdc.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

From the video, the word "Brandenburg" will be removed by typing __/brand&lt;ENTER&gt;__ and afterwards use __d/gate&lt;ENTER&gt;__ to delete everything from the cursor but not including the next search result.

P.S.: Vim is smart to identify words even if it is not typed in full.

### Finding Occurrences

To find occurences of a word under the cursor, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">*</mark> and to search backwards, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">#</mark>.

<video width="640" height="360" controls>
  <source src="https://res.cloudinary.com/terieyenike/video/upload/v1747005272/search_with_star_and_hash_v2djdw.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Miscellaneous Vim Edit Commands

There are other editing commands available to use in Vim. Like the use of <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">J</mark> to join lines together. 

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1747007524/Joining_lines_together_ac2qm8.mp4" type="video/mp4">
</video>

### Changing the Case

With Vim, it is possible to change the case of letters and words. A good use case study will be with naming variable and function names. Here are some of the commands you need to know:

- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">~</mark>: Change an entire sentence by holding ~
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">g~{motion}</mark>: To change a case based on motion, means to effect a change to a particular word. 
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">g~$</mark>: It is kind of similar with function of ~
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">g~~</mark>: This command is responsible for changing the case of an entire line
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">gU{motion}</mark>: Useful to convert all the letters to uppercase.

    ```bash
    # gUw
    const favorite_snack = "Chin chin" # const FAVORITE_SNACK = "Chin chin"
    ```

    Similarly if you want to revert to lowercase, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">guiw</mark> 

### Wrappig Text

It is well known that editors come with the feature of wrapping text once it reaches a certain length. For unusual length, Vim can automatically wrap lines using using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">gw{motion}</mark> or <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">gq{motion}</mark> based on your configuration.

```bash 
When working with plaintext documentation or commit messages, it's helpful to reformat lines so they wrap neatly at a certain width. Vim makes this simple with the gq command, which can be applied to a motion, a visual selection, or even an entire paragraph. This is particularly useful for keeping files tidy and readable, especially when dealing with tools or environments that don't support dynamic word wrapping.
```

To format this sentence, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">gw2j</mark> (Neovim) or <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">gq2j</mark> (VSCode)

### Repeating

Let's try something unique. To change a word in multiple instances it appears, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">.</mark> to repeat the last edit in this order.

- Search the word. For instance <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">/book</mark>
- Use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">n</mark> to the first occurrence of the word "book"
- change the first occurrence to "magazine" using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">ciw</mark>
- Repeatedly press <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">n.</mark> (n dot) to change the remaining occurrence of the word "book"

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1747037824/repeating_saggat.mp4" type="video/mp4">
</video>

## Vim Visual Mode and Substitute Explained

Want to select multiple chunks of text visually at once? The visual mode is the designated feature for this function in Vim. Vim has two types of visual modes:

- __Line__: It selects entire lines
- __Block__: It allows you draw a rectangle around characters and selects everything within

Now, to enter the visual mode, use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">v{motion}</mark> like <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">v8j</mark> (block) or <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">vw</mark> (line).

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1747041300/visual_mode_nvkour.mp4" type="video/mp4">
</video>

For replacing text, we use __Substitute__. Substitute is a command that must be entered on the Vim command line. To __substitute__, position the cursor on the beginning of the word, and then open the Vim command line (positioned at the bottom of the screen) with <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:</mark>. Once it is opened, type <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">s/OLD/NEW</mark>.

P.S.: The __OLD__ is the original text while the __NEW__ is the text you want to see exchanged.

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1747043242/substitute_lmy4uz.mp4" type="video/mp4">
</video>

__Note__: If you want to replace all the occurrences of repeated words, append <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">/g</mark> (global) flag to the end like this <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">s/OLD/NEW/g</mark>.

Another way of replacing text in a whole file is using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:%s/OLD/NEW/g</mark>.

Let's substitute text within a specified area by using the visual mode. Use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:s/&#92;%Vbook/novel</mark> (<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:s/&#92;%VOLD/NEW</mark>)

<video width="640" height="360" controls>
<source src="https://res.cloudinary.com/terieyenike/video/upload/v1747046281/change_all_occurrences_f7hdqb.mp4" type="video/mp4">
</video>

The <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">\%V</mark> constrains the substitution to the visual selection.
