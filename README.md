# BloodLink
BloodLink is a web application that aims to allow for communication and effective **blood donation** between a __donor__ and a __patient__ that is affiliated with a __hospital__. The web application allows a user to authorize and register themselves as a blood donor along with an identifiable blood donor e-card, which allows all their medical history and information to be accessible when necessary. Furthermore, the donor can view a dashboard with information regarding patients, so that they know when there is an urgent need for a blood donation. It addresses the issue of a lack of communication between parties when it comes to blood donation, due to a lack of a singular database where information can be securely stored, which results in blood being wasted in blood banks and hospitals. There are also specific cases when it is necessary, such as when a patient requires only plateletes. It is easily accessible through both mobile and PC, with effective UX and UI choices.

### Build Info
- First, run `corepack enable` with Powershell as Administrator. This allows you to use `pnpm`
- Then, run `pnpm install` in `/frontend`, followed by `pnpm -g install next`
- Supabase database setup with URL and key in `.env`
- Install postgreSQL (with pgAdmin), and setup a database. Paste the URL in `.env.example`
- Run `pnpm install` in `/backend`
- Run `pnpm dev` in both `/frontend` and `/backend`
### Tools and Technologies Used
**Frontend:**

- [Nextjs](https://nextjs.org/)
- [Mantine](https://mantine.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)

**Backend:**
- [Prisma](https://www.prisma.io/)
- [Nestjs](https://nestjs.com/)
- [Supabase](https://supabase.com/)

