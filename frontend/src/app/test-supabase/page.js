"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function UploadTest() {
    const [file, setFile] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleUpload = async () => {
        if (!file) return alert("Select a file first");

        // 📤 Upload file to Supabase bucket (must match exact bucket name)
        const { data, error } = await supabase.storage
            .from("logos")
            .upload(`test/${file.name}`, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.error("❌ Upload error:", error);
            return alert("❌ Upload failed");
        }

        // 🌐 Get public URL after successful upload
        const {
            data: { publicUrl },
        } = supabase.storage
            .from("logos")
            .getPublicUrl(`test/${file.name}`);

        alert("✅ Upload successful!\n" + publicUrl);
        setPreviewUrl(publicUrl);
    };

    if (!isClient) return null;

    return (
        <div className="p-6 border max-w-lg mx-auto">
            <h2 className="text-xl mb-4">🧪 Supabase Upload Test</h2>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
                onClick={handleUpload}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Upload to Supabase
            </button>

            {previewUrl && (
                <div className="mt-6">
                    <Image
                        src={previewUrl}
                        alt="Uploaded"
                        width={240}
                        height={180}
                        className="rounded border max-h-60"
                        style={{ objectFit: "contain" }}
                    />
                    
                </div>
            )}
        </div>
    );
}
