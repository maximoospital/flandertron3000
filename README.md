# Flandertron3000

**Flandertron3000** is an interactive web app that allows you to create personalized "Daily Ned Flanders" images, inspired by the twitter meme.

## Features

- **Custom Backgrounds**: Upload your own background image or use the default one.
- **Draggable Flanders Characters**: Choose from a variety of Flanders images to add to your creation.
- **Dynamic Text Editing**: Add custom titles and subtitles to your design.
- **Real-Time Preview**: See your creation in real time as you make edits.
- **Downloadable Output**: Save your masterpiece as an image file with integrated JPEG compression for funsies.

## Installation

To run Flandertron3000 locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/flandertron3000.git
   ```

2. Navigate to the project directory:
   ```bash
   cd flandertron3000
   ```

3. Open the `index.html` file in your preferred browser:
   ```bash
   open index.html
   ```
   Personally i'd recommend serving it to avoid CORS issues, you can serve the file using a simple HTTP server, such as Python's built-in server:
   ```bash
   python3 -m http.server
   ```
   Then, visit `http://localhost:8000` in your browser.

## Usage

1. Open the web app in your browser.
2. Upload a custom background image or use the default one.
3. Choose a Flanders character from the gallery.
4. Customize the title and subtitle text fields.
5. Drag and position the Flanders character on the canvas.
6. Click "Descargar" to download your creation as a `.jpeg` file.

## Built With

- **HTML5** and **CSS3** for structure and styling.
- **JavaScript** for interactivity and canvas rendering.
- **Tailwind CSS** for modern styling.

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

**Flandertron3000** was created by [Máximo Ospital](https://maximoospital.xyz/).

Enjoy flanderizing your world with **Flandertron3000**! Oakley Doakley!
