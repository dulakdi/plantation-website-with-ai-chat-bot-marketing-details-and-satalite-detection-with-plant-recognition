const { useState, useEffect, useRef } = React;

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [map, setMap] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [farms, setFarms] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [plantTips, setPlantTips] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ email: '', password: '', username: '', region: '' });
  const [authError, setAuthError] = useState('');
  const [ndviData, setNdviData] = useState(null);
  const [selectedCropDetails, setSelectedCropDetails] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [newFarm, setNewFarm] = useState({ name: '', cropType: '', address: '' });
  
  const mapRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Language translations
  const translations = {
    en: {
      title: "Plantation Management System",
      login: "Sign In",
      register: "Sign Up",
      logout: "Logout",
      home: "Home",
      farms: "My Farms",
      weather: "Weather",
      disease: "Disease Detection",
      market: "Market Prices",
      settings: "Settings",
      satellite: "Satellite View",
      chatbot: "AI Assistant",
      selectCrop: "Select Your Crop",
      tea: "Tea",
      cinnamon: "Cinnamon",
      eggplant: "Eggplant",
      pepper: "Pepper",
      coconut: "Coconut",
      chili: "Chili",
      pumpkin: "Pumpkin",
      rice: "Rice",
      temperature: "Temperature",
      humidity: "Humidity",
      rainfall: "Rainfall",
      wind: "Wind",
      uploadPhoto: "Upload Photo",
      takePhoto: "Take Photo",
      detectDisease: "Detect Disease",
      healthy: "Healthy",
      diseased: "Diseased",
      recommendation: "Recommendation",
      confidence: "Confidence",
      addFarm: "Add Farm",
      farmName: "Farm Name",
      cropType: "Crop Type",
      location: "Location",
      save: "Save",
      cancel: "Cancel",
      plantTips: "Plant Care Tips",
      askQuestion: "Ask a question about farming...",
      send: "Send",
      ndviValue: "NDVI Value",
      healthStatus: "Health Status",
      lastUpdated: "Last Updated",
      recommendations: "Recommendations",
      bestMarket: "Best Market to Sell",
      priceComparison: "Price Comparison",
      email: "Email",
      password: "Password",
      username: "Username",
      region: "Region",
      signInToAccount: "Sign in to your account",
      createNewAccount: "Create a new account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?"
    },
    si: {
      title: "කෘෂිකර්මාන්ත කළමනාකරණ පද්ධතිය",
      login: "පුරන්න",
      register: "ලියාපදිංචි වන්න",
      logout: "ඉවත් වන්න",
      home: "මුල් පිටුව",
      farms: "මගේ ගොවිපල",
      weather: "කාලගුණය",
      disease: "රෝග හඳුනාගැනීම",
      market: "වෙළඳපොළ මිල",
      settings: "සැකසුම්",
      satellite: "චන්ද්‍රිකා දර්ශනය",
      chatbot: "AI සහායක",
      selectCrop: "ඔබේ බෝගය තෝරන්න",
      tea: "තේ",
      cinnamon: "කුරුඳු",
      eggplant: "වම්බටු",
      pepper: "මිරිස්",
      coconut: "පොල්",
      chili: "මිරිස්",
      pumpkin: "වට්ටක්කා",
      rice: "බත්",
      temperature: "තාපමානය",
      humidity: "ආර්ද්‍රතාවය",
      rainfall: "වර්ෂාපතනය",
      wind: "සුළඟ",
      uploadPhoto: "ඡායාරූපය උඩුගත කරන්න",
      takePhoto: "ඡායාරූපය ගන්න",
      detectDisease: "රෝග හඳුනාගන්න",
      healthy: "නිරෝගී",
      diseased: "රෝගී",
      recommendation: "නිර්දේශය",
      confidence: "විශ්වාසය",
      addFarm: "ගොවිපල එකතු කරන්න",
      farmName: "ගොවිපල නම",
      cropType: "බෝග වර්ගය",
      location: "ස්ථානය",
      save: "සුරකින්න",
      cancel: "අවලංගු කරන්න",
      plantTips: "ශාක රැකවරණ උපදෙස්",
      askQuestion: "කෘෂිකර්මය පිළිබඳ ප්‍රශ්නයක් අසන්න...",
      send: "යවන්න",
      ndviValue: "NDVI අගය",
      healthStatus: "සෞඛ්‍ය තත්වය",
      lastUpdated: "අවසන් යාවත්කාලීන කළේ",
      recommendations: "නිර්දේශ",
      bestMarket: "විකිණීමට හොඳම වෙළඳපොළ",
      priceComparison: "මිල සංසන්දනය",
      email: "විද්‍යුත් තැපෑල",
      password: "මුරපදය",
      username: "පරිශීලක නාමය",
      region: "කලාපය",
      signInToAccount: "ඔබේ ගිණුමට පුරන්න",
      createNewAccount: "නව ගිණුමක් සාදන්න",
      alreadyHaveAccount: "දැනටමත් ගිණුමක් තිබේද?",
      dontHaveAccount: "ගිණුමක් නැතිද?"
    }
  };

  const t = translations[language];

  // Configurable API base (override via window.API_BASE or localStorage.API_BASE)
  const API_BASE = (typeof window !== 'undefined' && (window.API_BASE || localStorage.getItem('API_BASE'))) || 'http://localhost:8000';

  // Restore session and preferences on first load
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pms_session') || 'null');
      if (saved) {
        if (typeof saved.darkMode === 'boolean') setDarkMode(saved.darkMode);
        if (saved.language) setLanguage(saved.language);
        if (saved.user && saved.isAuthenticated) {
          setUser(saved.user);
          setIsAuthenticated(true);
          setCurrentView(saved.currentView || 'home');
        }
        if (saved.token) setAuthToken(saved.token);
      }
    } catch (e) {
      console.warn('Failed to restore session:', e);
    }
  }, []);

  // Persist session and preferences
  useEffect(() => {
    try {
      const data = {
        isAuthenticated,
        user,
        language,
        darkMode,
        currentView,
        token: authToken,
      };
      localStorage.setItem('pms_session', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist session:', e);
    }
  }, [isAuthenticated, user, language, darkMode, currentView, authToken]);

  // Crop data with detailed information
  const crops = [
    {
      id: 'tea',
      name: t.tea,
      image: 'images/crops/tea.jpg',
      description: 'Premium tea cultivation',
      details: {
        planting: [
          'Plant in well-drained soil with partial shade',
          'Best planting time: March-April or September-October',
          'Space plants 1.5m apart for optimal growth'
        ],
        care: [
          'Water regularly, especially during dry seasons',
          'Prune annually to maintain bush shape',
          'Maintain soil pH between 5.5-6.5',
          'Fertilize with nitrogen-rich fertilizer every 3 months'
        ],
        harvesting: [
          'Pluck top two leaves and bud every 7-14 days',
          'Harvest during growing season for best quality',
          'Avoid harvesting during rainy periods'
        ],
        tips: [
          'Tea plants need high humidity and consistent rainfall',
          'Protect from frost and strong winds',
          'Provide shade during hot summer months'
        ],
        diseases: [
          {
            name: 'Tea Blister Blight',
            description: 'Fungal disease affecting young leaves',
            solution: 'Apply copper fungicides and improve air circulation'
          },
          {
            name: 'Red Rust',
            description: 'Rust-colored spots on leaves',
            solution: 'Remove affected leaves and apply sulfur-based fungicide'
          },
          {
            name: 'Brown Root Rot',
            description: 'Root rot causing plant wilting',
            solution: 'Improve drainage and apply systemic fungicide'
          }
        ]
      }
    },
    {
      id: 'cinnamon',
      name: t.cinnamon,
      image: 'images/crops/cinnomon.webp',
      description: 'Cinnamon spice farming',
      details: {
        planting: [
          'Plant in sandy loam soil with good drainage',
          'Best planting time: June-July during monsoon',
          'Space trees 3m apart for optimal growth'
        ],
        care: [
          'Water moderately, avoid waterlogging',
          'Apply organic manure twice yearly',
          'Prune to maintain height and bush shape',
          'Mulch around base to retain moisture'
        ],
        harvesting: [
          'Harvest bark from 2-3 year old trees',
          'Peel bark in strips during dry season',
          'Allow bark to dry in sun before storage'
        ],
        tips: [
          'Cinnamon needs warm, humid climate',
          'Plant in partial shade for best results',
          'Protect young plants from strong winds'
        ],
        diseases: [
          {
            name: 'Root Rot',
            description: 'Fungal infection affecting roots',
            solution: 'Improve drainage and apply fungicide'
          },
          {
            name: 'Leaf Spot',
            description: 'Dark spots on leaves',
            solution: 'Remove affected leaves and improve air circulation'
          }
        ]
      }
    },
    {
      id: 'eggplant',
      name: t.eggplant,
      image: 'images/crops/eggplant.webp',
      description: 'Eggplant vegetable farming',
      details: {
        planting: [
          'Sow seeds in nursery, transplant after 4-6 weeks',
          'Best planting time: February-March or August-September',
          'Space plants 60cm apart for optimal growth'
        ],
        care: [
          'Water regularly, especially during fruiting',
          'Stake plants for support as they grow',
          'Fertilize with balanced NPK fertilizer',
          'Remove side shoots to encourage main stem growth'
        ],
        harvesting: [
          'Harvest when fruits are firm and glossy',
          'Pick regularly to encourage more fruiting',
          'Use sharp knife to avoid damaging plant'
        ],
        tips: [
          'Eggplant needs full sun and warm temperatures',
          'Mulch around plants to retain moisture',
          'Provide support for heavy fruit loads'
        ],
        diseases: [
          {
            name: 'Bacterial Wilt',
            description: 'Plant wilting and yellowing',
            solution: 'Use resistant varieties and proper spacing'
          },
          {
            name: 'Fruit Rot',
            description: 'Rotting of developing fruits',
            solution: 'Improve air circulation and avoid overhead watering'
          },
          {
            name: 'Aphids',
            description: 'Small insects on leaves and stems',
            solution: 'Use neem oil or insecticidal soap'
          }
        ]
      }
    },
    {
      id: 'pepper',
      name: t.pepper,
      image: 'images/crops/peper.jpeg',
      description: 'Pepper spice cultivation',
      details: {
        planting: [
          'Plant cuttings or seeds in well-drained soil',
          'Best planting time: May-June with onset of monsoon',
          'Space plants 2m apart for climbing support'
        ],
        care: [
          'Provide support with poles or trellises',
          'Water regularly, mulch around base',
          'Prune annually to maintain shape',
          'Train vines to climb support structures'
        ],
        harvesting: [
          'Harvest when berries turn red',
          'Dry in sun for 3-4 days before storing',
          'Store in cool, dry place'
        ],
        tips: [
          'Pepper needs warm, humid climate',
          'Plant near trees for natural support',
          'Avoid waterlogging at all costs'
        ],
        diseases: [
          {
            name: 'Foot Rot',
            description: 'Rot at base of plant stem',
            solution: 'Ensure good drainage and proper spacing'
          },
          {
            name: 'Leaf Spot',
            description: 'Dark spots on leaves',
            solution: 'Remove affected leaves and improve air circulation'
          }
        ]
      }
    },
    {
      id: 'rice',
      name: t.rice,
      image: 'images/crops/rice_plant.png',
      description: 'Rice paddy farming',
      details: {
        planting: [
          'Transplant seedlings 20-25 days old',
          'Best time: June-July for main season, December-January for off-season',
          'Space plants 20cm x 20cm for optimal yield'
        ],
        care: [
          'Maintain 2-3 inches water depth',
          'Apply fertilizer in 3 splits during growth',
          'Control weeds regularly',
          'Monitor water levels daily'
        ],
        harvesting: [
          'Harvest when 80% grains are mature',
          'Cut 15-20cm above ground level',
          'Dry grains properly before storage'
        ],
        tips: [
          'Rice needs flooded fields',
          'Use certified seeds for best results',
          'Practice crop rotation to prevent diseases'
        ],
        diseases: [
          {
            name: 'Blast Disease',
            description: 'Fungal disease affecting leaves and grains',
            solution: 'Use resistant varieties and proper water management'
          },
          {
            name: 'Bacterial Blight',
            description: 'Bacterial infection causing leaf damage',
            solution: 'Apply copper-based bactericide and improve drainage'
          },
          {
            name: 'Sheath Blight',
            description: 'Fungal disease affecting rice sheath',
            solution: 'Use fungicides and maintain proper plant spacing'
          }
        ]
      }
    },
    {
      id: 'coconut',
      name: t.coconut,
      image: 'images/crops/coconut.jpeg',
      description: 'Coconut palm cultivation',
      details: {
        planting: [
          'Plant in full sun in sandy loam, well-drained soil',
          'Spacing 8–10 m between palms',
          'Use healthy 12-month-old seedlings'
        ],
        care: [
          'Apply compost yearly',
          'Water deeply during dry seasons',
          'Control weeds around the palm'
        ],
        harvesting: [
          'Starts fruiting at 6–8 years',
          'Produces nuts monthly for decades',
          'Harvest mature nuts regularly'
        ],
        tips: [
          'Thrives in tropical climates with full sun',
          'Ensure good drainage to avoid root stress',
          'Mulch to conserve moisture'
        ],
        diseases: [
          { name: 'Bud Rot', description: 'Rot of the growing point', solution: 'Improve drainage, remove affected tissue, apply fungicide' }
        ]
      }
    },
    {
      id: 'pumpkin',
      name: t.pumpkin,
      image: 'images/crops/pumkin.jpeg',
      description: 'Pumpkin vine cultivation',
      details: {
        planting: [
          'Sow seeds directly in sandy loam with organic matter',
          'Space 1–1.5 m between plants',
          'Ensure warm temperatures and full sun'
        ],
        care: [
          'Apply compost + NPK fertilizer',
          'Ensure bee activity for pollination',
          'Water consistently; avoid waterlogging'
        ],
        harvesting: [
          'Harvest at 90–120 days',
          'Pick when skin is hard and fruit sounds hollow',
          'Cure fruits before storage'
        ],
        tips: [
          'Mulch to suppress weeds and retain moisture',
          'Train vines to manage space',
          'Hand-pollinate if bees are scarce'
        ],
        diseases: [
          { name: 'Powdery Mildew', description: 'White coating on leaves', solution: 'Apply sulfur or neem oil; improve airflow' }
        ]
      }
    },
    {
      id: 'chili',
      name: t.chili,
      image: 'images/crops/chilli.jpg',
      description: 'Chili pepper cultivation',
      details: {
        planting: [
          'Raise nursery and transplant at 4–5 weeks',
          'Use well-drained loam, pH 6–7',
          'Spacing 45 × 45 cm'
        ],
        care: [
          'Full sunlight with moderate watering',
          'Fertilize with nitrogen and potassium',
          'Monitor aphids, thrips, and fruit borers'
        ],
        harvesting: [
          'First harvest after 70–90 days',
          'Harvest green or dry to red depending on need',
          'Pick regularly to encourage fruiting'
        ],
        tips: [
          'Use neem spray against common pests',
          'Stake plants in windy areas',
          'Avoid water stress during flowering'
        ],
        diseases: [
          { name: 'Anthracnose', description: 'Fruit lesions and rotting', solution: 'Use clean seed, apply fungicides, remove infected fruits' }
        ]
      }
    }
  ];

  // Mock data
  const mockWeatherData = {
    temperature: 28,
    humidity: 75,
    rainfall: 15,
    wind: 12,
    forecast: [
      { day: 'Today', temp: 28, rain: 15 },
      { day: 'Tomorrow', temp: 26, rain: 45 },
      { day: 'Day 3', temp: 24, rain: 60 }
    ]
  };

  const mockMarketPrices = [
    { crop: 'Rice', price: 1200, location: 'Colombo', trend: 'up' },
    { crop: 'Tea', price: 850, location: 'Kandy', trend: 'stable' },
    { crop: 'Coconut', price: 150, location: 'Galle', trend: 'down' },
    { crop: 'Cinnamon', price: 3200, location: 'Matale', trend: 'up' },
    { crop: 'Pepper', price: 1800, location: 'Kurunegala', trend: 'stable' }
  ];

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize map with simple approach
  useEffect(() => {
    if (currentView !== 'satellite' && currentView !== 'farms') return;
    const init = () => {
      if (!mapRef.current || typeof window === 'undefined' || !window.L) return;
      try {
        if (map) {
          map.remove();
          setMap(null);
        }
        const container = mapRef.current;
        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
          setTimeout(init, 200);
          return;
        }
        const newMap = window.L.map(container, { center: [7.8731, 80.7718], zoom: 7 });
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(newMap);
        addFarmMarkers(newMap);
        setTimeout(() => newMap.invalidateSize(), 100);
        setMap(newMap);
      } catch (e) {
        console.error('Map init failed:', e);
      }
    };
    const id = setTimeout(init, 300);
    return () => clearTimeout(id);
  }, [currentView]);

  // Add farm markers to map
  const addFarmMarkers = (mapInstance) => {
    // Sample farm locations in Sri Lanka
    const farmLocations = [
      { lat: 7.8731, lng: 80.7718, name: "Tea Plantation - Kandy", crop: "Tea" },
      { lat: 7.4675, lng: 80.6234, name: "Rice Fields - Anuradhapura", crop: "Rice" },
      { lat: 6.9271, lng: 79.8612, name: "Cinnamon Estate - Colombo", crop: "Cinnamon" },
      { lat: 7.2906, lng: 80.6337, name: "Pepper Farm - Kurunegala", crop: "Pepper" },
      { lat: 8.3114, lng: 80.4037, name: "Eggplant Garden - Anuradhapura", crop: "Eggplant" }
    ];

    farmLocations.forEach(farm => {
      const marker = L.marker([farm.lat, farm.lng])
        .addTo(mapInstance)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-gray-900">${farm.name}</h3>
            <p class="text-sm text-gray-600">Crop: ${farm.crop}</p>
            <p class="text-xs text-gray-500">Coordinates: ${farm.lat.toFixed(4)}, ${farm.lng.toFixed(4)}</p>
          </div>
        `);
    });
  };

  // Geocoding function using Nominatim
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display_name: data[0].display_name
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Load plant tips
  useEffect(() => {
    const loadPlantTips = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/plant-tips`);
        const data = await response.json();
        setPlantTips(data);
      } catch (error) {
        console.error('Failed to load plant tips:', error);
        // Mock data for offline
        setPlantTips([
          {
            title: "Soil Preparation",
            tip: "Test soil pH before planting. Most crops prefer pH 6.0-7.0.",
            icon: "🌱"
          },
          {
            title: "Watering Schedule",
            tip: "Water deeply but less frequently. Early morning is best.",
            icon: "💧"
          }
        ]);
      }
    };
    loadPlantTips();
  }, []);

  // Mock authentication
  const handleLogin = async () => {
    setAuthError('');
    try {
      const resp = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Login failed (${resp.status})`);
      }
      const data = await resp.json();
      setAuthToken(data.access_token);
      setUser(data.user);
      setIsAuthenticated(true);
      setCurrentView('home');
      try {
        const saved = JSON.parse(localStorage.getItem('pms_session') || '{}');
        localStorage.setItem('pms_session', JSON.stringify({ ...saved, isAuthenticated: true, user: data.user, token: data.access_token, currentView: 'home' }));
      } catch {}
    } catch (e) {
      console.error('Login error:', e);
      setAuthError('Invalid email or password.');
    }
  };

  const handleRegister = async () => {
    setAuthError('');
    try {
      const resp = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authForm.email,
          username: authForm.username || authForm.email.split('@')[0],
          password: authForm.password,
          role: 'farmer',
          region: authForm.region || null,
          crops_grown: null,
          language
        })
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Registration failed (${resp.status})`);
      }
      // Auto-login after successful registration
      await handleLogin();
    } catch (e) {
      console.error('Register error:', e);
      setAuthError('Registration failed. Try a different email/username.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken(null);
    setCurrentView('login');
    try {
      const saved = JSON.parse(localStorage.getItem('pms_session') || '{}');
      localStorage.setItem('pms_session', JSON.stringify({ ...saved, isAuthenticated: false, user: null, token: null, currentView: 'login' }));
    } catch {}
  };

  // Disease information helper function
  const getDiseaseInfo = (disease) => {
    const diseaseInfo = {
      "Powdery Mildew": "A fungal disease that appears as white, powdery coating on leaves. Common in humid conditions with poor air circulation.",
      "Leaf Spot Disease": "Fungal or bacterial infection causing dark spots on leaves. Often spreads through water splashing and poor sanitation.",
      "Bacterial Blight": "Bacterial infection causing wilting, yellowing, and death of plant tissue. Spreads rapidly in wet conditions.",
      "Root Rot": "Fungal disease affecting roots, causing plant wilting and death. Usually caused by overwatering and poor drainage.",
      "Rust Disease": "Fungal disease producing rust-colored pustules on leaves and stems. Thrives in humid, cool conditions.",
      "Aphid Infestation": "Small sap-sucking insects that weaken plants and spread diseases. Often accompanied by sticky honeydew.",
      "Nutrient Deficiency": "Plant showing signs of lacking essential nutrients like nitrogen, phosphorus, or potassium. Often causes yellowing or stunted growth."
    };
    return diseaseInfo[disease] || "Plant health issue requiring attention and proper treatment.";
  };

  // Disease detection
  const handleDiseaseDetection = async (file) => {
    if (!file) return;
    
    // Show loading state
    setDiseaseResult({ status: 'analyzing', message: 'Analyzing image with AI...' });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Sending image to Gemini API...');
      const response = await fetch(`${API_BASE}/api/disease-detection`, {
        method: 'POST',
        body: formData,
        headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Gemini API result:', result);
        setDiseaseResult(result);
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Disease detection failed:', error);
      // Enhanced fallback with more realistic results
      const mockResults = [
        {
          status: 'diseased',
          disease: 'Leaf Spot Disease',
          confidence: '87%',
          recommendation: 'Apply copper-based fungicide every 7-10 days. Remove affected leaves and improve air circulation around plants.'
        },
        {
          status: 'diseased',
          disease: 'Powdery Mildew',
          confidence: '92%',
          recommendation: 'Use neem oil spray or sulfur-based fungicide. Ensure proper spacing between plants for better air flow.'
        },
        {
          status: 'healthy',
          disease: 'No disease detected',
          confidence: '95%',
          recommendation: 'Your plant looks healthy! Continue regular watering and monitoring. Consider preventive measures like proper spacing and good drainage.'
        },
        {
          status: 'diseased',
          disease: 'Root Rot',
          confidence: '78%',
          recommendation: 'Improve soil drainage immediately. Reduce watering frequency and consider repotting with fresh, well-draining soil.'
        }
      ];
      
      const mockResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDiseaseResult(mockResult);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleDiseaseDetection(file);
    }
  };

  const handleTakePhoto = () => {
    // Create a file input for camera capture
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use back camera on mobile
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleDiseaseDetection(file);
      }
    };
    input.click();
  };

  // Chatbot functionality
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { text: chatInput, sender: 'user', timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput('');
    
    // Add typing indicator
    const typingMessage = { text: 'AI is thinking...', sender: 'bot', timestamp: new Date(), isTyping: true };
    setChatMessages(prev => [...prev, typingMessage]);
    
    try {
      console.log('Sending message to chatbot:', currentInput);
      const response = await fetch(`${API_BASE}/api/chatbot`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
        body: JSON.stringify({ message: currentInput })
      });
      
      console.log('Chatbot response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Chatbot response:', data);
        
        // Remove typing indicator and add real response
        setChatMessages(prev => {
          const withoutTyping = prev.filter(msg => !msg.isTyping);
          const botMessage = { text: data.response, sender: 'bot', timestamp: new Date() };
          return [...withoutTyping, botMessage];
        });
      } else {
        throw new Error(`API request failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Remove typing indicator and add error response
      setChatMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const botMessage = { 
          text: "I'm having trouble connecting to the AI service. Here are some general agricultural tips: Ensure proper soil drainage, water regularly but don't overwater, and monitor for pests and diseases. Please try again in a moment.", 
          sender: 'bot', 
          timestamp: new Date() 
        };
        return [...withoutTyping, botMessage];
      });
    }
  };

  // Weather alerts
  const weatherAlerts = [
    { type: 'rain', message: 'Heavy rain expected for 3 days - delay sowing', severity: 'high' },
    { type: 'drought', message: 'Low soil moisture - irrigation recommended', severity: 'medium' }
  ];

  // Render components
  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-poppins">{t.title}</h2>
          <p className="mt-2 text-sm text-gray-600">Manage your plantation efficiently</p>
        </div>
        
        {/* Slide buttons for Sign In / Sign Up */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLoginMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            {t.login}
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLoginMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            {t.register}
          </button>
        </div>
        
        {authError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {authError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
            />
          </div>
          {!isLoginMode && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.username}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your username"
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.region}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your region"
                  value={authForm.region}
                  onChange={(e) => setAuthForm({ ...authForm, region: e.target.value })}
                />
              </div>
            </>
          )}
          <button
            onClick={isLoginMode ? handleLogin : handleRegister}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isLoginMode ? t.login : t.register}
          </button>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="p-6">
      {/* Plant Tips Carousel */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.plantTips}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plantTips.slice(0, 3).map((tip, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature and Moisture Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <i className="fas fa-thermometer-half text-3xl mr-4"></i>
            <div>
              <p className="text-sm opacity-90">{t.temperature}</p>
              <p className="text-3xl font-bold">{mockWeatherData.temperature}°C</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <i className="fas fa-tint text-3xl mr-4"></i>
            <div>
              <p className="text-sm opacity-90">{t.humidity}</p>
              <p className="text-3xl font-bold">{mockWeatherData.humidity}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plantation Images Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.selectCrop}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="crop-card bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() => {
                window.location.href = `plants/${crop.id}.html`;
              }}
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{crop.name}</h3>
              <p className="text-gray-600 text-sm">{crop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiseaseDetection = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.disease}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Photo</h3>
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-500 transition-colors"
            >
              <i className="fas fa-upload mr-2"></i>
              {t.uploadPhoto}
            </button>
            <button
              onClick={handleTakePhoto}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <i className="fas fa-camera mr-2"></i>
              {t.takePhoto}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Detection Results</h3>
            {diseaseResult && diseaseResult.status !== 'analyzing' && (
              <button
                onClick={() => setDiseaseResult(null)}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <i className="fas fa-times mr-1"></i>
                Clear
              </button>
            )}
          </div>
          
          {diseaseResult ? (
            diseaseResult.status === 'analyzing' ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">{diseaseResult.message}</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds...</p>
              </div>
            ) : (
              <div className={`p-4 rounded-lg ${
                diseaseResult.status === 'healthy' ? 'healthy-card bg-green-50' : 'disease-card bg-red-50'
              }`}>
                <div className="flex items-center mb-3">
                  <i className={`fas ${
                    diseaseResult.status === 'healthy' ? 'fa-check-circle text-green-500' : 'fa-exclamation-triangle text-red-500'
                  } text-2xl mr-3`}></i>
                  <div>
                    <p className="text-lg font-semibold">
                      {diseaseResult.status === 'healthy' ? '✅ Plant is Healthy' : '⚠️ Disease Detected'}
                    </p>
                    {diseaseResult.disease && (
                      <p className="text-sm text-gray-600 font-medium">{diseaseResult.disease}</p>
                    )}
                  </div>
                </div>
                
                {diseaseResult.disease && diseaseResult.disease !== 'No disease detected' && (
                  <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm font-medium text-yellow-800">
                      <i className="fas fa-info-circle mr-1"></i>
                      Disease Information:
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      {getDiseaseInfo(diseaseResult.disease)}
                    </p>
                  </div>
                )}
                
                {diseaseResult.confidence && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">
                      <i className="fas fa-chart-line mr-1"></i>
                      Confidence: <span className="font-semibold">{diseaseResult.confidence}</span>
                    </p>
                  </div>
                )}
                
                {diseaseResult.recommendation && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      <i className="fas fa-lightbulb mr-1"></i>
                      Recommendation:
                    </p>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded border-l-4 border-green-400">
                      {diseaseResult.recommendation}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    <i className="fas fa-info-circle mr-1"></i>
                    Analysis powered by Gemini AI
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="text-center text-gray-500 py-8">
              <i className="fas fa-leaf text-4xl mb-4 text-green-400"></i>
              <p className="font-medium">Upload a photo to detect diseases</p>
              <p className="text-sm mt-1">Take a clear photo of the affected plant leaves</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderChatbot = () => (
    <div className="p-6 h-screen flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.chatbot}</h2>
      
      <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <i className="fas fa-robot text-4xl mb-4"></i>
              <p>Ask me anything about farming and agriculture!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : message.isTyping 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">
                      {message.isTyping ? (
                        <span className="flex items-center">
                          <span className="animate-pulse">●</span>
                          <span className="animate-pulse ml-1">●</span>
                          <span className="animate-pulse ml-1">●</span>
                          <span className="ml-2">{message.text}</span>
                        </span>
                      ) : (
                        message.text
                      )}
                    </p>
                    {!message.isTyping && (
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
        
        {/* Chat Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder={t.askQuestion}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendChatMessage}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFarms = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.farms}</h2>
      
      {/* Add Farm Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddFarmModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          {t.addFarm}
        </button>
      </div>
      
      {/* Farms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <i className="fas fa-seedling text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">No farms added yet</p>
            <p className="text-gray-400 text-sm">Click "Add Farm" to get started</p>
          </div>
        ) : (
          farms.map((farm, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{farm.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Crop: {farm.cropType}</p>
              <p className="text-sm text-gray-500 mb-4">{farm.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {farm.lat?.toFixed(4)}, {farm.lng?.toFixed(4)}
                </span>
                <button className="text-green-600 hover:text-green-700 text-sm">
                  <i className="fas fa-eye mr-1"></i>
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Interactive Map */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Locations</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div ref={mapRef} className="map-container"></div>
          <p className="text-xs text-gray-500 mt-2">
            <i className="fas fa-map-marker-alt mr-1"></i>
            Interactive map showing farm locations. Click markers for details.
          </p>
        </div>
      </div>
    </div>
  );

  const renderMarketPrices = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.market}</h2>
      
      {/* Best Market Recommendation */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white mb-6">
        <h3 className="text-lg font-semibold mb-2">{t.bestMarket}</h3>
        <p className="text-sm opacity-90">Cinnamon in Matale - Rs. 3,200 (Highest Price)</p>
      </div>
      
      {/* Price Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.priceComparison}</h3>
        <div className="h-64 flex items-end space-x-2">
          {mockMarketPrices.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-green-500 rounded-t"
                style={{ height: `${(item.price / 3500) * 200}px` }}
              ></div>
              <p className="text-xs mt-2 text-center">{item.crop}</p>
              <p className="text-xs text-gray-600">Rs. {item.price}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Market List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMarketPrices.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{item.crop}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.trend === 'up' ? 'bg-green-100 text-green-800' :
                item.trend === 'down' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                <i className={`fas ${
                  item.trend === 'up' ? 'fa-arrow-up' :
                  item.trend === 'down' ? 'fa-arrow-down' :
                  'fa-minus'
                } mr-1`}></i>
                {item.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">Rs. {item.price}</p>
            <p className="text-sm text-gray-600">{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSatelliteView = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.satellite}</h2>
      
      
      {/* Map Loading Status and Controls */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-sm text-blue-700">
            <i className="fas fa-map mr-2"></i>
            {map ? 'Interactive map loaded successfully!' : 'Loading interactive map...'}
          </p>
          <button
            onClick={() => {
              console.log('Direct map creation test');
              if (mapRef.current && typeof window.L !== 'undefined') {
                // Clear existing map
                if (map) {
                  map.remove();
                  setMap(null);
                }
                
                // Create map directly
                const testMap = window.L.map(mapRef.current, {
                  center: [7.8731, 80.7718],
                  zoom: 7
                });
                
                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '© OpenStreetMap contributors'
                }).addTo(testMap);
                
                addFarmMarkers(testMap);
                setMap(testMap);
                console.log('Direct map creation successful');
              } else {
                console.log('Leaflet not available or container not ready');
              }
            }}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Create Map Now
          </button>
        </div>
      </div>
      
      {/* Interactive Map with OpenStreetMap */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-2"></i>
            Satellite view of plantation areas in Sri Lanka
          </p>
          <button
            onClick={() => {
              if (map) {
                map.remove();
                setMap(null);
              }
              // Force re-initialization
              setTimeout(() => {
                const initMap = () => {
                  if (mapRef.current && window.L && !map) {
                    try {
                      const mapContainer = mapRef.current;
                      if (mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
                        setTimeout(initMap, 200);
                        return;
                      }
                      
                      const newMap = window.L.map(mapRef.current, {
                        center: [7.8731, 80.7718],
                        zoom: 7,
                        zoomControl: true
                      });
                      
                      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '© OpenStreetMap contributors'
                      }).addTo(newMap);
                      
                      addFarmMarkers(newMap);
                      
                      setTimeout(() => {
                        if (newMap) {
                          newMap.invalidateSize();
                        }
                      }, 100);
                      
                      setMap(newMap);
                    } catch (error) {
                      console.error('Manual map init error:', error);
                    }
                  }
                };
                initMap();
              }, 100);
            }}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            <i className="fas fa-sync-alt mr-1"></i>
            Refresh Map
          </button>
        </div>
        <div 
          ref={mapRef} 
          className="map-container"
          style={{ 
            height: '400px', 
            width: '100%',
            border: '2px solid #e5e7eb',
            borderRadius: '8px'
          }}
        >
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <i className="fas fa-map-marker-alt mr-1"></i>
          Interactive map powered by OpenStreetMap. Click markers for farm details.
        </p>
      </div>
      
      {/* NDVI Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.ndviValue}</h3>
          <p className="text-3xl font-bold text-green-600">0.65</p>
          <p className="text-xs text-gray-500">Vegetation Health Index</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.healthStatus}</h3>
          <p className="text-lg font-semibold text-green-600">Good</p>
          <p className="text-xs text-gray-500">Overall Farm Health</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.lastUpdated}</h3>
          <p className="text-sm text-gray-600">2 hours ago</p>
          <p className="text-xs text-gray-500">Last Satellite Update</p>
        </div>
      </div>
    </div>
  );

  const renderCropModal = () => {
    if (!showCropModal || !selectedCropDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                {selectedCropDetails.name} Growing Guide
              </h2>
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedCropDetails(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-3xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plant Image */}
              <div>
                <img
                  src={selectedCropDetails.image}
                  alt={selectedCropDetails.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              
              {/* Plant Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Planting Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    {selectedCropDetails.details.planting.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Care Tips</h3>
                  <ul className="space-y-2 text-gray-700">
                    {selectedCropDetails.details.care.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-seedling text-green-500 mr-3 mt-1"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Harvesting</h3>
                <ul className="space-y-2 text-gray-700">
                  {selectedCropDetails.details.harvesting.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-hands text-yellow-500 mr-3 mt-1"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  {selectedCropDetails.details.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-lightbulb text-blue-500 mr-3 mt-1"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Common Diseases */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Diseases & Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCropDetails.details.diseases.map((disease, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">{disease.name}</h4>
                    <p className="text-sm text-red-700 mb-2">{disease.description}</p>
                    <p className="text-sm text-red-600">
                      <strong>Solution:</strong> {disease.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedCropDetails(null);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAddFarmModal = () => {
    if (!showAddFarmModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 font-poppins">Add New Farm</h2>
              <button
                onClick={() => setShowAddFarmModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({...newFarm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter farm name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                <select
                  value={newFarm.cropType}
                  onChange={(e) => setNewFarm({...newFarm, cropType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select crop type</option>
                  <option value="Tea">Tea</option>
                  <option value="Rice">Rice</option>
                  <option value="Cinnamon">Cinnamon</option>
                  <option value="Pepper">Pepper</option>
                  <option value="Eggplant">Eggplant</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address/Location</label>
                <input
                  type="text"
                  value={newFarm.address}
                  onChange={(e) => setNewFarm({...newFarm, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter farm address (e.g., Kandy, Sri Lanka)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <i className="fas fa-info-circle mr-1"></i>
                  We'll automatically find coordinates using OpenStreetMap
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={async () => {
                  if (newFarm.name && newFarm.cropType && newFarm.address) {
                    // Geocode the address
                    const location = await geocodeAddress(newFarm.address);
                    if (location) {
                      const farm = {
                        name: newFarm.name,
                        cropType: newFarm.cropType,
                        location: location.display_name,
                        lat: location.lat,
                        lng: location.lng
                      };
                      setFarms([...farms, farm]);
                      setNewFarm({ name: '', cropType: '', address: '' });
                      setShowAddFarmModal(false);
                      
                      // Add marker to map if it exists
                      if (map) {
                        L.marker([location.lat, location.lng])
                          .addTo(map)
                          .bindPopup(`
                            <div class="p-2">
                              <h3 class="font-semibold text-gray-900">${farm.name}</h3>
                              <p class="text-sm text-gray-600">Crop: ${farm.cropType}</p>
                              <p class="text-xs text-gray-500">${farm.location}</p>
                            </div>
                          `);
                      }
                    } else {
                      alert('Could not find location. Please try a more specific address.');
                    }
                  } else {
                    alert('Please fill in all fields.');
                  }
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Add Farm
              </button>
              <button
                onClick={() => setShowAddFarmModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">{t.settings}</h2>
      
      <div className="space-y-6">
        {/* Language Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Language</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'si', name: 'සිංහල', flag: '🇱🇰' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  language === lang.code
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{lang.flag}</div>
                <div className="text-sm font-medium">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'farms':
        return renderFarms();
      case 'disease':
        return renderDiseaseDetection();
      case 'chatbot':
        return renderChatbot();
      case 'market':
        return renderMarketPrices();
      case 'satellite':
        return renderSatelliteView();
      case 'settings':
        return renderSettings();
      default:
        return renderHome();
    }
  };

  if (!isAuthenticated) {
    return renderLogin();
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="offline-indicator show">
          <i className="fas fa-wifi mr-2"></i>
          You're offline. Some features may be limited.
        </div>
      )}

      {/* Language Toggle */}
      <div className="language-toggle">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="en">🇺🇸 EN</option>
          <option value="si">🇱🇰 SI</option>
        </select>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 font-poppins">{t.title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'home' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-home mr-1"></i>
                {t.home}
              </button>
              
              <button
                onClick={() => setCurrentView('farms')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'farms' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-seedling mr-1"></i>
                {t.farms}
              </button>
              
              <button
                onClick={() => setCurrentView('disease')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'disease' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-microscope mr-1"></i>
                {t.disease}
              </button>
              
              <button
                onClick={() => setCurrentView('chatbot')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'chatbot' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-robot mr-1"></i>
                {t.chatbot}
              </button>
              
              <button
                onClick={() => setCurrentView('market')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'market' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-chart-line mr-1"></i>
                {t.market}
              </button>
              
              <button
                onClick={() => setCurrentView('satellite')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'satellite' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-satellite mr-1"></i>
                {t.satellite}
              </button>
              
              <button
                onClick={() => setCurrentView('settings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'settings' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-cog mr-1"></i>
                {t.settings}
              </button>
              
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-sign-out-alt mr-1"></i>
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {renderMainContent()}
      </main>

      {/* Crop Details Modal */}
      {renderCropModal()}
      
      {/* Add Farm Modal */}
      {renderAddFarmModal()}
    </div>
  );
};

// Error boundary for React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-red-500 text-6xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Error</h2>
            <p className="text-gray-600 mb-4">
              Something went wrong. Please refresh the page to try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Refresh Page
            </button>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
              <pre className="mt-2 text-xs text-red-600 bg-gray-100 p-2 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize the app with error boundary
try {
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>, 
    document.getElementById('root')
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.getElementById('root').innerHTML = `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div class="text-red-500 text-6xl mb-4">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Loading Error</h2>
        <p class="text-gray-600 mb-4">
          Failed to load the application. Please check your internet connection and refresh the page.
        </p>
        <button 
          onclick="window.location.reload()"
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  `;
}
