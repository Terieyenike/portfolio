---
title: "Mastering Vim: How This Timeless Editor Can 10x Your Developer Productivity"
description: "Discover how mastering Vim can dramatically boost your coding speed and productivity. Learn why developers still swear by Vim in 2025 and how to get started."
slug: "vim-boost-productivity"
tags: ["Vim"]
pubDate: "2025-05-03"
updatedDate: 2025-05-04
coverImage: "./vim.jpg"
tldr: Mastering Vim boosts productivity with fast, keyboard-only editing. Learn key modes (normal, insert, visual), navigation (hjkl, w, b), editing (i, a, x), text changes (d, c), new lines (o, O), and motions (gg, G, $). The article also covers Vim setup in VS Code. Embrace a keyboard-first workflow for efficient coding.
---

Have you ever been coerced to try Vim from other developers? Well, it might be the best thing after sliced bread with toppings to go with it.

When I started coding many years ago, I didn't initially opt to use the various commands like the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">i</mark>, <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">u</mark>, <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">j</mark>, <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">k</mark> commands to boost my productivity with Vim but leaned to the traditional IDEs that allowed the mix of the use of the keyboard and mouse to interact with my code. 

In this article, we will explore the use of Vim embedded in your code editor to unlock lightning fast coding and supercharge your experience allowing you to work efficiently and effectively without the mouse dependency. 

## What is Vim?

Vim, a developer productivity tool, is a free and open-source text editor. With Vim, every action from navigating through lines of code to making intricate edits, happens completely with the keyboard meaning, you do not need to stop coding, grab the mouse, and then get back to coding.

> Have a keyboard-first coding mindset.

## Installing Vim Extension

Before using the commands available in Vim, you need to prepare your development environment. If you're using VS Code as your preferred editor, search for the [Vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) and install it.

Once intalled, head to your editor <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">settings</mark> and configure Vim in the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">.json</mark> file to have a good user experience when coding. 

Copy and paste the following into your <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">settings.json</mark>:

```
"vim.smartRelativeLine": true,
 "vim.showMarksInGutter": true,
 "vim.useSystemClipboard": true,
 "vim.leader": "<space>",
 "vim.highlightedyank.enable": true,
 "vim.hlsearch": true,
 "vim.searchHighlightColor": "#734d00",
 "vim.searchMatchColor": "#ffaa00",
 "vim.searchMatchTextColor": "#000000"
 ```

 Reload the developer window for the settings to take effect using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">cmd+shift+p</mark> and type <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">>reload</mark>.

 <img src="/reload.png" alt="reload the code editor window" />

 ## Edit Faster with Motions and Modes

 For this section, you will get familiar with using the following:
 
 - the normal mode to navigate around the editor 
 - the insert mode to type and change your code 
 - save and quit 
    - <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:w</mark>: write (save) the file 
    - <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:q</mark>: quit 
    - <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:q!</mark>: quit without saving changes 
    - <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">:wq</mark>: write then quit

### Core Motions in Vim

For Vim users, knowing these four keystrokes would afford you the chance to move the cursor in the forward, backward, downward, and upward direction.

```text
         ↑
         k
     ← h   l →
         j
         ↓
```

Combining the characters <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">j</mark> and <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">k</mark> with a number, you can jump to a different line number. For instance using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">8k</mark>, moves the cursor eight places from the current position upwards. 

In addition to character movements, the cursor can be moved across entire words:

- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">e</mark>: move to the end of the current word
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">w</mark>: move to the start of the next word
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">b</mark>: move to the start of the previous word

Motions can also be applied to moving to a particular text using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">w</mark> and <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">b</mark> with a specified number. For example to move to the 5th word in a sentence, try pressing <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">5w</mark>.

__P.S.__: To enter the normal mode, always press the __ESC__ key on the keyboard which prevents edit in this mode.

<video width="640" height="360" controls>
  <source src="https://res.cloudinary.com/terieyenike/video/upload/v1746205562/vim_ehh2pv.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Basic Editing in Vim

