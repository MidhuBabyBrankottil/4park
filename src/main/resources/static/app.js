/**
 * 4 PARK - Fintech Neomorphic UI Engine (Inspired by reference mockup)
 */

let activeDay = "MONDAY";
let activeVehicleType = "Car"; // "Car" or "Bike"
let activeOption = "book";     // "book" or "host"
let selectedLandmarkChip = "ALL";
let searchQuery = "";
let currentSpotForBooking = null;
let currentViewMode = "list";  // "list" or "map"
let exploreMap = null;
let exploreMarkers = [];
let hostMap = null;
let hostMarker = null;

let currentUser = {
  name: "Midhu Baby Brankottil",
  phone: "+91 98400 12345",
  area: "Anna Nagar, Chennai",
  isLoggedIn: true
};

// Chennai Spaces Data with Geolocation coordinates
let spotsList = [
  {
    id: "spot-user-01",
    houseNumber: "House #42, 2nd Avenue",
    area: "Anna Nagar",
    city: "Chennai",
    landmark: "Opp Tower Park Gate 3",
    societyName: "Anna Nagar West Enclave",
    title: "My Home Driveway & Porch",
    hostName: "Midhu Baby Brankottil (Host)",
    hostPhone: "+91 98450 12345",
    timeDisplay: "Mon: 9:00 AM – 9:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "21:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 35,
    bikeRate: 15,
    lat: 13.0850,
    lng: 80.2101,
    amenities: ["Covered Roof", "Gated Security", "CCTV", "15A EV Socket"],
    isUserSpot: true
  },
  {
    id: "spot-anna-02",
    houseNumber: "Villa #12, Shanti Colony",
    area: "Anna Nagar",
    city: "Chennai",
    landmark: "Near Roundtana & Hot Breads",
    societyName: "Shanti Colony Residents",
    title: "Shaded Tree Porch",
    hostName: "Siddharth Raman",
    hostPhone: "+91 98401 22334",
    timeDisplay: "Mon: 8:00 AM – 8:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "08:00",
    endTime: "20:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 40,
    bikeRate: 15,
    lat: 13.0880,
    lng: 80.2145,
    amenities: ["Tree Shade", "Security Gate", "CCTV"]
  },
  {
    id: "spot-anna-03",
    houseNumber: "House #7, 4th Main Road",
    area: "Anna Nagar",
    city: "Chennai",
    landmark: "Near Anna Arch & Shenoy Nagar Metro",
    societyName: "East Avenue Homes",
    title: "Wide Concrete Driveway",
    hostName: "Meenakshi K.",
    hostPhone: "+91 98410 44556",
    timeDisplay: "Mon: 9:00 AM – 9:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "21:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 35,
    bikeRate: 15,
    lat: 13.0795,
    lng: 80.2160,
    amenities: ["Wide Gate", "Covered Canopy", "CCTV"]
  },
  {
    id: "spot-chennai-02",
    houseNumber: "House #18, Venkatnarayana Road",
    area: "T. Nagar",
    city: "Chennai",
    landmark: "Near Panagal Park & Pondy Bazaar",
    societyName: "T. Nagar Residential Colony",
    title: "Paved Shaded Driveway",
    hostName: "Priya Nambiar",
    hostPhone: "+91 98231 67890",
    timeDisplay: "Mon: 8:30 AM – 8:30 PM",
    dayOfWeek: "MONDAY",
    startTime: "08:30",
    endTime: "20:30",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 40,
    bikeRate: 15,
    lat: 13.0418,
    lng: 80.2341,
    amenities: ["Tree Shade", "Wide Gate Entry", "CCTV"]
  },
  {
    id: "spot-tnagar-02",
    houseNumber: "Plot #9, Habibullah Road",
    area: "T. Nagar",
    city: "Chennai",
    landmark: "Near GRT & Pondy Bazaar",
    societyName: "Habibullah Villa Enclave",
    title: "Gated Stilt Car Slot",
    hostName: "Ramesh Chandran",
    hostPhone: "+91 98411 99887",
    timeDisplay: "Mon: 9:00 AM – 9:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "21:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 45,
    bikeRate: 20,
    lat: 13.0440,
    lng: 80.2395,
    amenities: ["Gated", "Stilt Covered", "CCTV"]
  },
  {
    id: "spot-chennai-03",
    houseNumber: "Flat G-2, 4th Cross Street",
    area: "Adyar",
    city: "Chennai",
    landmark: "Near Gandhi Nagar & Adyar Ananda Bhavan",
    societyName: "Adyar Lakeview",
    title: "Ground Floor Stilt Parking",
    hostName: "Arun Roy",
    hostPhone: "+91 97112 34567",
    timeDisplay: "Mon: 9:00 AM – 7:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "19:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 30,
    bikeRate: 10,
    lat: 13.0012,
    lng: 80.2565,
    amenities: ["Stilt Roof", "Security Guard", "CCTV"]
  },
  {
    id: "spot-adyar-02",
    houseNumber: "Villa #14, Besant Avenue",
    area: "Adyar",
    city: "Chennai",
    landmark: "Near Theosophical Society & Besant Beach",
    societyName: "Besant Avenue Gardens",
    title: "Private Courtyard Driveway",
    hostName: "Deepa Krishnan",
    hostPhone: "+91 97910 88776",
    timeDisplay: "Mon: 9:00 AM – 8:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "20:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 35,
    bikeRate: 15,
    lat: 12.9980,
    lng: 80.2630,
    amenities: ["Lush Shade", "Gated Entry", "CCTV"]
  },
  {
    id: "spot-chennai-04",
    houseNumber: "Villa #7, 1st Seaward Road",
    area: "Thiruvanmiyur",
    city: "Chennai",
    landmark: "Near Thiruvanmiyur Beach & RTO",
    societyName: "Valmiki Nagar Enclave",
    title: "Independent Lockable Garage",
    hostName: "Karthik S.",
    hostPhone: "+91 98412 88776",
    timeDisplay: "Mon: 10:00 AM – 8:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "10:00",
    endTime: "20:00",
    vehicleTypesAllowed: ["Car"],
    carRate: 50,
    bikeRate: 20,
    lat: 12.9830,
    lng: 80.2594,
    amenities: ["Automated Shutter", "Fast EV Charger", "Zero Sun"]
  },
  {
    id: "spot-thiru-02",
    houseNumber: "House #15, Valmiki Street",
    area: "Thiruvanmiyur",
    city: "Chennai",
    landmark: "Near Marundeeswarar Temple",
    societyName: "Valmiki Homes",
    title: "Covered Porch Slot",
    hostName: "Manoj Kumar",
    hostPhone: "+91 98414 33221",
    timeDisplay: "Mon: 8:30 AM – 8:30 PM",
    dayOfWeek: "MONDAY",
    startTime: "08:30",
    endTime: "20:30",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 40,
    bikeRate: 15,
    lat: 12.9860,
    lng: 80.2580,
    amenities: ["Covered Porch", "Gate Lock", "CCTV"]
  },
  {
    id: "spot-chennai-05",
    houseNumber: "House #24, 100 Feet Bypass Road",
    area: "Velachery",
    city: "Chennai",
    landmark: "Near Phoenix Marketcity",
    societyName: "Velachery Green Park",
    title: "Spacious Gated Car Porch",
    hostName: "Senthil Nathan",
    hostPhone: "+91 99401 55667",
    timeDisplay: "Mon: 9:00 AM – 9:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "21:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 35,
    bikeRate: 15,
    lat: 12.9759,
    lng: 80.2212,
    amenities: ["CCTV Monitored", "Covered Roof", "Water Hose"]
  },
  {
    id: "spot-vel-02",
    houseNumber: "Plot #18, Vijayanagar 1st Main",
    area: "Velachery",
    city: "Chennai",
    landmark: "Near Velachery MRTS & 100ft Road",
    societyName: "Vijayanagar Enclave",
    title: "Wide Paved Villa Driveway",
    hostName: "Anand Narayanan",
    hostPhone: "+91 99403 77889",
    timeDisplay: "Mon: 9:00 AM – 8:00 PM",
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "20:00",
    vehicleTypesAllowed: ["Car", "Bike"],
    carRate: 30,
    bikeRate: 10,
    lat: 12.9780,
    lng: 80.2180,
    amenities: ["Gated Entry", "Flood Safe Plinth", "CCTV"]
  }
];

