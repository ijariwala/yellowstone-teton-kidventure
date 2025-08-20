import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Flight and daily route coordinates
const coordinates: Record<string, [number, number]> = {
  // Major airports (user can customize departure city)
  seattle: [-122.3328, 47.6061],
  jackson: [-110.7377, 43.4799],
  
  // Key locations in the parks
  grantVillage: [-110.5497, 44.3968],
  oldFaithful: [-110.8281, 44.4605],
  grandPrismatic: [-110.8404, 44.5251],
  grandCanyon: [-110.4984, 44.7197],
  mammothSprings: [-110.7034, 44.9762],
  gardiner: [-110.7043, 45.0293],
  lamarValley: [-110.1534, 44.9267],
  rooseveltArch: [-110.7021, 45.0320],
  
  // Grand Teton locations
  jacksonLake: [-110.7863, 43.8633],
  jennyLake: [-110.7244, 43.7424],
  hiddenFalls: [-110.7387, 43.7531],
  oxbowBend: [-110.6979, 43.8733],
  mormonRow: [-110.6873, 43.6558]
};

interface DailyRoute {
  day: string;
  title: string;
  route: [number, number][];
  color: string;
  highlights: string[];
}

const dailyRoutes: DailyRoute[] = [
  {
    day: "Day 1: Sunday",
    title: "Arrival & Grand Teton",
    route: [
      coordinates.jackson,
      coordinates.jacksonLake,
      coordinates.jennyLake,
      coordinates.hiddenFalls,
      coordinates.grantVillage
    ],
    color: "#22c55e",
    highlights: ["Jackson Airport", "Jackson Lake", "Jenny Lake", "Hidden Falls", "Grant Village"]
  },
  {
    day: "Day 2: Monday", 
    title: "Complete Grand Teton",
    route: [
      coordinates.grantVillage,
      coordinates.jacksonLake,
      coordinates.oxbowBend,
      coordinates.mormonRow,
      coordinates.grantVillage
    ],
    color: "#3b82f6",
    highlights: ["Scenic Loop", "Oxbow Bend", "Mormon Row", "Jackson Lake Lodge"]
  },
  {
    day: "Day 3: Tuesday",
    title: "Geyser Basins",
    route: [
      coordinates.grantVillage,
      coordinates.oldFaithful,
      coordinates.grandPrismatic,
      coordinates.grantVillage
    ],
    color: "#f59e0b",
    highlights: ["Old Faithful", "Grand Prismatic", "Fountain Paint Pot"]
  },
  {
    day: "Day 4: Wednesday",
    title: "Grand Canyon & Move North",
    route: [
      coordinates.grantVillage,
      coordinates.grandCanyon,
      coordinates.mammothSprings,
      coordinates.gardiner
    ],
    color: "#ef4444",
    highlights: ["Grand Canyon", "Artist Point", "Mammoth Springs", "Gardiner"]
  },
  {
    day: "Day 5: Thursday",
    title: "Northern Yellowstone",
    route: [
      coordinates.gardiner,
      coordinates.lamarValley,
      coordinates.mammothSprings,
      coordinates.gardiner
    ],
    color: "#8b5cf6",
    highlights: ["Lamar Valley", "Tower Fall", "Wildlife Viewing"]
  }
];

