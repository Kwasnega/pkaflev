"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, 
    Trash2, 
    Eye,
    Save,
    RefreshCw,
    Check,
    Image as ImageIcon,
    ArrowUp,
    ArrowDown,
    Edit3,
    Grid3X3,
    Upload,
    X,
    GripVertical
} from "lucide-react";
import Image from "next/image";
// TODO: replace with real API call — see GET /gallery once backend is ready
const DEFAULT_GALLERY_SPREADS: any[] = [];

const MAX_RUNWAY_IMAGES = 8;

// Grid Image type for The Grid section
interface GridImage {
    id: string;
    src: string;
    position: string;
    size: string;
}

// Gallery Spreads - Matching Frontend Structure
interface GallerySpread {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: { src: string; position: string; size: string }[];
    product: { name: string; price: string };
    layout: string;
}

const DEFAULT_SPREADS: GallerySpread[] = DEFAULT_GALLERY_SPREADS as GallerySpread[];

const LAYOUT_OPTIONS = [
    { id: "editorial-right", label: "Editorial Right", description: "Main image with overlapping secondary" },
    { id: "split", label: "Split", description: "Two equal side-by-side images" },
    { id: "layered", label: "Layered", description: "Background with floating foreground images" },
    { id: "inset", label: "Inset", description: "Full cover with bottom inset" },
    { id: "hero-cluster", label: "Hero Cluster", description: "Center hero with corner thumbnails" },
    { id: "triptych", label: "Triptych", description: "Three column layout" },
    { id: "mosaic", label: "Mosaic", description: "Mixed size collage layout" },
    { id: "gallery-wall", label: "Gallery Wall (The Grid)", description: "Multi-image grid layout - The main GRID section" },
];

// GRID POSITION OPTIONS
const GRID_POSITIONS = [
    { id: "hero", label: "Hero (Large Center)", description: "Main large hero image" },
    { id: "thumb-1", label: "Thumb 1", description: "Thumbnail position 1" },
    { id: "thumb-2", label: "Thumb 2", description: "Thumbnail position 2" },
    { id: "thumb-3", label: "Thumb 3", description: "Thumbnail position 3" },
    { id: "thumb-4", label: "Thumb 4", description: "Thumbnail position 4" },
    { id: "thumb-5", label: "Thumb 5", description: "Thumbnail position 5" },
    { id: "thumb-6", label: "Thumb 6", description: "Thumbnail position 6" },
    { id: "thumb-7", label: "Thumb 7", description: "Thumbnail position 7" },
    { id: "thumb-8", label: "Thumb 8", description: "Thumbnail position 8" },
];

