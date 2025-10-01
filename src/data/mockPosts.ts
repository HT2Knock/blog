import { faker } from "@faker-js/faker";

export const mockPosts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: faker.lorem.sentence({ min: 3, max: 7 }),
  slug: faker.helpers
    .slugify(faker.lorem.words({ min: 2, max: 5 }))
    .toLowerCase(),
  excerpt: faker.lorem.sentences({ min: 2, max: 4 }),
  image: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
  author: faker.person.fullName(),
  date: faker.date.past({ years: 1 }).toISOString().split("T")[0],
}));