const MapSection = () => {
  const flightMapContainer = useRef<HTMLDivElement>(null);
  const dailyMapContainer = useRef<HTMLDivElement>(null);
  const flightMap = useRef<mapboxgl.Map | null>(null);
  const dailyMap = useRef<mapboxgl.Map | null>(null);
  
  const [mapboxToken, setMapboxToken] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [mapsInitialized, setMapsInitialized] = useState(false);
  const [departureCity, setDepartureCity] = useState('seattle');

  const initializeMaps = () => {
    if (!mapboxToken || !flightMapContainer.current || !dailyMapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    // Flight Map
    flightMap.current = new mapboxgl.Map({
      container: flightMapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-116, 45], // Centered between departure and destination
      zoom: 4,
      pitch: 30
    });

    // Daily Routes Map  
    dailyMap.current = new mapboxgl.Map({
      container: dailyMapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: coordinates.grantVillage,
      zoom: 9,
      pitch: 45
    });

    // Add controls to both maps
    [flightMap.current, dailyMap.current].forEach(map => {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    });

    flightMap.current.on('load', () => {
      addFlightRoute();
    });

    dailyMap.current.on('load', () => {
      addDailyRoutes();
      showDayRoute(0);
    });

    setMapsInitialized(true);
  };

  const addFlightRoute = () => {
    if (!flightMap.current) return;

    const departure = coordinates[departureCity as keyof typeof coordinates] || coordinates.seattle;
    const flightPath: [number, number][] = [departure, coordinates.jackson];

    // Add flight route
    flightMap.current.addSource('flight-route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: flightPath
        }
      }
    });

    flightMap.current.addLayer({
      id: 'flight-path',
      type: 'line',
      source: 'flight-route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ff6b6b',
        'line-width': 4,
        'line-dasharray': [2, 2]
      }
    });

    // Add markers
    [
      { coords: departure, label: 'Departure', color: '#ff6b6b' },
      { coords: coordinates.jackson, label: 'Jackson, WY', color: '#4ecdc4' }
    ].forEach(point => {
      new mapboxgl.Marker({ color: point.color })
        .setLngLat(point.coords)
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${point.label}</strong>`))
        .addTo(flightMap.current!);
    });

    // Fit to flight path
    const bounds = new mapboxgl.LngLatBounds();
    flightPath.forEach(coord => bounds.extend(coord));
    flightMap.current.fitBounds(bounds, { padding: 50 });
  };

  const addDailyRoutes = () => {
    if (!dailyMap.current) return;

    dailyRoutes.forEach((dayRoute, index) => {
      // Add route source
      dailyMap.current!.addSource(`route-${index}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: dayRoute.route
          }
        }
      });

      // Add route layer (initially hidden)
      dailyMap.current!.addLayer({
        id: `route-${index}`,
        type: 'line',
        source: `route-${index}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': index === 0 ? 'visible' : 'none'
        },
        paint: {
          'line-color': dayRoute.color,
          'line-width': 4
        }
      });

      // Add markers for highlights
      dayRoute.route.forEach((coord, markerIndex) => {
        const marker = new mapboxgl.Marker({ 
          color: dayRoute.color,
          scale: 0.8
        })
          .setLngLat(coord)
          .setPopup(new mapboxgl.Popup().setHTML(`
            <strong>${dayRoute.highlights[markerIndex] || `Stop ${markerIndex + 1}`}</strong><br>
            ${dayRoute.day}
          `));
        
        if (index === 0) {
          marker.addTo(dailyMap.current!);
        }
        
        // Store marker reference for later show/hide
        (marker as any).dayIndex = index;
        if (!(dailyMap.current as any).dayMarkers) {
          (dailyMap.current as any).dayMarkers = [];
        }
        (dailyMap.current as any).dayMarkers.push(marker);
      });
    });
  };

  const showDayRoute = (dayIndex: number) => {
    if (!dailyMap.current || !mapsInitialized) return;

    setActiveDay(dayIndex);

    // Hide all routes and markers
    dailyRoutes.forEach((_, index) => {
      dailyMap.current!.setLayoutProperty(`route-${index}`, 'visibility', 'none');
    });

    // Hide all markers
    if ((dailyMap.current as any).dayMarkers) {
      (dailyMap.current as any).dayMarkers.forEach((marker: any) => {
        marker.remove();
      });
    }

    // Show selected route
    dailyMap.current.setLayoutProperty(`route-${dayIndex}`, 'visibility', 'visible');

    // Show markers for selected day
    if ((dailyMap.current as any).dayMarkers) {
      (dailyMap.current as any).dayMarkers
        .filter((marker: any) => marker.dayIndex === dayIndex)
        .forEach((marker: any) => marker.addTo(dailyMap.current!));
    }

    // Fit to route bounds
    const bounds = new mapboxgl.LngLatBounds();
    dailyRoutes[dayIndex].route.forEach(coord => bounds.extend(coord));
    dailyMap.current.fitBounds(bounds, { padding: 50 });
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMaps();
    }

    return () => {
      flightMap.current?.remove();
      dailyMap.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">🗺️ Your Adventure Route</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow your journey from takeoff to every scenic stop in Yellowstone and Grand Teton!
        </p>
      </div>

      {!mapboxToken && (
        <Card className="mb-8 bg-mountain/10 border-mountain/20">
          <CardHeader>
            <CardTitle className="text-mountain">🔑 Setup Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              To view the interactive maps, please enter your Mapbox public token. 
              You can get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-mountain hover:underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your Mapbox public token (pk.eyJ...)"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => mapboxToken && initializeMaps()}
                disabled={!mapboxToken}
              >
                Load Maps
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {mapboxToken && (
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Flight Route Map */}
          <Card className="bg-gradient-card shadow-card-adventure">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                ✈️ Your Flight to Adventure
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                See the states you'll cross on your way to Jackson!
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Departure City:</label>
                <select 
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                  disabled={mapsInitialized}
                >
                  <option value="seattle">Seattle, WA</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {mapsInitialized ? "Map loaded with current selection" : "Select your departure city"}
                </p>
              </div>
              <div 
                ref={flightMapContainer} 
                className="w-full h-80 rounded-lg border"
                style={{ minHeight: '320px' }}
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-[#ff6b6b] rounded"></div>
                  <span className="text-sm">Flight Path</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your flight crosses multiple states on the way to Jackson Hole!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Daily Routes Map */}
          <Card className="bg-gradient-card shadow-card-adventure">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                🚗 Daily Park Adventures
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Click a day to see where you'll explore!
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                {dailyRoutes.map((route, index) => (
                  <Button
                    key={index}
                    variant={activeDay === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => showDayRoute(index)}
                    className="text-xs justify-start"
                    disabled={!mapsInitialized}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: route.color }}
                    />
                    {route.day.split(':')[0]}
                  </Button>
                ))}
              </div>
              
              <div 
                ref={dailyMapContainer} 
                className="w-full h-80 rounded-lg border"
                style={{ minHeight: '320px' }}
              />
              
              {mapsInitialized && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">{dailyRoutes[activeDay].title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {dailyRoutes[activeDay].highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      )}

      {/* Travel Tips */}
      <Card className="mt-8 bg-forest/10 border-forest/20">
        <CardHeader>
          <CardTitle className="text-forest flex items-center gap-2">
            🧭 Travel Tips for Kids
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">In the Car:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Look for license plates from different states</li>
                <li>• Count different animals you see along the way</li>
                <li>• Take photos of interesting rock formations</li>
                <li>• Keep a travel journal of your adventure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fun Facts:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Yellowstone is bigger than Rhode Island and Delaware combined!</li>
                <li>• You'll drive through 3 different states during your trip</li>
                <li>• The parks have over 1,000 miles of hiking trails</li>
                <li>• Some roads reach elevations over 8,000 feet high!</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MapSection;