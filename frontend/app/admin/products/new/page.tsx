"use client";

import { useState } from "react";
import { useProducts } from "@/components/product-provider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, UploadCloud, X, Loader2 } from "lucide-react";

import Link from "next/link";
import { compressImage, fileToDataUrl } from "@/lib/image-utils";


export default function AddProductPage() {
    const { addProduct } = useProducts();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previewVideo, setPreviewVideo] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        price: "",
        description: "",
        category: "scooters",
        motorPower: "",
        batteryCapacity: "",
        range: "",
        topSpeed: "",
        chargeTime: "",
        weight: "",
        maxLoad: "",
        warranty: "",
        condition: "new",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files).slice(0, 3 - imageFiles.length);
        if (newFiles.length === 0) return;

        setImageFiles(prev => [...prev, ...newFiles]);

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("video/")) {
            alert("Please upload a video file.");
            return;
        }

        setVideoFile(file);
        setPreviewVideo(URL.createObjectURL(file));
    };

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || imageFiles.length === 0) {
            alert("Please fill in the product name, price, and upload at least one image.");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Compress Images in parallel
            const compressedFiles = await Promise.all(
                imageFiles.map(file => compressImage(file))
            );

            const uploadFile = async (file: File): Promise<string> => {
                await new Promise((resolve) => setTimeout(resolve, 150));
                return fileToDataUrl(file);
            };

            const uploadPromises: Promise<string>[] = compressedFiles.map(file => 
                uploadFile(file as File)
            );

            let videoPromise: Promise<string> | null = null;
            if (videoFile) {
                videoPromise = uploadFile(videoFile as File);
            }

            const results = await Promise.all([
                Promise.all(uploadPromises),
                videoPromise || Promise.resolve("")
            ]);

            const imageUrls = results[0];
            const videoUrl = results[1];


            // 4. Save locally via ProductProvider
            await addProduct({
                type: formData.type.trim(),
                name: formData.name,
                price: formData.price.startsWith("GH₵") ? formData.price : `GH₵${formData.price}`,
                description: formData.description,
                image: imageUrls[0],
                images: imageUrls,
                videoUrl: videoUrl,
                category: formData.category.trim(),
                motorPower: formData.motorPower,
                batteryCapacity: formData.batteryCapacity,
                range: formData.range,
                topSpeed: formData.topSpeed,
                chargeTime: formData.chargeTime,
                weight: formData.weight,
                maxLoad: formData.maxLoad,
                warranty: formData.warranty,
                condition: formData.condition,
            });

            // Redirect back to products table
            router.push("/admin/products");
        } catch (error: any) {
            console.error("Product upload error:", error);
            // Check for specific upload errors
            const errorMessage = error.message?.includes("upload")
                ? `Media upload failed: ${error.message}.`
                : error.message;
            alert(`Failed to add product: ${errorMessage}`);
            setIsLoading(false);
        }

    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto text-slate-900">
            <header className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 border border-slate-300 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-mono font-bold tracking-tight">Add New Product</h1>
                    <p className="text-sm font-medium text-slate-500">
                        Create a new item in your store's catalog.
                    </p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="admin-product-form flex flex-col gap-8 bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">

                {/* Image Upload Area */}
                <div className="flex flex-col gap-4">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">
                        Product Images (At least 1 required, max 3)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {previewImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-square border border-slate-200 rounded-xl overflow-hidden group bg-slate-50">
                                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-2 right-2 p-1.5 bg-white border border-slate-300 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        {previewImages.length < 3 && (
                            <div className="relative aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-slate-700 mb-2" />
                                <p className="text-[10px] font-bold font-mono text-slate-500">ADD IMAGE</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Video Upload Area */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">
                        Product Video (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl h-48 flex flex-col items-center justify-center overflow-hidden hover:bg-slate-50 transition-colors group">
                        {previewVideo ? (
                            <>
                                <video
                                    src={previewVideo}
                                    className="w-full h-full object-contain"
                                    autoPlay
                                    loop
                                    muted
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewVideo(null);
                                        setVideoFile(null);
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-white border border-slate-300 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-center p-6">
                                <UploadCloud className="w-6 h-6 text-slate-400" />
                                <div>
                                    <p className="text-xs font-semibold font-mono">Upload Video</p>
                                </div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="type" className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">Product Type</label>
                            <input id="type" name="type" type="text" list="product-types" placeholder="e.g. Electric Scooter" value={formData.type} onChange={handleChange} className="w-full bg-white border-b border-slate-300 px-0 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors" />
                            <datalist id="product-types">
                                <option value="Electric Scooter" />
                                <option value="Electric Bike" />
                                <option value="Electric Motorbike" />
                                <option value="Accessory" />
                            </datalist>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">
                                Product Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g. Volt X2 Electric Scooter"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-white border-b border-slate-300 px-0 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">
                                Price (GH₵)
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                placeholder="150"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full bg-white border-b border-slate-300 px-0 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">
                                Category
                            </label>
                            <input
                                id="category"
                                name="category"
                                list="product-categories"
                                placeholder="Type or choose a category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-white border-b border-slate-300 px-0 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
                            />
                            <datalist id="product-categories">
                                <option value="scooters" />
                                <option value="bikes" />
                                <option value="motorbikes" />
                                <option value="accessories" />
                            </datalist>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                ["motorPower", "Motor Power", "500W"],
                                ["batteryCapacity", "Battery", "48V 15Ah"],
                                ["range", "Range", "60km per charge"],
                                ["topSpeed", "Top Speed", "25km/h"],
                                ["chargeTime", "Charge Time", "5-6 hours"],
                                ["weight", "Weight", "32kg"],
                                ["maxLoad", "Max Load", "180kg"],
                                ["warranty", "Warranty", "6 months"],
                            ].map(([name, label, placeholder]) => (
                                <div key={name} className="flex flex-col gap-2">
                                    <label htmlFor={name} className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">{label}</label>
                                    <input id={name} name={name} type="text" placeholder={placeholder} value={formData[name as keyof typeof formData]} onChange={handleChange} className="w-full bg-white border-b border-slate-300 px-0 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors" />
                                </div>
                            ))}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="condition" className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">Condition</label>
                                <select id="condition" name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-white border-b border-slate-300 px-0 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none">
                                    <option value="new">New</option>
                                    <option value="refurbished">Refurbished</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 h-full">
                            <label htmlFor="description" className="text-xs font-bold font-mono tracking-widest uppercase text-slate-600">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Write a detailed description of the product..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full h-[300px] bg-white border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 rounded-md focus:border-slate-900 focus:outline-none transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-md text-sm font-bold tracking-widest font-mono uppercase hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-slate-900 text-white rounded-md text-sm font-bold tracking-widest font-mono uppercase hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