// Adjacent Neighborhoods mapping for "Parking Near Me" exploration
const adjacentNeighborhoods = {
  "Anna Nagar": [
    { name: "Shenoy Nagar", dist: "0.8 km" },
    { name: "Kilpauk", dist: "1.4 km" },
    { name: "Aminjikarai", dist: "1.9 km" },
    { name: "Mogappair", dist: "2.5 km" }
  ],
  "T. Nagar": [
    { name: "Teynampet", dist: "1.1 km" },
    { name: "Kodambakkam", dist: "1.5 km" },
    { name: "Nungambakkam", dist: "1.8 km" },
    { name: "Saidapet", dist: "2.2 km" }
  ],
  "Adyar": [
    { name: "Besant Nagar", dist: "1.1 km" },
    { name: "Thiruvanmiyur", dist: "1.7 km" },
    { name: "Kotturpuram", dist: "2.0 km" },
    { name: "R.A. Puram", dist: "2.5 km" }
  ],
  "Velachery": [
    { name: "Madipakkam", dist: "1.6 km" },
    { name: "Taramani", dist: "1.8 km" },
    { name: "Guindy", dist: "2.3 km" },
    { name: "Perungudi", dist: "2.7 km" }
  ],
  "Thiruvanmiyur": [
    { name: "Kottivakkam", dist: "1.3 km" },
    { name: "Adyar", dist: "1.7 km" },
    { name: "Palavakkam", dist: "2.4 km" },
    { name: "Besant Nagar", dist: "1.9 km" }
  ]
};

// Distance calculation in km using Haversine formula
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 1.0;
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

