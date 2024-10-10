// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create a simple cube as a background element
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Chat application logic
let currentUser = '';
let currentRoom = 'General';
const rooms = ['General'];

document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('username-input').value.trim();
    if (username) {
        currentUser = username;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('chat-screen').style.display = 'flex';
        updateRoomList();
    }
});

document.getElementById('create-room-button').addEventListener('click', () => {
    const roomName = document.getElementById('new-room-input').value.trim();
    if (roomName && !rooms.includes(roomName)) {
        rooms.push(roomName);
        updateRoomList();
        joinRoom(roomName);
    }
});

document.getElementById('send-button').addEventListener('click', sendMessage);

function updateRoomList() {
    const roomList = document.getElementById('rooms');
    roomList.innerHTML = '';
    rooms.forEach(room => {
        const li = document.createElement('li');
        li.textContent = room;
        li.addEventListener('click', () => joinRoom(room));
        roomList.appendChild(li);
    });
}

function joinRoom(room) {
    currentRoom = room;
    document.getElementById('current-room').textContent = `Room: ${room}`;
    document.getElementById('messages').innerHTML = '';
    // Here you would typically fetch previous messages for the room
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        displayMessage(currentUser, message);
        messageInput.value = '';
    }
}

function displayMessage(user, message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Animate the message using GSAP
    gsap.from(messageElement, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});