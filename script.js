// API endpoint configurations
const apiConfig = {
    property: {
        functions: [
            { value: 'amenity', label: 'Amenities' },
            { value: 'demographics', label: 'Demographics' },
            { value: 'development', label: 'Development Applications' },
            { value: 'easements', label: 'Easements' },
            { value: 'ethnicity', label: 'Ethnicities' },
            { value: 'properties', label: 'For Sale Properties' },
            { value: 'address', label: 'Get GNAF_ID (Geocoder)' },
            { value: 'info', label: 'Information' },
            { value: 'market', label: 'Market Insights' },
            { value: 'pocket', label: 'Market Insights by Pocket' },
            { value: 'neighbours', label: 'Neighbours Information' },
            { value: 'history', label: 'Property History' },
            { value: 'risk', label: 'Risk Factors' },
            { value: 'schools', label: 'Schools' },
            { value: 'suburb_insights', label: 'Suburb Insights' },
            { value: 'summary', label: 'Summary' },
            { value: 'zoning', label: 'Zoning' }
        ],
        url: 'https://www.microburbs.com.au/report_generator/api/property/'
    },
    suburb: {
        functions: [
            { value: 'amenity', label: 'Amenities' },
            { value: 'demographics', label: 'Demographics' },
            { value: 'development', label: 'Development Applications' },
            { value: 'ethnicity', label: 'Ethnicity by Pocket' },
            { value: 'properties', label: 'For Sale Properties' },
            { value: 'suburbs', label: 'List Suburbs' },
            { value: 'market', label: 'Market Insights' },
            { value: 'pocket', label: 'Market Insights by Pocket' },
            { value: 'streets', label: 'Market Insights by Street' },
            { value: 'risk', label: 'Risk Factors' },
            { value: 'catchments', label: 'School Catchments' },
            { value: 'schools', label: 'Schools' },
            { value: 'similar', label: 'Similar Suburbs' },
            { value: 'info', label: 'Suburb Information' },
            { value: 'summary', label: 'Summary' },
            { value: 'zoning', label: 'Zoning' }
        ],
        url: 'https://www.microburbs.com.au/report_generator/api/suburb/'
    },
    avm: {
        functions: [
            { value: 'estimate', label: 'Estimate' },
            { value: 'history', label: 'History' },
            { value: 'comparables', label: 'Comparables' }
        ],
        url: 'https://www.microburbs.com.au/report_generator/api/avm/'
    },
    cma: {
        functions: [
            { value: 'report', label: 'Report' },
            { value: 'analysis', label: 'Analysis' }
        ],
        url: 'https://www.microburbs.com.au/report_generator/api/cma/'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function ()
{
    initDashboard();
    setupEventListeners();
    updateFunctionOptions('suburb'); // Initialize with suburb options
    // Load initial data
    fetchSuburbAmenities();
});

function initDashboard()
{
    // Initialize map with suburb center
    const map = L.map('map').setView([-33.016, 151.672], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function setupEventListeners()
{
    // API endpoint change
    document.getElementById('api-endpoint').addEventListener('change', function ()
    {
        const endpoint = this.value;
        updateFunctionOptions(endpoint);
        toggleInputFields(endpoint);
    });

    // Fetch button click
    document.getElementById('fetch-btn').addEventListener('click', function ()
    {
        const endpoint = document.getElementById('api-endpoint').value;
        const functionName = document.getElementById('api-function').value;

        if (endpoint === 'property')
        {
            if (functionName === 'amenity')
            {
                fetchPropertyAmenities();
            }
        } else if (endpoint === 'suburb')
        {
            if (functionName === 'amenity')
            {
                fetchSuburbAmenities();
            }
        } else
        {
            // Handle other endpoints
            alert('This demo focuses on Property and Suburb Amenities. Other endpoints would be implemented similarly.');
        }
    });

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab =>
    {
        tab.addEventListener('click', function ()
        {
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

function updateFunctionOptions(endpoint)
{
    const functionSelect = document.getElementById('api-function');
    functionSelect.innerHTML = '';

    // Add options based on selected endpoint
    if (apiConfig[endpoint])
    {
        apiConfig[endpoint].functions.forEach(func =>
        {
            const option = document.createElement('option');
            option.value = func.value;
            option.textContent = func.label;
            functionSelect.appendChild(option);
        });
    }
}

function toggleInputFields(endpoint)
{
    const propertyIdGroup = document.getElementById('property-id-group');
    const suburbNameGroup = document.getElementById('suburb-name-group');

    if (endpoint === 'property')
    {
        propertyIdGroup.style.display = 'flex';
        suburbNameGroup.style.display = 'none';
    } else
    {
        propertyIdGroup.style.display = 'none';
        suburbNameGroup.style.display = 'flex';
    }
}

function fetchSuburbAmenities()
{
    const suburbName = document.getElementById('suburb-name').value;

    // Show loading state
    const dataResults = document.getElementById('data-results');
    const suburbOverview = document.getElementById('suburb-overview');

    dataResults.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    suburbOverview.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    // In a real implementation, this would be an actual API call
    // For demonstration, we'll use a timeout to simulate API response
    setTimeout(() =>
    {
        // Sample suburb amenities data from the API
        const amenitiesData = {
            "results": [
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Green Spaces",
                    "lat": -33.01471698452997,
                    "lon": 151.66683300380805,
                    "name": "Park Area 1"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Bus Stop",
                    "lat": -33.0218761,
                    "lon": 151.667422,
                    "name": "Bus Stop 1"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Green Spaces",
                    "lat": -33.01265471586152,
                    "lon": 151.67901317481898,
                    "name": "Park Area 2"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Restaurant",
                    "lat": -33.0245821,
                    "lon": 151.6640785,
                    "name": "Zarraffa's Coffee Belmont North"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Green Spaces",
                    "lat": -33.016627470950134,
                    "lon": 151.6713460042586,
                    "name": "Park Area 3"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "School",
                    "lat": -33.025836308443836,
                    "lon": 151.67312046865382,
                    "name": "Belmont Christian College"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "School",
                    "lat": -33.01980691990568,
                    "lon": 151.67167752400218,
                    "name": "Belmont North Public School"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Green Spaces",
                    "lat": -33.017969141647576,
                    "lon": 151.66573331732442,
                    "name": "Marks Oval"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Supermarket",
                    "lat": -33.0135298,
                    "lon": 151.6846743,
                    "name": "Coles"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "School",
                    "lat": -33.0155909004674,
                    "lon": 151.68745565962374,
                    "name": "Jewells Primary School"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "School",
                    "lat": -33.01419637273191,
                    "lon": 151.66385054967424,
                    "name": "Floraville Public School"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Restaurant",
                    "lat": -33.0130237,
                    "lon": 151.6845659,
                    "name": "Jewells Cafe"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Restaurant",
                    "lat": -33.01298,
                    "lon": 151.68467,
                    "name": "Seachange Coffee House"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Restaurant",
                    "lat": -33.0126787,
                    "lon": 151.6844668,
                    "name": "Jewells Tavern"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "School",
                    "lat": -33.02720737827561,
                    "lon": 151.66013942886988,
                    "name": "Belmont High School"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Green Spaces",
                    "lat": -33.02299990785074,
                    "lon": 151.67662424256696,
                    "name": "Lenaghan Oval"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Green Spaces",
                    "lat": -32.997706060104434,
                    "lon": 151.65524052593884,
                    "name": "St Johns Memorial Park"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Supermarket",
                    "lat": -33.035048,
                    "lon": 151.65921,
                    "name": "Subway"
                },
                {
                    "area_level": "suburb",
                    "area_name": "Belmont North",
                    "category": "Supermarket",
                    "lat": -33.0336758,
                    "lon": 151.6607216,
                    "name": "Aldi"
                }
            ]
        };

        displaySuburbOverview(suburbName, amenitiesData.results);
        displayAmenities(amenitiesData.results, 'suburb');
        generateSuburbInsights(amenitiesData.results);
        updateSuburbMap(amenitiesData.results);
    }, 1500);

    // Actual API call would look like this:
    /*
    fetch(`https://www.microburbs.com.au/report_generator/api/suburb/amenity?suburb=${encodeURIComponent(suburbName.replace(' ', '+'))}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer test",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        displaySuburbOverview(suburbName, data.results);
        displayAmenities(data.results, 'suburb');
        generateSuburbInsights(data.results);
        updateSuburbMap(data.results);
    })
    .catch(error => {
        console.error("Error:", error);
        dataResults.innerHTML = '<div class="empty-state">Failed to load suburb amenities data</div>';
    });
    */
}

function fetchPropertyAmenities()
{
    const propertyId = document.getElementById('property-id').value;

    // Show loading state
    const dataResults = document.getElementById('data-results');
    const suburbOverview = document.getElementById('suburb-overview');

    dataResults.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    suburbOverview.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    // In a real implementation, this would be an actual API call
    // For demonstration, we'll use sample data
    setTimeout(() =>
    {
        // Sample property data
        const propertyData = {
            "results": [
                {
                    "address": {
                        "sa1": "11101120615",
                        "sal": "Belmont North",
                        "state": "NSW",
                        "street": "27 Arlington Street"
                    },
                    "area_level": "address",
                    "area_name": "27 Arlington Street, Belmont North, NSW",
                    "attributes": {
                        "bathrooms": 2,
                        "bedrooms": 4,
                        "building_size": "None",
                        "description": "A beautifully presented family home in a prime location with modern amenities and spacious living areas. Perfect for families looking for comfort and convenience.",
                        "garage_spaces": 2,
                        "land_size": "650 m²"
                    },
                    "coordinates": {
                        "latitude": -33.01183148,
                        "longitude": 151.67286749
                    },
                    "gnaf_pid": "GANSW704074813",
                    "listing_date": "2025-10-07",
                    "price": 1250000,
                    "property_type": "House"
                }
            ]
        };

        // Sample property amenities data
        const amenitiesData = {
            "information": {
                "results": [
                    {
                        "area_level": "address",
                        "area_name": "27 ARLINGTON STREET, Belmont North, NSW",
                        "category": "Green Spaces",
                        "lat": -33.01265471586152,
                        "lon": 151.67901317481898,
                        "name": "Nearby Park"
                    },
                    {
                        "area_level": "address",
                        "area_name": "27 ARLINGTON STREET, Belmont North, NSW",
                        "category": "Bus Stop",
                        "lat": -33.0111571,
                        "lon": 151.6787965,
                        "name": "Bus Stop"
                    },
                    {
                        "area_level": "address",
                        "area_name": "27 ARLINGTON STREET, Belmont North, NSW",
                        "category": "School",
                        "lat": -33.01980691990568,
                        "lon": 151.67167752400218,
                        "name": "Belmont North Public School"
                    },
                    {
                        "area_level": "address",
                        "area_name": "27 ARLINGTON STREET, Belmont North, NSW",
                        "category": "Restaurant",
                        "lat": -33.0212761,
                        "lon": 151.6761199,
                        "name": "Ocean Jewel Takeaway"
                    }
                ]
            }
        };

        displayPropertyDetails(propertyData.results[0]);
        displayAmenities(amenitiesData.information.results, 'property');
        generatePropertyInsights(amenitiesData.information.results);
        updatePropertyMap(propertyData.results[0], amenitiesData.information.results);
    }, 1500);
}

function displaySuburbOverview(suburbName, amenities)
{
    const suburbOverview = document.getElementById('suburb-overview');

    // Count amenities by category
    const categoryCounts = {};
    amenities.forEach(amenity =>
    {
        categoryCounts[amenity.category] = (categoryCounts[amenity.category] || 0) + 1;
    });

    // Calculate statistics
    const totalAmenities = amenities.length;
    const categoryCount = Object.keys(categoryCounts).length;

    suburbOverview.innerHTML = `
        <div class="suburb-header">
            <div class="suburb-name">${suburbName}</div>
            <div class="suburb-stats">
                <div class="suburb-stat">
                    <div class="suburb-stat-value">${totalAmenities}</div>
                    <div class="suburb-stat-label">Total Amenities</div>
                </div>
                <div class="suburb-stat">
                    <div class="suburb-stat-value">${categoryCount}</div>
                    <div class="suburb-stat-label">Amenity Types</div>
                </div>
                <div class="suburb-stat">
                    <div class="suburb-stat-value">${categoryCounts['School'] || 0}</div>
                    <div class="suburb-stat-label">Schools</div>
                </div>
                <div class="suburb-stat">
                    <div class="suburb-stat-value">${categoryCounts['Green Spaces'] || 0}</div>
                    <div class="suburb-stat-label">Parks</div>
                </div>
            </div>
        </div>
        <div class="chart-container">
            <p>Visualization: Amenity distribution by category would be displayed here</p>
        </div>
    `;
}

function displayPropertyDetails(property)
{
    const suburbOverview = document.getElementById('suburb-overview');

    suburbOverview.innerHTML = `
        <div class="property-details-expanded">
            <div class="property-main-info">
                <div>
                    <div class="property-price">$${property.price.toLocaleString()}</div>
                    <div class="property-address">${property.address.street}, ${property.address.sal}, ${property.address.state}</div>
                    <div class="property-type">${property.property_type}</div>
                </div>
                <div class="property-features">
                    <div class="feature">
                        <span class="feature-icon">🛏️</span>
                        <span>${property.attributes.bedrooms} beds</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🚿</span>
                        <span>${property.attributes.bathrooms} baths</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🚗</span>
                        <span>${property.attributes.garage_spaces} cars</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">📏</span>
                        <span>${property.attributes.land_size}</span>
                    </div>
                </div>
            </div>
            <div class="property-description">
                ${property.attributes.description}
            </div>
        </div>
    `;
}

function displayAmenities(amenities, type)
{
    const dataResults = document.getElementById('data-results');
    const dataCount = document.getElementById('data-count');

    // Update count and title
    dataCount.textContent = `${amenities.length} amenities`;
    document.getElementById('data-title').textContent = type === 'suburb' ? 'Suburb Amenities' : 'Nearby Amenities';

    if (amenities.length === 0)
    {
        dataResults.innerHTML = `
            <div class="empty-state">
                <i>🏪</i>
                <h3>No amenities found</h3>
                <p>Try a different ${type}</p>
            </div>
        `;
        return;
    }

    // Create category filters
    const categories = [...new Set(amenities.map(a => a.category))];
    const filtersHtml = categories.map(category =>
        `<button class="category-filter-btn active" data-category="${category}">${category}</button>`
    ).join('');

    document.getElementById('category-filters').innerHTML = filtersHtml;

    // Add event listeners to filter buttons
    document.querySelectorAll('.category-filter-btn').forEach(btn =>
    {
        btn.addEventListener('click', function ()
        {
            this.classList.toggle('active');
            filterAmenitiesByCategory();
        });
    });

    // Display all amenities initially
    filterAmenitiesByCategory();

    function filterAmenitiesByCategory()
    {
        const activeCategories = [...document.querySelectorAll('.category-filter-btn.active')]
            .map(btn => btn.getAttribute('data-category'));

        const filteredAmenities = amenities.filter(amenity =>
            activeCategories.includes(amenity.category)
        );

        let html = '<div class="amenity-list">';

        filteredAmenities.forEach(amenity =>
        {
            const categoryClass = `category-${amenity.category.toLowerCase().replace(' ', '-')}`;
            html += `
                <div class="amenity-item">
                    <div class="amenity-name">${amenity.name || 'Unnamed Location'}</div>
                    <div>
                        <span class="category-badge ${categoryClass}">${amenity.category}</span>
                    </div>
                    <div class="amenity-distance">Lat: ${amenity.lat.toFixed(6)}, Lon: ${amenity.lon.toFixed(6)}</div>
                </div>
            `;
        });

        html += '</div>';
        dataResults.innerHTML = html;
    }
}

function generateSuburbInsights(amenities)
{
    const insightsContainer = document.getElementById('key-insights');

    // Count amenities by category
    const categoryCounts = {};
    amenities.forEach(amenity =>
    {
        categoryCounts[amenity.category] = (categoryCounts[amenity.category] || 0) + 1;
    });

    // Find unique categories
    const categories = Object.keys(categoryCounts);
    const totalAmenities = amenities.length;

    insightsContainer.innerHTML = `
        <div class="insight-card">
            <div class="insight-title">Amenity Diversity</div>
            <div class="insight-value">${categories.length} categories</div>
            <p>The suburb offers a diverse range of amenities including ${categories.join(', ')}.</p>
        </div>
        <div class="insight-card">
            <div class="insight-title">Education Facilities</div>
            <div class="insight-value">${categoryCounts['School'] || 0} schools</div>
            <p>Strong educational infrastructure with multiple schooling options for families.</p>
        </div>
        <div class="insight-card">
            <div class="insight-title">Recreation & Green Spaces</div>
            <div class="insight-value">${categoryCounts['Green Spaces'] || 0} parks & ovals</div>
            <p>Abundant green spaces for outdoor activities and community gatherings.</p>
        </div>
        <div class="insight-card">
            <div class="insight-title">Public Transport</div>
            <div class="insight-value">${categoryCounts['Bus Stop'] || 0} bus stops</div>
            <p>Good public transport connectivity throughout the suburb.</p>
        </div>
    `;
}

function generatePropertyInsights(amenities)
{
    const insightsContainer = document.getElementById('key-insights');

    // Count amenities by category
    const categoryCounts = {};
    amenities.forEach(amenity =>
    {
        categoryCounts[amenity.category] = (categoryCounts[amenity.category] || 0) + 1;
    });

    insightsContainer.innerHTML = `
        <div class="insight-card">
            <div class="insight-title">Location Advantage</div>
            <div class="insight-value">${amenities.length} amenities nearby</div>
            <p>The property is well-positioned with easy access to essential services and facilities.</p>
        </div>
        <div class="insight-card">
            <div class="insight-title">Education Access</div>
            <div class="insight-value">${categoryCounts['School'] || 0} schools</div>
            <p>Families have convenient access to educational institutions.</p>
        </div>
        <div class="insight-card">
            <div class="insight-title">Lifestyle Amenities</div>
            <div class="insight-value">${(categoryCounts['Green Spaces'] || 0) + (categoryCounts['Restaurant'] || 0)} facilities</div>
            <p>Plenty of options for recreation, dining, and leisure activities.</p>
        </div>
    `;
}

function updateSuburbMap(amenities)
{
    // Clear existing map
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = '';

    // Reinitialize map with suburb center
    const map = L.map('map').setView([-33.016, 151.672], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define category colors
    const categoryColors = {
        'School': 'blue',
        'Green Spaces': 'green',
        'Bus Stop': 'orange',
        'Restaurant': 'red',
        'Supermarket': 'purple'
    };

    // Add amenity markers
    amenities.forEach(amenity =>
    {
        const color = categoryColors[amenity.category] || 'gray';

        const amenityIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker([amenity.lat, amenity.lon], { icon: amenityIcon })
            .addTo(map)
            .bindPopup(`<b>${amenity.name || 'Unnamed Location'}</b><br>${amenity.category}`);
    });

    // Update map tab content
    document.getElementById('map-tab').innerHTML = `
        <p>Map showing all amenities in ${document.getElementById('suburb-name').value}.</p>
        <p><strong>Legend:</strong></p>
        <ul>
            <li><span style="color: blue">●</span> Schools</li>
            <li><span style="color: green">●</span> Green Spaces</li>
            <li><span style="color: orange">●</span> Bus Stops</li>
            <li><span style="color: red">●</span> Restaurants</li>
            <li><span style="color: purple">●</span> Supermarkets</li>
        </ul>
    `;
}

function updatePropertyMap(property, amenities)
{
    // Clear existing map
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = '';

    // Reinitialize map with property center
    const map = L.map('map').setView([property.coordinates.latitude, property.coordinates.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add property marker
    L.marker([property.coordinates.latitude, property.coordinates.longitude])
        .addTo(map)
        .bindPopup(`<b>${property.address.street}</b><br>Property Location`)
        .openPopup();

    // Define category colors
    const categoryColors = {
        'School': 'blue',
        'Green Spaces': 'green',
        'Bus Stop': 'orange',
        'Restaurant': 'red',
        'Supermarket': 'purple'
    };

    // Add amenity markers
    amenities.forEach(amenity =>
    {
        const color = categoryColors[amenity.category] || 'gray';

        const amenityIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker([amenity.lat, amenity.lon], { icon: amenityIcon })
            .addTo(map)
            .bindPopup(`<b>${amenity.name || 'Unnamed Location'}</b><br>${amenity.category}`);
    });

    // Update map tab content
    document.getElementById('map-tab').innerHTML = `
        <p>Map showing the property location (house icon) and nearby amenities (colored dots).</p>
        <p><strong>Legend:</strong></p>
        <ul>
            <li>🏠 Property Location</li>
            <li><span style="color: blue">●</span> Schools</li>
            <li><span style="color: green">●</span> Green Spaces</li>
            <li><span style="color: orange">●</span> Bus Stops</li>
            <li><span style="color: red">●</span> Restaurants</li>
            <li><span style="color: purple">●</span> Supermarkets</li>
        </ul>
    `;
}