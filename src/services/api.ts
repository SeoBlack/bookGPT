const API_BASE_URL = "http://localhost:3001/api";

export interface UploadResponse {
  success: boolean;
  bookTitle: string;
  chunksProcessed: number;
  message: string;
}

export interface ChatResponse {
  response: string;
  contextUsed: boolean;
}

export interface ChatRequest {
  message: string;
  bookTitle: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async uploadPDF(file: File, bookTitle?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("pdf", file);
    if (bookTitle) {
      formData.append("bookTitle", bookTitle);
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  }

  async sendChatMessage(
    message: string,
    bookTitle: string
  ): Promise<ChatResponse> {
    return this.request<ChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ message, bookTitle }),
    });
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>("/health");
  }
}

export const apiService = new ApiService();