let bookingsList = [
  {
    id: "bk-chn-01",
    spotTitle: "House #42, Anna Nagar",
    area: "Anna Nagar, Chennai",
    landmark: "Opp Tower Park Gate 3",
    vehicleType: "Car",
    renterName: "Dr. Sameer Sen",
    vehicleNumber: "TN-02-CB-4242",
    bookingDate: "Monday",
    timeSlot: "10:00 AM – 2:00 PM",
    totalAmount: 140,
    gatePassCode: "PARKEASE-CHN-4201"
  }
];

// Chennai Localities Coordinate Lookup
const chennaiLocalities = {
  "Anna Nagar": { lat: 13.0850, lng: 80.2101 },
  "T. Nagar": { lat: 13.0418, lng: 80.2341 },
  "Adyar": { lat: 13.0012, lng: 80.2565 },
  "Velachery": { lat: 12.9759, lng: 80.2212 },
  "Thiruvanmiyur": { lat: 12.9830, lng: 80.2594 },
  "Nungambakkam": { lat: 13.0569, lng: 80.2425 }
};

// Interactive Showcase Tab Switcher (Page 1)
function switchShowcaseTab(type) {
  const carTab = document.getElementById("showcaseTabCar");
  const bikeTab = document.getElementById("showcaseTabBike");
  const carScene = document.getElementById("showcaseCarScene");
  const bikeScene = document.getElementById("showcaseBikeScene");
  const rateTag = document.getElementById("showcaseRateTag");

  if (type === "Car") {
    carTab?.classList.add("active");
    bikeTab?.classList.remove("active");
    if (carScene) carScene.style.display = "block";
    if (bikeScene) bikeScene.style.display = "none";
    if (rateTag) rateTag.innerHTML = "<strong>From ₹35/hr</strong><span>Car Porch</span>";
    activeVehicleType = "Car";
  } else {
    bikeTab?.classList.add("active");
    carTab?.classList.remove("active");
    if (carScene) carScene.style.display = "none";
    if (bikeScene) bikeScene.style.display = "block";
    if (rateTag) rateTag.innerHTML = "<strong>From ₹15/hr</strong><span>Bike Bay</span>";
    activeVehicleType = "Bike";
  }

  // Also sync the Page 2 selector pills
  document.querySelectorAll(".veh-pill").forEach(b => {
    if (b.getAttribute("data-type") === activeVehicleType) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });
}

// Start button sliding car animation trigger
function startAppWithAnimation() {
  const btn = document.getElementById("btnStartApp");
  if (!btn) {
    goToPage2();
    return;
  }
  if (btn.classList.contains("animating")) return;

  btn.classList.add("animating");

  setTimeout(() => {
    goToPage2();
    setTimeout(() => {
      btn.classList.remove("animating");
    }, 400);
  }, 820);
}

