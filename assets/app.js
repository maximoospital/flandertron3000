const flanders = document.querySelectorAll('.overflow-x-scroll img');
const fileNameDisplay = document.getElementById("file-name");
const backgroundCanvas = document.getElementById("backgroundCanvas");
const draggableCanvas = document.getElementById("draggableCanvas");
const textCanvas = document.getElementById("textCanvas");
const bgCtx = backgroundCanvas.getContext("2d");
const fgCtx = draggableCanvas.getContext("2d");
const textCtx = textCanvas.getContext("2d");
const backgroundImage = new Image();
const flandersImage = new Image();
let day = document.querySelector('select');
let subtitle = document.querySelector('.subtitulo');
let zoom = document.querySelector('.zoom');
let selectedImage = 'assets/flanders/fondo.jpg';
let selectedFlanders = flanders[0];
let dayOfWeek = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
let backgroundScale = 1.0;
let flandersPos = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
draggableCanvas.addEventListener('mousedown', startDrag);
draggableCanvas.addEventListener('mousemove', drag);
draggableCanvas.addEventListener('mouseup', endDrag);
draggableCanvas.addEventListener('mouseleave', endDrag);

function startDrag(event) {
  const rect = draggableCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (
    x >= flandersPos.x &&
    x <= flandersPos.x + flandersImage.width &&
    y >= flandersPos.y &&
    y <= flandersPos.y + flandersImage.height
  ) {
    isDragging = true;
    dragStart = { x: x - flandersPos.x, y: y - flandersPos.y };
  }
}

function drag(event) {
  if (isDragging) {
    const rect = draggableCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    flandersPos.x = x - dragStart.x;
    flandersPos.y = y - dragStart.y;

    renderForeground();
  }
}

function endDrag() {
  isDragging = false;
}

window.onload = () => {
  // Reset
  day.value = dayOfWeek.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + ' de';
  subtitle.value = 'Flanders';
  zoom.value = 1;
  selectFlanders(flanders[0]);
  selectedImage = 'assets/flanders/fondo.jpg';
  renderAll();
};

day.addEventListener('change', (event) => {
    day.value = event.target.value;
  });

  subtitle.addEventListener('input', (event) => {
    subtitle.value = event.target.value;
  });

  zoom.addEventListener('input', (event) => {
    backgroundScale = event.target.value;
  });

  function scrolearLeft() {
    const gallery = document.querySelector('.overflow-x-scroll');
    if (gallery) {
      gallery.scrollBy({ left: -150, behavior: 'smooth' });
    }
  }

  function scrolearRight() {
    const gallery = document.querySelector('.overflow-x-scroll');
    if (gallery) {
      gallery.scrollBy({ left: 150, behavior: 'smooth' });
    }
  }

  flanders.forEach(image => {
    image.addEventListener('click', () => {
      selectFlanders(image);
    });
  });

  function selectFlanders(clickedImage) {
    flanders.forEach(img => img.classList.remove('selected'));
    clickedImage.classList.add('selected');
    selectedFlanders = clickedImage;
    renderForeground();
  }

  function handleFileChange(event) {
    const fileInput = event.target;
    if (
      fileInput.files &&
      fileInput.files.length > 0 &&
      fileInput.files[0].type.includes("image")
    ) {
      fileNameDisplay.textContent = fileInput.files[0].name;

      // Create an object URL from the file and store it
      selectedImage = URL.createObjectURL(fileInput.files[0]);

      // Draw on the canvas (the fix is to handle loading in drawCanvas)
      renderBackground();
    } else {
      fileNameDisplay.textContent = "Nada seleccionado";
    }
  }
  
  function renderBackground() {
    backgroundImage.src = selectedImage;

    bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    bgCtx.drawImage(backgroundImage, 0, 0, 390, 390);
    // Instead of stretching the image, fill the canvas with it

    bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

    // Original image size
    const imgWidth = backgroundImage.width;
    const imgHeight = backgroundImage.height;

    // Calculate aspect ratios
    const canvasRatio = 1.0;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight;

    // Decide whether to base on width or height to "cover" the canvas
    if (imgRatio > canvasRatio) {
      // Image is "wider" than the canvas
      // -> match the canvas height
      drawHeight = 390 * backgroundScale;
      drawWidth = drawHeight * imgRatio;
    } else {
      // Image is "taller" (or equal ratio) compared to the canvas
      // -> match the canvas width
      drawWidth = 390 * backgroundScale;
      drawHeight = drawWidth / imgRatio;
    }

    // Center the image
    // If no offset is desired, offset is half the difference
    // If you want user panning, add backgroundOffset.x / .y
    const x = (390 - drawWidth) / 2;
    const y = (390 - drawHeight) / 2;

    bgCtx.drawImage(backgroundImage, x, y, drawWidth, drawHeight);
  }

  function renderForeground() {
    flandersImage.src = selectedFlanders.src;

    fgCtx.clearRect(0, 0, draggableCanvas.width, draggableCanvas.height);
    fgCtx.drawImage(
      flandersImage,
      flandersPos.x,
      flandersPos.y,
      flandersImage.width,
      flandersImage.height
    );
  }

  function renderText() {
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

    textCtx.font = "60px Impacto";
    textCtx.textAlign = "center";
    textCtx.fillStyle = "white";

    textCtx.strokeStyle = 'black';
    textCtx.lineWidth = 1;
    textCtx.fillStyle = 'white';

    textCtx.fillText(day.value.toUpperCase(), 195, 55); 
    textCtx.strokeText(day.value.toUpperCase(), 195, 55);

    textCtx.font = "50px Impacto";

    textCtx.fillText(subtitle.value.toUpperCase(), 195, 385);
    textCtx.strokeText(subtitle.value.toUpperCase(), 195, 385);
  }

  function renderAll() {
    renderBackground();
    renderForeground();
    renderText();
  }

  backgroundImage.onload = () => {
    renderBackground();
    renderForeground();
    renderText();
  };

  flandersImage.onload = () => {
    renderForeground();
  };

  function download() {
    const link = document.createElement("a");
    link.download = "Flandertron3000-"+day.value.replace(' ', '-')+"-"+subtitle.value.replace(' ', '-')+".png";

    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    combinedCanvas.width = 390;
    combinedCanvas.height = 390;

    combinedCtx.drawImage(backgroundCanvas, 0, 0);
    combinedCtx.drawImage(draggableCanvas, 0, 0);
    combinedCtx.drawImage(textCanvas, 0, 0);

    const imageURL = combinedCanvas.toDataURL('image/jpeg', 0.2);
    
    link.href = imageURL;
    link.click();
  }
