import { PrismaClient, Prisma } from "../src/generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        { title: "Join the Prisma Discord", content: "https://pris.ly/discord", published: true },
        { title: "Prisma on YouTube", content: "https://pris.ly/youtube" },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        { title: "Follow Prisma on Twitter", content: "https://www.twitter.com/prisma", published: true },
      ],
    },
  },
]

/*
async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}
*/

/* your seed is trying to create users with emails that already exist in the database.
The fix is to use upsert instead of create, so it skips existing records rather than failing.
This way, if a user with that email already exists, it just moves on — no crash.
Update your seed.ts like this: */

async function main() {
  for (const u of userData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},   // do nothing if already exists
      create: u,    // create if not found
    });
  }
}

main()


/* import { PrismaClient, Prisma } from "../src/generated/prisma"

  import { PrismaClient, Prisma } from "@prisma/client";

// 👉 Ye advanced setup hai (serverless etc.), Beginner ke liye unnecessary hai ❌
import { PrismaPg } from "@prisma/adapter-pg";

import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
];

async function main() {    //👉 ❌ Seed file me export ki zarurat nahi hoti
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
*/