// Screen Transitions
function goToPage2() {
  document.getElementById("page-1").classList.remove("active");
  document.getElementById("page-2").classList.add("active");
  renderParkingCards();
  updateVehicleCartoonPreview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToPage1() {
  document.getElementById("page-2").classList.remove("active");
  document.getElementById("page-1").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Switch: Book a Parking vs Host a Parking
function switchOption(option) {
  activeOption = option;
  const btnBook = document.getElementById("btnModeBook");
  const btnHost = document.getElementById("btnModeHost");
  const secBook = document.getElementById("section-book");
  const secHost = document.getElementById("section-host");
  const tabBook = document.getElementById("tabNavBook");
  const tabHost = document.getElementById("tabNavHost");

  if (option === "book") {
    btnBook.classList.add("active");
    btnHost.classList.remove("active");
    secBook.classList.add("active");
    secHost.classList.remove("active");
    if (tabBook) tabBook.classList.add("active");
    if (tabHost) tabHost.classList.remove("active");
    renderParkingCards();
  } else {
    btnHost.classList.add("active");
    btnBook.classList.remove("active");
    secHost.classList.add("active");
    secBook.classList.remove("active");
    if (tabHost) tabHost.classList.add("active");
    if (tabBook) tabBook.classList.remove("active");
    setTimeout(() => initHostMap(), 150);
  }
}

// Vehicle Type (Car / Bike)
function selectVehicleType(type, btn) {
  activeVehicleType = type;
  document.querySelectorAll(".veh-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  updateVehicleCartoonPreview();
  renderParkingCards();
}

// Expandable Spot Map Location Viewer
let activeEmbedMaps = {};

function toggleSpotMap(spotId) {
  const drawer = document.getElementById(`mapDrawer-${spotId}`);
  if (!drawer) return;

  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    drawer.classList.remove("open");
  } else {
    drawer.classList.add("open");
    initSpotEmbedMap(spotId);
  }
}

function initSpotEmbedMap(spotId) {
  const spot = spotsList.find(s => s.id === spotId);
  if (!spot || !spot.lat || !spot.lng) return;
  if (typeof L === "undefined") return;

  const containerId = `embedMap-${spotId}`;
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!activeEmbedMaps[spotId]) {
    const map = L.map(containerId, {
      center: [spot.lat, spot.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const pinIcon = L.divIcon({
      html: `<div class="custom-map-marker" style="width: 32px; height: 32px; font-size: 0.9rem;"><span>${spot.vehicleTypesAllowed.includes("Car") ? "🚗" : "🏍️"}</span></div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([spot.lat, spot.lng], { icon: pinIcon })
      .bindPopup(`<strong>${spot.houseNumber}</strong><br>${spot.landmark}`)
      .addTo(map);

    activeEmbedMaps[spotId] = map;
  }

  setTimeout(() => {
    if (activeEmbedMaps[spotId]) {
      activeEmbedMaps[spotId].invalidateSize();
    }
  }, 100);
}

// Initialize Host Location Picker Map
function initHostMap() {
  if (typeof L === "undefined") return;

  const mapEl = document.getElementById("hostLocationMap");
  if (!mapEl) return;

  const defaultLat = 13.0850;
  const defaultLng = 80.2101;

  if (!hostMap) {
    hostMap = L.map("hostLocationMap", {
      center: [defaultLat, defaultLng],
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(hostMap);

    const pinIcon = L.divIcon({
      html: `<div class="custom-map-marker" style="width: 36px; height: 36px; background: #ef4444; border-color: #ffffff;"><span>🏡</span></div>`,
      className: "",
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    hostMarker = L.marker([defaultLat, defaultLng], {
      draggable: true,
      icon: pinIcon
    }).addTo(hostMap);

    hostMarker.on("dragend", function(e) {
      const pos = e.target.getLatLng();
      updateHostLocation(pos.lat, pos.lng);
    });

    hostMap.on("click", function(e) {
      hostMarker.setLatLng(e.latlng);
      updateHostLocation(e.latlng.lat, e.latlng.lng);
    });
  }

  setTimeout(() => {
    if (hostMap) hostMap.invalidateSize();
  }, 200);
}

function updateHostLocation(lat, lng) {
  const roundedLat = Number(lat).toFixed(4);
  const roundedLng = Number(lng).toFixed(4);
  const latInput = document.getElementById("hostLat");
  const lngInput = document.getElementById("hostLng");
  const textEl = document.getElementById("pinCoordsText");
  const gmapsUrlInput = document.getElementById("hostGmapsUrl");
  const areaSelect = document.getElementById("hostLocationArea");
  const areaName = areaSelect ? areaSelect.value : "Chennai";

  if (latInput) latInput.value = roundedLat;
  if (lngInput) lngInput.value = roundedLng;
  if (textEl) textEl.innerText = `📍 Pinned: ${roundedLat}° N, ${roundedLng}° E (${areaName})`;

  const shareUrl = `https://www.google.com/maps?q=${roundedLat},${roundedLng}`;
  if (gmapsUrlInput) gmapsUrlInput.value = shareUrl;
}

function copyHostGmapsUrl() {
  const gmapsInput = document.getElementById("hostGmapsUrl");
  if (gmapsInput) {
    navigator.clipboard.writeText(gmapsInput.value);
    showToast("Google Maps location link copied! 📋");
  }
}

// Jump host map when locality chip or select is changed
function jumpHostMap(area) {
  if (chennaiLocalities[area] && hostMap && hostMarker) {
    const loc = chennaiLocalities[area];
    hostMap.setView([loc.lat, loc.lng], 14);
    hostMarker.setLatLng([loc.lat, loc.lng]);
    updateHostLocation(loc.lat, loc.lng);
    const areaSelect = document.getElementById("hostLocationArea");
    if (areaSelect) areaSelect.value = area;
  }
}

// Interactive Cartoon Vehicle Preview Update
function updateVehicleCartoonPreview() {
  const iconEl = document.getElementById("cvIcon");
  const titleEl = document.getElementById("cvTitle");
  const descEl = document.getElementById("cvDesc");

  if (!iconEl || !titleEl) return;

  if (activeVehicleType === "Car") {
    iconEl.innerHTML = "🚗";
    titleEl.innerHTML = `Car Porch Active <span class="cv-tag">₹35 / hr</span>`;
    descEl.innerText = "Safe, covered, off-street gated parking for cars & SUVs";
  } else {
    iconEl.innerHTML = "🏍️";
    titleEl.innerHTML = `Bike Slot Active <span class="cv-tag">₹15 / hr</span>`;
    descEl.innerText = "Dedicated 2-wheeler bay with CCTV & shade for bikes & scooters";
  }
}

// Day Filter
function filterByDay(day, btn) {
  activeDay = day;
  document.querySelectorAll(".day-pill").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  renderParkingCards();
}

// Search Filter
function filterBySearch() {
  const input = document.getElementById("landmarkSearchInput");
  searchQuery = input.value.trim().toLowerCase();
  
  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) {
    clearBtn.style.display = searchQuery.length > 0 ? "block" : "none";
  }
  renderParkingCards();
}

function clearSearch() {
  const input = document.getElementById("landmarkSearchInput");
  input.value = "";
  searchQuery = "";
  document.getElementById("btnClearSearch").style.display = "none";
  renderParkingCards();
}

// User Location & Proximity State
let userLocationCoords = { lat: 13.0850, lng: 80.2101, label: "Anna Nagar, Chennai" };
let isNearMeMode = false;

// Trigger 'Parking Near Me'
function selectNearMe(btn) {
  isNearMeMode = true;
  selectedLandmarkChip = "NEAR_ME";
  document.querySelectorAll(".loc-chip").forEach(c => c.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const input = document.getElementById("landmarkSearchInput");
  if (input) input.value = "Near Me (Current Location)";
  searchQuery = "";

  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) clearBtn.style.display = "block";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocationCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Your Exact GPS Position"
        };
        showToast("📍 Located your position in Chennai!");
        renderParkingCards();
      },
      () => {
        userLocationCoords = { lat: 13.0850, lng: 80.2101, label: "Anna Nagar (My Location)" };
        showToast("📍 Showing driveways near your location (Anna Nagar)");
        renderParkingCards();
      },
      { timeout: 3500 }
    );
  } else {
    userLocationCoords = { lat: 13.0850, lng: 80.2101, label: "Anna Nagar (My Location)" };
    renderParkingCards();
  }
}

// Explore adjacent localities when user wants to "see other parking near"
function exploreAdjacentLocality(adjName, parentArea) {
  isNearMeMode = false;
  selectedLandmarkChip = adjName;
  document.querySelectorAll(".loc-chip").forEach(c => c.classList.remove("active"));

  const input = document.getElementById("landmarkSearchInput");
  if (input) input.value = adjName;
  searchQuery = adjName.toLowerCase();

  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) clearBtn.style.display = "block";

  showToast(`🔍 Showing parking near ${adjName} (near ${parentArea})`);
  renderParkingCards();
}

// Quick Landmark Chips
function selectLandmarkChip(loc, btn) {
  isNearMeMode = false;
  selectedLandmarkChip = loc;
  document.querySelectorAll(".loc-chip").forEach(c => c.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const input = document.getElementById("landmarkSearchInput");
  if (loc === "ALL") {
    input.value = "";
    searchQuery = "";
    document.getElementById("btnClearSearch").style.display = "none";
  } else {
    input.value = loc;
    searchQuery = loc.toLowerCase();
    document.getElementById("btnClearSearch").style.display = "block";
  }
  renderParkingCards();
}

// Render 'Parking Near Me' Radar Banner (Page 2)
function renderNearMeBanner(activeArea, count, refLat, refLng) {
  const banner = document.getElementById("nearMeBanner");
  if (!banner) return;

  const isAll = (selectedLandmarkChip === "ALL") && !isNearMeMode && !searchQuery;
  const displayName = isNearMeMode 
    ? (userLocationCoords.label || "Current GPS Location") 
    : (activeArea || "Selected Area");
  const adjList = adjacentNeighborhoods[activeArea] || adjacentNeighborhoods["Anna Nagar"] || [];

  if (isAll) {
    banner.innerHTML = `
      <div class="nm-header">
        <div class="nm-header-left">
          <div class="nm-radar-icon">📡</div>
          <div class="nm-title-group">
            <h4>🎯 Parking Near Me</h4>
            <p>Select your location or tap "Near Me" to find empty driveways closest to you</p>
          </div>
        </div>
        <button type="button" class="btn-locate-pulse" onclick="selectNearMe(document.getElementById('chipNearMe'))">
          🎯 Near Me
        </button>
      </div>

      <div class="nm-adjacent-box">
        <div class="nm-adjacent-title">
          <strong>Popular Parking Hubs:</strong>
          <span>Tap to view driveways near you</span>
        </div>
        <div class="nm-chip-scroll">
          <button type="button" class="nm-adj-chip" onclick="selectLandmarkChip('Anna Nagar', document.querySelector('[data-loc=\\'Anna Nagar\\']'))">
            <span>📍 Anna Nagar</span>
          </button>
          <button type="button" class="nm-adj-chip" onclick="selectLandmarkChip('T. Nagar', document.querySelector('[data-loc=\\'T. Nagar\\']'))">
            <span>📍 T. Nagar</span>
          </button>
          <button type="button" class="nm-adj-chip" onclick="selectLandmarkChip('Adyar', document.querySelector('[data-loc=\\'Adyar\\']'))">
            <span>📍 Adyar</span>
          </button>
          <button type="button" class="nm-adj-chip" onclick="selectLandmarkChip('Velachery', document.querySelector('[data-loc=\\'Velachery\\']'))">
            <span>📍 Velachery</span>
          </button>
          <button type="button" class="nm-adj-chip" onclick="selectLandmarkChip('Thiruvanmiyur', document.querySelector('[data-loc=\\'Thiruvanmiyur\\']'))">
            <span>📍 Thiruvanmiyur</span>
          </button>
        </div>
      </div>
    `;
    banner.style.display = "flex";
    return;
  }

  banner.innerHTML = `
    <div class="nm-header">
      <div class="nm-header-left">
        <div class="nm-radar-icon">📡</div>
        <div class="nm-title-group">
          <h4>🎯 Parking Near Me (${displayName})</h4>
          <p>${count} driveways available nearby • Sorted by shortest distance</p>
        </div>
      </div>
      <span class="nm-count-pill">${count} Near You</span>
    </div>

    <div class="nm-adjacent-box">
      <div class="nm-adjacent-title">
        <strong>🔍 See other parking near ${displayName}:</strong>
        <span>Tap to explore adjacent areas</span>
      </div>
      <div class="nm-chip-scroll">
        ${adjList.map(adj => `
          <button type="button" class="nm-adj-chip" onclick="exploreAdjacentLocality('${adj.name}', '${displayName}')">
            <span>+ Near ${adj.name}</span>
            <small style="color: #0284c7; font-weight: 800;">(${adj.dist})</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  banner.style.display = "flex";
}

// Render Parking Cards
function renderParkingCards() {
  const container = document.getElementById("parkingGrid");

  // Determine reference coordinates for distance calculations
  let refLat = 13.0850;
  let refLng = 80.2101;
  let activeAreaName = "Anna Nagar";

  if (isNearMeMode) {
    refLat = userLocationCoords.lat;
    refLng = userLocationCoords.lng;
    activeAreaName = "Anna Nagar";
  } else if (selectedLandmarkChip !== "ALL" && chennaiLocalities[selectedLandmarkChip]) {
    refLat = chennaiLocalities[selectedLandmarkChip].lat;
    refLng = chennaiLocalities[selectedLandmarkChip].lng;
    activeAreaName = selectedLandmarkChip;
  }

  // Update Featured Black Card Rate & Distance
  const userSpot = spotsList.find(s => s.id === "spot-user-01");
  if (userSpot) {
    const featuredRateEl = document.getElementById("featuredRate");
    if (featuredRateEl) {
      featuredRateEl.innerText = activeVehicleType === "Car" ? userSpot.carRate : userSpot.bikeRate;
    }
  }

  // Filter other spots
  let filtered = spotsList.filter(spot => {
    if (spot.dayOfWeek !== activeDay) return false;
    if (!spot.vehicleTypesAllowed.includes(activeVehicleType)) return false;

    if (searchQuery) {
      const targetStr = `${spot.area} ${spot.landmark} ${spot.houseNumber} ${spot.societyName} ${spot.title}`.toLowerCase();
      if (!targetStr.includes(searchQuery)) return false;
    }
    return true;
  });

  // Calculate distance for all spots from reference point
  filtered.forEach(spot => {
    spot._distKm = calculateDistanceKm(spot.lat, spot.lng, refLat, refLng);
  });

  // Sort by distance if near me or location selected
  if (isNearMeMode || selectedLandmarkChip !== "ALL" || searchQuery) {
    filtered.sort((a, b) => a._distKm - b._distKm);
  }

  const badge = document.getElementById("spotsCountBadge");
  if (badge) badge.innerText = `${filtered.length} spaces`;

  // Render Near Me Banner
  renderNearMeBanner(activeAreaName, filtered.length, refLat, refLng);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; background: #ffffff; border-radius: var(--radius-card); color: var(--text-muted);">
        <p style="font-size: 2.2rem; margin-bottom: 0.5rem;">🅿️</p>
        <h4 style="color: var(--text-dark); margin-bottom: 0.25rem;">No ${activeVehicleType} spaces found</h4>
        <p style="font-size: 0.85rem;">Try tapping "🎯 Near Me" or switching to Monday.</p>
      </div>
    `;
    return;
  }

  // Exclude user spot from general list if it's already shown in hero, or show all
  const otherSpots = filtered.filter(s => s.id !== "spot-user-01");

  container.innerHTML = otherSpots.map(spot => {
    const rate = activeVehicleType === "Car" ? spot.carRate : spot.bikeRate;
    const latStr = spot.lat ? spot.lat.toFixed(4) : "13.0850";
    const lngStr = spot.lng ? spot.lng.toFixed(4) : "80.2101";
    const gmapsUrl = spot.gmapsUrl || `https://www.google.com/maps?q=${latStr},${lngStr}`;
    const dist = spot._distKm !== undefined ? spot._distKm : calculateDistanceKm(spot.lat, spot.lng, refLat, refLng);
    const walkMin = Math.max(2, Math.round(dist * 12));

    return `
      <div class="space-card-white">
        <div class="space-top-row">
          <div>
            <h4 class="space-name">${spot.title}</h4>
            <span class="space-area-badge">${spot.area}, CHENNAI</span>
          </div>
          <span class="slot-distance-badge">📍 ${dist} km away • ${walkMin} min walk</span>
        </div>

        <div class="space-info-box">
          <div class="info-line">📍 <strong>Landmark:</strong> ${spot.landmark}</div>
          <div class="info-line">🕒 <strong>Available:</strong> ${spot.timeDisplay}</div>
          <div class="info-line">👤 <strong>Host:</strong> ${spot.hostName}</div>
        </div>

        <!-- Google Maps Location View & Direct Button -->
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button type="button" class="btn-view-map-pill" onclick="toggleSpotMap('${spot.id}')">
            <span>📍 View Map Location</span>
          </button>
          <a href="${gmapsUrl}" target="_blank" class="btn-gmaps-direct">
            <span>🗺️ Google Maps</span> &rarr;
          </a>
        </div>

        <!-- Expandable Embedded Mini Map -->
        <div class="slot-map-drawer" id="mapDrawer-${spot.id}">
          <div id="embedMap-${spot.id}" class="slot-map-embed"></div>
          <div class="slot-map-actions">
            <span style="font-size: 0.72rem; color: #64748b;">📍 ${spot.area} (${latStr}, ${lngStr})</span>
            <span style="font-size: 0.72rem; color: #0284c7; font-weight: 700;">Verified Driveway</span>
          </div>
        </div>

        <div class="space-bottom-row">
          <div class="space-price-block">
            <span class="price-bold">₹${rate}</span>
            <span class="price-sub">/ hour (${activeVehicleType})</span>
          </div>

          <button class="btn-pill-book" onclick="openBookModal('${spot.id}')">
            Book
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Modal Booking
function openBookModal(spotId) {
  const spot = spotsList.find(s => s.id === spotId);
  if (!spot) return;

  currentSpotForBooking = spot;
  const rate = activeVehicleType === "Car" ? spot.carRate : spot.bikeRate;
  const latStr = spot.lat ? spot.lat.toFixed(4) : "13.0850";
  const lngStr = spot.lng ? spot.lng.toFixed(4) : "80.2101";
  const gmapsUrl = spot.gmapsUrl || `https://www.google.com/maps?q=${latStr},${lngStr}`;

  document.getElementById("bookSpotTitle").innerText = `${spot.houseNumber} - ${spot.title}`;
  document.getElementById("bookModalLocation").innerText = `${spot.area}, Chennai`;
  document.getElementById("bookModalLandmark").innerText = `📍 Landmark: ${spot.landmark}`;
  document.getElementById("bookAvailableTime").innerText = spot.timeDisplay;
  document.getElementById("bookSpotRate").innerText = `₹${rate} / hr (${activeVehicleType})`;

  // Populate Location Card in Modal
  const locTextEl = document.getElementById("bookModalLocText");
  if (locTextEl) locTextEl.innerText = `${spot.area} (${latStr}° N, ${lngStr}° E)`;

  const landmarkTextEl = document.getElementById("bookModalLandmarkText");
  if (landmarkTextEl) landmarkTextEl.innerText = spot.landmark;

  const gmapsBtn = document.getElementById("bookModalGmapsBtn");
  if (gmapsBtn) gmapsBtn.href = gmapsUrl;

  document.getElementById("inputStartTime").value = spot.startTime || "09:00";
  document.getElementById("inputEndTime").value = "13:00";

  calculatePrice();
  document.getElementById("bookModal").classList.add("active");
}

function closeBookModal() {
  document.getElementById("bookModal").classList.remove("active");
  currentSpotForBooking = null;
}

function calculatePrice() {
  if (!currentSpotForBooking) return;

  const rate = activeVehicleType === "Car" ? currentSpotForBooking.carRate : currentSpotForBooking.bikeRate;
  const startVal = document.getElementById("inputStartTime").value;
  const endVal = document.getElementById("inputEndTime").value;

  const [sh, sm] = startVal.split(":").map(Number);
  const [eh, em] = endVal.split(":").map(Number);

  const startM = sh * 60 + sm;
  const endM = eh * 60 + em;
  const hours = Math.max(1, Math.round(((endM - startM) / 60) * 10) / 10);
  const total = Math.round(hours * rate);

  document.getElementById("calcDurationText").innerText = `Duration: ${hours} hours (${activeVehicleType})`;
  document.getElementById("calcPriceText").innerText = `₹ ${total}.00`;
}

function submitBooking(e) {
  e.preventDefault();
  if (!currentSpotForBooking) return;

  const rate = activeVehicleType === "Car" ? currentSpotForBooking.carRate : currentSpotForBooking.bikeRate;
  const renterName = document.getElementById("inputRenterName").value.trim();
  const vehicleNum = document.getElementById("inputVehicleNumber").value.trim().toUpperCase();
  const startVal = document.getElementById("inputStartTime").value;
  const endVal = document.getElementById("inputEndTime").value;

  const [sh, sm] = startVal.split(":").map(Number);
  const [eh, em] = endVal.split(":").map(Number);
  const hours = Math.max(1, Math.round(((eh * 60 + em - (sh * 60 + sm)) / 60) * 10) / 10);
  const total = Math.round(hours * rate);

  const passCode = `PARKEASE-CHN-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: `bk-${Date.now()}`,
    spotTitle: `${currentSpotForBooking.houseNumber} - ${currentSpotForBooking.title}`,
    houseNumber: currentSpotForBooking.houseNumber,
    area: `${currentSpotForBooking.area}, Chennai`,
    landmark: currentSpotForBooking.landmark,
    vehicleType: activeVehicleType,
    renterName,
    vehicleNumber: vehicleNum,
    bookingDate: currentSpotForBooking.dayOfWeek,
    timeSlot: `${startVal} – ${endVal}`,
    totalAmount: total,
    gatePassCode: passCode
  };

  bookingsList.unshift(newBooking);
  closeBookModal();
  showToast(`Reserved for ${activeVehicleType} (${vehicleNum})!`);
  openPassesModal();
}

// Host Form Submit
function submitHostParking(e) {
  e.preventDefault();

  const name = document.getElementById("hostName").value.trim();
  const phone = document.getElementById("hostPhone").value.trim();
  const area = document.getElementById("hostLocationArea").value;
  const house = document.getElementById("hostHouse").value.trim();
  const landmark = document.getElementById("hostLandmark").value.trim();
  const day = document.getElementById("hostDay").value;
  const start = document.getElementById("hostStartTime").value;
  const end = document.getElementById("hostEndTime").value;
  const carRate = parseFloat(document.getElementById("hostCarRate").value) || 35;
  const bikeRate = parseFloat(document.getElementById("hostBikeRate").value) || 15;

  const radios = document.getElementsByName("hostVehicleType");
  let selectedOption = "Both";
  for (const r of radios) {
    if (r.checked) selectedOption = r.value;
  }
  const allowed = selectedOption === "Both" ? ["Car", "Bike"] : [selectedOption];

  const latVal = parseFloat(document.getElementById("hostLat")?.value) || (chennaiLocalities[area]?.lat || 13.0850);
  const lngVal = parseFloat(document.getElementById("hostLng")?.value) || (chennaiLocalities[area]?.lng || 80.2101);
  const gmapsUrl = document.getElementById("hostGmapsUrl")?.value || `https://www.google.com/maps?q=${latVal},${lngVal}`;

  const newSpot = {
    id: `spot-${Date.now()}`,
    houseNumber: house,
    area: area,
    city: "Chennai",
    landmark: landmark,
    societyName: `${area} Residential`,
    title: `Private Porch Parking`,
    hostName: name,
    hostPhone: phone,
    timeDisplay: `${day.slice(0,3)}: ${formatTime(start)} – ${formatTime(end)}`,
    dayOfWeek: day,
    startTime: start,
    endTime: end,
    vehicleTypesAllowed: allowed,
    carRate: carRate,
    bikeRate: bikeRate,
    lat: latVal,
    lng: lngVal,
    gmapsUrl: gmapsUrl,
    amenities: ["Gated", "CCTV", "Porch"],
    isUserSpot: true
  };

  spotsList.unshift(newSpot);
  showToast(`Parking space listed with Google Maps location!`);
  switchOption("book");
}

// Passes Modal
function openPassesModal() {
  const container = document.getElementById("passesContainer");
  if (bookingsList.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No active passes.</p>`;
  } else {
    container.innerHTML = bookingsList.map(b => `
      <div class="ticket-pill-box">
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 800;">${b.houseNumber}</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted);">${b.area}</p>
          <p style="font-size: 0.8rem; margin: 0.3rem 0;">📍 <strong>${b.landmark}</strong></p>
          <p style="font-size: 0.8rem;">${b.vehicleType} (${b.vehicleNumber}) • ₹${b.totalAmount}</p>
          <span class="t-code-badge">GUARD PASS: ${b.gatePassCode}</span>
        </div>
        <div class="t-qr-box">
          <svg viewBox="0 0 100 100" fill="#000">
            <rect x="0" y="0" width="30" height="30" fill="#000"/>
            <rect x="5" y="5" width="20" height="20" fill="#fff"/>
            <rect x="10" y="10" width="10" height="10" fill="#000"/>
            <rect x="70" y="0" width="30" height="30" fill="#000"/>
            <rect x="75" y="5" width="20" height="20" fill="#fff"/>
            <rect x="80" y="10" width="10" height="10" fill="#000"/>
            <rect x="0" y="70" width="30" height="30" fill="#000"/>
            <rect x="5" y="75" width="20" height="20" fill="#fff"/>
            <rect x="10" y="80" width="10" height="10" fill="#000"/>
            <rect x="40" y="20" width="15" height="15" fill="#000"/>
            <rect x="45" y="60" width="20" height="20" fill="#000"/>
          </svg>
        </div>
      </div>
    `).join("");
  }
  document.getElementById("passesModal").classList.add("active");
}

function closePassesModal() {
  document.getElementById("passesModal").classList.remove("active");
}

// Profile Dropdown
function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.toggle("active");
}

function closeProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) dropdown.classList.remove("active");
}

document.addEventListener("click", (e) => {
  const header = document.querySelector(".app-header");
  if (header && !header.contains(e.target)) {
    closeProfileDropdown();
  }
});

function handleLogout() {
  closeProfileDropdown();
  showToast("Account switched to Guest mode.");
}

function formatTime(t24) {
  if (!t24) return "";
  const [hStr, mStr] = t24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

function showToast(msg) {
  const box = document.getElementById("toastBox");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;
  box.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderParkingCards();
});
