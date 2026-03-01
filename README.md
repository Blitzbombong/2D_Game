# 🌵 El Pollo Loco - 2D Platformer Game

A fast-paced 2D action-adventure game built with modern JavaScript and the HTML5 Canvas API. Join Pepe on his journey through the desert, defeat pesky chickens, and face the legendary Endboss!

## 🚀 Live Demo
Experience the game here: [blitzbombong.github.io/2D_Game/](https://blitzbombong.github.io/2D_Game/)

---

## 🏗️ Architecture & Technical Highlights
This project was developed during my journey to becoming a Frontend Developer. My main focus was on **Clean Code**, **Modular Architecture**, and **Object-Oriented Programming (OOP)**.

* **Advanced OOP Structure:** Systematic use of classes and inheritance to ensure a scalable and maintainable codebase.
* **Collision Manager (Delegation Pattern):** To keep the logic clean, I extracted the entire collision detection into a dedicated `CollisionManager`. This "Referee" class handles all interactions, reducing the complexity of the main `World` class by over 60%.
* **Custom Physics Engine:** Implementation of gravity, jump mechanics, and precise collision detection using custom hitbox offsets.
* **Modular Styling:** CSS is organized into logical modules (e.g., `layout.css`, `buttons.css`, `responsive.css`) to maintain clarity and prevent style conflicts.
* **Parallax Effect:** Multiple background layers (clouds and desert elements) moving at different speeds to create a sense of depth.



## 🎮 Controls
- **Arrow Keys (Left/Right):** Move Pepe
- **Space / Arrow Up:** Jump
- **S Key:** Throw a Bottle (requires bottles collected)

## 💻 Tech Stack
- **Logic:** JavaScript (ES6+)
- **Rendering:** HTML5 Canvas
- **Styling:** CSS3 & HTML5
- **Deployment:** GitHub Pages

## 📖 Key Learnings & Growth
This project represents a significant milestone in my development. After a one-year coding hiatus, I successfully tackled this complex project by:
- **Refactoring Monoliths:** Learning how to break down a 500+ line class into smaller, focused modules.
- **State Management:** Handling game states (Start, Play, Game Over, Win) and synchronized animations.
- **Problem Solving:** Debugging complex interaction bugs and optimizing performance through controlled intervals.

---
*Created with passion by a dedicated Frontend Developer aspirant. Ready for the first professional challenge!*
