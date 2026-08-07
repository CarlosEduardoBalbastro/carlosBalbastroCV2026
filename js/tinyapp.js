const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
// const qualitySlider = document.getElementById('quality');
const qLabel = document.getElementById('q-label');
const previewList = document.getElementById('preview-list');
const processArea = document.getElementById('process-area');
const MAX_WIDTH = 1920; 

// --- 1. EVENTOS DE CARGA ---

// Click para abrir el selector de archivos
dropArea.onclick = () => fileInput.click();

// Manejar archivos seleccionados por el botón
fileInput.onchange = (e) => handleFiles(e.target.files);

// Eventos de Arrastrar y Soltar (Drag & Drop)
dropArea.ondragover = (e) => { 
    e.preventDefault(); 
    dropArea.style.borderColor = 'var(--accent)'; 
};
dropArea.ondragleave = () => { 
    dropArea.style.borderColor = '#333'; 
};
dropArea.ondrop = (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#333';
    handleFiles(e.dataTransfer.files);
};

// --- 2. PROCESAMIENTO ---

function handleFiles(files) {
    if (files.length === 0) return;
    
    processArea.classList.remove('hidden');
    dropArea.style.display = 'none';
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => compressAndRender(img, file.name);
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function compressAndRender(img, fileName) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    let width = img.width;
    let height = img.height;

    // Redimensión ancho maximo 1920px
    if (width > MAX_WIDTH) {
        const ratio = MAX_WIDTH / width;
        width = MAX_WIDTH;
        height = img.height * ratio;
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    
    // EXPORTACIÓN A WEBP 
    // const quality = qualitySlider.value / 100;
    const quality = 0.8; // Valor fijo de calidad para simplificar
    const dataUrl = canvas.toDataURL('image/webp', quality);
    
    // Corregir extensión del nombre del archivo
    const nameWithoutExt = fileName.split('.').slice(0, -1).join('.');
    const finalName = nameWithoutExt + ".webp";

    // Crear el ID único para la tarjeta
    const id = 'img-' + Math.random().toString(36).substr(2, 9);
    
    const div = document.createElement('div');
    div.className = 'preview-item';
    div.id = id;

    div.innerHTML = `
        <div class="card-image">
            <button class="btn-delete" onclick="removeItem('${id}')">×</button>
            <img src="${dataUrl}">
        </div>
        <div class="card-info">
            <p title="${finalName}">${finalName}</p>
            <a href="${dataUrl}" download="${finalName}" class="btn-download">Descargar</a>
        </div>
    `;
    previewList.appendChild(div);
}

// --- 3. FUNCIONES DE INTERFAZ ---

function removeItem(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
    // Si borramos la última foto, volvemos a mostrar la zona de carga
    if (previewList.children.length === 0) resetApp();
}

function resetApp() {
    previewList.innerHTML = '';
    processArea.classList.add('hidden');
    dropArea.style.display = 'block';
    fileInput.value = '';
}

// Botón "Limpiar Todo"
// document.getElementById('clear-all').onclick = resetApp;
const clearAllBtn = document.getElementById('clear-all');
if (clearAllBtn) {
    clearAllBtn.onclick = resetApp;
}

// Actualizar el número del slider de calidad
// qualitySlider.oninput = () => { 
//     qLabel.innerText = qualitySlider.value; 
// };