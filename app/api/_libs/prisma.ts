import { PrismaClient } from '@/_prisma/client';
// PrismaClient는 전역 싱글톤으로 사용합니다.
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

export class DB {
  static client() {
    const globalForPrisma = global as unknown as { prisma: PrismaClient };

    const prisma = globalForPrisma.prisma
  || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? [ 'query', 'error', 'warn', ] : [ 'error', ],
  });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

    return prisma;
  }

  static users() {
    return this.client().user;
  }

  static userAuths() {
    return this.client().userAuth;
  }

  static todos() {
    return this.client().todo;
  }

  static issues() {
    return this.client().issue;
  }

  static issueTypes() {
    return this.client().issueType;
  }

  static issueSchemas() {
    return this.client().issueSchema;
  }

  static projectMembers() {
    return this.client().projectMember;
  }

  static projects() {
    return this.client().project;
  }
}
