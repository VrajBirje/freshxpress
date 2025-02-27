"use client";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface FormData {
  full_name: string;
  contact_number: string;
  email?: string;
  aadhaar?: string;
  total_land_area: string;
  crops_grown: string[];
  farming_type: string;
  irrigation_method: string;
  fertilizer_usage: string;
  harvest_seasons: string;
  average_yield: string;
  previous_buyers: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  pin_code: string;
  geo_location: string;
  nearest_market: string;
  delivery_mode: string;
  storage_facilities: string;
  distance_to_road: string;
  transport_availability: string;
  payment_method: string;
  bank_account: string;
  bank_name: string;
  ifsc_code: string;
  upi_id: string;
  land_ownership_proof: string;
  long_term_partnership: string;
  additional_remarks: string;
  latitude: number;
  longitude: number;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    contact_number: "",
    email: "",
    aadhaar: "",
    total_land_area: "",
    crops_grown: [""],
    farming_type: "",
    irrigation_method: "",
    fertilizer_usage: "",
    harvest_seasons: "",
    average_yield: "",
    previous_buyers: "",
    village: "",
    taluk: "",
    district: "",
    state: "",
    pin_code: "",
    geo_location: "",
    nearest_market: "",
    delivery_mode: "",
    storage_facilities: "",
    distance_to_road: "",
    transport_availability: "",
    payment_method: "",
    bank_account: "",
    bank_name: "",
    ifsc_code: "",
    upi_id: "",
    land_ownership_proof: "",
    long_term_partnership: "",
    additional_remarks: "",
    latitude: 0,
    longitude: 0,
  });

  const handleCropChange = (index: number, value: string) => {
    const newCropsGrown = [...formData.crops_grown];
    newCropsGrown[index] = value;

    // If the current input is filled and it's the last one, add a new empty input
    if (index === newCropsGrown.length - 1 && value.trim() !== "") {
      newCropsGrown.push("");
    }

    setFormData({ ...formData, crops_grown: newCropsGrown });
  };

  const handleRemoveCrop = (index: number) => {
    const newCropsGrown = formData.crops_grown.filter((_, i) => i !== index);
    setFormData({ ...formData, crops_grown: newCropsGrown });
  };

  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, [name]: selectedValues });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      if (name === 'land_ownership_proof') {
        try {
          // Upload file to Supabase Storage
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `${formData.full_name}/${fileName}`;

          const { data, error } = await supabase.storage
            .from('farmer-documents')
            .upload(filePath, file);

          if (error) {
            throw error;
          }

          // Get public URL for the uploaded file
          const { data: { publicUrl } } = supabase.storage
            .from('farmer-documents')
            .getPublicUrl(filePath);

          setFormData(prev => ({
            ...prev,
            land_ownership_proof: publicUrl
          }));

        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Failed to upload file. Please try again.');
        }
      } else {
        setFormData({ ...formData, [name]: file });
      }
    }
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await fetchTextAddress(latitude, longitude);

          setFormData({
            ...formData,
            geo_location: address,
            latitude,
            longitude
          });
          console.log(formData)
          if (map) {
            map.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(map);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://freshxpress-backend.onrender.com/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to add farmer');
      
      // Reset form data to initial empty state
      setFormData({
        full_name: "", contact_number: "", email: "", aadhaar: "",
        total_land_area: "", crops_grown: [""], farming_type: "",
        irrigation_method: "", fertilizer_usage: "", harvest_seasons: "",
        average_yield: "", previous_buyers: "", village: "", taluk: "",
        district: "", state: "", pin_code: "", geo_location: "",
        nearest_market: "", delivery_mode: "", storage_facilities: "",
        distance_to_road: "", transport_availability: "", payment_method: "",
        bank_account: "", bank_name: "", ifsc_code: "", upi_id: "",
        land_ownership_proof: "", long_term_partnership: "",
        additional_remarks: "", latitude: 0, longitude: 0
      });
      
      alert("Farmer added successfully!");
    } catch (error) {
      alert("Error adding farmer");
      console.error(error);
    }
  };

  const [map, setMap] = useState<L.Map | null>(null);
  const [address, setAddress] = useState<string>("");

  // Initialize the map
  useEffect(() => {
    const mapInstance = L.map("map").setView([12.9716, 77.5946], 13); // Set initial view to Bengaluru

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup on unmount
    return () => {
      mapInstance.remove();
    };
  }, []);

  // Add click event to the map
  useEffect(() => {
    if (!map) return;

    const handleMapClick = async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add new marker
      L.marker([lat, lng]).addTo(map);

      // Fetch address using Nominatim
      const address = await fetchTextAddress(lat, lng);
      setAddress(address);

      // Update form data
      setFormData({
        ...formData,
        geo_location: address,
        latitude: lat,
        longitude: lng
      });
    };

    map.on("click", handleMapClick);

    // Cleanup event listener
    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, formData]);

  // Fetch address from latitude and longitude using Nominatim
  const fetchTextAddress = async (lat: number, lng: number): Promise<string> => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.display_name) {
        return data.display_name; // Return the formatted address
      } else {
        throw new Error("No address found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      throw new Error("Unable to fetch address. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url(/bg.png)" }}>
      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl my-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Farmer Onboarding Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic Information */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Basic Information</legend>
              <label className="block">
                Full Name: <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.full_name && <span className="text-red-500 text-sm">{errors.full_name}</span>}
              </label>
              <label className="block">
                Contact Number: <input type="tel" name="contact_number" value={formData.contact_number} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.contact_number && <span className="text-red-500 text-sm">{errors.contact_number}</span>}
              </label>
              <label className="block">
                Email: <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
              </label>
              <label className="block">
                Aadhaar Number: <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} className="w-full border p-2 rounded" />
              </label>
            </fieldset>

            {/* Farm & Crop Details */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Farm & Crop Details</legend>
              <label className="block">
                Total Land Area (acres): <input type="number" name="total_land_area" value={formData.total_land_area} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.total_land_area && <span className="text-red-500 text-sm">{errors.total_land_area}</span>}
              </label>
              <label className="block">Crops Grown:
                {formData.crops_grown.map((crop, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={crop}
                      onChange={(e) => handleCropChange(index, e.target.value)}
                      className="w-full border p-2 rounded"
                      placeholder={`Crop ${index + 1}`}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCrop(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </label>
              <label className="block">
                Type of Farming: <select name="farming_type" value={formData.farming_type} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Organic">Organic</option>
                  <option value="Conventional">Conventional</option>
                  <option value="Natural">Natural</option>
                  <option value="Mixed">Mixed</option>
                </select>
                {errors.farming_type && <span className="text-red-500 text-sm">{errors.farming_type}</span>}
              </label>
              <label className="block">
                Irrigation Method: <select name="irrigation_method" value={formData.irrigation_method} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Borewell">Borewell</option>
                  <option value="Canal">Canal</option>
                  <option value="Drip">Drip</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Mixed">Mixed</option>
                </select>
                {errors.irrigation_method && <span className="text-red-500 text-sm">{errors.irrigation_method}</span>}
              </label>
              <label className="block">
                Fertilizer & Pesticide Usage: <select name="fertilizer_usage" value={formData.fertilizer_usage} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Organic">Organic</option>
                  <option value="Both">Both</option>
                </select>
                {errors.fertilizer_usage && <span className="text-red-500 text-sm">{errors.fertilizer_usage}</span>}
              </label>
              <label className="block">
                Harvest Seasons: <input type="text" name="harvest_seasons" value={formData.harvest_seasons} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.harvest_seasons && <span className="text-red-500 text-sm">{errors.harvest_seasons}</span>}
              </label>
              <label className="block">
                Average Yield (quintals/tons): <input type="text" name="average_yield" value={formData.average_yield} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.average_yield && <span className="text-red-500 text-sm">{errors.average_yield}</span>}
              </label>
              <label className="block">
                Previous Buyers: <textarea name="previous_buyers" value={formData.previous_buyers} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.previous_buyers && <span className="text-red-500 text-sm">{errors.previous_buyers}</span>}
              </label>
            </fieldset>

            {/* Location Details */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Location Details</legend>
              <label className="block">
                Village: <input type="text" name="village" value={formData.village} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.village && <span className="text-red-500 text-sm">{errors.village}</span>}
              </label>
              <label className="block">
                Taluk / Tehsil: <input type="text" name="taluk" value={formData.taluk} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.taluk && <span className="text-red-500 text-sm">{errors.taluk}</span>}
              </label>
              <label className="block">
                District: <input type="text" name="district" value={formData.district} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.district && <span className="text-red-500 text-sm">{errors.district}</span>}
              </label>
              <label className="block">
                State: <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
              </label>
              <label className="block">
                Pin Code: <input type="text" name="pin_code" value={formData.pin_code} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.pin_code && <span className="text-red-500 text-sm">{errors.pin_code}</span>}
              </label>
              <div>
                {/* Map Container */}
                <div id="map" style={{ height: "400px", width: "100%" }}></div>

                {/* Display Coordinates and Address */}
                {formData.latitude !== 0 && formData.longitude !== 0 && (
                  <div className="mt-4">
                    <p><strong>Latitude:</strong> {formData.latitude}</p>
                    <p><strong>Longitude:</strong> {formData.longitude}</p>
                    <p><strong>Address:</strong> {address}</p>
                  </div>
                )}
              </div>
              <label className="block">
                Geo-Location: <button type="button" onClick={handleGeoLocation} className="bg-blue-500 text-white px-4 py-2 rounded">Fetch Location</button>
                <input type="text" name="geo_location" value={formData.geo_location} onChange={handleChange} required className="w-full border p-2 rounded mt-2" readOnly />
                {errors.geo_location && <span className="text-red-500 text-sm">{errors.geo_location}</span>}
              </label>
              <label className="block">
                Nearest Market / Mandi: <input type="text" name="nearest_market" value={formData.nearest_market} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.nearest_market && <span className="text-red-500 text-sm">{errors.nearest_market}</span>}
              </label>
            </fieldset>

            {/* Logistics & Supply Preferences */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Logistics & Supply Preferences</legend>
              <label className="block">
                Preferred Mode of Delivery: <select name="delivery_mode" value={formData.delivery_mode} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Self">Self</option>
                  <option value="Third-Party Logistics">Third-Party Logistics</option>
                  <option value="Cooperative Transport">Cooperative Transport</option>
                </select>
                {errors.delivery_mode && <span className="text-red-500 text-sm">{errors.delivery_mode}</span>}
              </label>
              <label className="block">
                Storage Facilities Available: <select name="storage_facilities" value={formData.storage_facilities} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Cold Storage">Cold Storage</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Open Shed">Open Shed</option>
                  <option value="None">None</option>
                </select>
                {errors.storage_facilities && <span className="text-red-500 text-sm">{errors.storage_facilities}</span>}
              </label>
              <label className="block">
                Distance from Nearest Major Road (km): <input type="number" name="distance_to_road" value={formData.distance_to_road} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.distance_to_road && <span className="text-red-500 text-sm">{errors.distance_to_road}</span>}
              </label>
              <label className="block">
                Availability of Transport Vehicle: <select name="transport_availability" value={formData.transport_availability} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.transport_availability && <span className="text-red-500 text-sm">{errors.transport_availability}</span>}
              </label>
            </fieldset>

            {/* Payment & Banking Details */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Payment & Banking Details</legend>
              <label className="block">
                Preferred Payment Method: <select name="payment_method" value={formData.payment_method} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.payment_method && <span className="text-red-500 text-sm">{errors.payment_method}</span>}
              </label>

              {formData.payment_method === "Bank Transfer" && (
                <>
                  <label className="block">
                    Bank Account Number: <input type="text" name="bank_account" value={formData.bank_account} onChange={handleChange} required className="w-full border p-2 rounded" />
                    {errors.bank_account && <span className="text-red-500 text-sm">{errors.bank_account}</span>}
                  </label>
                  <label className="block">
                    Bank Name & Branch: <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} required className="w-full border p-2 rounded" />
                    {errors.bank_name && <span className="text-red-500 text-sm">{errors.bank_name}</span>}
                  </label>
                  <label className="block">
                    IFSC Code: <input type="text" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} required className="w-full border p-2 rounded" />
                    {errors.ifsc_code && <span className="text-red-500 text-sm">{errors.ifsc_code}</span>}
                  </label>
                </>
              )}

              {formData.payment_method === "UPI" && (
                <label className="block">
                  UPI ID: <input type="text" name="upi_id" value={formData.upi_id} onChange={handleChange} required className="w-full border p-2 rounded" />
                  {errors.upi_id && <span className="text-red-500 text-sm">{errors.upi_id}</span>}
                </label>
              )}
            </fieldset>

            {/* Supporting Documents */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Supporting Documents</legend>
              <label className="block">
                Crop Image: <input type="file" name="land_ownership_proof" onChange={handleFileChange} className="w-full border p-2 rounded" />
                {formData.land_ownership_proof && (
                  <p className="text-sm text-green-600 mt-1">File uploaded successfully</p>
                )}
              </label>
            </fieldset>

            {/* Additional Information */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Additional Information</legend>
              <label className="block">
                Willing to Partner for Long-Term Supply? <select name="long_term_partnership" value={formData.long_term_partnership} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.long_term_partnership && <span className="text-red-500 text-sm">{errors.long_term_partnership}</span>}
              </label>
              <label className="block">
                Additional Remarks: <textarea name="additional_remarks" value={formData.additional_remarks} onChange={handleChange} className="w-full border p-2 rounded" />
              </label>
            </fieldset>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;