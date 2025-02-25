"use client";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface FormData {
  fullName: string;
  contactNumber: string;
  email?: string;
  aadhaar?: string;
  totalLandArea: string;
  cropsGrown: string[];
  farmingType: string;
  irrigationMethod: string;
  fertilizerUsage: string;
  harvestSeasons: string;
  averageYield: string;
  previousBuyers: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  pinCode: string;
  geoLocation: string;
  nearestMarket: string;
  deliveryMode: string;
  storageFacilities: string;
  distanceToRoad: string;
  transportAvailability: string;
  paymentMethod: string;
  bankAccount: string;
  bankName: string;
  ifscCode: string;
  upiId: string;
  landOwnershipProof: string;
  longTermPartnership: string;
  additionalRemarks: string;
  latitude: number;
  longitude: number;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactNumber: "",
    email: "",
    aadhaar: "",
    totalLandArea: "",
    cropsGrown: [""],
    farmingType: "",
    irrigationMethod: "",
    fertilizerUsage: "",
    harvestSeasons: "",
    averageYield: "",
    previousBuyers: "",
    village: "",
    taluk: "",
    district: "",
    state: "",
    pinCode: "",
    geoLocation: "",
    nearestMarket: "",
    deliveryMode: "",
    storageFacilities: "",
    distanceToRoad: "",
    transportAvailability: "",
    paymentMethod: "",
    bankAccount: "",
    bankName: "",
    ifscCode: "",
    upiId: "",
    landOwnershipProof: "",
    longTermPartnership: "",
    additionalRemarks: "",
    latitude: 0,
    longitude: 0,
  });

  const handleCropChange = (index: number, value: string) => {
    const newCropsGrown = [...formData.cropsGrown];
    newCropsGrown[index] = value;

    // If the current input is filled and it's the last one, add a new empty input
    if (index === newCropsGrown.length - 1 && value.trim() !== "") {
      newCropsGrown.push("");
    }

    setFormData({ ...formData, cropsGrown: newCropsGrown });
  };

  const handleRemoveCrop = (index: number) => {
    const newCropsGrown = formData.cropsGrown.filter((_, i) => i !== index);
    setFormData({ ...formData, cropsGrown: newCropsGrown });
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

      if (name === 'landOwnershipProof') {
        try {
          // Upload file to Supabase Storage
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `${formData.fullName}/${fileName}`;

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
            landOwnershipProof: publicUrl
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
            geoLocation: address,
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
      const response = await fetch('http://localhost:5000/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to add farmer');
      
      // Reset form data to initial empty state
      setFormData({
        fullName: "", contactNumber: "", email: "", aadhaar: "",
        totalLandArea: "", cropsGrown: [""], farmingType: "",
        irrigationMethod: "", fertilizerUsage: "", harvestSeasons: "",
        averageYield: "", previousBuyers: "", village: "", taluk: "",
        district: "", state: "", pinCode: "", geoLocation: "",
        nearestMarket: "", deliveryMode: "", storageFacilities: "",
        distanceToRoad: "", transportAvailability: "", paymentMethod: "",
        bankAccount: "", bankName: "", ifscCode: "", upiId: "",
        landOwnershipProof: "", longTermPartnership: "",
        additionalRemarks: "", latitude: 0, longitude: 0
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
        geoLocation: address,
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
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url(/image.png)" }}>
      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl my-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Farmer Onboarding Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic Information */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Basic Information</legend>
              <label className="block">
                Full Name: <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
              </label>
              <label className="block">
                Contact Number: <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber}</span>}
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
                Total Land Area (acres): <input type="number" name="totalLandArea" value={formData.totalLandArea} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.totalLandArea && <span className="text-red-500 text-sm">{errors.totalLandArea}</span>}
              </label>
              <label className="block">Crops Grown:
                {formData.cropsGrown.map((crop, index) => (
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
                Type of Farming: <select name="farmingType" value={formData.farmingType} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Organic">Organic</option>
                  <option value="Conventional">Conventional</option>
                  <option value="Natural">Natural</option>
                  <option value="Mixed">Mixed</option>
                </select>
                {errors.farmingType && <span className="text-red-500 text-sm">{errors.farmingType}</span>}
              </label>
              <label className="block">
                Irrigation Method: <select name="irrigationMethod" value={formData.irrigationMethod} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Borewell">Borewell</option>
                  <option value="Canal">Canal</option>
                  <option value="Drip">Drip</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Mixed">Mixed</option>
                </select>
                {errors.irrigationMethod && <span className="text-red-500 text-sm">{errors.irrigationMethod}</span>}
              </label>
              <label className="block">
                Fertilizer & Pesticide Usage: <select name="fertilizerUsage" value={formData.fertilizerUsage} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Organic">Organic</option>
                  <option value="Both">Both</option>
                </select>
                {errors.fertilizerUsage && <span className="text-red-500 text-sm">{errors.fertilizerUsage}</span>}
              </label>
              <label className="block">
                Harvest Seasons: <input type="text" name="harvestSeasons" value={formData.harvestSeasons} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.harvestSeasons && <span className="text-red-500 text-sm">{errors.harvestSeasons}</span>}
              </label>
              <label className="block">
                Average Yield (quintals/tons): <input type="text" name="averageYield" value={formData.averageYield} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.averageYield && <span className="text-red-500 text-sm">{errors.averageYield}</span>}
              </label>
              <label className="block">
                Previous Buyers: <textarea name="previousBuyers" value={formData.previousBuyers} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.previousBuyers && <span className="text-red-500 text-sm">{errors.previousBuyers}</span>}
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
                Pin Code: <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.pinCode && <span className="text-red-500 text-sm">{errors.pinCode}</span>}
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
                <input type="text" name="geoLocation" value={formData.geoLocation} onChange={handleChange} required className="w-full border p-2 rounded mt-2" readOnly />
                {errors.geoLocation && <span className="text-red-500 text-sm">{errors.geoLocation}</span>}
              </label>
              <label className="block">
                Nearest Market / Mandi: <input type="text" name="nearestMarket" value={formData.nearestMarket} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.nearestMarket && <span className="text-red-500 text-sm">{errors.nearestMarket}</span>}
              </label>
            </fieldset>

            {/* Logistics & Supply Preferences */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Logistics & Supply Preferences</legend>
              <label className="block">
                Preferred Mode of Delivery: <select name="deliveryMode" value={formData.deliveryMode} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Self">Self</option>
                  <option value="Third-Party Logistics">Third-Party Logistics</option>
                  <option value="Cooperative Transport">Cooperative Transport</option>
                </select>
                {errors.deliveryMode && <span className="text-red-500 text-sm">{errors.deliveryMode}</span>}
              </label>
              <label className="block">
                Storage Facilities Available: <select name="storageFacilities" value={formData.storageFacilities} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Cold Storage">Cold Storage</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Open Shed">Open Shed</option>
                  <option value="None">None</option>
                </select>
                {errors.storageFacilities && <span className="text-red-500 text-sm">{errors.storageFacilities}</span>}
              </label>
              <label className="block">
                Distance from Nearest Major Road (km): <input type="number" name="distanceToRoad" value={formData.distanceToRoad} onChange={handleChange} required className="w-full border p-2 rounded" />
                {errors.distanceToRoad && <span className="text-red-500 text-sm">{errors.distanceToRoad}</span>}
              </label>
              <label className="block">
                Availability of Transport Vehicle: <select name="transportAvailability" value={formData.transportAvailability} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.transportAvailability && <span className="text-red-500 text-sm">{errors.transportAvailability}</span>}
              </label>
            </fieldset>

            {/* Payment & Banking Details */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Payment & Banking Details</legend>
              <label className="block">
                Preferred Payment Method: <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.paymentMethod && <span className="text-red-500 text-sm">{errors.paymentMethod}</span>}
              </label>

              {formData.paymentMethod === "Bank Transfer" && (
                <>
                  <label className="block">
                    Bank Account Number: <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required className="w-full border p-2 rounded" />
                    {errors.bankAccount && <span className="text-red-500 text-sm">{errors.bankAccount}</span>}
                  </label>
                  <label className="block">
                    Bank Name & Branch: <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required className="w-full border p-2 rounded" />
                    {errors.bankName && <span className="text-red-500 text-sm">{errors.bankName}</span>}
                  </label>
                  <label className="block">
                    IFSC Code: <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required className="w-full border p-2 rounded" />
                    {errors.ifscCode && <span className="text-red-500 text-sm">{errors.ifscCode}</span>}
                  </label>
                </>
              )}

              {formData.paymentMethod === "UPI" && (
                <label className="block">
                  UPI ID: <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} required className="w-full border p-2 rounded" />
                  {errors.upiId && <span className="text-red-500 text-sm">{errors.upiId}</span>}
                </label>
              )}
            </fieldset>

            {/* Supporting Documents */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Supporting Documents</legend>
              <label className="block">
                Land Ownership Proof: <input type="file" name="landOwnershipProof" onChange={handleFileChange} className="w-full border p-2 rounded" />
                {formData.landOwnershipProof && (
                  <p className="text-sm text-green-600 mt-1">File uploaded successfully</p>
                )}
              </label>
            </fieldset>

            {/* Additional Information */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold">Additional Information</legend>
              <label className="block">
                Willing to Partner for Long-Term Supply? <select name="longTermPartnership" value={formData.longTermPartnership} onChange={handleChange} required className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.longTermPartnership && <span className="text-red-500 text-sm">{errors.longTermPartnership}</span>}
              </label>
              <label className="block">
                Additional Remarks: <textarea name="additionalRemarks" value={formData.additionalRemarks} onChange={handleChange} className="w-full border p-2 rounded" />
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