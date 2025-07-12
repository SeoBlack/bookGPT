import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const UploadPage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingStep, setProcessingStep] = useState("");
  const navigate = useNavigate();

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setError("");
    setSelectedFile(file);
    setUploading(true);
    setProgress(0);
    setProcessingStep("Preparing upload...");

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      setProcessingStep("Processing PDF and generating embeddings...");

      // Upload to backend
      const response = await apiService.uploadPDF(
        file,
        file.name.replace(/\.pdf$/i, "")
      );

      clearInterval(progressInterval);
      setProgress(100);
      setProcessingStep("Complete! Redirecting to chat...");

      setTimeout(() => {
        navigate("/chat", {
          state: { bookTitle: response.bookTitle },
        });
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again."
      );
      setUploading(false);
      setProgress(0);
      setProcessingStep("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Upload Your Book
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Upload any book in PDF format. We'll process it with AI to create
          embeddings for intelligent chat and analysis.
        </p>

        <input
          ref={fileInput}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Drag and drop area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive
              ? "border-green-500 bg-green-50"
              : "border-green-300 hover:border-green-400"
          } ${uploading ? "pointer-events-none opacity-50" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-2">
              <div className="text-green-600 text-lg">
                📚 {selectedFile.name}
              </div>
              <div className="text-sm text-gray-500">
                {formatFileSize(selectedFile.size)}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl text-green-400">📄</div>
              <div className="text-lg font-medium text-gray-700">
                Drop your PDF here
              </div>
              <div className="text-sm text-gray-500">
                or click to browse files
              </div>
            </div>
          )}
        </div>

        {/* Upload button */}
        <button
          className="w-full mt-4 bg-green-600 text-white rounded-lg px-6 py-3 font-semibold shadow-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Processing..." : "Choose PDF File"}
        </button>

        {/* Progress bar */}
        {uploading && (
          <div className="w-full mt-4">
            <div className="h-2 bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{processingStep}</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Features preview */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            What happens next:
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 📄 Extract text from your PDF</li>
            <li>• 🧠 Generate AI embeddings for each section</li>
            <li>• 💾 Store in vector database for fast retrieval</li>
            <li>• 💬 Enable intelligent chat with your book</li>
          </ul>
        </div>

        {/* Back to home */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-green-600 hover:text-green-700 text-sm underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
