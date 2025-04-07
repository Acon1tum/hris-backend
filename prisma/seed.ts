import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 🔹 Seed Users
  const adminPassword = await hash('admin123', 10);
  const user1 = await prisma.user.create({
    data: {
      id: '1b3f8e40-1d74-4b5d-9f71-5d3e5c28d9bb',
      username: 'admin',
      password_hash: adminPassword,
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
    },
  });

  const hrPassword = await hash('hrpassword', 10);
  const user2 = await prisma.user.create({
    data: {
      id: '2c4d9e40-2e75-4c6e-8f71-6f4e6d38eabb',
      username: 'hrmanager',
      password_hash: hrPassword,
      email: 'hr@example.com',
      role: 'HR',
      status: 'Active',
    },
  });

  // 🔹 Seed Departments
  const department1 = await prisma.department.create({
    data: {
      id: 'd1a3f8e40-1d74-4b5d-9f71-5d3e5c28d9cc',
      department_name: 'Human Resources',
      department_head: user2.id,
      description: 'Handles employee relations and company policies.',
    },
  });

  const department2 = await prisma.department.create({
    data: {
      id: 'd2b4g9f50-2e85-5d7e-9f82-6g5f7h49facc',
      department_name: 'Engineering',
      department_head: user1.id,
      description: 'Develops and maintains company software products.',
    },
  });

  // 🔹 Seed Personnel
  const personnel1 = await prisma.personnel.create({
    data: {
      id: 'p1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
      user_id: user2.id,
      first_name: 'John',
      last_name: 'Doe',
      gender: 'Male',
      employment_type: 'Regular',
      salary: 50000,
      department_id: department1.id,
    },
  });

  console.log('✅ Database has been seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
