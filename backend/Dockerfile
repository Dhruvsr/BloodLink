# Getting base image
FROM node:16.18.0-bullseye-slim

# setting env vars
ARG DATABASE_URL
ARG JWT_SECRET
ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG PORT

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV PORT=${PORT}

# creating a working directory
WORKDIR /app
# copying code
COPY . .
# installing pnpm
RUN corepack enable
# installing dependencies
RUN pnpm i
# building the code
RUN pnpm build
# exposing port

EXPOSE ${PORT} 5000

CMD [ "pnpm" , "start"]

