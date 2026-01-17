import { Prisma, PrismaClient } from '@prisma/client';
import { FormField } from '../src/types/form';

const prisma = new PrismaClient();
const json = (v: unknown) => v as Prisma.InputJsonValue;

async function main() {
  const programs: {
    name: string;
    description: string;
    isActive: boolean;
    maxParticipants: number;
    price: number;
    form: FormField[];
    startDate: Date;
    endDate: Date;
  }[] = [
    {
      name: 'Google AI Track',
      description: 'ML fundamentals + real-world AI systems.',
      isActive: true,
      maxParticipants: 50,
      price: 0,
      form: [
        { id: 'motivation', label: 'Why AI?', type: 'text', required: true },
        { id: 'experience', label: 'Years of ML experience', type: 'number', required: true },
        { id: 'domain', label: 'Preferred domain', type: 'select', required: true, options: ['Vision', 'NLP', 'Systems'] },
      ],
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-06-01'),
    },
    {
      name: 'Microsoft Full Stack Bootcamp',
      description: 'End-to-end web engineering.',
      isActive: true,
      maxParticipants: 80,
      price: 199,
      form: [
        { id: 'stack', label: 'Primary stack', type: 'select', required: true, options: ['MERN', 'Next.js', 'Spring'] },
        { id: 'projects', label: 'Best project link', type: 'text', required: true },
      ],
      startDate: new Date('2026-02-15'),
      endDate: new Date('2026-05-15'),
    },
    {
      name: 'Amazon Backend Systems',
      description: 'Scalable APIs & distributed systems.',
      isActive: true,
      maxParticipants: 60,
      price: 149,
      form: [
        { id: 'language', label: 'Primary language', type: 'select', required: true, options: ['Java', 'Go', 'Python'] },
        { id: 'systems', label: 'System design exposure', type: 'text', required: true },
      ],
      startDate: new Date('2026-03-10'),
      endDate: new Date('2026-06-10'),
    },
    {
      name: 'Meta Frontend Fellowship',
      description: 'UI engineering at scale.',
      isActive: true,
      maxParticipants: 70,
      price: 129,
      form: [
        { id: 'framework', label: 'Framework', type: 'select', required: true, options: ['React', 'Vue', 'Svelte'] },
        { id: 'portfolio', label: 'Portfolio link', type: 'text', required: true },
      ],
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-07-01'),
    },
    {
      name: 'AWS Cloud & DevOps',
      description: 'Cloud-native infra and CI/CD.',
      isActive: true,
      maxParticipants: 40,
      price: 179,
      form: [
        { id: 'cloud', label: 'Cloud used', type: 'select', required: true, options: ['AWS', 'GCP', 'Azure'] },
        { id: 'ci', label: 'CI/CD experience', type: 'text', required: true },
      ],
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-04-30'),
    },
    {
      name: 'Cybersecurity by Palo Alto',
      description: 'Blue-team skills & threat hunting.',
      isActive: true,
      maxParticipants: 30,
      price: 99,
      form: [
        { id: 'ctf', label: 'CTFs participated', type: 'number', required: true },
        { id: 'interest', label: 'Why security?', type: 'text', required: true },
      ],
      startDate: new Date('2026-05-01'),
      endDate: new Date('2026-08-01'),
    },
    {
      name: 'Netflix Data Science',
      description: 'Applied data science on real problems.',
      isActive: true,
      maxParticipants: 25,
      price: 199,
      form: [
        { id: 'python', label: 'Python skill (1–10)', type: 'number', required: true },
        { id: 'projects', label: 'Data projects', type: 'text', required: true },
      ],
      startDate: new Date('2026-03-20'),
      endDate: new Date('2026-06-20'),
    },
    {
      name: 'Apple iOS Lab',
      description: 'Swift & production iOS apps.',
      isActive: true,
      maxParticipants: 35,
      price: 149,
      form: [
        { id: 'swift', label: 'Swift experience (years)', type: 'number', required: true },
        { id: 'apps', label: 'Published apps', type: 'text', required: true },
      ],
      startDate: new Date('2026-04-05'),
      endDate: new Date('2026-07-05'),
    },
    {
      name: 'OpenAI ML Systems',
      description: 'ML infra & evaluation pipelines.',
      isActive: true,
      maxParticipants: 20,
      price: 0,
      form: [
        { id: 'ml', label: 'ML background', type: 'text', required: true },
        { id: 'papers', label: 'Papers read', type: 'text', required: true },
      ],
      startDate: new Date('2026-05-10'),
      endDate: new Date('2026-08-10'),
    },
    {
      name: 'Stripe Payments Engineering',
      description: 'High-scale fintech systems.',
      isActive: true,
      maxParticipants: 45,
      price: 159,
      form: [
        { id: 'backend', label: 'Backend experience', type: 'text', required: true },
        { id: 'scale', label: 'Systems at scale', type: 'text', required: true },
      ],
      startDate: new Date('2026-02-20'),
      endDate: new Date('2026-05-20'),
    },
  ];

  await prisma.program.createMany({
    skipDuplicates: true,
    data: programs.map((p) => ({
      name: p.name,
      description: p.description,
      isActive: p.isActive,
      maxParticipants: p.maxParticipants,
      price: p.price,
      formSchema: json(p.form),
      startDate: p.startDate,
      endDate: p.endDate,
    })),
  });

  console.log('Seeded 10 programs');
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());
