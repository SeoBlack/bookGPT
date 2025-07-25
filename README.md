# BookGPT - AI-Powered Book Assistant

BookGPT is an intelligent application that allows users to upload PDF books and chat with an AI assistant about the book's content. The system uses OpenAI for text processing and Pinecone for vector storage.

## Features

- 📚 PDF upload and text extraction
- 🤖 AI-powered chat about book content
- 🔍 Intelligent text search and retrieval
- 🛡️ Production-ready security features
- 📱 Responsive web interface
- 🐳 Docker support for easy deployment

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4 + Embeddings
- **Vector Database**: Pinecone
- **PDF Processing**: pdf-parse + OCR fallback
- **Security**: Helmet + Rate Limiting + CORS

## Quick Start (Development)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bookGPT
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

4. **Start development server**

   ```bash
   npm run dev:full
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Production Deployment

### Option 1: Docker Deployment (Recommended)

1. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your production API keys
   ```

2. **Build and run with Docker Compose**

   ```bash
   docker-compose up -d
   ```

3. **Access your application**
   Navigate to `http://your-server:3001`

### Option 2: Traditional Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Set production environment**

   ```bash
   export NODE_ENV=production
   ```

3. **Start the server**
   ```bash
   npm start
   ```

### Option 3: PM2 Deployment

1. **Install PM2**

   ```bash
   npm install -g pm2
   ```

2. **Start with PM2**
   ```bash
   pm2 start server.js --name bookgpt
   pm2 save
   pm2 startup
   ```

## Environment Variables

| Variable           | Required | Description           | Default                 |
| ------------------ | -------- | --------------------- | ----------------------- |
| `NODE_ENV`         | No       | Environment mode      | `development`           |
| `PORT`             | No       | Server port           | `3001`                  |
| `OPENAI_API_KEY`   | Yes      | OpenAI API key        | -                       |
| `PINECONE_API_KEY` | Yes      | Pinecone API key      | -                       |
| `FRONTEND_URL`     | No       | Frontend URL for CORS | `http://localhost:3000` |

## API Endpoints

### Health Check

- `GET /api/health` - Server health status

### File Upload

- `POST /api/upload` - Upload and process PDF
  - Body: `multipart/form-data` with `pdf` file and `bookTitle`

### Chat

- `POST /api/chat` - Chat with book assistant
  - Body: `{ "message": "string", "bookTitle": "string" }`

## Security Features

- ✅ Helmet.js for security headers
- ✅ Rate limiting (100 requests/15min in production)
- ✅ CORS protection
- ✅ File upload validation
- ✅ Input sanitization
- ✅ Error handling without information leakage

## Performance Features

- ✅ Gzip compression
- ✅ Static file serving
- ✅ Memory limits (1GB max)
- ✅ Health checks
- ✅ Graceful shutdown

## Monitoring

The application includes built-in monitoring:

- Request logging with timestamps and response times
- Health check endpoint
- Error tracking
- Memory usage monitoring

## Troubleshooting

### Common Issues

1. **PDF extraction fails**

   - Ensure the PDF is not corrupted
   - Check file size (max 50MB)
   - Verify PDF contains extractable text

2. **API rate limits**

   - Check OpenAI and Pinecone API limits
   - Monitor application rate limiting

3. **Memory issues**
   - Large PDFs may require more memory
   - Consider increasing Docker memory limits

### Logs

View application logs:

```bash
# Docker
docker-compose logs -f bookgpt

# PM2
pm2 logs bookgpt

# Direct
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
