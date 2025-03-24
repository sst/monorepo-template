# Implementation Plan - SST v3 Monorepo

## Overview

This implementation plan outlines how to build a basic application using SST v3's monorepo structure. We'll leverage SST's cloud infrastructure capabilities to provision and manage AWS resources including API Gateway and S3 storage. The architecture follows a clear separation of concerns with a streamlined approach to resource definition.

## Phase 1: Environment Setup and Project Initialization

**Purpose:** Set up the development environment for the SST v3 monorepo project

1. **Update Root Package.json**
   - Description: Configure workspaces and dependencies
   - Reference: [Tech Stack Document - Core Framework and Runtime]
   - Content:

     ```json
     {
       "name": "monorepo-template-cursor",
       "version": "0.1.0",
       "private": true,
       "type": "module",
       "workspaces": [
         "packages/*"
       ],
       "scripts": {
         "dev": "sst dev",
         "build": "sst build",
         "deploy": "sst deploy",
         "remove": "sst remove",
         "console": "sst console",
         "typecheck": "tsc --noEmit"
       },
       "devDependencies": {
         "sst": "^3.0.0",
         "aws-cdk-lib": "2.91.0",
         "typescript": "^5.1.6",
         "@tsconfig/node18": "^18.2.0"
       }
     }
     ```

**Validation:**

- [ ] Verify `sst.config.ts` file exists in the project root
- [ ] Run `npx sst dev --stage dev` to verify local development environment works

## Phase 2: Core Infrastructure Definition

**Purpose:** Define AWS infrastructure resources using SST v3's simplified approach

1. **Set Up SST Config File**
   - Description: Configure the main SST config file
   - Reference: [Tech Stack Document - Core Framework and Runtime]
   - Content:

     ```typescript
     export default $config({
       app(input) {
         return {
           name: "monorepo-template-cursor",
           removal: input?.stage === "production" ? "retain" : "remove",
           protect: ["production"].includes(input?.stage),
         };
       },
       async run() {
         const storage = await import("./infra/storage");
         const api = await import("./infra/api");
         
         return {
           // Export outputs for cross-stack references
           ApiEndpoint: api.api.url,
           StorageBucketName: storage.storageBucket.name,
         };
       },
     });
     ```

2. **Create Storage Infrastructure**
   - Description: Define generic S3 resources
   - Reference: [Backend Structure Document - Database Management]
   - Content:

     ```typescript

     // Generic S3 bucket for storage
     export const storageBucket = new sst.aws.Bucket("monorepo-template-cursor-bucket", {
       cors: true,
     });
     ```

3. **Create API Infrastructure**
   - Description: Configure API Gateway with generic routes
   - Reference: [Backend Structure Document - API Design and Endpoints]
   - Content:

     ```typescript
     import { storageBucket } from "./storage";

     // API Gateway for serverless API
     export const api = new sst.aws.Api("Api", {
       cors: {
         allowOrigins: ["*"],
         allowMethods: ["ANY"],
       },
       routes: {
         // Generic API routes
         "GET /items": "packages/functions/src/generic/get.handler",
         "PUT /items": "packages/functions/src/generic/update.handler",
         "POST /items": "packages/functions/src/generic/create.handler",
       },
       defaults: {
         function: {
           bind: [storageBucket]
         }
       }
     });

     // Link resources to allow API to access them
     api.link([storageBucket]);
     ```

**Validation:**

- [ ] Run `npx sst dev --stage dev` to verify infrastructure definitions
- [ ] Check SST Console to ensure resources are properly connected
- [ ] Verify resource permissions are correctly configured