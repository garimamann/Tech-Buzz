function postedBy(parent: any, args: any, context: any, info: any) {
  return context.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

function votes(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).votes()
}

export { postedBy,votes };
