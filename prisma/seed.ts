import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 🔹 Seed Users
  const adminPassword = await hash('admin123', 10);
  const hrPassword = await hash('hrpassword', 10);
  const employeePassword = await hash('employeepass', 10);
  const payrollPassword = await hash('payrollpass', 10);
  const recruiterPassword = await hash('recruiterpass', 10);
  const managerPassword = await hash('managerpass', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: '1b3f8e40-1d74-4b5d-9f71-5d3e5c28d9bb',
        username: 'admin',
        password_hash: adminPassword,
        email: 'admin@example.com',
        role: 'Admin',
        status: 'Active',
      },
    }),
    prisma.user.create({
      data: {
        id: '2c4d9e40-2e75-4c6e-8f71-6f4e6d38eabb',
        username: 'hrmanager',
        password_hash: hrPassword,
        email: 'hr@example.com',
        role: 'HR',
        status: 'Active',
      },
    }),
    prisma.user.create({
      data: {
        id: '3d5f0f50-3f86-5d7f-9g82-7g5f8h49facc',
        username: 'employee1',
        password_hash: employeePassword,
        email: 'employee1@example.com',
        role: 'Employee',
        status: 'Active',
      },
    }),
    prisma.user.create({
      data: {
        id: '4e6g1g60-4g97-6e8g-0h93-8h6g9i50gadd',
        username: 'payrollmgr',
        password_hash: payrollPassword,
        email: 'payroll@example.com',
        role: 'Payroll_Manager',
        status: 'Active',
      },
    }),
    prisma.user.create({
      data: {
        id: '5f7h2h70-5h08-7f9h-1i04-9i7h0j61hbee',
        username: 'recruiter1',
        password_hash: recruiterPassword,
        email: 'recruiter@example.com',
        role: 'Recruiter',
        status: 'Active',
      },
    }),
    prisma.user.create({
      data: {
        id: '6g8i3i80-6i19-8g0i-2j15-0j8i1k72icff',
        username: 'manager1',
        password_hash: managerPassword,
        email: 'manager@example.com',
        role: 'Manager',
        status: 'Active',
      },
    }),
  ]);

  // 🔹 Seed Departments
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        id: 'd1a3f8e40-1d74-4b5d-9f71-5d3e5c28d9cc',
        department_name: 'Human Resources',
        department_head: users[1].id,
        description: 'Handles employee relations and company policies.',
      },
    }),
    prisma.department.create({
      data: {
        id: 'd2b4g9f50-2e85-5d7e-9f82-6g5f7h49facc',
        department_name: 'Engineering',
        department_head: users[0].id,
        description: 'Develops and maintains company software products.',
      },
    }),
    prisma.department.create({
      data: {
        id: 'd3c5h0g60-3f96-6e8f-0g93-7h6g8i50gadd',
        department_name: 'Finance',
        department_head: users[3].id,
        description: 'Manages company finances and payroll.',
      },
    }),
  ]);

  // 🔹 Seed Personnel
  const personnel = await Promise.all([
    prisma.personnel.create({
      data: {
        id: 'p1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        user_id: users[1].id,
        first_name: 'John',
        last_name: 'Doe',
        gender: 'Male',
        employment_type: 'Regular',
        salary: 50000,
        department_id: departments[0].id,
        date_hired: new Date('2020-01-15'),
        gsis_number: '123456789',
        pagibig_number: '987654321',
        philhealth_number: '456789123',
        sss_number: '789123456',
        tin_number: '123-456-789-000',
      },
    }),
    prisma.personnel.create({
      data: {
        id: 'p2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7',
        user_id: users[2].id,
        first_name: 'Jane',
        last_name: 'Smith',
        gender: 'Female',
        employment_type: 'Regular',
        salary: 45000,
        department_id: departments[1].id,
        date_hired: new Date('2021-03-20'),
        gsis_number: '234567890',
        pagibig_number: '876543210',
        philhealth_number: '567890234',
        sss_number: '890234567',
        tin_number: '234-567-890-000',
      },
    }),
  ]);

  // 🔹 Seed Work Schedules
  const workSchedules = await Promise.all([
    prisma.workSchedule.create({
      data: {
        id: 'ws1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        schedule_name: 'Regular 9-5',
        is_flextime: false,
        start_time: new Date('1970-01-01T09:00:00Z'),
        end_time: new Date('1970-01-01T17:00:00Z'),
        break_start_time: new Date('1970-01-01T12:00:00Z'),
        break_end_time: new Date('1970-01-01T13:00:00Z'),
        break_deducted: true,
        is_work_from_home: false,
      },
    }),
    prisma.workSchedule.create({
      data: {
        id: 'ws2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7',
        schedule_name: 'Flexible Schedule',
        is_flextime: true,
        start_time: new Date('1970-01-01T08:00:00Z'),
        end_time: new Date('1970-01-01T17:00:00Z'),
        break_start_time: new Date('1970-01-01T12:00:00Z'),
        break_end_time: new Date('1970-01-01T13:00:00Z'),
        break_deducted: true,
        is_work_from_home: true,
      },
    }),
  ]);

  // 🔹 Seed Personnel Schedules
  await Promise.all([
    prisma.personnelSchedule.create({
      data: {
        id: 'ps1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        schedule_id: workSchedules[0].id,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        created_by: users[1].id,
      },
    }),
    prisma.personnelSchedule.create({
      data: {
        id: 'ps2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7',
        personnel_id: personnel[1].id,
        schedule_id: workSchedules[1].id,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        created_by: users[1].id,
      },
    }),
  ]);

  // 🔹 Seed Leave Types
  const leaveTypes = await Promise.all([
    prisma.leaveType.create({
      data: {
        id: 'lt1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        leave_type_name: 'Vacation Leave',
        description: 'Paid time off for vacation',
        requires_document: false,
        max_days: 15,
        is_active: true,
      },
    }),
    prisma.leaveType.create({
      data: {
        id: 'lt2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7',
        leave_type_name: 'Sick Leave',
        description: 'Paid time off for illness',
        requires_document: true,
        max_days: 10,
        is_active: true,
      },
    }),
  ]);

  // 🔹 Seed Leave Balances
  await Promise.all([
    prisma.leaveBalance.create({
      data: {
        id: 'lb1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        leave_type_id: leaveTypes[0].id,
        year: '2024',
        total_credits: 15,
        used_credits: 5,
        earned_credits: 1.25,
      },
    }),
    prisma.leaveBalance.create({
      data: {
        id: 'lb2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7',
        personnel_id: personnel[1].id,
        leave_type_id: leaveTypes[1].id,
        year: '2024',
        total_credits: 10,
        used_credits: 2,
        earned_credits: 0.83,
      },
    }),
  ]);

  // 🔹 Seed Leave Applications
  await Promise.all([
    prisma.leaveApplication.create({
      data: {
        id: 'la1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        leave_type_id: leaveTypes[0].id,
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-03-05'),
        total_days: 5,
        status: 'Approved',
        reason: 'Family vacation',
      },
    }),
    prisma.leaveApplication.create({
      data: {
        id: 'la2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7',
        personnel_id: personnel[1].id,
        leave_type_id: leaveTypes[1].id,
        start_date: new Date('2024-03-10'),
        end_date: new Date('2024-03-11'),
        total_days: 2,
        status: 'Pending',
        reason: 'Medical checkup',
      },
    }),
  ]);

  // 🔹 Seed Overtime Requests
  await Promise.all([
    prisma.overtimeRequest.create({
      data: {
        id: 'ot1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        overtime_date: new Date('2024-02-15'),
        start_time: new Date('1970-01-01T17:00:00Z'),
        end_time: new Date('1970-01-01T20:00:00Z'),
        total_hours: 3,
        reason: 'Project deadline',
        status: 'Approved',
        approved_by: users[1].id,
        approval_date: new Date('2024-02-14'),
      },
    }),
  ]);

  // 🔹 Seed Personnel Movements
  await Promise.all([
    prisma.personnelMovement.create({
      data: {
        id: 'pm1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        movement_type: 'Promotion',
        previous_department_id: departments[0].id,
        new_department_id: departments[1].id,
        previous_designation: 'HR Specialist',
        new_designation: 'Senior HR Specialist',
        previous_salary: 45000,
        new_salary: 50000,
        effective_date: new Date('2024-01-01'),
        issued_by: users[0].id,
        issued_date: new Date('2023-12-15'),
        remarks: 'Promotion based on performance',
      },
    }),
  ]);

  // 🔹 Seed Merit/Violation Records
  await Promise.all([
    prisma.meritViolation.create({
      data: {
        id: 'mv1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        record_type: 'Merit',
        description: 'Employee of the Month - January 2024',
        date_recorded: new Date('2024-02-01'),
        documented_by: users[1].id,
      },
    }),
  ]);

  // 🔹 Seed Administrative Cases
  await Promise.all([
    prisma.administrativeCase.create({
      data: {
        id: 'ac1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        case_title: 'Tardiness Case',
        case_description: 'Multiple instances of tardiness',
        case_status: 'Resolved',
        date_filed: new Date('2024-01-15'),
        resolution: 'Verbal warning issued',
        resolution_date: new Date('2024-01-20'),
        sanctions: 'Verbal warning',
        filed_by: users[1].id,
      },
    }),
  ]);

  // 🔹 Seed Payroll Records
  const payrollRecords = await Promise.all([
    prisma.payrollRecord.create({
      data: {
        id: 'pr1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        payroll_period_start: new Date('2024-02-01'),
        payroll_period_end: new Date('2024-02-15'),
        basic_salary: 50000,
        salary_adjustments: 0,
        gross_salary: 50000,
        total_deductions: 5000,
        net_amount_due: 45000,
        payment_status: 'Processed',
        bank_account_number: '1234567890',
        processed_by: users[3].id,
      },
    }),
  ]);

  // 🔹 Seed Deductions
  await Promise.all([
    prisma.deduction.create({
      data: {
        id: 'dd1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        payroll_id: payrollRecords[0].id,
        bir: 1000,
        pagibig: 100,
        philhealth: 200,
        sss: 500,
        loans: 3200,
        other_deductions: 0,
      },
    }),
  ]);

  // 🔹 Seed Loan Records
  await Promise.all([
    prisma.loanRecord.create({
      data: {
        id: 'lr1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        loan_type: 'Multi_Purpose',
        loan_source: 'Company',
        loan_amount: 10000,
        monthly_deduction: 3200,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-04-01'),
        remaining_balance: 3200,
        status: 'Active',
      },
    }),
  ]);

  // 🔹 Seed Job Postings
  const jobPostings = await Promise.all([
    prisma.jobPosting.create({
      data: {
        id: 'jp1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        position_title: 'Senior Software Engineer',
        department_id: departments[1].id,
        job_description: 'Develop and maintain software applications',
        qualifications: '5+ years of experience, Bachelor\'s degree in Computer Science',
        technical_competencies: 'JavaScript, React, Node.js',
        salary_range: '80,000 - 100,000',
        employment_type: 'Regular',
        num_vacancies: 2,
        application_deadline: new Date('2024-03-31'),
        posting_status: 'Published',
        created_by: users[4].id,
      },
    }),
  ]);

  // 🔹 Seed Job Applicants
  const jobApplicants = await Promise.all([
    prisma.jobApplicant.create({
      data: {
        id: 'ja1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        first_name: 'Michael',
        last_name: 'Johnson',
        email: 'michael.j@example.com',
        phone: '09123456789',
        current_employer: 'Tech Corp',
        highest_education: 'Master\'s in Computer Science',
        is_existing_employee: false,
      },
    }),
  ]);

  // 🔹 Seed Job Applications
  const jobApplications = await Promise.all([
    prisma.jobApplication.create({
      data: {
        id: 'ja1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        position_id: jobPostings[0].id,
        applicant_id: jobApplicants[0].id,
        cover_letter: 'I am excited to apply for the Senior Software Engineer position...',
        status: 'For_Interview',
        application_date: new Date('2024-02-15'),
      },
    }),
  ]);

  // 🔹 Seed Application Documents
  await Promise.all([
    prisma.applicationDocument.create({
      data: {
        id: 'ad1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        application_id: jobApplications[0].id,
        document_type: 'Resume',
        document_path: '/documents/resume.pdf',
      },
    }),
  ]);

  // 🔹 Seed Interview Schedules
  await Promise.all([
    prisma.interviewSchedule.create({
      data: {
        id: 'is1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        application_id: jobApplications[0].id,
        interviewer_id: users[4].id,
        interview_date: new Date('2024-02-20'),
        interview_type: 'On_Site',
        interview_status: 'Scheduled',
        interview_location: 'Main Office - Room 101',
      },
    }),
  ]);

  // 🔹 Seed Examination Schedules
  await Promise.all([
    prisma.examinationSchedule.create({
      data: {
        id: 'es1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        application_id: jobApplications[0].id,
        exam_type: 'Technical Assessment',
        exam_date: new Date('2024-02-25'),
        exam_location: 'Main Office - Room 102',
        exam_status: 'Scheduled',
        passing_score: 80,
        examiner_id: users[4].id,
      },
    }),
  ]);

  // 🔹 Seed Applicant Assessments
  await Promise.all([
    prisma.applicantAssessment.create({
      data: {
        id: 'aa1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        application_id: jobApplications[0].id,
        assessor_id: users[4].id,
        criteria_technical: 85,
        criteria_experience: 90,
        criteria_education: 95,
        criteria_communication: 88,
        criteria_cultural_fit: 92,
        overall_rating: 90,
        comments: 'Strong technical background and good communication skills',
        recommendation: 'Hire',
      },
    }),
  ]);

  // 🔹 Seed Certificate Requests
  await Promise.all([
    prisma.certificateRequest.create({
      data: {
        id: 'cr1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        certificate_type: 'Employment',
        purpose: 'Bank Loan Application',
        status: 'Completed',
        request_date: new Date('2024-02-01'),
        completion_date: new Date('2024-02-03'),
        processed_by: users[1].id,
      },
    }),
  ]);

  // 🔹 Seed Performance Reviews
  await Promise.all([
    prisma.performanceReview.create({
      data: {
        id: 'pr1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        reviewer_id: users[5].id,
        review_period_start: new Date('2023-01-01'),
        review_period_end: new Date('2023-12-31'),
        review_date: new Date('2024-01-15'),
        performance_score: 4.5,
        strengths: 'Excellent communication skills and team player',
        areas_for_improvement: 'Time management could be improved',
        goals: 'Complete advanced training in HR management',
        status: 'Reviewed',
      },
    }),
  ]);

  // 🔹 Seed Training Programs
  const trainingPrograms = await Promise.all([
    prisma.trainingProgram.create({
      data: {
        id: 'tp1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        training_name: 'Advanced HR Management',
        description: 'Advanced training for HR professionals',
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-03-05'),
        location: 'Main Office - Training Room',
        trainer: 'External HR Consultant',
        max_participants: '20',
        status: 'Planned',
        created_by: users[1].id,
      },
    }),
  ]);

  // 🔹 Seed Training Modules
  await Promise.all([
    prisma.trainingModule.create({
      data: {
        id: 'tm1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        training_id: trainingPrograms[0].id,
        module_name: 'Strategic HR Planning',
        content: 'Content for strategic HR planning module',
        video_link: 'https://example.com/video1',
      },
    }),
  ]);

  // 🔹 Seed Training Participants
  await Promise.all([
    prisma.trainingParticipant.create({
      data: {
        training_id: trainingPrograms[0].id,
        personnel_id: personnel[0].id,
        status: 'Enrolled',
        enrollment_date: new Date('2024-02-15'),
      },
    }),
  ]);

  // 🔹 Seed Employee Feedback
  await Promise.all([
    prisma.employeeFeedback.create({
      data: {
        id: 'ef1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        feedback_type: 'HR_Service',
        feedback_content: 'HR services are efficient and helpful',
        is_anonymous: false,
        status: 'Addressed',
        response: 'Thank you for your feedback',
        responded_by: users[1].id,
        responded_at: new Date('2024-02-20'),
      },
    }),
  ]);

  // 🔹 Seed Notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        id: 'nt1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        user_id: users[0].id,
        notification_type: 'System',
        message: 'New leave application requires approval',
        is_read: false,
      },
    }),
  ]);

  // 🔹 Seed Documents
  await Promise.all([
    prisma.document.create({
      data: {
        id: 'dc1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        document_name: 'Company Policy Manual',
        document_type: 'PDF',
        file_path: '/documents/policy-manual.pdf',
        uploaded_by: users[0].id,
        related_to_table: 'System',
        description: 'Company policies and procedures',
        is_public: true,
      },
    }),
  ]);

  // 🔹 Seed Audit Logs
  await Promise.all([
    prisma.auditLog.create({
      data: {
        id: 'al1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        user_id: users[0].id,
        action_type: 'Create',
        table_affected: 'User',
        record_id: users[1].id,
        action_details: 'Created new HR user',
        ip_address: '192.168.1.1',
        user_agent: 'Mozilla/5.0',
      },
    }),
  ]);

  // 🔹 Seed Reports
  await Promise.all([
    prisma.report.create({
      data: {
        id: 'rp1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        report_name: 'Monthly Attendance Report',
        generated_by: users[0].id,
        file_path: '/reports/attendance-feb-2024.pdf',
        digital_signature: 'signature123',
      },
    }),
  ]);

  // 🔹 Seed Approvals
  await Promise.all([
    prisma.approval.create({
      data: {
        id: 'ap1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        request_type: 'Leave',
        request_id: 'la1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        approval_step: 1,
        status: 'Approved',
        approved_by: users[1].id,
        approval_date: new Date('2024-02-14'),
      },
    }),
  ]);

  // 🔹 Seed System Settings
  await Promise.all([
    prisma.systemSetting.create({
      data: {
        id: 'ss1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        setting_key: 'company_name',
        setting_value: 'Example Company',
      },
    }),
  ]);

  // 🔹 Seed Performance Evaluations
  await Promise.all([
    prisma.performanceEvaluation.create({
      data: {
        id: 'pe1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnel_id: personnel[0].id,
        reviewer_id: users[5].id,
        evaluation_period_start: new Date('2023-01-01'),
        evaluation_period_end: new Date('2023-12-31'),
        self_assessment: 'I have performed well in my role...',
        manager_comments: 'Employee has shown great improvement...',
        kpi_score: 4.5,
        overall_performance_score: 4.5,
        strengths: 'Strong communication and leadership skills',
        areas_for_improvement: 'Time management',
        recommended_training: 'Advanced HR Management',
        status: 'Finalized',
      },
    }),
  ]);

  // 🔹 Seed System Modules
  await Promise.all([
    prisma.systemModule.create({
      data: {
        id: 'sm1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        module_name: 'HR Management',
        is_active: true,
        can_be_disabled: false,
      },
    }),
  ]);

  // 🔹 Seed Employee Self Service Profiles
  await Promise.all([
    prisma.employeeSelfServiceProfile.create({
      data: {
        id: 'es1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnelId: personnel[0].id,
        profilePicture: '/profiles/john-doe.jpg',
        bio: 'Experienced HR professional with 5 years of experience',
        skills: ['HR Management', 'Recruitment', 'Employee Relations'],
        certifications: ['PHR', 'SHRM-CP'],
      },
    }),
  ]);

  // 🔹 Seed Education Records
  await Promise.all([
    prisma.education.create({
      data: {
        id: 'ed1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        profileId: 'es1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        institution: 'University of Example',
        degree: 'Bachelor of Science in Human Resource Management',
        fieldOfStudy: 'Human Resources',
        startDate: new Date('2010-06-01'),
        endDate: new Date('2014-05-30'),
        isCurrent: false,
        description: 'Graduated with honors',
      },
    }),
  ]);

  // 🔹 Seed Work Experience Records
  await Promise.all([
    prisma.workExperience.create({
      data: {
        id: 'we1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        profileId: 'es1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        company: 'Previous Company',
        position: 'HR Specialist',
        startDate: new Date('2014-06-01'),
        endDate: new Date('2019-12-31'),
        isCurrent: false,
        description: 'Handled recruitment and employee relations',
      },
    }),
  ]);

  // 🔹 Seed Employee Documents
  await Promise.all([
    prisma.employeeDocument.create({
      data: {
        id: 'ed1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        personnelId: personnel[0].id,
        title: 'Employment Contract',
        description: 'Original employment contract',
        fileUrl: '/documents/contract.pdf',
        fileType: 'PDF',
        fileSize: 1024,
        category: 'Employment',
        isPrivate: true,
      },
    }),
  ]);

  // 🔹 Seed Courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        id: 'cr1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        title: 'Advanced HR Management',
        description: 'Comprehensive HR management course',
        objectives: ['Strategic HR Planning', 'Employee Relations', 'Performance Management'],
        prerequisites: ['Basic HR Knowledge'],
        duration: 40,
        level: 'Advanced',
        status: 'Published',
        instructorId: personnel[0].id,
        category: 'HR',
        tags: ['HR', 'Management', 'Leadership'],
        thumbnailUrl: '/courses/hr-management.jpg',
      },
    }),
  ]);

  // 🔹 Seed Course Modules
  await Promise.all([
    prisma.courseModule.create({
      data: {
        id: 'cm1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        courseId: courses[0].id,
        title: 'Strategic HR Planning',
        description: 'Learn strategic HR planning techniques',
        order: 1,
        duration: 8,
        content: 'Strategic HR planning content',
        resources: ['/resources/planning.pdf', '/resources/case-studies.pdf'],
      },
    }),
  ]);

  // 🔹 Seed Course Enrollments
  await Promise.all([
    prisma.courseEnrollment.create({
      data: {
        id: 'ce1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6',
        courseId: courses[0].id,
        personnelId: personnel[1].id,
        enrollmentDate: new Date('2024-02-01'),
        status: 'ENROLLED',
        progress: 25,
        lastAccessedAt: new Date('2024-02-15'),
      },
    }),
  ]);

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
