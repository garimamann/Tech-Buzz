function links(parent: any, args: any, context: any, info: any) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}

export { links };
