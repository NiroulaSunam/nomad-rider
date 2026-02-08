"use client";

import React, { useState } from 'react';
import { createSpot } from "../actions";
import { spotSchema } from "@/lib/validations/spot";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AddSpotPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    wifiSpeed: '',
    imageUrl: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({}); 

    const validation = spotSchema.safeParse({
      ...formData,
      wifiSpeed: formData.wifiSpeed 
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      return; 
    }

    const result = await createSpot(validation.data);

    if (result.success) {
      alert("Success! Spot added to the Nomad Network.");
      setFormData({ name: "", location: "", wifiSpeed: "", imageUrl: "" });
    } else {
      alert("Database Error: " + result.error);
    }
  };

  return (
    // Changed bg to match Navbar's slate-950
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center">
      {/* Title using the Blue from your Logo */}
      <h1 className="text-3xl font-bold mb-8 tracking-tight">
        Add <span className="text-blue-500">New Location</span>
      </h1>
      
      <form 
        onSubmit={handleSubmit}
        // Matching the Navbar's border and slightly lighter slate-900 background
        className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-800"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-slate-400">Name of Spot</label>
          <Input
            type="text"
            value={formData.name}
            placeholder="e.g. The Biker's Hub"
            // focus:border-blue-500 matches your logo
            className={`w-full p-3 rounded-lg bg-slate-800 border ${formErrors.name ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:border-blue-500 transition-all text-white`}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-slate-400">Location</label>
          <Input
            type="text"
            value={formData.location}
            placeholder="e.g. Kathmandu, Nepal"
            className={`w-full p-3 rounded-lg bg-slate-800 border ${formErrors.location ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:border-blue-500 transition-all text-white`}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          {formErrors.location && <p className="text-red-400 text-xs mt-1">{formErrors.location}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-slate-400">Wi-Fi Speed (Mbps)</label>
          <Input
            type="number"
            value={formData.wifiSpeed}
            placeholder="e.g. 50"
            className={`w-full p-3 rounded-lg bg-slate-800 border ${formErrors.wifiSpeed ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:border-blue-500 transition-all text-white`}
            onChange={(e) => setFormData({...formData, wifiSpeed: e.target.value})}
          />
          {formErrors.wifiSpeed && <p className="text-red-400 text-xs mt-1">{formErrors.wifiSpeed}</p>}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-slate-400">Image URL</label>
          <Input
            type="text"
            value={formData.imageUrl}
            placeholder="https://images.unsplash.com/..."
            className={`w-full p-3 rounded-lg bg-slate-800 border ${formErrors.imageUrl ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:border-blue-500 transition-all text-blue-100`}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          {formErrors.imageUrl && <p className="text-red-400 text-xs mt-1">{formErrors.imageUrl}</p>}
        </div>

        <Button
          type="submit"
          // Using the same blue-600/700 as your Navbar Login button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full transition duration-300 shadow-lg active:scale-95"
        >
          Save Location
        </Button>
      </form>
    </div>
  );
}