The __insert mode__ allows you to enter characters in the text editor by pressing <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">i</mark>. Once the edit is complete, press the __ESC__ key to return to normal mode. Another way to enter the insert mode is to use <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">a</mark> for append which moves the cursor in front of a character. 

Note that not all editing requires entering the insert mode. Sometimes, still in normal mode, using <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">x</mark> will delete the character under the cursor. Other important Vim commands to notice are <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">r</mark> which replace the character under the cursor and <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">R</mark> (replace mode) overwrites characters instead of inserting them.

```bash
// go from this 
----
----
// to this using R
====
====
```

### Deleting and Changing Text in Vim

Just like your regular delete key on your keyboard, Vim has a special command (<mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">d</mark>) that handles deleting text combined with a [motion](http://localhost:4321/vim-boost-productivity/#core-motions-in-vim) based on cursor movement. 

- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">dw</mark>: delete from the cursor until the next word
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">de</mark>: delete from the cursor until the end of the current word
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">diw</mark>: deletes the entire word regardless of the cursor position. That is delete inner word

If you make any mistake, remember to press the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">u</mark> key to undo the edit and <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">&lt;CTRL-R&gt;</mark> to redo edits.

Now, let's delete lines with the movements __j__ and __k__.

- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">dd</mark>: delete the current line
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">dk</mark>: delete the current line and the previous line
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">dj</mark>: delete the current line and the next line
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">d2j / d2k</mark>: delete the current line and the next and/or previous 2 lines 

To change a text, use the <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">c</mark> command which automatically enters the insert mode after deleting text. The same way where <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">d</mark> was used above, <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">c</mark> can be used like <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">ciw</mark> or <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">ce</mark>.

### Create a New Line

Use either of the following:

- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">o</mark>: creates a new line
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">O</mark>: adds a new line above the cursor

Think of it like "__adding__" a new line

### Yank (Copy and Paste) in Vim

In Vim, copying is referred to as __yanking__ and it is denoted with <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">y</mark> to yank text based on a motion.

- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">yy</mark>: yank the current line 
- <mark style="background-color: #ffd54f; color: #1a1a1a; padding: 2.72px 5.44px; border-radius: 4px">yiw</mark>: yank the current word 
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">y3j</mark>: yank the current line with the next 3 lines

Now, the question on your lips, how do you paste the __yanked text__? Use the <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">p</mark> key. And if you try duplicating the next line, use <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">yyp</mark>.

To duplicate a text multiple times after yanking, attach a number to the <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">p</mark> command, like this <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">yy3p</mark>.

> In Vim, when yank is performed, it is saved in a __Register__ which is a mini clipboard that stores small bits of information about the state of the editor.

### Mastering Large Motions in Vim for Faster Navigation

Apart from the small cursor movements using <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">hjkl</mark> and <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">w</mark>, Vim has additional commands used for covering a large distance. 

- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">gg</mark>: move the cursor to the first line of the document
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">G</mark>: move the cursor to the last line

Similar to <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">j</mark> and <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">k</mark>, <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">+</mark> moves down a line and position the cursor at the first character in that line. While <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">-</mark> goes a line up.

Other commands worth trying are:

- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">0</mark>: moves to the very beginning of a line
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">^</mark>: move to the first non-blank character
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">0w</mark>: the cursor jumps to the beginning of the sentence
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">$</mark>: move to the end of the line
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">&lt;CTRL-E&gt;</mark>: To scroll down
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">&lt;CTRL-Y&gt;</mark>: To scroll up
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">&lt;CTRL-D&gt;</mark>: move the cursor down half a page
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">&lt;CTRL-U&gt;</mark>: move the cursor up half a page
- <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">zz</mark>: center the window to the current cursor position

__P.S.__: As with other Vim commands, scrolling can be combined with a number to scroll multiple lines. Use <mark style="background-color: #ffd54f; padding: 2.72px 5.44px; border-radius: 4px">10CTRL-E</mark> to scroll down 10 lines.

## Conclusion

Practice, practice, and practice!!!

Using Vim is all about building muscle memory and not by memorizing the keystrokes. The more your hands are on the keyboard, the better for you as your coding workflow improves drastically. 
