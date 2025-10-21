# Microburbs API Dashboard

A comprehensive web application that integrates with the Microburbs API to provide insightful property and suburb data visualization with interactive mapping and analytics.

## Features

- **Multi-Endpoint Support**: Switch between Property, Suburb, AVM, and CMA endpoints
- **Dynamic API Integration**: Real-time data fetching with proper authentication
- **Interactive Maps**: Visualize properties and amenities using Leaflet.js
- **Smart Filtering**: Category-based filtering for amenities (Schools, Parks, Restaurants, etc.)
- **Insight Generation**: Automated analysis of property value drivers and suburb characteristics
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## API Endpoints Supported

### Property Endpoint Functions
- Amenities, Demographics, Development Applications, Property History, Market Insights, Risk Factors, Schools, Zoning, and more

### Suburb Endpoint Functions  
- Amenities, Demographics, For Sale Properties, School Catchments, Market Insights, Similar Suburbs, and more

## Quick Start

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/microburbs-dashboard.git](https://github.com/Farhankaioum/property-management/)
   ```

2. **Open the application**
   ```bash
   cd property-management
   open index.html
   ```

3. **Start exploring data**
   - Select "Property" endpoint and enter a Property ID
   - Or select "Suburb" endpoint and enter a suburb name
   - Click "Fetch Data" to load information

## Usage Examples

### Property Analysis
```
Endpoint: Property
Function: Amenities  
Property ID: GANSW704074813
```
*Displays property details with nearby schools, parks, and facilities*

### Suburb Research
```
Endpoint: Suburb
Function: Amenities
Suburb Name: Belmont North
```
*Shows comprehensive suburb amenities, schools, and infrastructure*

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Mapping**: Leaflet.js with OpenStreetMap
- **API**: Microburbs REST API with Bearer token authentication
- **Styling**: Custom CSS with CSS Grid and Flexbox

## Key Components

- `apiConfig` - Centralized API configuration management
- Dynamic form handling for different endpoints
- Category-based filtering system
- Interactive map visualization
- Automated insight generation engine

## Data Visualization Features

- Color-coded amenity markers on maps
- Statistical overview cards
- Category distribution analysis
- Property comparison tables
- Interactive filtering controls

## Browser Support

- Chrome
- Firefox
- Safari
- Edge

**Transform complex property data into actionable insights with intuitive visualization and smart analytics.**
