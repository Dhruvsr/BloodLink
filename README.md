# BloodLink
### What is it?
BloodLink is a web application that aims to allow for communication and effective **blood donation** between a __donor__ and a __patient__ that is affiliated with a __hospital__. The web application allows a user to authorize and register themselves as a blood donor, involving various details such as medical history,  which allows all their medical history and information to be accessible when necessary. The donor can view a dashboard with information regarding patients, so that they know when there is an urgent need for a blood donation. It addresses the issue of a lack of communication between parties when it comes to blood donation, due to a lack of a singular database where information can be securely stored, which results in blood being wasted in blood banks and hospitals. Additionally, many patients also require specific components of blood. For example, platelet donation is not as common, and thus my web app could focus on such cases. It is easily accessible through both mobile and PC, with effective UX and UI choices.

## Tech Stack
**Frontend:**

- [Nextjs](https://nextjs.org/) - A reliable and fast framework
- [Mantine](https://mantine.dev/) - Aesthetically appealing components for my website
- [TypeScript](https://www.typescriptlang.org/) - Increased scalability and productivity
- [Axios](https://axios-http.com/) - HTTP client for NodeJS and Browser

**Backend:**
- [Prisma](https://www.prisma.io/) - An object relational mapper (ORM) to write SQL
- [Nestjs](https://nestjs.com/) - Serverside NodeJS applications
- [Supabase](https://supabase.com/) - An open source Firebase alternative

### Build Info
- First, run `corepack enable` with Powershell as Administrator. This allows you to use `pnpm`
- Then, run `pnpm install` in `/frontend`, followed by `pnpm -g install next`
- Supabase database setup with URL and key in `.env`
- Install postgreSQL (with pgAdmin), and setup a database. Paste the URL in `.env.example`
- Run `pnpm install` in `/backend`
- Run `pnpm dev` in both `/frontend` and `/backend`
