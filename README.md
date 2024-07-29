<!-- <img src="https://github.com/kortrk/library/assets/7088687/e56b5364-da15-4284-8f6f-514e7efc4db4" width=1000 height=100> -->
<!-- <img src="https://github.com/kortrk/library/assets/7088687/4324533d-728e-4308-b113-cdec5ebeed40" width=1000 height=100> -->
<img src="https://github.com/kortrk/library/assets/7088687/34d6c7cf-a112-429d-b3d7-b7f4af73d294" width=1000 height=100>

# Library
A single-page app using Angular, Ruby on Rails, and PostgreSQL.

<!-- ![Cornerstone Library Cover Image](https://github.com/user-attachments/assets/b3d21a6c-5d34-40c3-abf8-b166d988a6eb) -->
<img src="https://github.com/user-attachments/assets/b3d21a6c-5d34-40c3-abf8-b166d988a6eb" width=300>

[Check out a static live demo of the frontend here!](https://kortrk.github.io/library-gh-pages)

([v1.0.0](https://kortrk.github.io/library-gh-pages) is the old code it was built with)

## How to Run
- Start Docker Desktop on your machine.
- `git clone` this project and go to its top level (same place as this README)
- `./build_env.sh` (takes about 3 minutes)
- `./run_env.sh`
- Access <b>localhost:4200</b> on your browser

## Notable Features
- To give the librarian more control, I built a "visible" flag that can be checked or unchecked to temporarily hide a book from customers. For example, a librarian can start creating a new book but hide it until it's physically in the building and ready to borrow.
- For demo purposes, you can click <b>Go</b> on an empty search and get all the books.
   - This is a trick to help you see how it works, but wouldn't be a feasible thing to do with a real library website.
- JSON Web Tokens are the core of the authorization and authentication process. They are stored in HttpOnly cookies.
