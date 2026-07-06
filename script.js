let map;
let marker;
// Initialize Map
function initMap() {
    map = L.map("map").setView([13.0827, 80.2707], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap Contributors"
    }).addTo(map);
    marker = L.marker([13.0827, 80.2707]).addTo(map);
}
// Load Data
function loadData() {
    // Location
    fetch("http://127.0.0.1:5000/api/location")
        .then(response => response.json())
        .then(data => {
            document.getElementById("lat").innerText = data.latitude.toFixed(4);
            document.getElementById("lon").innerText = data.longitude.toFixed(4);

            let position = [data.latitude, data.longitude];

            marker.setLatLng(position);

            map.flyTo(position, 15, {
                animate: true,
                duration: 1
            });
        })
        .catch(error => {
            console.log(error);
        });
    // Prediction
    fetch("http://127.0.0.1:5000/api/predict")
        .then(response => response.json())
        .then(data => {
            document.getElementById("delay").innerText =
                data.predicted_delay + " Minutes";
            if (data.predicted_delay < 5) {
                document.getElementById("status").innerHTML =
                    "<span style='color:green;font-weight:bold;'>🟢 ON TIME</span>";
            }
            else {

                document.getElementById("status").innerHTML =
                    "<span style='color:red;font-weight:bold;'>🔴 DELAYED</span>";
            }
        })
        .catch(error => {
            console.log(error);
        });
}
// Refresh Button
function refreshData() {
    loadData();
}
// Start Application
window.onload = () => {
    initMap();
    loadData();
    // Auto Refresh Every 5 Seconds
    setInterval(loadData, 5000);
};
function updateLastUpdated() {
    document.getElementById("lastUpdate").innerText =
        new Date().toLocaleTimeString();
}
setInterval(updateLastUpdated, 1000);
updateLastUpdated();