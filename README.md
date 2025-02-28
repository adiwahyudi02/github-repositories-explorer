# Github Repositories Explorer

Uncover talented developers and explore their GitHub repositories. Discover new projects and find inspiration. Start your search now!

## Run the app

1. Install dependencies

   ```bash
   npm install
   ```

2. **(Optional, but recommended)** Create **.env.local** in the root project and add the environment

   ```env
   GITHUB_TOKEN=your_github_token_here
   ```

   This token is used for authenticating requests to the GitHub API, allowing you to:

   - Increase the rate limit for API requests. If you don't include a GitHub token, the rate limit is 60 requests per hour per IP address.

   **How to Create a GitHub Token:**

   Follow the steps in the [GitHub Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) to create a personal access token.

3. Start development server

   ```bash
   npm run dev
   ```

## Run the test

```bash
npm run test
```

## Run the lint

```bash
npm run lint
```

## Learn More

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.
