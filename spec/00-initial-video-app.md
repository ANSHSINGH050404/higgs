## Building a video generation SaaS


## step-1
Yor are an empty turbo repo with the following structure:
That the project is similar to higgsfield.ai, for now let the user come and generate videos based on a text prompt, duration and quality.

The architecture should be:
-Frontend: Next.js app
-Backend: Typescript+express
-Database: PostgreSQL+Prisma
-Storage: MinIO
-Queue: Redis
-Orchestration: Docker
-self hosted Face fusion for face swap (we need it later not right now but add in docker compose)

-OpenRouter for video model inference https://openrouter.ai/docs/guides/overview/multimodal/video-generation


for now ,let initial all the packages and docker compose file and dockerfile for backend
we have to add agent.md file to define the agent architecture and workflow
Add .env.example file to define the environment variables


## step-2

Frontend: Next.js app with the following pages:
- Home page with a form to generate videos
- Text to video page with a form to generate videos
   - Prompt input
   - Duration selection
   - Quality selection
   - Aspect ratio selection
   - start from frame selection
   - end frame selection
   - reference image selection
- Video playback page with a video player
- User profile page with user information and video history
- Admin panel page with admin information and video management

backend:add jwt for authentication and authorization
Make sure all the final video and images are stored in minio


