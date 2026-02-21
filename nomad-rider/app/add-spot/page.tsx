"use client";

import React, { useState } from 'react';
import { createSpot } from "../actions";
import { spotSchema } from "@/lib/validations/spot";
import { Button } from '@/components/ui/button';
import NextImage from 'next/image';
import { Input } from '@/components/ui/input';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core"; 

export default function AddSpotPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    wifiSpeed: '',
  });

  const [imageUrl, setImageUrl] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); 

    // Convert wifiSpeed to number for Zod
    const submissionData = {
      ...formData,
      wifiSpeed: formData.wifiSpeed === "" ? 0 : Number(formData.wifiSpeed),
      imageUrl: imageUrl 
    };

    console.log("Submitting Data:", submissionData);

    const validation = spotSchema.safeParse(submissionData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) errors[err.path[0].toString()] = err.message;
      });
      setFormErrors(errors);
      setIsSubmitting(false);
      return; 
    }

    const result = await createSpot(validation.data);
    if (result.success) {
      alert("✅ Spot Added Successfully!");
      setFormData({ name: "", location: "", wifiSpeed: "" });
      setImageUrl(""); 
    } else {
      alert("❌ Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">
        Add <span className="text-blue-500">New Location</span>
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-800">
        
        <div className="space-y-4 mb-6">
          <div>
             <Input
              placeholder="Spot Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              className="bg-slate-800 border-slate-700"
            />
            {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
              className="bg-slate-800 border-slate-700"
            />
             {formErrors.location && <p className="text-red-400 text-xs mt-1">{formErrors.location}</p>}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Wifi Speed (Mbps)"
              value={formData.wifiSpeed}
              onChange={(e) => setFormData(prev => ({...prev, wifiSpeed: e.target.value}))}
              className="bg-slate-800 border-slate-700"
            />
            {formErrors.wifiSpeed && <p className="text-red-400 text-xs mt-1">{formErrors.wifiSpeed}</p>}
          </div>
        </div>

        <div className="mb-8">
          {imageUrl ? (
            <div className="relative rounded-lg overflow-hidden border-2 border-blue-500 h-48 w-full">
              <NextImage src={imageUrl} alt="Preview" fill className="object-cover" />
              <button 
                type="button" 
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full z-20"
              >✕</button>
            </div>
          ) : (
            <div className="bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center">
              <UploadButton<OurFileRouter, "spotImage">
                endpoint="spotImage"
                onClientUploadComplete={(res) => {
                  if (res?.[0]) {
                    console.log("Upload Success:", res[0].url);
                    setImageUrl(res[0].url);
                  }
                }}
                onUploadError={(error) => alert(error.message)}
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!imageUrl || isSubmitting} 
          className="w-full py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 transition-all"
        >
          {isSubmitting ? "Saving..." : imageUrl ? "Save Location" : "Upload Photo First"}
        </Button>
      </form>
    </div>
  );
}