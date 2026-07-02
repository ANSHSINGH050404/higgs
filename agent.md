# Higgs Agent Architecture and Workflow

## Overview
Higgs is an AI video generation SaaS platform that allows users to generate videos from text prompts using OpenRouter's video generation models. The system uses a microservices architecture with queue-based processing for scalability.

## Architecture Components

### Frontend (Next.js)
- **Home Page**: Landing page with navigation to video generation
- **Text-to-Video Page**: Form for video generation with parameters
- **Video Playback Page**: Video player for viewing generated content
- **User Profile Page**: User information and video history
- **Admin Panel**: Admin interface for video management

### Backend (Express + TypeScript)
- **REST API**: Handles HTTP requests from frontend
- **Authentication**: JWT-based auth for user sessions
- **Video Processing Service**: Orchestrates video generation workflow
- **Storage Service**: Manages MinIO object storage
- **Queue Service**: Redis/Bull for async job processing

### Infrastructure Services
- **PostgreSQL**: Primary database for users, videos, and metadata
- **MinIO**: S3-compatible object storage for videos and images
- **Redis**: Queue backend and caching
- **Face Fusion**: Self-hosted face swap service (Docker)
- **OpenRouter**: External API for video model inference

## Workflow

### Video Generation Workflow

1. **User Request**
   - User submits video generation request via frontend form
   - Frontend sends POST request to `/api/videos/generate`
   - Request includes: prompt, duration, quality, aspect ratio, optional reference image

2. **Authentication**
   - Backend validates JWT token
   - Extracts user ID from token
   - Checks user permissions

3. **Request Validation**
   - Validate input parameters
   - Check user quota/limits
   - Store reference image to MinIO if provided

4. **Job Creation**
   - Create video record in PostgreSQL with status "pending"
   - Add job to Redis queue with Bull
   - Return job ID to frontend

5. **Queue Processing**
   - Worker picks up job from queue
   - Updates video status to "processing"

6. **Video Generation**
   - Call OpenRouter API with prompt and parameters
   - Wait for video generation completion
   - Download generated video

7. **Storage**
   - Upload video to MinIO
   - Generate thumbnail
   - Store URLs in database

8. **Completion**
   - Update video status to "completed"
   - Update video URL and thumbnail URL
   - Notify frontend via WebSocket or polling

9. **Face Swap (Optional)**
   - If face swap requested, send to Face Fusion service
   - Process video with face swap
   - Replace original video in storage

### Authentication Flow

1. **Registration**
   - User submits email and password
   - Backend hashes password with bcrypt
   - Creates user record in PostgreSQL
   - Returns JWT token

2. **Login**
   - User submits credentials
   - Backend verifies password hash
   - Generates JWT token
   - Returns token to frontend

3. **Token Validation**
   - Frontend includes JWT in Authorization header
   - Backend verifies token signature
   - Extracts user context
   - Grants access based on role

### Error Handling

- **API Errors**: Return appropriate HTTP status codes with error messages
- **Queue Failures**: Retry jobs with exponential backoff
- **Storage Errors**: Log errors and notify admin
- **Generation Failures**: Update video status to "failed" with error message

## Data Models

### User
- id: UUID
- email: String (unique)
- password: String (hashed)
- name: String (optional)
- role: String ("user" or "admin")
- createdAt: DateTime
- updatedAt: DateTime

### Video
- id: UUID
- userId: UUID (foreign key)
- prompt: String
- duration: Int (seconds)
- quality: String ("720p", "1080p", "4k")
- aspectRatio: String ("16:9", "9:16", "1:1")
- startFrame: Int (optional)
- endFrame: Int (optional)
- status: String ("pending", "processing", "completed", "failed")
- videoUrl: String (optional)
- thumbnailUrl: String (optional)
- referenceImageUrl: String (optional)
- jobId: String (optional)
- errorMessage: String (optional)
- createdAt: DateTime
- updatedAt: DateTime

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user info

### Videos
- POST `/api/videos/generate` - Generate new video
- GET `/api/videos/:id` - Get video by ID
- GET `/api/videos` - Get user's videos (paginated)
- DELETE `/api/videos/:id` - Delete video

### Users
- GET `/api/users/:id` - Get user profile
- PUT `/api/users/:id` - Update user profile
- GET `/api/users/:id/videos` - Get user's video history

### Admin
- GET `/api/admin/videos` - Get all videos (admin only)
- PUT `/api/admin/videos/:id/status` - Update video status (admin only)
- DELETE `/api/admin/videos/:id` - Delete any video (admin only)

## Environment Variables

See `.env.example` files in both `apps/backend` and `apps/web` for required environment variables.

## Development Setup

1. Start infrastructure services:
   ```bash
   docker-compose up -d postgres redis minio
   ```

2. Setup database:
   ```bash
   cd apps/backend
   npx prisma migrate dev
   npx prisma generate
   ```

3. Start backend:
   ```bash
   cd apps/backend
   npm install
   npm run dev
   ```

4. Start frontend:
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```

## Production Deployment

1. Build Docker images for backend
2. Deploy to container orchestration (Kubernetes/Docker Swarm)
3. Configure environment variables
4. Run database migrations
5. Start services with proper scaling
6. Configure load balancer
7. Setup monitoring and logging
