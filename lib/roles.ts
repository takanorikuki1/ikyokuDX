export type UserRole =
  | "professor" // 医局長（教授）
  | "associate_professor" // 准教授
  | "lecturer" // 講師
  | "assistant_professor" // 助教
  | "staff_doctor" // 医員（病院勤務）
  | "clinic_doctor" // 開業医（診療所医局員）
  | "resident" // 研修医
  | "alumni" // OB/OG
  | "admin" // 事務局

export interface RolePermissions {
  viewDashboard: boolean
  registerProfile: boolean
  viewJobs: boolean
  createJobs: boolean
  applyJobs: boolean
  viewDoctors: boolean
  viewEducation: boolean
  createEducation: boolean
  viewCases: boolean
  createCases: boolean
  commentCases: boolean
  viewBoard: boolean
  createBoard: boolean
  viewMessages: boolean
  sendMessages: boolean
  viewDonation: boolean
  manageDonation: boolean
  manageUsers: boolean
  viewAnalytics: boolean
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  professor: {
    // 医局長（教授）- すべての機能にアクセス可能
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: true,
    applyJobs: false,
    viewDoctors: true,
    viewEducation: true,
    createEducation: true,
    viewCases: true,
    createCases: true,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: true,
    manageUsers: true,
    viewAnalytics: true,
  },
  associate_professor: {
    // 准教授 - 教育と管理機能
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: true,
    applyJobs: false,
    viewDoctors: true,
    viewEducation: true,
    createEducation: true,
    viewCases: true,
    createCases: true,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: true,
    viewAnalytics: true,
  },
  lecturer: {
    // 講師 - 教育と臨床
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: true,
    applyJobs: false,
    viewDoctors: true,
    viewEducation: true,
    createEducation: true,
    viewCases: true,
    createCases: true,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: false,
    viewAnalytics: true,
  },
  assistant_professor: {
    // 助教 - 臨床と教育支援
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: false,
    applyJobs: true,
    viewDoctors: true,
    viewEducation: true,
    createEducation: true,
    viewCases: true,
    createCases: true,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: false,
    viewAnalytics: false,
  },
  staff_doctor: {
    // 医員（病院勤務）- 臨床と研修
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: false,
    applyJobs: true,
    viewDoctors: true,
    viewEducation: true,
    createEducation: false,
    viewCases: true,
    createCases: true,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: false,
    viewAnalytics: false,
  },
  clinic_doctor: {
    // 開業医（診療所医局員）- 求人投稿とネットワーキング
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: true,
    applyJobs: false,
    viewDoctors: true,
    viewEducation: true,
    createEducation: false,
    viewCases: true,
    createCases: true,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: false,
    viewAnalytics: false,
  },
  resident: {
    // 研修医 - 教育と症例学習
    viewDashboard: true,
    registerProfile: true,
    viewJobs: true,
    createJobs: false,
    applyJobs: true,
    viewDoctors: true,
    viewEducation: true,
    createEducation: false,
    viewCases: true,
    createCases: false,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: false,
    viewAnalytics: false,
  },
  alumni: {
    // OB/OG - 限定的な閲覧とネットワーキング
    viewDashboard: true,
    registerProfile: false,
    viewJobs: true,
    createJobs: false,
    applyJobs: false,
    viewDoctors: true,
    viewEducation: true,
    createEducation: false,
    viewCases: true,
    createCases: false,
    commentCases: true,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: false,
    manageUsers: false,
    viewAnalytics: false,
  },
  admin: {
    // 事務局 - 管理機能とサポート
    viewDashboard: true,
    registerProfile: false,
    viewJobs: true,
    createJobs: true,
    applyJobs: false,
    viewDoctors: true,
    viewEducation: true,
    createEducation: false,
    viewCases: false,
    createCases: false,
    commentCases: false,
    viewBoard: true,
    createBoard: true,
    viewMessages: true,
    sendMessages: true,
    viewDonation: true,
    manageDonation: true,
    manageUsers: true,
    viewAnalytics: true,
  },
}

export const ROLE_LABELS: Record<UserRole, string> = {
  professor: "医局長（教授）",
  associate_professor: "准教授",
  lecturer: "講師",
  assistant_professor: "助教",
  staff_doctor: "医員（病院勤務）",
  clinic_doctor: "開業医（診療所医局員）",
  resident: "研修医",
  alumni: "OB/OG",
  admin: "事務局",
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  professor: "医局の最高責任者として、すべての機能にアクセスできます",
  associate_professor: "教育・研究を統括し、若手医師の指導を行います",
  lecturer: "診療と教育に携わり、医学生への講義を担当します",
  assistant_professor: "臨床業務と教育支援を行います",
  staff_doctor: "病院で臨床業務を行い、専門医研修中の医師です",
  clinic_doctor: "診療所を運営し、地域医療を担う医師です",
  resident: "臨床研修中の医師で、知識・技術の習得に努めます",
  alumni: "医局のOB/OGとして、ネットワーキングに参加できます",
  admin: "医局の事務・管理業務を担当します",
}

export function getRolePermissions(role: UserRole): RolePermissions {
  return ROLE_PERMISSIONS[role]
}

export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  return ROLE_PERMISSIONS[role][permission]
}