// Spread Card Component
function SpreadCard({ 
    spread, 
    index,
    onEdit,
    onDelete,
    onMoveUp,
    onMoveDown,
    isFirst,
    isLast
}: { 
    spread: GallerySpread;
    index: number;
    onEdit: (spread: GallerySpread) => void;
    onDelete: (id: number) => void;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] relative"
            style={{ pointerEvents: 'auto' }}
        >
            {/* Spread Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">
                        {spread.id}
                    </span>
                    <div>
                        <h3 className="font-semibold">{spread.title}</h3>
                        <p className="text-xs text-white/50">{spread.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onMoveUp(index);
                        }}
                        disabled={isFirst}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Move up"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onMoveDown(index);
                        }}
                        disabled={isLast}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Move down"
                    >
                        <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Edit button clicked for spread:', spread.id);
                            onEdit(spread);
                        }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer relative z-50 pointer-events-auto"
                        title="Edit spread"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(spread.id);
                        }}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete spread"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            {/* Spread Preview */}
            <div className="p-4">
                <div className="flex gap-4">
                    {/* Images Preview */}
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        {spread.images.map((img, i) => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                                <Image
                                    src={img.src}
                                    alt={`${spread.title} - ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                />
                                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px]">
                                    {img.size}
                                </div>
                            </div>
                        ))}
                        {spread.images.length === 2 && (
                            <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                                <span className="text-white/20 text-xs">No image</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Details */}
                    <div className="w-48 space-y-3">
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Description</p>
                            <p className="text-sm text-white/70 line-clamp-2">{spread.description}</p>
                        </div>
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Product</p>
                            <p className="text-sm font-medium">{spread.product.name}</p>
                            <p className="text-xs text-white/50">{spread.product.price}</p>
                        </div>
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Layout</p>
                            <span className="inline-block px-2 py-1 rounded bg-white/10 text-xs">
                                {spread.layout}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Edit Spread Modal
function EditSpreadModal({
    spread,
    isOpen,
    onClose,
    onSave
}: {
    spread: GallerySpread | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (spread: GallerySpread) => void;
}) {
    const [editedSpread, setEditedSpread] = useState<GallerySpread | null>(spread);
    const [uploadingImage, setUploadingImage] = useState<number | null>(null);
    
    // Sync state when spread prop changes
    useEffect(() => {
        if (spread) {
            setEditedSpread(spread);
        }
    }, [spread]);
    
    if (!isOpen || !spread || !editedSpread) return null;
    
    const handleImageChange = (index: number, newSrc: string) => {
        const newImages = [...editedSpread.images];
        newImages[index] = { ...newImages[index], src: newSrc };
        setEditedSpread({ ...editedSpread, images: newImages });
    };
    
    const handleAddImage = () => {
        if (editedSpread.images.length < MAX_RUNWAY_IMAGES) {
            setEditedSpread({
                ...editedSpread,
                images: [...editedSpread.images, { src: "/SMimages/pic3.webp", position: `frame-${editedSpread.images.length + 1}`, size: "medium" }]
            });
        }
    };
    
    const handleRemoveImage = (index: number) => {
        if (editedSpread.images.length > 1) {
            const newImages = editedSpread.images.filter((_, i) => i !== index);
            setEditedSpread({ ...editedSpread, images: newImages });
        }
    };
    
    const handleImageUpload = async (index: number, file: File) => {
        setUploadingImage(index);
        try {
            const url = URL.createObjectURL(file);
            handleImageChange(index, url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            setUploadingImage(null);
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Edit Spread</h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Plus className="w-5 h-5 rotate-45" />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Title & Subtitle */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Title</label>
                            <input
                                type="text"
                                value={editedSpread.title}
                                onChange={(e) => setEditedSpread({ ...editedSpread, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Subtitle</label>
                            <input
                                type="text"
                                value={editedSpread.subtitle}
                                onChange={(e) => setEditedSpread({ ...editedSpread, subtitle: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                            />
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                        <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Description</label>
                        <textarea
                            value={editedSpread.description}
                            onChange={(e) => setEditedSpread({ ...editedSpread, description: e.target.value })}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 resize-none"
                        />
                    </div>
                    
                    {/* Layout */}
                    <div>
                        <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Layout Style</label>
                        <select
                            value={editedSpread.layout}
                            onChange={(e) => setEditedSpread({ ...editedSpread, layout: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                        >
                            {LAYOUT_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Product */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Product Name</label>
                            <input
                                type="text"
                                value={editedSpread.product.name}
                                onChange={(e) => setEditedSpread({ 
                                    ...editedSpread, 
                                    product: { ...editedSpread.product, name: e.target.value }
                                })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Product Price</label>
                            <input
                                type="text"
                                value={editedSpread.product.price}
                                onChange={(e) => setEditedSpread({ 
                                    ...editedSpread, 
                                    product: { ...editedSpread.product, price: e.target.value }
                                })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                            />
                        </div>
                    </div>
                    
                    {/* Images */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Runway Images ({editedSpread.images.length}/{MAX_RUNWAY_IMAGES})</label>
                            {editedSpread.images.length < MAX_RUNWAY_IMAGES && (
                                <button
                                    onClick={handleAddImage}
                                    className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> Add Image
                                </button>
                            )}
                        </div>
                        <div className="space-y-3">
                            {editedSpread.images.map((img, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 shrink-0">
                                        <Image
                                            src={img.src}
                                            alt={`Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={img.src}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                                className="flex-1 bg-transparent border-b border-white/10 py-2 text-sm focus:outline-none focus:border-white/30"
                                                placeholder="Image path..."
                                            />
                                            <label className="cursor-pointer p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors shrink-0">
                                                {uploadingImage === index ? (
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Upload className="w-4 h-4" />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleImageUpload(index, file);
                                                    }}
                                                    disabled={uploadingImage === index}
                                                />
                                            </label>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <select
                                                value={img.position}
                                                onChange={(e) => {
                                                    const newImages = [...editedSpread.images];
                                                    newImages[index] = { ...newImages[index], position: e.target.value };
                                                    setEditedSpread({ ...editedSpread, images: newImages });
                                                }}
                                                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1"
                                            >
                                                <option>main</option>
                                                <option>frame-2</option>
                                                <option>frame-3</option>
                                                <option>frame-4</option>
                                                <option>frame-5</option>
                                                <option>frame-6</option>
                                                <option>frame-7</option>
                                                <option>frame-8</option>
                                                <option>left</option>
                                                <option>right</option>
                                                <option>background</option>
                                                <option>center</option>
                                                <option>col-1</option>
                                                <option>col-2</option>
                                                <option>col-3</option>
                                            </select>
                                            <select
                                                value={img.size}
                                                onChange={(e) => {
                                                    const newImages = [...editedSpread.images];
                                                    newImages[index] = { ...newImages[index], size: e.target.value };
                                                    setEditedSpread({ ...editedSpread, images: newImages });
                                                }}
                                                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1"
                                            >
                                                <option>large</option>
                                                <option>medium</option>
                                                <option>small</option>
                                                <option>half</option>
                                                <option>full</option>
                                                <option>hero</option>
                                                <option>third</option>
                                            </select>
                                        </div>
                                    </div>
                                    {editedSpread.images.length > 1 && (
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave(editedSpread);
                            onClose();
                        }}
                        className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Grid Manager Component
function GridManager({ 
    gridSpread, 
    onUpdate,
    onSave
}: { 
    gridSpread: GallerySpread | undefined;
    onUpdate: (spread: GallerySpread) => void;
    onSave: () => void;
}) {
    const [images, setImages] = useState<GridImage[]>([]);
    const [newImagePath, setNewImagePath] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("thumb-1");
    
    useEffect(() => {
        if (gridSpread) {
            setImages(gridSpread.images.map((img, idx) => ({
                id: `grid-img-${idx}`,
                src: img.src,
                position: img.position,
                size: img.size
            })));
        }
    }, [gridSpread]);
    
    if (!gridSpread) {
        return (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 border-dashed text-center">
                <Grid3X3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 mb-2">The Grid spread doesn't exist yet</p>
                <p className="text-white/30 text-sm">Create a spread with "gallery-wall" layout or add one below</p>
            </div>
        );
    }
    
    const handleAddImage = () => {
        if (!newImagePath.trim()) return;
        
        const newImage: GridImage = {
            id: `grid-img-${Date.now()}`,
            src: newImagePath,
            position: selectedPosition,
            size: selectedPosition === "hero" ? "large" : "small"
        };
        
        const updatedImages = [...images, newImage];
        setImages(updatedImages);
        
        // Update the spread
        onUpdate({
            ...gridSpread,
            images: updatedImages.map(img => ({
                src: img.src,
                position: img.position,
                size: img.size
            }))
        });
        
        setNewImagePath("");
    };
    
    const handleRemoveImage = (id: string) => {
        const updatedImages = images.filter(img => img.id !== id);
        setImages(updatedImages);
        onUpdate({
            ...gridSpread,
            images: updatedImages.map(img => ({
                src: img.src,
                position: img.position,
                size: img.size
            }))
        });
    };
    
    const handleMoveImage = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index > 0) {
            const updatedImages = [...images];
            [updatedImages[index], updatedImages[index - 1]] = [updatedImages[index - 1], updatedImages[index]];
            setImages(updatedImages);
            onUpdate({
                ...gridSpread,
                images: updatedImages.map(img => ({
                    src: img.src,
                    position: img.position,
                    size: img.size
                }))
            });
        } else if (direction === 'down' && index < images.length - 1) {
            const updatedImages = [...images];
            [updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]];
            setImages(updatedImages);
            onUpdate({
                ...gridSpread,
                images: updatedImages.map(img => ({
                    src: img.src,
                    position: img.position,
                    size: img.size
                }))
            });
        }
    };
    
    const heroImage = images.find(img => img.position === "hero");
    const thumbImages = images.filter(img => img.position.startsWith("thumb"));
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingNewImage, setUploadingNewImage] = useState(false);
    
    const handleUploadNewImage = async (file: File) => {
        if (!file) return;
        
        setUploadingNewImage(true);
        try {
            const url = URL.createObjectURL(file);
            const newImage = {
                id: `thumb-${Date.now()}`,
                src: url,
                position: `thumb-${thumbImages.length + 1}`,
                size: "small"
            };
            
            const newImages = [...images, newImage];
            setImages(newImages);
            onUpdate({
                ...gridSpread,
                images: newImages.map(img => ({
                    src: img.src,
                    position: img.position,
                    size: img.size
                }))
            });
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            setUploadingNewImage(false);
        }
    };
    
    return (
        <div className="space-y-6">
            {/* Grid Preview */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Grid Preview ({images.length} images)</h4>
                    <button
                        onClick={onSave}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                    >
                        <Save className="w-4 h-4" />
                        Save Grid
                    </button>
                </div>
                
                {/* Visual Grid Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Hero Image - Spans 2x2 */}
                    {heroImage && (
                        <div className="col-span-1 sm:col-span-2 row-span-2 relative aspect-square rounded-xl overflow-hidden bg-white/10 ring-2 ring-white/20">
                            <Image
                                src={heroImage.src}
                                alt="Hero"
                                fill
                                className="object-cover"
                                sizes="300px"
                            />
                            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-xs font-bold">
                                HERO
                            </div>
                            <button
                                onClick={() => handleRemoveImage(heroImage.id)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                    
                    {/* Thumbnail Images */}
                    {thumbImages.map((img, idx) => (
                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden bg-white/10 group">
                            <Image
                                src={img.src}
                                alt={`Thumb ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="150px"
                            />
                            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px]">
                                {img.position}
                            </div>
                            
                            {/* Hover Controls */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                <button
                                    onClick={() => handleMoveImage(images.indexOf(img), 'up')}
                                    disabled={images.indexOf(img) === 0}
                                    className="p-1 rounded bg-white/20 hover:bg-white/30 disabled:opacity-30"
                                >
                                    <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => handleRemoveImage(img.id)}
                                    className="p-1 rounded bg-red-500/80 hover:bg-red-500 text-white"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => handleMoveImage(images.indexOf(img), 'down')}
                                    disabled={images.indexOf(img) === images.length - 1}
                                    className="p-1 rounded bg-white/20 hover:bg-white/30 disabled:opacity-30"
                                >
                                    <ArrowDown className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add Image Button */}
                    <label className="aspect-square rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all group cursor-pointer relative">
                        {uploadingNewImage ? (
                            <RefreshCw className="w-8 h-8 text-white/40 animate-spin" />
                        ) : (
                            <Plus className="w-8 h-8 text-white/40 group-hover:text-white/70 transition-colors" />
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUploadNewImage(file);
                            }}
                            disabled={uploadingNewImage}
                        />
                    </label>
                </div>
            </div>
            
            {/* Image List */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-semibold mb-4">Grid Images List</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    <AnimatePresence>
                        {images.map((img, index) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 shrink-0">
                                    <Image
                                        src={img.src}
                                        alt={img.position}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{img.src.split('/').pop()}</p>
                                    <p className="text-xs text-white/50">{img.position} • {img.size}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleMoveImage(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30"
                                    >
                                        <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleMoveImage(index, 'down')}
                                        disabled={index === images.length - 1}
                                        className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30"
                                    >
                                        <ArrowDown className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveImage(img.id)}
                                        className="p-1.5 rounded hover:bg-red-500/20 text-red-400"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Main Gallery Page
export default function GalleryPage() {
    const [spreads, setSpreads] = useState<GallerySpread[]>(DEFAULT_SPREADS);
    const [editingSpread, setEditingSpread] = useState<GallerySpread | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [activeTab, setActiveTab] = useState<'spreads' | 'grid'>('spreads');
    
    useEffect(() => {
        setSpreads(DEFAULT_SPREADS);
    }, []);
    
    const handleEdit = (spread: GallerySpread) => {
        console.log('Opening edit modal for spread:', spread.id);
        setEditingSpread(spread);
        setIsEditModalOpen(true);
    };
    
    const handleSaveSpread = (updatedSpread: GallerySpread) => {
        setSpreads(prev => prev.map(s => s.id === updatedSpread.id ? updatedSpread : s));
        setSaveStatus('idle');
    };
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this spread?')) {
            setSpreads(prev => prev.filter(s => s.id !== id));
            // Reorder IDs
            setSpreads(prev => prev.map((s, i) => ({ ...s, id: i + 1 })));
            setSaveStatus('idle');
        }
    };
    
    const handleMoveUp = (index: number) => {
        if (index > 0) {
            const newSpreads = [...spreads];
            [newSpreads[index], newSpreads[index - 1]] = [newSpreads[index - 1], newSpreads[index]];
            setSpreads(newSpreads.map((s, i) => ({ ...s, id: i + 1 })));
            setSaveStatus('idle');
        }
    };
    
    const handleMoveDown = (index: number) => {
        if (index < spreads.length - 1) {
            const newSpreads = [...spreads];
            [newSpreads[index], newSpreads[index + 1]] = [newSpreads[index + 1], newSpreads[index]];
            setSpreads(newSpreads.map((s, i) => ({ ...s, id: i + 1 })));
            setSaveStatus('idle');
        }
    };
    
    const handleAddSpread = () => {
        const newId = spreads.length > 0 ? Math.max(...spreads.map(s => s.id)) + 1 : 1;
        const newSpread: GallerySpread = {
            id: newId,
            title: "New Spread",
            subtitle: "New Chapter",
            description: "Description for this spread...",
            images: [
                { src: "/SMimages/pic3.webp", position: "center", size: "large" }
            ],
            product: { name: "New Product", price: "GH₵0" },
            layout: "editorial-right"
        };
        setSpreads([...spreads, newSpread]);
        setSaveStatus('idle');
    };
    
    const handleSaveAll = async () => {
        setSaveStatus('saving');
        try {
            setSpreads(spreads);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (error) {
            console.error('Save error:', error);
            setSaveStatus('idle');
            alert('Failed to save local gallery changes.');
        }
    };
    
    const handlePreview = () => {
        window.open('/gallery', '_blank');
    };
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Gallery Management</h1>
                    <p className="text-white/50 text-sm mt-1">Manage lookbook spreads matching your frontend gallery</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePreview}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Preview</span>
                    </button>
                    <button
                        onClick={handleAddSpread}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add Spread</span>
                    </button>
                    <button
                        onClick={handleSaveAll}
                        disabled={saveStatus === 'saving'}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            saveStatus === 'saved' 
                                ? 'bg-green-500 text-black' 
                                : 'bg-white text-black hover:bg-white/90'
                        }`}
                    >
                        {saveStatus === 'saving' ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : saveStatus === 'saved' ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save All'}
                        </span>
                    </button>
                </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Total Spreads</p>
                    <p className="text-2xl font-bold">{spreads.length}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Total Images</p>
                    <p className="text-2xl font-bold">{spreads.reduce((acc, s) => acc + s.images.length, 0)}</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-white/50 text-xs mb-1">Layout Styles</p>
                    <p className="text-2xl font-bold">{new Set(spreads.map(s => s.layout)).size}</p>
                </motion.div>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
                <button
                    onClick={() => setActiveTab('spreads')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        activeTab === 'spreads' ? 'bg-white text-black' : 'text-white/60'
                    }`}
                >
                    <ImageIcon className="w-4 h-4" />
                    Spreads ({spreads.length})
                </button>
                <button
                    onClick={() => setActiveTab('grid')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        activeTab === 'grid' ? 'bg-white text-black' : 'text-white/60'
                    }`}
                >
                    <Grid3X3 className="w-4 h-4" />
                    The Grid
                    {spreads.find(s => s.layout === 'gallery-wall') && (
                        <span className="ml-1 px-1.5 py-0.5 rounded bg-white/20 text-[10px]">
                            {spreads.find(s => s.layout === 'gallery-wall')?.images.length}
                        </span>
                    )}
                </button>
            </div>

            {activeTab === 'spreads' ? (
                <>
                    {/* Layout Legend */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-3">Available Layouts</p>
                        <div className="flex flex-wrap gap-2">
                            {LAYOUT_OPTIONS.map(layout => (
                                <div key={layout.id} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-xs font-medium">{layout.label}</span>
                                    <span className="text-xs text-white/40 ml-2">{layout.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Spreads List */}
                    <div className="space-y-4">
                        {spreads.map((spread, index) => (
                            <SpreadCard
                                key={spread.id}
                                spread={spread}
                                index={index}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onMoveUp={handleMoveUp}
                                onMoveDown={handleMoveDown}
                                isFirst={index === 0}
                                isLast={index === spreads.length - 1}
                            />
                        ))}
                    </div>
                    
                    {spreads.length === 0 && (
                        <div className="text-center py-16 rounded-2xl border border-white/10 border-dashed">
                            <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/50 mb-2">No gallery spreads yet</p>
                            <button
                                onClick={handleAddSpread}
                                className="text-white hover:underline text-sm"
                            >
                                Create your first spread
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* The Grid Section */
                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                            <Grid3X3 className="w-6 h-6" />
                            <h3 className="text-lg font-semibold">The Grid</h3>
                        </div>
                        <p className="text-sm text-white/60">
                            This is the main gallery wall where most of your pictures will be displayed. 
                            Add images here to populate the GRID section on your frontend gallery page.
                        </p>
                    </div>
                    
                    <GridManager 
                        gridSpread={spreads.find(s => s.layout === 'gallery-wall')}
                        onUpdate={(updatedSpread) => {
                            setSpreads(prev => prev.map(s => s.id === updatedSpread.id ? updatedSpread : s));
                            setSaveStatus('idle');
                        }}
                        onSave={handleSaveAll}
                    />
                    
                    {!spreads.find(s => s.layout === 'gallery-wall') && (
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <button
                                onClick={() => {
                                    const newId = spreads.length > 0 ? Math.max(...spreads.map(s => s.id)) + 1 : 1;
                                    const newGridSpread: GallerySpread = {
                                        id: newId,
                                        title: "The Grid",
                                        subtitle: "Collection",
                                        description: "All angles. Every perspective.",
                                        images: [
                                            { src: "/SMimages/pic9.webp", position: "hero", size: "large" },
                                            { src: "/SMimages/pic5.webp", position: "thumb-1", size: "small" },
                                            { src: "/SMimages/pic5.webp", position: "thumb-2", size: "small" },
                                            { src: "/SMimages/pic1.webp", position: "thumb-3", size: "small" },
                                        ],
                                        product: { name: "Complete Set", price: "GH₵350" },
                                        layout: "gallery-wall"
                                    };
                                    setSpreads([...spreads, newGridSpread]);
                                    setSaveStatus('idle');
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors mx-auto"
                            >
                                <Plus className="w-4 h-4" />
                                Create The Grid Spread
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {/* Edit Modal */}
            <EditSpreadModal
                spread={editingSpread}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingSpread(null);
                }}
                onSave={handleSaveSpread}
            />
        </div>
    );
}
