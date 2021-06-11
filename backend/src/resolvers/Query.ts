import { APP_SECRET, getUserId } from "../utils";

async function feed(parent: any, args: any, context: any, info: any) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = await context.prisma.link.count({ where });

  return {
    links,
    count,
  };
}

async function userList(parent: any, args: any, context: any, info: any) {
  return await context.prisma.user.findMany();
}

async function userFeed(parent: any, args: any, context: any, info: any) {
  const userId = getUserId(context).userId;
  return context.prisma.user.findUnique({ where: { id: userId } }).links();
}

export { feed, userFeed, userList };
