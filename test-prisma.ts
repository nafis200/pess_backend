import prisma from './src/shared/prisma';

async function test() {
  try {
    const notice = await prisma.notice.create({
      data: {
        title: 'Test Notice',
        pdfUrl: 'https://example.com/test.pdf',
        slug: 'test-notice-' + Date.now(),
        publishDate: new Date(),
      },
    });
    console.log('Created notice:', notice);

    const notices = await prisma.notice.findMany();
    console.log('All notices:', notices);
  } catch (error) {
    console.error('Prisma test error:', error);
  } finally {
    process.exit();
  }
}

test();
