# AICourse

Free, open AI engineering courses. Each course is a structured path of lessons that explain a topic and link to the best **public** videos, docs, papers and tutorials, with credit to the original authors. No paid or copyrighted course material is reproduced.

This is an independent project and is not affiliated with any conference or course provider.

Live site: https://ai-course-six-ecru.vercel.app

## Courses

| Course | Level | Status |
| --- | --- | --- |
| Implement GraphRAG with Knowledge Graphs | Intermediate | 7 lessons, first draft |
| Engineer Persistent Memory for AI Agents | Advanced | 7 lessons, first draft |
| Deploy Reliable AI Agents in Production | Advanced | 7 lessons, first draft |
| Engineer Repository Context for Coding Agents | Advanced | 7 lessons, first draft |
| Implement Browser Automation for AI Agents | Intermediate | 7 lessons, first draft |
| Engineer Synthetic Data for Open LLMs | Expert | 7 lessons, first draft |
| Explore Meta-Harness Architectures for AI Agents | Expert | 7 lessons, first draft |
| Architect Agentic Systems for Financial Workflows | Beginner | 7 lessons, first draft |
| Analyze AI-Generated Code for Quality and Security | Intermediate | 7 lessons, first draft |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add a course

1. Create `src/content/<course-slug>/` with one `.mdx` file per lesson.
2. Register the course and its lessons in `src/content/courses.ts`.
3. In lessons, use `<Resource kind="video|article|docs|course|paper|repo" title="" href="" source="" />` for every external link and `<Callout title="">` for notes.

Check each link works and is free before adding it.

## Stack

Next.js (App Router), MDX, Tailwind CSS, Geist fonts.
